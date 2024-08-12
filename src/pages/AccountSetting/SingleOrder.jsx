import moment from "moment";
import { useContext, useEffect, useRef, useState } from "react";
import {
  Col,
  Container,
  Image,
  ListGroup,
  Row,
  Breadcrumb,
  Table,
} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { Step, Stepper } from "react-form-stepper";
import { FaCircleInfo, FaStar } from "react-icons/fa6";
import { TbTruckDelivery } from "react-icons/tb";
import { TiDeleteOutline } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createProductReturn,
  FileUpload,
  getOrderInfo,
  getOrderTracking,
  getUserOrders,
} from "../../Api/api";
import {
  ChangeFormatDate,
  ExpectedDeliverydata,
} from "../../assets/common/dateformat";
import { LoaderComponent } from "../../components/Loader/LoaderComponent";
import { OrderFilterContext } from "../../context/context";
import { setLoading } from "../../store/loadingSlice";
import SideLayout from "./SideLayout";
import { TfiReload } from "react-icons/tfi";
import Invoice from "../Invoice/Invoice";

const SingleOrder = () => {
  // const [history, sethistory] = useState([]);
  // const { userdata } = useSelector((state) => state?.auth);
  // const dispatch = useDispatch();
  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  // const { filterState } = useContext(OrderFilterContext);
  // const { statusFilter, timeFilter } = filterState;
  // const [step, setStep] = useState(0);

  // /* Loading State start */
  // const loadingState = useSelector((state) => state.loading.loadingState);
  // const loadingMessage = useSelector((state) => state.loading.message);
  // let loadingToastId = useRef(null);
  // const [selectedTracking, setSelectedTracking] = useState();

  // // add to cart loading message
  // useEffect(() => {
  //   if (loadingMessage !== "Loading Orders...") {
  //     if (loadingState) {
  //       loadingToastId.current = toast.info(loadingMessage, {
  //         autoClose: false,
  //       });
  //     }

  //     if (!loadingState) {
  //       toast.dismiss(loadingToastId.current);
  //     }
  //   }
  // }, [loadingMessage, loadingState]);

  // /* Loading State ending */

  // const filteredHistory = history?.filter((item) => {
  //   if (statusFilter.length > 0 && timeFilter !== "") {
  //     return (
  //       item?.order_details.some((ele) =>
  //         statusFilter.includes(ele?.order_status)
  //       ) && new Date(item?.createdAt).getFullYear().toString() === timeFilter
  //     );
  //   } else if (statusFilter.length > 0) {
  //     //   return statusFilter.includes(item?.order_details[0]?.order_status);
  //     // only show those order item in the order list of each item which are in the statusFilter
  //     return item?.order_details.every((ele) =>
  //       statusFilter.includes(ele?.order_status)
  //     );
  //   } else if (timeFilter !== "") {
  //     return new Date(item?.createdAt).getFullYear().toString() === timeFilter;
  //   } else {
  //     return true;
  //   }
  // });

  // console.log({ history });

  // const navigate = useNavigate();

  // useEffect(() => {
  //   getHistoryDeatils();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [dispatch, userdata?._id]);

  // async function getHistoryDeatils() {
  //   try {
  //     dispatch(
  //       setLoading({
  //         state: true,
  //         message: "Loading Orders...",
  //       })
  //     );
  //     let res = await getUserOrders(userdata?._id);
  //     console.log(res);
  //     sethistory(res?.data?.data);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     dispatch(
  //       setLoading({
  //         state: false,
  //         message: "",
  //       })
  //     );
  //   }
  // }

  // const OrderStatus = (status) => {
  //   switch (status) {
  //     case "order_placed":
  //       return { label: "Order Placed", color: "blue" };
  //     case "confirmed":
  //       return { label: "Confirmed", color: "green" };
  //     case "order_packed":
  //       return { label: "Order Packed", color: "orange" };
  //     case "shipped":
  //       return { label: "Shipped", color: "purple" };
  //     case "delivered":
  //       return { label: "Delivered", color: "teal" };
  //     case "cancel":
  //       return { label: "Cancelled", color: "red" };
  //     default:
  //       return { label: "Pending", color: "gray" };
  //   }
  // };

  // const [returningOrder, setReturningOrder] = useState({
  //   productId: "",
  //   orderId: "",
  //   reason: "",
  //   description: "",
  //   images: [],
  // });

  // useEffect(() => {
  //   console.log(returningOrder, "returningOrder");
  // }, [returningOrder]);

  // const handleReturn = async (
  //   productId,
  //   orderId,
  //   reason,
  //   description,
  //   images
  // ) => {
  //   if (
  //     productId === "" ||
  //     orderId === "" ||
  //     reason === "" ||
  //     description === "" ||
  //     images.length === 0
  //   ) {
  //     toast.error("Please Fill all the fields and Upload Image of the Product");
  //     return;
  //   }

  //   if (reason === "Reason of the return") {
  //     toast.error("Please Select the Reason for Return");
  //     return;
  //   }

  //   try {
  //     const res = await createProductReturn(
  //       productId,
  //       orderId,
  //       reason,
  //       description,
  //       images
  //     );

  //     console.log(res);
  //     if (res?.status !== 200) {
  //       toast.error(
  //         "Something went wrong, Please try again later or Contact Us."
  //       );
  //     } else {
  //       toast.success(res?.data?.message);
  //       getHistoryDeatils();
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleFileImageChange = async (event) => {
  //   const files = event.target.files;

  //   if (files.length < 0) {
  //     return;
  //   }

  //   if (files.length > 0) {
  //     const selectedFiles = Array.from(files);
  //     console.log("Selected Files:", selectedFiles);
  //     selectedFiles.forEach((file, index) => {
  //       console.log(`File ${index + 1}:`, file);
  //     });

  //     for (const file of selectedFiles) {
  //       await onFileUpload(file);
  //     }
  //   }
  // };

  // const onFileUpload = async (file) => {
  //   const formData = new FormData();
  //   formData.append("file", file);

  //   try {
  //     const res = await FileUpload(formData);
  //     console.log(res?.data?.data, "image upload res");

  //     setTimeout(() => {
  //       setReturningOrder((prevData) => ({
  //         ...prevData,
  //         images: [
  //           ...prevData.images,
  //           { image_path: res?.data?.data?.fileurl },
  //         ],
  //       }));
  //     }, 3000);
  //   } catch (err) {
  //     console.error(err, "err");
  //   }
  // };

  // const OrderSequence = (status) => {
  //   switch (status) {
  //     case "order_placed":
  //       setStep(0);
  //       return "Order Placed";
  //     case "order_packed":
  //       setStep(1);
  //       return "Order Packed";
  //     case "shipped":
  //       setStep(2);
  //       return "Order Shipped";
  //     case "out_for_delivery":
  //       setStep(3);
  //       return "Out for Delivery";
  //     case "delivered":
  //       setStep(4);
  //       return "Order Delivered";
  //     case "cancel":
  //       setStep(-1);
  //       return "Order Cancelled";
  //     default:
  //       return "Unknown Status";
  //   }
  // };

  // const HandleTracking = (order, product) => {
  //   console.log(order, product);
  //   setSelectedTracking({ ...order, ...product });
  //   OrderSequence(product?.order_status);
  //   handleShow();
  // };

  const { id: orderId } = useParams();

  const [orderDetails, setOrderDetails] = useState(null);
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [returningOrder, setReturningOrder] = useState({
    productId: "",
    orderId: "",
    reason: "",
    description: "",
    images: [],
  });

  useEffect(() => {
    if (orderId) {
      getOrderDetails();
    }
  }, []);

  async function getOrderDetails() {
    try {
      setLoading(true);
      let res = await getOrderInfo(orderId);
      setOrderDetails(res?.data?.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

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
        getOrderDetails();
      }
    } catch (error) {
      console.log(error);
    }
  };

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

  const order = {
    _id: "667d1f39a61c431d2cca0785",
    customerId: "6627b54ebed015140e60a8c5",
    order_price: 22640,
    addressId: "6630bc2ead267311c1a32e4c",
    locality: "Midnapore",
    pincode: "721102",
    city: "Abash",
    address_type: "home",
    name: "Rahul Dutta",
    ph_no: "9531738477",
    address: "Abash",
    payment_status: "paid",
    paid_amount: 0,
    order_details: [
      {
        proId: "6645f5bd4e4b9fe671ea576d",
        price: 12000,
        qty: 1,
        total_shipping_price: 100,
        sellerId: "6627e04065127b2f333cfa14",
        order_status: "order_placed",
        return_req: false,
        is_payment: true,
        _id: "667d1f39a61c431d2cca0786",
      },
      {
        proId: "6645f5bf4e4b9fe671ea5775",
        price: 10500,
        qty: 1,
        total_shipping_price: 40,
        sellerId: "6627e04065127b2f333cfa14",
        order_status: "order_placed",
        return_req: false,
        is_payment: true,
        _id: "667d1f39a61c431d2cca0787",
      },
    ],
    order_type: "Online",
    createdAt: "2024-06-27T08:13:45.698Z",
    updatedAt: "2024-06-27T08:13:47.769Z",
    order_no: "ORDNO1719476025698",
    __v: 0,
    paymentId: "pay_ORiOha3cqNyYRQ",
  };

  console.log({ orderDetails });

  return (
    <>
      {loading && (
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
      {!loading && (
        <div>
          <Container>
            <ul className="breadcrumb">
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>
                <Link to={"/user/userprofile"}>My Account</Link>
              </li>
              <li>
                <Link to={"/user/orderlist"}>My Orders</Link>
              </li>
              <li>
                <Link to={`/user/order/${orderDetails?._id}`}>
                  {orderDetails?.order_no}
                </Link>
              </li>
            </ul>
          </Container>
          <Container className="mt-4 mb-4 p-4">
            <Row className="Box1 p-4 mt-2">
              <Col>
                <label className="nck">Delivery Address</label>
                <p className="nck-vsmall mt-2">
                  {orderDetails?.addressId?.name}
                </p>
                <p className="ad">
                  {orderDetails?.addressId?.address},
                  {orderDetails?.addressId?.address_type?.toLowerCase()},
                  {orderDetails?.addressId?.locality},
                  {orderDetails?.addressId?.pincode},
                  {orderDetails?.addressId?.state}
                </p>
                <p className="nck">Phone Number</p>
                <p className="nck-vsmall mt-2">
                  {orderDetails?.addressId?.ph_no} ,
                  {orderDetails?.addressId?.alterphone}
                </p>
              </Col>
              <Col xs={8}>
                <Row>
                  <label className="nck">Payment Process</label>
                  <Table responsive="sm" className="mt-2">
                    <thead>
                      <tr className="nck-vsmall">
                        <th>Order Number</th>
                        <th>Order Placed on</th>
                        <th>Payment Method</th>
                        <th>Payable Amount</th>
                        <th>Payable Status</th>
                        <th>Payment Id</th>
                      </tr>
                    </thead>
                    <thead className="mt-2">
                      <tr className="nck-vsmall">
                        <th className="odn">{orderDetails?.order_no}</th>
                        <th>
                          {moment(orderDetails?.updatedAt).format(
                            "Do MMMM , YYYY"
                          )}
                        </th>
                        <th>
                          {orderDetails?.order_type == "COD"
                            ? "Cash On Delivery"
                            : "RazorPay Payment Gateway"}
                        </th>
                        <th>₹ {orderDetails?.order_price?.toLocaleString()}</th>
                        <th>
                          {orderDetails?.payment_status == "unpaid" ? (
                            <span className="impCom">Incomplete</span>
                          ) : (
                            <span className="cmp">Complete</span>
                          )}
                        </th>
                        <th>
                          {orderDetails?.payment_status == "paid"
                            ? orderDetails?.paymentId
                            : "N/A"}
                        </th>
                      </tr>
                    </thead>
                  </Table>
                </Row>
                {/* <Row className="mt-2">
                  <Invoice order={order} />
                </Row> */}
              </Col>

              {/* <Col xs={3}>
            {" "}
            <label className="nck">More Actions</label>
          </Col> */}
            </Row>

            <Row className="Box1 p-2 mt-2">
              <label className="nck mt-2">Your Products</label>
              <Col className="mt-2">
                <ListGroup>
                  {orderDetails?.order_details?.map((ele, index) => {
                    return (
                      <>
                        <ListGroup.Item
                          key={index}
                          //className="p-3"
                          className={
                            "returnReqId" in ele ? "retRow p-3" : "p-3"
                          }
                        >
                          <Row>
                            <Col
                              className="d-flex align-items-center product-img-col"
                              xs={2}
                            >
                              <Image
                                style={{ objectFit: "contain" }}
                                src={ele?.proId?.specId?.image?.[0]?.image_path}
                                width={100}
                                height={100}
                              />
                            </Col>
                            <Col
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "start",
                              }}
                              className="order-info"
                              xs={3}
                            >
                              <Row
                                className="orderPname nck"
                                style={{
                                  width: "100%",
                                }}
                              >
                                {ele?.proId?.productId?.name}
                              </Row>
                              <Row className="orderPname-info mt-2 nck-small">
                                Price : ₹{ele?.price?.toLocaleString()} (Items :{" "}
                                {ele?.qty})
                              </Row>
                              <Row className="mt-2 nck-seller">
                                Seller :{" "}
                                {
                                  ele?.proId?.sellerId?.Shop_Details_Info
                                    ?.shope_name
                                }
                              </Row>
                            </Col>

                            <Col>
                              <TrackingProduct
                                orderDetails={orderDetails}
                                product={ele}
                              />

                              {ele?.order_status !== "delivered" ? (
                                ele?.proId?.estimateDate && (
                                  <p className="text-center nck-vsmall">
                                    Expected Delivery on{" "}
                                    {ExpectedDeliverydata(
                                      parseInt(ele?.proId?.estimateDate || 0),
                                      orderDetails?.updatedAt
                                    )}
                                  </p>
                                )
                              ) : (
                                <p className="text-center nck-vsmall">
                                  Your item is delivered on{" "}
                                  {moment(ele?.order_delivery).format(
                                    "Do MMMM, dddd"
                                  )}
                                </p>
                              )}
                            </Col>

                            {ele?.order_status == "delivered" && (
                              <Col
                                xs={2}
                                className="d-flex align-items-center flex-column justify-content-center cursor orderplaceDate return-action-div"
                              >
                                <Row>
                                  {!ele?.return_req &&
                                    returningOrder.productId !==
                                      ele?.proId?._id && (
                                      <button
                                        className="btn mt-2 btn-sm"
                                        onClick={(e) => {
                                          {
                                            e.stopPropagation();
                                            setReturningOrder({
                                              productId: ele?.proId?._id,
                                              orderId: orderDetails?._id,
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
                                    // <button
                                    //   className="btn btn-warning mt-2 btn-sm"
                                    //   onClick={() => {
                                    //     navigate(`/user/returnorderlist`);
                                    //   }}
                                    // >
                                    //   Return Status
                                    // </button>
                                    <p className="nck rtq">Returned</p>
                                  )}
                                </Row>
                                <Row
                                  onClick={() => {
                                    navigate(
                                      `/user/rateandreview/${ele?.proId?._id}`
                                    );
                                    console.warn("call");
                                  }}
                                >
                                  <div className="rateReviewLable mt-2 cursor">
                                    <FaStar size={20} /> Rate and Review Product
                                  </div>
                                </Row>
                              </Col>
                            )}
                          </Row>

                          {"returnReqId" in ele && (
                            <Row className="p-2 m-2 retRow">
                              <Col className="mt-2">
                                <label className="nck rtq">
                                  Return Request
                                </label>
                                <p className="nck-small mt-2">
                                  Reason : {ele?.returnReqId?.reason}
                                </p>
                                <p className="nck-small">Description</p>
                                <p className="nck-des">
                                  {ele?.returnReqId?.desc?.substring(0, 250) +
                                    "..."}
                                </p>
                              </Col>
                              <Col className="mt-2">
                                <p className="nck-small">
                                  {" "}
                                  Deliverd Product Images
                                </p>
                                <div className="d-flex gap-3">
                                  {ele?.returnReqId?.images?.length > 0
                                    ? ele?.returnReqId?.images?.map((ele) => (
                                        <img
                                          src={ele?.image_path}
                                          width={50}
                                          alt="image"
                                        />
                                      ))
                                    : "No Shared Image"}
                                </div>
                              </Col>
                            </Row>
                          )}
                        </ListGroup.Item>

                        {returningOrder?.productId === ele?.proId?._id && (
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
                                <option disabled value="Reason of the return">
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
                                    <TiDeleteOutline size={20} color="red" />
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
            {/* <Row className="Box1 p-4 mt-2">
          <Col>
            <label className="nck">
              {" "}
              Help Zoofi By Your Important FeedBack
            </label>
            <Row
              onClick={() => navigate(`/user/rateandreview/${ele?.proId?._id}`)}
            >

              <span></span>
            </Row>
          </Col>
        </Row> */}
          </Container>
        </div>
      )}
    </>
  );
};

const TrackingProduct = ({ orderDetails, product }) => {
  const [step, setStep] = useState(0);
  const [orderTrack, setOrderTrack] = useState();

  useEffect(() => {
    OrderSequence(product?.order_status);
    getTrackRecord();
  }, [orderDetails]);

  async function getTrackRecord() {
    let res = await getOrderTracking(orderDetails?._id, product?.proId?._id);
    console.log(res?.data?.data, "data");
    setOrderTrack(res?.data?.data);
  }

  // useEffect(() => {
  //   let stepCounter = 0;
  //   const maxSteps = 4;

  //   const stepInterval = setInterval(() => {
  //     setStep(stepCounter);
  //     stepCounter += 1;

  //     if (stepCounter > maxSteps) {
  //       clearInterval(stepInterval);
  //     }
  //   }, 10000); // 10000 ms = 10 seconds

  //   return () => clearInterval(stepInterval); // Cleanup on unmount
  // }, []);

  // useEffect(() => {
  //   console.log("Current step:", step);
  // }, [step]); // This will run every time 'step' changes

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

  // useEffect(() => {
  //   let steps = [];
  //   switch (product?.order_status) {
  //     case "order_placed":
  //       steps = [0];
  //       break;
  //     case "order_packed":
  //       steps = [0, 1];
  //       break;
  //     case "shipped":
  //       steps = [0, 1, 2];
  //       break;
  //     case "out_for_delivery":
  //       steps = [0, 1, 2, 3];
  //       break;
  //     case "delivered":
  //       steps = [0, 1, 2, 3, 4];
  //       break;
  //     case "cancel":
  //       setStep(-1);
  //       return;
  //     default:
  //       return;
  //   }

  //   steps.forEach((stepValue, index) => {
  //     setTimeout(() => {
  //       setStep(stepValue);
  //     }, index * 10000); // 10000 ms = 10 seconds
  //   });
  // }, [product]);

  //   useEffect(() => {
  //   console.log('Current step:', step);
  // }, [step]);

  return (
    <>
      <Stepper
        activeStep={step}
        styleConfig={{
          activeBgColor: "#42ab00",
          activeTextColor: "#000000",
          activeTitleColor: "#000",
          // inactiveBgColor: "#e5faca",
          // inactiveTextColor: "#9C9C9C",
          completedBgColor: "#42ab00",
          completedTextColor: "#000000",
          size: "2em",
          stepSize: "10em",
          activeColor: "#000000",
        }}
        connectorStateColors
        connectorStyleConfig={{
          size: 3,
          activeColor: "rgb(66, 171, 0)",
          completedColor: "rgb(66, 171, 0)",
          //disabledColor: "rgb(66, 171, 0)",
        }}
      >
        <Step
          label={
            <>
              <div>Order Confirm</div>
              {orderDetails?.createdAt && (
                <div className="ostatus">
                  {moment(orderDetails?.createdAt).format("Do MMM HH:mm A")}
                </div>
              )}
            </>
          }
        />
        <Step
          label={
            <>
              <div className={!orderTrack?.order_packed?.date && "disName"}>
                Order Packed
              </div>
              {orderTrack?.order_packed?.date && step >= 1 && (
                <div className="ostatus">
                  {moment(orderTrack?.order_packed?.date).format(
                    "Do MMM HH:mm A"
                  )}
                </div>
              )}
            </>
          }
        />
        <Step
          label={
            <>
              <div className={!orderTrack?.order_shipped?.date && "disName"}>
                Order Shipped
              </div>
              {orderTrack?.order_shipped?.date && (
                <div className="ostatus">
                  {moment(orderTrack?.order_shipped.date).format(
                    "Do MMM HH:mm A"
                  )}
                </div>
              )}
            </>
          }
        />
        <Step
          label={
            <>
              <div className={!orderTrack?.order_delivered?.date && "disName"}>
                Order Delivered
              </div>
              {orderTrack?.order_delivered?.date && (
                <div className="ostatus">
                  {moment(orderTrack?.order_delivered.date).format(
                    "Do MMM HH:mm A"
                  )}
                </div>
              )}
            </>
          }
        />
      </Stepper>
    </>
  );
};

export default SingleOrder;
