import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userRegistration } from "../../Api/api";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../store/loadingSlice";
import { useEffect, useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
import emailverify from "../../assets/images/emailverify.png";

const Regsiter = ({ toggleStep }) => {
  // const navigate = useNavigate();

  const dispatch = useDispatch();

  /* Loading State start */
  const loadingState = useSelector((state) => state.loading.loadingState);
  const loadingMessage = useSelector((state) => state.loading.message);
  let loadingToastId = useRef(null);


  const [openVerify,setOpenVerify] = useState(false)

  useEffect(() => {}, []);

  useEffect(() => {
    if (!loadingState) {
      if (loadingToastId.current) {
        toast.dismiss(loadingToastId.current);
      }
    }
  }, [loadingMessage, loadingState]);
  /* Loading State start */

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_no: "",
  });

  const [isFormValid, setFormValid] = useState({
    name: true,
    email: true,
    phone_no: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validate fields using regex
    const validationRules = {
      name: /^[a-zA-Z\s]+$/,
      email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      phone_no: /^[0-9]{10}$/,
    };

    setFormValid({
      ...isFormValid,
      [name]: validationRules[name].test(value),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);
    try {
      dispatch(
        setLoading({
          state: true,
          message: "Registering user...",
        })
      );
      let res = await userRegistration(formData);
      if (res?.response?.data?.error) {
        toast.error(res?.response?.data?.message);
      } else {
        //await demoRegister();
        setOpenVerify(true);
      }
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

  const demoRegister = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        toggleStep();
      }, 3000);
      resolve();
    });
  };

  return (
    <>
      {!openVerify ? (
        <div className="content">
          <h2>Sign up</h2>
          <p>for new arrivals, exciting offers and everything</p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className={`form-control ${
                !isFormValid.name ? "is-invalid" : ""
              }`}
              name="name"
              placeholder="Enter your full name"
              onChange={handleChange}
              required
            />
            {!isFormValid.username && (
              <div className="invalid-feedback mb-2">
                Please enter a valid full name (only letters and spaces).
              </div>
            )}

            <input
              type="email"
              className={`form-control ${
                !isFormValid.email ? "is-invalid" : ""
              }`}
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              required
            />
            {!isFormValid.email && (
              <div className="invalid-feedback mb-2">
                Please enter a valid email address.
              </div>
            )}

            <input
              type="number"
              className={`form-control ${
                !isFormValid.phone_no ? "is-invalid" : ""
              }`}
              name="phone_no"
              placeholder="Enter your phone number"
              onChange={handleChange}
              pattern="[0-9]{10}" // Regex for a 10-digit number
              required
            />
            {!isFormValid.phoneNo && (
              <div className="invalid-feedback mb-2">
                Please enter a valid 10-digit phone number.
              </div>
            )}

            <button
              disabled={
                !isFormValid.name ||
                !isFormValid.email ||
                !isFormValid.phone_no ||
                loadingState
              }
              type="submit"
              className="btn btn-login"
            >
              {loadingState ? loadingMessage : "Sign up"}
            </button>
          </form>
          <div className="other-links">
            Already have an account?{" "}
            <a className="authChange" onClick={() => toggleStep()}>
              Login
            </a>
          </div>
        </div>
      ) : (
        <div className="content">
          <ConfrimVerification formData={formData} />
        </div>
      )}
    </>
  );
};

const ConfrimVerification = ({ formData }) => {
  return (
    <Container>
      <Row>
        <Col xs={12}>
          <div className="mb-3">
            <img src={emailverify} alt="ZooffiLogo"  />
          </div>
        </Col>
        <Col xs={12} className="other-links">
          <h2>Verify Your Email</h2>
        </Col>
        <Col xs={12} className="other-links" style={{fontSize:'18px'}}>
          We have sent an email to your {formData?.email} registered mail
          address to verify your email address and active your account
        </Col>
      </Row>
    </Container>
  );
};

export default Regsiter;
