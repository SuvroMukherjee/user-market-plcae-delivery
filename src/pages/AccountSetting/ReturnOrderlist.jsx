import { useEffect, useRef, useState } from "react";
import { Col, Container, Image, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getReturnOrders } from "../../Api/api";
import { ChangeFormatDate } from "../../assets/common/dateformat";
import { LoaderComponent } from "../../components/Loader/LoaderComponent";
import { setLoading } from "../../store/loadingSlice";
import SideLayout from "./SideLayout";

export const ReturnOrderlist = () => {
  const [history, sethistory] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const { userdata } = useSelector((state) => state?.auth);

  // const { filterState } = useContext(OrderFilterContext);
  // const { statusFilter, timeFilter } = filterState;

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

  console.log({ history });

  /* Loading State start */
  const loadingState = useSelector((state) => state.loading.loadingState);
  const loadingMessage = useSelector((state) => state.loading.message);
  let loadingToastId = useRef(null);

  // add to cart loading message
  useEffect(() => {
    if (loadingMessage !== "Loading Return Orders...") {
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

  useEffect(() => {
    const getHistoryDeatils = async () => {
      try {
        dispatch(
          setLoading({
            state: true,
            message: "Loading Return Orders...",
          })
        );
        let res = await getReturnOrders();
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
    };
    getHistoryDeatils();
  }, [dispatch]);

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
                <h4> Return Order History </h4>
              </Col>
            </Row>

            {history?.length > 0 &&
              history?.map((ele, index) => {
                return (
                  <ListGroup.Item
                    key={index}
                    className="p-3 border rounded mb-4"
                  >
                    <Row>
                      <Col className="d-flex align-items-center" xs={2}>
                        <Image
                          src={ele?.productId?.specId?.image?.[0]?.image_path}
                          thumbnail
                          width={80}
                          height={80}
                        />
                      </Col>
                      <Col xs={4}>
                        <Row className="orderPname">{ele?.productId?.name}</Row>
                        <Row className="mt-2">
                          {ele?.productId?.specId?.spec_det
                            ?.slice(0, 3)
                            .map((ele, index) => (
                              <Col key={index} className="orderspec">
                                {ele?.title} : {ele?.value}
                              </Col>
                            ))}
                        </Row>
                      </Col>
                      <Col className="d-flex align-items-center justify-content-center product-price">
                        ₹ {ele?.price}{" "}
                        <span className="orderqns">x {ele?.quantity}</span>
                      </Col>
                      <Col className="d-flex align-items-center orderd">
                        <Row>
                          <Col className="orderplaceDate" xs={12}>
                            Return Order Placed on{" "}
                            {ChangeFormatDate(ele?.createdAt)}
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    {/* reason description and Image */}
                    <Row className="mt-2">
                      <Col>
                        <p>
                          <strong>Return Reason : </strong>
                          {ele?.reason}
                        </p>
                      </Col>

                      <Col>
                        <p>
                          <strong>Return Description : </strong>
                          {ele?.desc}
                        </p>
                      </Col>
                    </Row>
                    <Row className="mt-2">
                      <Col>
                        <strong>Images : </strong>
                        {ele?.images &&
                          ele?.images?.map((ele, index) => (
                            <Image
                              style={{
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                // open the image in new tab
                                window.open(ele?.image_path);
                              }}
                              key={index}
                              src={ele?.image_path}
                              thumbnail
                              width={80}
                              height={80}
                              className="m-2"
                            />
                          ))}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                );
              })}

            {!loadingState && history?.length === 0 && (
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
      </Container>
    </div>
  );
};
