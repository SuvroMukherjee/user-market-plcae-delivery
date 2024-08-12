import moment from "moment";
import { useEffect, useRef, useState } from "react";
import {
  Button,
  Col,
  Form,
  ListGroup,
  Modal,
  Row,
  Spinner,
} from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  CartRemove,
  getallstates,
  getDistance,
  orderPaymentUpdate,
  PlaceOrder,
} from "../../Api/api";
import { ExpectedDeliverydata } from "../../assets/common/dateformat";
import addressSlice, { fetchAddress } from "../../store/addressSlice";
import {
  allCartItems,
  fetchCartLists,
  tempCartItems,
  tempRemoveItemFromCart,
} from "../../store/cartSlice";
import { setLoading } from "../../store/loadingSlice";
import RazorPay from "../PaymentGateway/RazorPay";
import closeIcon from "../../assets/images/close.png";

export const ProductCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItemsData = useSelector(allCartItems);
  const tempCartItemsData = useSelector(tempCartItems);
  const cartState = useSelector((state) => state.cart);
  const [modalshow, setModalShow] = useState(false);
  const [statesList, setStatesList] = useState();
  const [pinSearchResult, setPinSearchResult] = useState([]);

  const isLoggIn = useSelector((state) => state.auth.isLoggIn);

  let cartItems;

  if (isLoggIn) {
    cartItems = cartItemsData;
  } else {
    cartItems = tempCartItemsData;
  }

  const loadingState = useSelector((state) => state.loading.loadingState);
  const loadingMessage = useSelector((state) => state.loading.message);
  let loadingToastId = useRef(null);

  const [selectedPayment, setSelectedPayment] = useState("");
  const [show, setShow] = useState(false);
  const [openRezorpay, setRezorPay] = useState(false);
  const [placeLoading, setPlaceLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { data: Alladdressdata, deliveyAddress } = useSelector(
    (state) => state?.address
  );

  const { userdata } = useSelector((state) => state?.auth);

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    ph_no: "",
    pincode: "",
    locality: "",
    address: "",
    city: "",
    state: "",
    landmark: "",
    alterphone: "",
    address_type: "home",
    order_for: "self",
  });

  const handleRadioChange = (addressId) => {
    dispatch(addressSlice.actions.updateDeliveryAddress(addressId));
    //setSelectedAddress(addressId);
  };

  const handlePaymentChange = (event) => {
    setSelectedPayment(event.target.value);
  };

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
    totalstate();
  }, []);

  const totalstate = async () => {
    let res = await getallstates();
    // console.log(res);
    setStatesList(res?.data?.data?.states);
  };

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

  const getPincodeDistance = async (productId, Sellercode, deliveryCode) => {
    try {
      const data = await getDistance(Sellercode, deliveryCode);
      console.log(data, "data");
      return {
        productId,
        distance: data?.results?.[deliveryCode],
        isable:
          data?.results?.[deliveryCode] !== null &&
          data?.results?.[deliveryCode] < 500,
      };
    } catch (error) {
      console.error("Error:", error);
      return { productId, distance: null, error: true };
    }
  };

const checkOrderDeliverity = async (userAddress, products) => {
  const allSellerPincodes = products.map(
    (ele) => ele?.proId?.sellerId?.Shop_Details_Info?.pin_code
  );

  const data = await getDistance(
    userAddress?.pincode,
    allSellerPincodes.join(",")
  );

  const comparePins = data?.query?.compare;
  const resultDistances = data?.results;

  const distanceResult = products.map((ele) => {
    const pinCode = ele?.proId?.sellerId?.Shop_Details_Info?.pin_code;
    const matchingPin = comparePins.find((item) => item === pinCode);
    const distance = resultDistances?.[matchingPin];

    return {
      productId: ele?.proId?._id,
      distance,
      isable: distance !== null && distance < 500,
    };
  });

  setPinSearchResult(distanceResult);

  return distanceResult.every((product) => product?.isable === true);
};


  const productPlace = async () => {
    setPlaceLoading(true);
    if (!isLoggIn) {
      navigate("/login");
      return;
    }

    let allAvl = cartItems?.products?.find((ele) => {
      return ele?.proId?.available_qty < 1;
    });

    if (allAvl) {
      toast.error(`${allAvl?.proId?.name} is out of stock`);
      setPlaceLoading(false);
    } else {
      let result = await checkOrderDeliverity(
        deliveyAddress,
        cartItems?.products
      );

      if (result == false) {
        toast.error(
          `Sorry ! This Order cannot is not able to delivery at this ${deliveyAddress?.pincode} pincode location`
        );
        setPlaceLoading(false);
      } else {
        let payload = {
          addressId: deliveyAddress,
          order_type: selectedPayment == "cash" ? "COD" : "Online",
          type: "cart",
        };
        let res = await PlaceOrder(payload);
        if (res?.data?.error == false) {
          dispatch(fetchCartLists());
          toast.success("order placed successfully");
          setPlaceLoading(false);
          setTimeout(() => {
            navigate("/user/orderlist");
          }, 1500);
        }
      }
    }
  };

  const productPlaceWithRazorPay = async (razorPaymentId) => {
    let allAvl = cartItems?.products?.find((ele) => {
      return ele?.proId?.available_qty < 1;
    });

    if (allAvl) {
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
    const date = moment(dateString);
    const newDate = date.add(2, "days");
    return newDate.format("YYYY-MM-DDTHH:mm:ss.SSSZ");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name == "pincode") {
      if (value?.length > 5) {
        locationData(value);
      }
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const locationData = async (id) => {
    let res = await getLocationByZipCoder(id);
    // console.log(res?.data?.results?.[id]?.[0], "resloca");
    let populateData = res?.data?.results?.[id]?.[0];
    setFormData((prevData) => ({
      ...prevData,
      ["city"]: populateData?.city,
      ["state"]: populateData?.state_en,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Form submitted:", formData);

    formData["cutomerId"] = userdata?._id;

    // console.log(formData);

    let res = await AddAddress(formData);
    console.log(res);
    if (res?.data?.error == false) {
      dispatch(fetchAddress());
      toast.success("Address Added successfully");
      setShow(false);
      setFormData({
        name: "",
        ph_no: "",
        pincode: "",
        locality: "",
        address: "",
        city: "",
        state: "",
        landmark: "",
        alterphone: "",
        address_type: "home",
        order_for: "self",
      });
      handleClose();
      setModalShow(false);
    } else {
      toast.error(res?.data?.message);
    }
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
                <div className="content-right" onClick={() => handleShow()}>
                  <a className="btn btn-address">
                    {deliveyAddress ? "Change Address " : "Choose Address"}
                  </a>
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
                  <Row>
                    {/* {selectedPayment == "RazorPay" && (
                      <RazorPay
                        CartAmount={cartState?.data?.overallTotal}
                        cartId={cartState?.data?._id}
                      />
                    )} */}
                  </Row>
                  <div>
                    <Modal show={show} onHide={handleClose}>
                      {/* <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                      </Modal.Header> */}
                      <Modal.Body className="cart-content p-4">
                        <Row className="mb-2">
                          <Col className="seelctAddress">
                            Select delivery Address
                          </Col>
                          <button
                            className="btn-close"
                            onClick={() => handleClose()}
                          >
                            <img src={closeIcon} alt="colseIcon" />
                          </button>
                        </Row>
                        <Row>
                          <div
                            className="address-box"
                            // onClick={() => {
                            //   navigate("/user/manageaddress");
                            // }}
                          >
                            <div
                              className="content-left"
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "10px",
                                cursor: "pointer",
                              }}
                              onClick={() => setModalShow(!modalshow)}
                            >
                              <FaPlus />
                              <span>Add New Address</span>
                            </div>
                          </div>

                          {modalshow && (
                            <Form onSubmit={handleSubmit}>
                              <Col>
                                <Row className="mt-3">
                                  <Col>
                                    <Form.Group>
                                      <Form.Control
                                        type="text"
                                        name="name"
                                        placeholder="Enter Your Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                      />
                                    </Form.Group>
                                  </Col>
                                </Row>
                                <Row className="mt-3">
                                  <Col>
                                    <Form.Group>
                                      <Form.Control
                                        as="textarea"
                                        rows={3}
                                        name="address"
                                        placeholder="Enter Address"
                                        value={formData.address}
                                        onChange={handleChange}
                                      />
                                    </Form.Group>
                                  </Col>
                                </Row>
                                <Row className="mt-3">
                                  <Col>
                                    <Form.Group>
                                      <Form.Control
                                        type="text"
                                        name="landmark"
                                        placeholder="landmark"
                                        value={formData.landmark}
                                        onChange={handleChange}
                                      />
                                    </Form.Group>
                                  </Col>
                                  <Col>
                                    <Form.Group>
                                      <Form.Control
                                        type="text"
                                        name="pincode"
                                        placeholder="pincode"
                                        value={formData.pincode}
                                        onChange={handleChange}
                                      />
                                    </Form.Group>
                                  </Col>
                                </Row>
                                <Row className="mt-3">
                                  <Col>
                                    <Form.Group>
                                      <Form.Control
                                        type="text"
                                        name="city"
                                        placeholder="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                      />
                                    </Form.Group>
                                  </Col>
                                  <Col>
                                    <Form.Group>
                                      <Form.Select
                                        name="state"
                                        placeholder="Select State"
                                        value={formData.state}
                                        onChange={handleChange}
                                      >
                                        <option value="" disabled>
                                          Select State
                                        </option>
                                        {statesList?.length > 0 &&
                                          statesList?.map((ele, index) => (
                                            <option
                                              key={index}
                                              value={ele?.name}
                                            >
                                              {ele?.name}
                                            </option>
                                          ))}
                                      </Form.Select>
                                    </Form.Group>
                                  </Col>
                                </Row>
                                <Row className="mt-3">
                                  <Col>
                                    <Form.Group>
                                      <Form.Control
                                        type="phone"
                                        name="ph_no"
                                        placeholder="10 digit phone number"
                                        value={formData.ph_no}
                                        onChange={handleChange}
                                      />
                                    </Form.Group>
                                  </Col>
                                  <Col>
                                    <Form.Group>
                                      <Form.Control
                                        type="phone"
                                        name="alterphone"
                                        placeholder="Alternate number"
                                        value={formData?.alterphone}
                                        onChange={handleChange}
                                      />
                                    </Form.Group>
                                  </Col>
                                  {/* <Col>
                                    <Form.Group>
                                      <Form.Control
                                        type="text"
                                        name="locality"
                                        placeholder="locality"
                                        value={formData.locality}
                                        onChange={handleChange}
                                      />
                                    </Form.Group>
                                  </Col> */}
                                </Row>
                                <Row className="mt-3">
                                  <Col>
                                    <Form.Group className="mb-3">
                                      <Form.Label>Address Type</Form.Label>
                                      <div className="form-check-wrapper">
                                        <Form.Check
                                          type="radio"
                                          label="Home"
                                          value="home"
                                          name="address_type"
                                          checked={
                                            formData.address_type === "home"
                                          }
                                          onChange={handleChange}
                                          required
                                        />
                                        <Form.Check
                                          type="radio"
                                          label="Work"
                                          value="work"
                                          name="address_type"
                                          checked={
                                            formData.address_type === "work"
                                          }
                                          onChange={handleChange}
                                          required
                                        />
                                      </div>
                                    </Form.Group>
                                  </Col>
                                  <Col>
                                    <Form.Group className="mb-3">
                                      <Form.Label>Order For</Form.Label>
                                      <div className="form-check-wrapper">
                                        <Form.Check
                                          type="radio"
                                          label="Self"
                                          value="self"
                                          name="order_for"
                                          checked={
                                            formData.order_for === "self"
                                          }
                                          onChange={handleChange}
                                          required
                                        />
                                        <Form.Check
                                          type="radio"
                                          label="Someone Else"
                                          value="someone"
                                          name="order_for"
                                          checked={
                                            formData.order_for === "someone"
                                          }
                                          onChange={handleChange}
                                          required
                                        />
                                      </div>
                                    </Form.Group>
                                  </Col>
                                </Row>
                                <Button
                                  style={{
                                    fontSize: "12px",
                                    fontWeight: 500,
                                    color: "#9af064",
                                    lineHeight: "16px",
                                    padding: "8px 30px",
                                    cursor: "pointer",
                                    borderRadius: "30px",
                                    background: "#000",
                                    boxShadow: "none",
                                    outline: "none",
                                    border: "none",
                                  }}
                                  type="submit"
                                >
                                  Save Address
                                </Button>
                              </Col>
                            </Form>
                          )}

                          {Alladdressdata?.length > 0 &&
                            Alladdressdata?.map((ele) => (
                              <div
                                className="address-box mt-3"
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
                      {/* <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                          Save Changes
                        </Button>
                      </Modal.Footer> */}
                    </Modal>
                  </div>
                </div>
              </div>
              {cartState.isLoading && !cartItems?.products?.length > 0 && (
                <div className="address-box mt-4 flex-column">
                  <Spinner animation="border" />
                </div>
              )}
              {/* cart items */}
              {cartItems?.products?.length > 0 &&
                cartItems?.products?.map((item, index) => (
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
                        src={item?.proId?.specId?.image[0]?.image_path}
                        alt="Product"
                      />
                    </div>
                    <div className="content">
                      <div className="category">
                        {pinSearchResult?.length > 0 &&
                          (pinSearchResult[index]?.isable ? (
                            <p></p>
                          ) : (
                            <p className="cannotDelivery">
                              We apologise, but the item cannot be delivered to
                              this pincode address, {deliveyAddress?.pincode}.
                            </p>
                          ))}
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
                        {/* {item?.proId?.productId?.brandId?.title}{" "} */}
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
                      {/* <div className="supplier">
                        Stock: {item?.proId?.available_qty}
                        {console.log({ item })}
                      </div> */}
                      <div className="color-qty">
                        {/* <div className="wrap">
                        <label>Color:&nbsp;</label>
                        <select>
                          <option value="" selected="">
                            White with gold
                          </option>
                        </select>
                      </div> */}
                        <div className="wrap">
                          <label>Quantity:&nbsp; {item?.quantity}</label>
                          {/* <select>
                          <option value="" selected="">
                            {item?.quantity}
                          </option>
                        </select> */}
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

              {!cartState.isLoading && cartItems?.products?.length == 0 && (
                <div className="address-box mt-4 flex-column">
                  <div className="text-center">No items in the cart</div>
                </div>
              )}

              {!cartState.isLoading && !cartItems?.products && (
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
                    <RazorPay
                      CartAmount={cartState?.data?.overallTotal}
                      cartId={cartState?.data?._id}
                      productPlaceWithRazorPay={productPlaceWithRazorPay}
                    />
                  ) : (
                    <a className="btn btn-cart" onClick={() => productPlace()}>
                      {placeLoading ? (
                        <Spinner animation="border" />
                      ) : (
                        "Place Order"
                      )}
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
