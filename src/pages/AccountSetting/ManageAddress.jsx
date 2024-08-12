import { useEffect, useState } from "react";
import { Button, Col, Container, Form, ListGroup, Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { FaEdit, FaPlus } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  AddAddress,
  Deladdress,
  EditAddress,
  getLocationByZipCoder,
  getUserAddress,
  getallstates,
} from "../../Api/api";
import SideLayout from "./SideLayout";
import { toast } from "react-toastify";
import { fetchAddress } from "../../store/addressSlice";


const ManageAddress = () => {
  const [otherAddress, setOtherAddress] = useState();
  const [show, setShow] = useState(false);
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
  const [statesList, setStatesList] = useState();
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => setShowModal(false);
  const handleShow = (addressData) => {
    setShowModal(true);
    setFormData(addressData);
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
    console.log(res?.data?.results?.[id]?.[0], "resloca");
    let populateData = res?.data?.results?.[id]?.[0];
    setFormData((prevData) => ({
      ...prevData,
      ["city"]: populateData?.city,
      ["state"]: populateData?.state_en,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    formData["cutomerId"] = userdata?._id;

    console.log(formData);

    let res = await AddAddress(formData);
    console.log(res);
    if(res?.data?.error == false) {
      getOtherAddress();
    toast.success('Address Added successfully');
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
    })
    handleClose();
    }
    else{
      toast.error(res?.data?.message)
    }
     dispatch(fetchAddress());
  };

  const { userdata } = useSelector((state) => state?.auth);

  useEffect(() => {
    getOtherAddress();
    totalstate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalstate = async () => {
    let res = await getallstates();
    console.log(res);
    setStatesList(res?.data?.data?.states);
  };

  const getOtherAddress = async () => {
    let res = await getUserAddress(userdata?._id);

    console.log(res?.data?.data);
    setOtherAddress(res?.data?.data);
  };

  const deleteAddress = async (id) => {
  const res = await Deladdress(id);
    if(res?.data?.error == false){
      toast.success('Address Deleted successfully')
      getOtherAddress();
      dispatch(fetchAddress());
    }
    else{
      toast.error(res?.data?.message)
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    formData["cutomerId"] = userdata?._id;

    console.log(formData);

    let res = await EditAddress(formData?._id, formData);

    console.log(res);
    getOtherAddress();
    dispatch(fetchAddress());
    handleClose();
  };

  return (
    <div>
      <Container className="mt-4 mb-4 p-4">
        <Row>
          <Col xl={3} lg={4}>
            <SideLayout />
          </Col>
          <Col xl={9} lg={8}>
            <div className="address-block">
              <Row>
                <Col>
                  <div className="add-address-block">
                    <ListGroup>
                      <ListGroup.Item onClick={() => setShow(!show)}>
                        <FaPlus />
                        <span>Add Address</span>
                      </ListGroup.Item>
                    </ListGroup>

                    {show && (
                      <Form onSubmit={handleSubmit}>
                        <Col>
                          <Row className="mt-5">
                            <Col>
                              <Form.Group>
                                <Form.Control
                                  type="text"
                                  name="name"
                                  placeholder="Name"
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
                                  placeholder="Address"
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
                                      <option key={index} value={ele?.name}>
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
                                    checked={formData.address_type === "home"}
                                    onChange={handleChange}
                                    required
                                  />
                                  <Form.Check
                                    type="radio"
                                    label="Work"
                                    value="work"
                                    name="address_type"
                                    checked={formData.address_type === "work"}
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
                                    checked={formData.order_for === "self"}
                                    onChange={handleChange}
                                    required
                                  />
                                  <Form.Check
                                    type="radio"
                                    label="Someone Else"
                                    value="someone"
                                    name="order_for"
                                    checked={formData.order_for === "someone"}
                                    onChange={handleChange}
                                    required
                                  />
                                </div>
                              </Form.Group>
                            </Col>
                          </Row>
                          <Button type="submit">Save Address</Button>
                        </Col>
                      </Form>
                    )}
                  </div>
                </Col>
              </Row>

              <Row className="mt-4">
                <Col>
                  <ListGroup>
                    {otherAddress?.length > 0 &&
                      otherAddress?.map((ele, index) => (
                        <ListGroup.Item key={index} className="mt-4">
                          <Row>
                            <Col>
                              <Row>
                                <Col xs={8}>
                                  <span className="adType">
                                    {ele?.address_type?.toUpperCase()}
                                  </span>
                                  <span className="adType mx-2">
                                    {ele?.order_for?.toUpperCase()}
                                  </span>
                                </Col>
                                <Col xs={2}>
                                  <MdCancel
                                    size={25}
                                    onClick={() => deleteAddress(ele?._id)}
                                  />
                                </Col>
                                <Col xs={2} onClick={() => handleShow(ele)}>
                                  <FaEdit size={25} />
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                          <Row>
                            <Col className="adType2 mt-3">
                              {ele?.name} : {ele?.ph_no}
                            </Col>
                          </Row>
                          <Row className="mt-2">
                            <Col sx={10}>
                              {ele?.address},{ele?.locality},{ele?.state}-
                              {ele?.pincode}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      ))}
                  </ListGroup>
                </Col>
              </Row>
              <Row>
                <Modal
                  show={showModal}
                  onHide={handleClose}
                  className="edit-address-modal"
                >
                  <Modal.Body>
                    <Form onSubmit={handleEditSubmit}>
                      <Col>
                        <h6>Edit Your Address</h6>
                      </Col>
                      <Col>
                        <Row className="mt-3">
                          <Col>
                            <Form.Group>
                              <Form.Control
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleChange}
                              />
                            </Form.Group>
                          </Col>
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
                        </Row>
                        <Row className="mt-3">
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
                          <Col>
                            <Form.Group>
                              <Form.Control
                                type="text"
                                name="locality"
                                placeholder="locality"
                                value={formData.locality}
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
                                placeholder="Address"
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
                                    <option key={index} value={ele?.name}>
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
                                type="phone"
                                name="alterphone"
                                placeholder="Alternative phone"
                                value={formData.alterphone}
                                onChange={handleChange}
                              />
                            </Form.Group>
                          </Col>
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
                                  checked={formData.address_type === "home"}
                                  onChange={handleChange}
                                  required
                                />
                                <Form.Check
                                  type="radio"
                                  label="Work"
                                  value="work"
                                  name="address_type"
                                  checked={formData.address_type === "work"}
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
                                  checked={formData.order_for === "self"}
                                  onChange={handleChange}
                                  required
                                />
                                <Form.Check
                                  type="radio"
                                  label="Someone Else"
                                  value="someone"
                                  name="order_for"
                                  checked={formData.order_for === "someone"}
                                  onChange={handleChange}
                                  required
                                />
                              </div>
                            </Form.Group>
                          </Col>
                        </Row>
                        <Button variant="dark" type="submit">
                          Edit Address
                        </Button>
                      </Col>
                    </Form>
                  </Modal.Body>
                </Modal>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ManageAddress;

