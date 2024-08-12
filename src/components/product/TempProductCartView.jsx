import { useEffect, useRef, useState } from "react";
import { Col, Form, Modal, Row, Spinner, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CartRemove, orderPaymentUpdate, PlaceOrder } from "../../Api/api";
import coupon from "../../assets/images/coupon.png";
import { allCartItems, fetchCartLists, tempCartItems, tempRemoveItemFromCart } from "../../store/cartSlice";
import { setLoading } from "../../store/loadingSlice";
import addressSlice from "../../store/addressSlice";
import { FaPlus } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import moment from "moment";
import { ExpectedDeliverydata } from "../../assets/common/dateformat";
import RazorPay from "../PaymentGateway/RazorPay";
import { tempRemoveItem } from "../../store/temporarycartSlice";

export const TempProductCartView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(tempCartItems);
    // const tempCartItemsData = useSelector(tempCartItems);
  const cartState = useSelector((state) => state.cart);

  const loadingState = useSelector((state) => state.loading.loadingState);
  const loadingMessage = useSelector((state) => state.loading.message);
  let loadingToastId = useRef(null);

    const { isLoggIn, userdata } = useSelector((state) => state?.auth);

  const [selectedPayment, setSelectedPayment] = useState("");
  const [show, setShow] = useState(false);
  const [openRezorpay, setRezorPay] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { data: Alladdressdata, deliveyAddress } = useSelector(
    (state) => state?.address
  );

  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleRadioChange = (addressId) => {
    dispatch(addressSlice.actions.updateDeliveryAddress(addressId));
    //setSelectedAddress(addressId);
  };

  const handlePaymentChange = (event) => {
    setSelectedPayment(event.target.value);
  };

  console.log({ cartItems });

 async function getRemoveFromCart(id) {
   let payload = {
     proId: id,
   };

   if (!isLoggIn) {
     dispatch(tempRemoveItemFromCart(payload));
     toast.success("Item removed from cart");
     return;
   }

   try {
     dispatch(
       setLoading({
         state: true,
         message: "Removing Item...",
       })
     );
     await CartRemove(payload);
     dispatch(fetchCartLists());
     toast.success("Item removed from cart");
   } catch (error) {
     toast.error("Something went wrong");
   } finally {
     dispatch(
       setLoading({
         state: false,
         message: "",
       })
     );
   }
 }
  const [totalmrp, setTotalmrp] = useState(0);

  useEffect(() => {
    if (cartItems) {
      calculatetotalMRP(cartItems?.products || []);
    }
    // setSelectedAddress(deliveyAddress);
  }, [Alladdressdata, deliveyAddress, cartItems]);

  function calculatetotalMRP(items) {
    // console.log(items, "callllllllllll");
    let totalMrp = items?.reduce((acc, item) => {
      const price = item?.proId?.specId?.price || 0;
      return acc + price * item?.quantity;
    }, 0);
    setTotalmrp(totalMrp);
    // console.log(totalMrp);
  }

  // console.log(cartItems);

  function calculateDiscountPercentage(mrp, sellPrice) {
    const discount = mrp - sellPrice;
    const discountPercentage = (discount / mrp) * 100;
    return discountPercentage;
  }

  const productPlace = async () => {
    let allAvl = cartItems?.products?.find((ele) => {
      return ele?.proId?.available_qty < 1;
    });

    if (allAvl) {
      // console.log("no", allAvl);
      toast.error(`${allAvl?.proId?.name} is out of stock`);
    } else {
      let payload = {
        addressId: deliveyAddress,
        order_type: selectedPayment == "cash" ? "COD" : "Online",
      };
      let res = await PlaceOrder(payload);
      // console.log(res, "cart");
      if (res?.data?.error == false) {
        dispatch(fetchCartLists());
        toast.success("order placed successfully");
        setTimeout(() => {
          navigate("/user/orderlist");
        }, 1500);
      }
    }
  };

  const productPlaceWithRazorPay = async (razorPaymentId) => {
    let allAvl = cartItems?.products?.find((ele) => {
      return ele?.proId?.available_qty < 1;
    });

    if (allAvl) {
      // console.log("no", allAvl);
      toast.error(`${allAvl?.proId?.name} is out of stock`);
    } else {
      let payload = {
        addressId: deliveyAddress,
        order_type: selectedPayment == "cash" ? "COD" : "Online",
      };
      let res = await PlaceOrder(payload);
      // console.log(res, "cart");
      if (res?.data?.error == false) {
        dispatch(fetchCartLists());
        console.warn(res, "resresres");
        let payload = {
          is_payment: true,
          paymentId: razorPaymentId,
          payment_status: "paid",
        };
        let apiResponse = await orderPaymentUpdate(
          res?.data?.data._id,
          payload
        );
        if (apiResponse?.data?.error == false) {
          toast.success("order placed successfully");
          setTimeout(() => {
            navigate("/user/orderlist");
          }, 1500);
        } else {
          toast.error("Could not update order");
        }
      } else {
        toast.error("Opps! we could not placed your order!");
      }
    }
  };

  // console.log({ selectedAddress });

  // console.log(cartItems?.products);

  useEffect(() => {
    dispatch(fetchCartLists());
    if (loadingState) {
      loadingToastId.current = toast.info(loadingMessage, {
        autoClose: false,
      });
    }

    if (!loadingState) {
      toast.dismiss(loadingToastId.current);
    }
  }, [dispatch, loadingMessage, loadingState]);

  const addTwoDaysAndFormat = (dateString) => {
    // Parse the date string using moment
    const date = moment(dateString);

    // Add 2 days to the parsed date
    const newDate = date.add(2, "days");

    // Format the new date
    return newDate.format("YYYY-MM-DDTHH:mm:ss.SSSZ");
  };

  const LoginHandler = () => {
    navigate("/login");
  };

  return (
    <>
      <div className="page-content inner">
        <div className="container cart-content">
          <div className="row">
            <div className="col-lg-8 left-col">
              <div className="top-row">
                <ul className="steps">
                  <li className="completed">Bag</li>
                  <li>Address</li>
                  <li>Payment</li>
                </ul>
              </div>
              <div className="address-box">
                {deliveyAddress ? (
                  <div className="content-left">
                    <p>
                      Deliver to:{" "}
                      <span>
                        {deliveyAddress?.name} {deliveyAddress?.pincode}
                      </span>
                    </p>
                    <p>
                      {deliveyAddress?.address},{deliveyAddress?.locality},
                      <br />
                      {deliveyAddress?.state}-{deliveyAddress?.pincode}
                    </p>
                  </div>
                ) : (
                  <p>Choose your delivery address</p>
                )}
                <div className="content-right" onClick={() => LoginHandler()}>
                  <a className="btn btn-address">Login to Proceed</a>
                </div>
              </div>

              <div className="address-box mt-4">
                <div>
                  <Form>
                    <Row>
                      <Col>Payment Options</Col>
                    </Row>
                    <Row className="mt-2">
                      <ListGroup as="ol">
                        <ListGroup.Item as="li" variant="light">
                          <Col xs={12}>
                            <Row>
                              <Col xs={1}>
                                <Form.Check
                                  type="radio"
                                  id="cashOption"
                                  name="paymentOption"
                                  value="cash"
                                  checked={selectedPayment === "cash"}
                                  onChange={handlePaymentChange}
                                />
                              </Col>
                              <Col>
                                <Form.Check.Label
                                  htmlFor="cashOption"
                                  className="payTxt"
                                >{`Cash On Delivery`}</Form.Check.Label>
                              </Col>
                            </Row>
                          </Col>
                        </ListGroup.Item>
                        <ListGroup.Item as="li" variant="light">
                          <Col xs={12}>
                            <Row>
                              <Col xs={12}>
                                <Row>
                                  <Col xs={2}>
                                    <Form.Check
                                      type="radio"
                                      id="RazorPayOption"
                                      name="paymentOption"
                                      value="RazorPay"
                                      disabled
                                      checked={selectedPayment === "RazorPay"}
                                      onChange={handlePaymentChange}
                                    />
                                  </Col>
                                  <Col>
                                    <Form.Check.Label
                                      htmlFor="RazorPayOption"
                                      className="payTxt"
                                    >
                                      {" "}
                                      {`RazorPay`}
                                    </Form.Check.Label>
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                          </Col>
                        </ListGroup.Item>
                      </ListGroup>
                    </Row>
                  </Form>
                  <Row></Row>
                  <div>
                    <Modal show={show} onHide={handleClose}>
                      <Modal.Body className="cart-content p-4">
                        <Row>
                          <Col className="seelctAddress">
                            Select delivery Address
                          </Col>
                        </Row>
                        <Row>
                          <div
                            className="address-box mt-2"
                            onClick={() => {
                              navigate("/user/manageaddress");
                            }}
                          >
                            <div
                              className="content-left"
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "10px",
                              }}
                            >
                              <FaPlus />
                              <a>Add New Address</a>
                            </div>
                          </div>

                          {Alladdressdata?.length > 0 &&
                            Alladdressdata?.map((ele) => (
                              <div
                                className="address-box mt-2"
                                key={ele?.addressId}
                              >
                                <div className="content-left">
                                  <span className="adType ">
                                    {ele?.address_type}
                                  </span>
                                  <span className="adType mx-2">
                                    {ele?.order_for?.toUpperCase()}
                                  </span>
                                  <p className="mt-2">
                                    Deliver to:{" "}
                                    <span>
                                      {ele?.name} {ele?.pincode}
                                    </span>
                                  </p>
                                  <p>
                                    {ele?.address},{ele?.locality},<br />
                                    {ele?.state}-{ele?.pincode}
                                  </p>
                                </div>
                                <div className="content-right">
                                  <div className="form-check">
                                    <Form.Check
                                      type="radio"
                                      aria-label="radio 1"
                                      checked={deliveyAddress?._id === ele?._id}
                                      onChange={() => handleRadioChange(ele)}
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}
                        </Row>
                      </Modal.Body>
                    </Modal>
                  </div>
                </div>
              </div>
              {cartState.isLoading && !cartItems?.products?.length > 0 && (
                <div className="address-box mt-4 flex-column">
                  <Spinner animation="border" />
                </div>
              )}
              {cartItems?.products?.length > 0 &&
                cartItems?.products?.map((item) => (
                  <div
                    className={
                      item?.proId?.available_qty > 0
                        ? "cart-product-box"
                        : "cart-product-box disabledBox"
                    }
                    key={item?._ic}
                  >
                    <button
                      className="btn-close"
                      onClick={() => getRemoveFromCart(item?.proId?._id)}
                    >
                      <img src="assets/images/close.png" alt="" />
                    </button>
                    <div className="img-box">
                      <img
                        src={item?.proId?.specId?.image?.[0]?.image_path}
                        alt="Product"
                      />
                    </div>
                    <div className="content">
                      <div className="category">
                        {item?.proId?.estimateDate && (
                          <div
                            style={{
                              fontSize: "14px",
                              color: "darkgreen",
                              fontWeight: "bold",
                            }}
                          >
                            <span className="mx-2">
                              <TbTruckDelivery size={30} />
                            </span>{" "}
                            Expected Delivery in between{" "}
                            <span className="mx-2">
                              {ExpectedDeliverydata(
                                parseInt(item?.proId?.estimateDate || 0),
                                item?.proId?.updatedAt
                              )}
                            </span>
                          </div>
                        )}
                        <div className="d-flex flex-row w-75 justify-content-between align-items-center">
                          <div>{item?.proId?.productId?.categoryId?.title}</div>
                        </div>
                        <span className="outStockProduct mx-2">
                          {item?.proId?.available_qty < 1 && `out of stock`}{" "}
                        </span>
                      </div>
                      <div className="name">
                        {item?.proId?.productId?.name}{" "}
                        {item?.proId?.specId?.spec_det?.length > 0 && (
                          <span>
                            (
                            {item?.proId?.specId?.spec_det
                              ?.slice(0, 3)
                              ?.map((ele, index, array) => (
                                <span key={index}>
                                  {ele?.value}
                                  {index < array.length - 1 ? ", " : ""}
                                </span>
                              ))}
                            )
                          </span>
                        )}
                      </div>
                      <div className="supplier">
                        Sold by:{" "}
                        {item?.proId?.sellerId?.Shop_Details_Info?.shope_name}
                      </div>
                      <div className="color-qty">
                        <div className="wrap">
                          <label>Quantity:&nbsp; {item?.quantity}</label>
                        </div>
                      </div>
                      <div className="price">
                        ₹{item?.totalPrice?.toLocaleString()}{" "}
                        <span style={{ textDecoration: "line-through" }}>
                          ₹
                          {(
                            item?.proId?.specId?.price * item?.quantity
                          ).toLocaleString()}
                        </span>
                        <span style={{ color: "green" }}>
                          {calculateDiscountPercentage(
                            item?.proId?.specId?.price * item?.quantity,
                            item?.totalPrice
                          ).toFixed(2) +
                            "%" +
                            " Off"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

              {cartItems?.products?.length == 0 && (
                <div className="address-box mt-4 flex-column">
                  <div className="text-center">No items in the cart</div>
                </div>
              )}
            </div>
            {cartItems?.products?.length > 0 && (
              <div className="col-lg-4 right-col mb-4">
                <label className="content-heading">
                  PRICE DETAILS ({cartItems?.products?.length} items)
                </label>
                <ul className="desc-list">
                  <li>
                    <label>Total MRP</label>
                    <label>₹{totalmrp?.toLocaleString()}</label>
                  </li>
                  <li>
                    <label>Discount on MRP</label>
                    <label className="text-green">
                      - ₹{(totalmrp - cartItems?.totalPrice).toLocaleString()}
                    </label>
                  </li>
                  <li>
                    <label>Coupon Discount</label>
                    <label className="text-green">- ₹000</label>
                  </li>
                  <li>
                    <label>Shipping Charges</label>
                    <label>
                      + ₹{cartItems?.total_shipping_price?.toLocaleString()}
                    </label>
                  </li>
                </ul>
                <div className="total-row">
                  <label>Total Amount</label>
                  <label>
                    ₹{cartItems?.overallTotal?.toLocaleString() || 0.0}
                  </label>
                </div>
                {selectedPayment !== "" ? (
                  selectedPayment === "RazorPay" ? (
                    <a className="btn btn-cart" onClick={() => LoginHandler()}>
                      Login to Continue With Razorpay
                    </a>
                  ) : (
                    <a className="btn btn-cart" onClick={() => LoginHandler()}>
                      Login to Place Order
                    </a>
                  )
                ) : (
                  <div className="total-row text-center mt-2">
                    {" "}
                    <label>Select Any Payment Option</label>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
