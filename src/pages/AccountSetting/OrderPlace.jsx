import moment from "moment";
import { useContext, useEffect, useRef, useState } from "react";
import { Col, Container, Image, ListGroup, Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { Step, Stepper } from "react-form-stepper";
import { FaCircleInfo, FaStar } from "react-icons/fa6";
import { TiDeleteOutline } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FileUpload, createProductReturn, getUserOrders } from "../../Api/api";
import {
  ChangeFormatDate,
  ExpectedDeliverydata,
} from "../../assets/common/dateformat";
import { LoaderComponent } from "../../components/Loader/LoaderComponent";
import { OrderFilterContext } from "../../context/context";
import { setLoading } from "../../store/loadingSlice";
import SideLayout from "./SideLayout";

const OrderPlace = () => {
  const [history, sethistory] = useState([]);
  const { userdata } = useSelector((state) => state?.auth);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { filterState } = useContext(OrderFilterContext);
  const { statusFilter, timeFilter } = filterState;
  const [step, setStep] = useState(0);

  /* Loading State start */
  const loadingState = useSelector((state) => state.loading.loadingState);
  const loadingMessage = useSelector((state) => state.loading.message);
  let loadingToastId = useRef(null);
  const [selectedTracking, setSelectedTracking] = useState();

  // add to cart loading message
  useEffect(() => {
    if (loadingMessage !== "Loading Orders...") {
      if (loadingState) {
        loadingToastId.current = toast.info(loadingMessage, {
          autoClose: false,
        });
      }

      if (!loadingState) {
        toast.dismiss(loadingToastId.current);
      }
    }
  }, [loadingMessage, loadingState]);

  /* Loading State ending */

  const filteredHistory = history?.filter((item) => {
    if (statusFilter.length > 0 && timeFilter !== "") {
      return (
        item?.order_details.some((ele) =>
          statusFilter.includes(ele?.order_status)
        ) && new Date(item?.createdAt).getFullYear().toString() === timeFilter
      );
    } else if (statusFilter.length > 0) {
      //   return statusFilter.includes(item?.order_details[0]?.order_status);
      // only show those order item in the order list of each item which are in the statusFilter
      return item?.order_details.every((ele) =>
        statusFilter.includes(ele?.order_status)
      );
    } else if (timeFilter !== "") {
      return new Date(item?.createdAt).getFullYear().toString() === timeFilter;
    } else {
      return true;
    }
  });

  console.log({ history });

  const navigate = useNavigate();

  useEffect(() => {
    getHistoryDeatils();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, userdata?._id]);

  async function getHistoryDeatils() {
    try {
      dispatch(
        setLoading({
          state: true,
          message: "Loading Orders...",
        })
      );
      let res = await getUserOrders(userdata?._id);
      console.log(res);
      sethistory(res?.data?.data);
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(
        setLoading({
          state: false,
          message: "",
        })
      );
    }
  }

  const OrderStatus = (status) => {
    switch (status) {
      case "order_placed":
        return { label: "Order Placed", color: "blue" };
      case "confirmed":
        return { label: "Confirmed", color: "green" };
      case "order_packed":
        return { label: "Order Packed", color: "orange" };
      case "shipped":
        return { label: "Shipped", color: "purple" };
      case "delivered":
        return { label: "Delivered", color: "teal" };
      case "cancel":
        return { label: "Cancelled", color: "red" };
      default:
        return { label: "Pending", color: "gray" };
    }
  };

  const [returningOrder, setReturningOrder] = useState({
    productId: "",
    orderId: "",
    reason: "",
    description: "",
    images: [],
  });

  useEffect(() => {
    console.log(returningOrder, "returningOrder");
  }, [returningOrder]);

  const handleReturn = async (
    productId,
    orderId,
    reason,
    description,
    images
  ) => {
    if (
      productId === "" ||
      orderId === "" ||
      reason === "" ||
      description === "" ||
      images.length === 0
    ) {
      toast.error("Please Fill all the fields and Upload Image of the Product");
      return;
    }

    if (reason === "Reason of the return") {
      toast.error("Please Select the Reason for Return");
      return;
    }

    try {
      const res = await createProductReturn(
        productId,
        orderId,
        reason,
        description,
        images
      );

      console.log(res);
      if (res?.status !== 200) {
        toast.error(
          "Something went wrong, Please try again later or Contact Us."
        );
      } else {
        toast.success(res?.data?.message);
        getHistoryDeatils();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileImageChange = async (event) => {
    const files = event.target.files;

    if (files.length < 0) {
      return;
    }

    if (files.length > 0) {
      const selectedFiles = Array.from(files);
      console.log("Selected Files:", selectedFiles);
      selectedFiles.forEach((file, index) => {
        console.log(`File ${index + 1}:`, file);
      });

      for (const file of selectedFiles) {
        await onFileUpload(file);
      }
    }
  };

  const onFileUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await FileUpload(formData);
      console.log(res?.data?.data, "image upload res");

      setTimeout(() => {
        setReturningOrder((prevData) => ({
          ...prevData,
          images: [
            ...prevData.images,
            { image_path: res?.data?.data?.fileurl },
          ],
        }));
      }, 3000);
    } catch (err) {
      console.error(err, "err");
    }
  };

  const OrderSequence = (status) => {
    switch (status) {
      case "order_placed":
        setStep(0);
        return "Order Placed";
      case "order_packed":
        setStep(1);
        return "Order Packed";
      case "shipped":
        setStep(2);
        return "Order Shipped";
      case "out_for_delivery":
        setStep(3);
        return "Out for Delivery";
      case "delivered":
        setStep(4);
        return "Order Delivered";
      case "cancel":
        setStep(-1);
        return "Order Cancelled";
      default:
        return "Unknown Status";
    }
  };

  const HandleTracking = (order, product) => {
    console.log(order, product);
    setSelectedTracking({ ...order, ...product });
    OrderSequence(product?.order_status);
    handleShow();
  };

  return (
    <div>
      <Container className="mt-4 mb-4 p-4">
        <Row>
          <Col xl={3} lg={4}>
            <SideLayout />
          </Col>
          <Col xl={9} lg={8}>
            <Row>
              <Col>
                <h4> Order History </h4>
              </Col>
            </Row>
            {filteredHistory?.length > 0 &&
              filteredHistory?.map((item, index) => (
                <div key={index} className="orders-block">
                  {console.log(item, "itemmmmmmmmmmmmmmmmm")}
                  <Row className="mt-4">
                    <div className="total-price">
                      Total Price : ₹ {item?.order_price?.toLocaleString()}{" "}
                      {/* <span>
                        {item?.payment_status == "paid" ? (
                          <p>Payment Complete</p>
                        ) : (
                          <p>Payment InComplete</p>
                        )}
                      </span>
                      <span>
                        {item?.order_type == "COD" ? (
                          <p>Cash On Delivery</p>
                        ) : (
                          <p>Online Payment</p>
                        )}
                      </span> */}
                    </div>
                    <Col>
                      <ListGroup>
                        {item?.order_details?.map((ele, index) => {
                          return (
                            <>
                              <ListGroup.Item
                                key={index}
                                className="p-3"
                                style={{
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  navigate(`/user/order/${item?._id}`);
                                }}
                              >
                                <Row>
                                  <Col
                                    className="d-flex align-items-center product-img-col"
                                    md={2}
                                  >
                                    <Image
                                      src={
                                        ele?.proId?.specId?.image?.[0]
                                          ?.image_path
                                      }
                                      thumbnail
                                      width={80}
                                      height={80}
                                    />
                                  </Col>
                                  <Col
                                    lg={4}
                                    md={6}
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      justifyContent: "center",
                                      alignItems: "start",
                                    }}
                                    className="order-info"
                                  >
                                    <Row
                                      className="orderPname"
                                      style={{
                                        width: "100%",
                                      }}
                                    >
                                      {ele?.proId?.productId?.name}
                                    </Row>
                                    <Row
                                      className="orderPname-info mt-2"
                                      style={{
                                        width: "100%",
                                      }}
                                    >
                                      {ele?.proId?.specId?.spec_det
                                        ?.slice(0, 3)
                                        .map((ele, index) => (
                                          <Col
                                            key={index}
                                            className="orderspec"
                                          >
                                            {ele?.title} : {ele?.value}
                                          </Col>
                                        ))}
                                    </Row>
                                  </Col>
                                  <Col className="d-flex align-items-center justify-content-center product-price">
                                    ₹ {ele?.price}{" "}
                                    <span className="orderqns">
                                      x {ele?.qty}
                                    </span>
                                  </Col>
                                  <Col
                                    xs={4}
                                    className="d-flex align-items-center orderd order-status"
                                  >
                                    <Row>
                                      <Col
                                        xs={12}
                                        style={{
                                          color: OrderStatus(ele?.order_status)
                                            .color,
                                        }}
                                      >
                                        {!("returnReqId" in ele) ? (
                                          OrderStatus(ele?.order_status).label
                                        ) : (
                                          <span className="rtq">Return Requested</span>
                                        )}
                                        {/* {OrderStatus(ele?.order_status).label} */}
                                      </Col>
                                      <Col className="orderplaceDate" xs={12}>
                                        Order Placed on{" "}
                                        {ChangeFormatDate(item?.createdAt)}
                                      </Col>
                                      {ele?.proId?.estimateDate && (
                                        <Col className="orderplaceDate" xs={12}>
                                          Expected between{" "}
                                          {ExpectedDeliverydata(
                                            parseInt(
                                              ele?.proId?.estimateDate || 0
                                            ),
                                            item?.updatedAt
                                          )}
                                        </Col>
                                      )}
                                      {/* {ele?.order_status !== "delivered" && (
                                      <Col
                                        className="trck2 mt-2"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          HandleTracking(item, ele);
                                        }}
                                      >
                                        <span className="mx-2 trackIocn">
                                          <TbTruckDelivery />
                                        </span>{" "}
                                        Track Your Order
                                      </Col>
                                    )} */}
                                      {/* todo need to change */}

                                      {!("returnReqId" in ele) &&
                                        ele?.order_status == "delivered" && (
                                          <Col
                                            className="rateReviewLable mt-2 cursor"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              navigate(
                                                `/user/rateandreview/${ele?.proId?._id}`,
                                                { replace: true }
                                              );
                                            }}
                                          >
                                            <FaStar /> Rate and Review Product
                                          </Col>
                                        )}

                                      {/* <Col
                                      className="rateReviewLable mt-2 cursor"
                                      onClick={() =>
                                        navigate(
                                          `/user/rateandreview/${ele?.proId?._id}`
                                        )
                                      }
                                    >
                                      <FaStar /> Rate and Review Product
                                    </Col> */}
                                      {ele?.order_status == "delivered" && (
                                        <Col
                                          className="orderplaceDate return-action-div"
                                          xs={12}
                                        >
                                          {!ele?.return_req &&
                                            returningOrder.productId !==
                                              ele?.proId?._id && (
                                              <button
                                                className="btn btn-primary mt-2 btn-sm"
                                                onClick={(e) => {
                                                  {
                                                    e.stopPropagation();
                                                    setReturningOrder({
                                                      productId:
                                                        ele?.proId?._id,
                                                      orderId: item?._id,
                                                      reason: "",
                                                      description: "",
                                                      images: [],
                                                    });
                                                  }
                                                }}
                                              >
                                                Return
                                              </button>
                                            )}
                                          {ele?.return_req && (
                                            <button
                                              className="btn btn-warning mt-2 btn-sm"
                                              onClick={() => {
                                                navigate(
                                                  `/user/returnorderlist`
                                                );
                                              }}
                                            >
                                              Return Status
                                            </button>
                                          )}
                                        </Col>
                                      )}
                                    </Row>
                                  </Col>
                                </Row>
                              </ListGroup.Item>
                              {returningOrder?.productId ===
                                ele?.proId?._id && (
                                <>
                                  <div className="inside-return-action-div">
                                    <label htmlFor="reason">
                                      Select The Reason for Return{" "}
                                      <span style={{ color: "red" }}>*</span>
                                    </label>
                                    <select
                                      className="form-control mt-2"
                                      name="reason"
                                      id="reason"
                                      required
                                      defaultValue={"Reason of the return"}
                                      onChange={(e) => {
                                        setReturningOrder({
                                          ...returningOrder,
                                          reason: e.target.value,
                                        });
                                      }}
                                    >
                                      <option
                                        disabled
                                        value="Reason of the return"
                                      >
                                        Reason of the return{" "}
                                        <span style={{ color: "red" }}>*</span>
                                      </option>
                                      <option value="Damaged Product">
                                        Damaged Product
                                      </option>
                                      <option value="Wrong Product">
                                        Wrong Product
                                      </option>
                                      <option value="Not Satisfied">
                                        Not Satisfied
                                      </option>
                                    </select>
                                  </div>

                                  <div className="inside-return-action-div">
                                    <label htmlFor="description">
                                      Describe the Reason{" "}
                                      <span style={{ color: "red" }}>*</span>
                                    </label>
                                    <textarea
                                      required
                                      placeholder="Description of the Return"
                                      className="form-control mt-2"
                                      id="description"
                                      name="description"
                                      onChange={(e) => {
                                        setReturningOrder({
                                          ...returningOrder,
                                          description: e.target.value,
                                        });
                                      }}
                                    ></textarea>
                                  </div>
                                  <div className="inside-return-action-div">
                                    <label htmlFor="productImg">
                                      Image of the Product{" "}
                                      <span style={{ color: "red" }}>*</span>
                                    </label>
                                    <input
                                      required
                                      className="form-control mt-2"
                                      type="file"
                                      id="productImg"
                                      name="productImg"
                                      accept="image/*"
                                      multiple
                                      onChange={(e) => {
                                        handleFileImageChange(e);
                                      }}
                                    />
                                    {returningOrder.images.length > 0 && (
                                      <label className="bottom-label">
                                        <span className="bottom-label-info-icon">
                                          <FaCircleInfo />
                                        </span>
                                        <span className="bottom-label-text">
                                          {returningOrder.images.length} Image
                                          Uploaded
                                        </span>
                                        <span
                                          className="bottom-label-cross"
                                          onClick={() => {
                                            setReturningOrder({
                                              productId: "",
                                              orderId: "",
                                              reason: "",
                                              description: "",
                                              images: [],
                                            });
                                          }}
                                        >
                                          <TiDeleteOutline
                                            size={20}
                                            color="red"
                                          />
                                        </span>
                                      </label>
                                    )}
                                  </div>
                                  <div className="inside-return-action-div return-action-div-btn ">
                                    <button
                                      className="btn btn-primary mt-2 btn-sm"
                                      disabled={
                                        returningOrder.images.length === 0 ||
                                        returningOrder.reason ===
                                          "Reason of the return" ||
                                        returningOrder.description === ""
                                      }
                                      onClick={() => {
                                        handleReturn(
                                          returningOrder.productId,
                                          returningOrder.orderId,
                                          returningOrder.reason,
                                          returningOrder.description,
                                          returningOrder.images
                                        );
                                        setReturningOrder({
                                          productId: "",
                                          orderId: "",
                                          reason: "",
                                          description: "",
                                          images: [],
                                        });
                                      }}
                                    >
                                      Confirm
                                    </button>
                                    <button
                                      className="btn btn-danger mt-2 btn-sm"
                                      onClick={() => {
                                        setReturningOrder({
                                          productId: "",
                                          orderId: "",
                                          reason: "",
                                          description: "",
                                          images: [],
                                        });
                                      }}
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </>
                              )}
                            </>
                          );
                        })}
                      </ListGroup>
                    </Col>
                  </Row>
                </div>
              ))}

            {!loadingState && filteredHistory?.length === 0 && (
              <div className="text-center mt-4">
                <h5>No Orders Found</h5>
              </div>
            )}

            {loadingState && (
              <div
                className="text-center mt-4"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  minHeight: "50vh",
                  padding: "50px",
                }}
              >
                <LoaderComponent />
              </div>
            )}
          </Col>
        </Row>
        <Row>
          <Modal show={show} onHide={handleClose} animation={true} centered>
            {console.log({ selectedTracking })}
            <Modal.Body>
              <Row>
                <Col className="text-center odNo2" xs={12}>
                  Order Status - lastest updated <br />
                  {moment(selectedTracking?.updatedAt).format("LLLL")}
                </Col>
                <Col className="text-center mt-2 odNo" xs={12}>
                  Order Number : {selectedTracking?.order_no}
                </Col>
                <Col xs={12}>
                  <Stepper
                    activeStep={step}
                    styleConfig={{
                      activeBgColor: "#9af064",
                      activeTextColor: "#000",
                      activeTitleColor: "#000",
                      inactiveBgColor: "#e5faca",
                      inactiveTextColor: "#9C9C9C",
                      completedBgColor: "#686D76",
                      completedTextColor: "#fff",
                      size: "2em",
                      stepSize: "4em",
                    }}
                  >
                    <Step label="Order Confirm" />
                    <Step label="Order Packed" />
                    <Step label="Shipped" />
                    <Step label="Delivered" />
                  </Stepper>
                </Col>
              </Row>
              <Row className="p-2">
                <Col className="text-left odNo2" xs={12}>
                  Order Address
                </Col>
                <Col xs={12} className="p-2 odNo3">
                  <Row>
                    <Col>
                      {selectedTracking?.addressId?.name} :{" "}
                      {selectedTracking?.addressId?.ph_no}
                    </Col>
                  </Row>
                  <Row>
                    <Col sx={10}>{selectedTracking?.addressId?.address},</Col>
                  </Row>
                </Col>
              </Row>
              <Row className="p-2">
                <Col className="text-left odNo2" xs={6}>
                  Shipped With
                </Col>
                <Col className="text-left odNo4" xs={6}>
                  <Row>
                    <Col xs={12}>
                      {
                        selectedTracking?.proId?.sellerId?.Shop_Details_Info
                          ?.shope_name
                      }
                    </Col>
                    <Col xs={12}>
                      {selectedTracking?.proId?.sellerId?.phone_no}
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row className="p-2">
                <Col className="text-left odNo2" xs={6}>
                  Estimated
                </Col>
                <Col className="text-left odNo4" xs={6}>
                  <Row>
                    <Col xs={12}>
                      {ExpectedDeliverydata(
                        parseInt(selectedTracking?.proId?.estimateDate || 0),
                        selectedTracking?.updatedAt
                      )}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Modal.Body>
          </Modal>
        </Row>
      </Container>
    </div>
  );
};

export default OrderPlace;
