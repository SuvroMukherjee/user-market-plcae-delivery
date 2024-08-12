import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userLoginSendOtp } from "../../Api/api";
import loginbg from "../../assets/images/loginbg.png";
import Regsiter from "./Register";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setLoading } from "../../store/loadingSlice";
import { useDispatch } from "react-redux";
import zoofiLogo from "../../assets/images/logo-new.png";

const Login = () => {
  const [isRegisterClick, setIsRegisterClick] = useState(false);
  const [formData, setFormData] = useState({
    user: "",
  });
  const [isMobileNoValid, setMobileNoValid] = useState(true);

  const dispatch = useDispatch();

  /* Loading State start */
  const loadingState = useSelector((state) => state.loading.loadingState);
  const loadingMessage = useSelector((state) => state.loading.message);
  let loadingToastId = useRef(null);

  useEffect(() => {
    if (loadingState) {
      loadingToastId.current = toast.info(loadingMessage, {
        autoClose: false,
      });
    }

    if (!loadingState) {
      if (loadingToastId.current) {
        toast.dismiss(loadingToastId.current);
      }
    }
  }, [loadingMessage, loadingState]);
  /* Loading State start */

  const navigate = useNavigate();

  function isNumeric(str) {
    // This regular expression checks if the string contains only digits
    return /^\d+$/.test(str);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Validate mobile number using regex
    // if (isNumeric(value)) {
    //   const isValid = /^[0-9]{10}$/.test(value);
    //   setMobileNoValid(isValid);
    // }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isNumeric(formData?.user)) {
      const isValid = /^[0-9]{10}$/.test(formData?.user);
      if (!isValid) {
        toast.error(" Please enter a valid 10-digit mobile number.");
        return;
      }
      //  setMobileNoValid(isValid);
    }
    try {
      dispatch(
        setLoading({
          state: true,
          message: "Sending OTP...",
        })
      );
      console.log({ formData });
      let response = await userLoginSendOtp(formData);
      console.log(response);
      if (response?.data?.error) {
        toast.error(response?.data?.message);
        setIsRegisterClick(true);
      } else {
        await demoLogin();
      }
    } catch (error) {
      console.error("Error occurred while sending OTP: ", error);
    } finally {
      dispatch(
        setLoading({
          state: false,
          message: "",
        })
      );
    }
  };

  const demoLogin = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        navigate(`/otp-verfication/${formData?.user}`);
        toast.success("Enter the OTP sent to your mobile number.");
        resolve();
      }, 3000);
    });
  };

  const toggleStep = () => {
    setIsRegisterClick(!isRegisterClick);
  };

  return (
    <>
      {/* <section className='login'>
        <div className='container'>
          <div className='backImg'>
            <img src={back} alt='' />
            <div className='text'>
              <h3>Login</h3>
              <h1>My ACcount</h1>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <span>Username or Email address</span>
            <input type='text' required />
            <span>Password * </span>
            <input type='password' required />
            <button className='button'>Log in </button>
          </form>
        </div>
      </section> */}
      <div className="page-content">
        <div className="login-content">
          <div className="row g-0">
            <div className="col-lg-6 col-12">
              <div className="img-wrap">
                <img src={loginbg} alt="" />
              </div>
            </div>
            <div className="col-lg-6 col-12">
              <div className="content-wrap">
                {!isRegisterClick ? (
                  <div className="content">
                    <div className="mb-3">
                      <img src={zoofiLogo} alt="ZooffiLogo" width={"150px"} />
                    </div>
                    <h2>Log in / Sign up</h2>
                    <p>For new arrivals, exciting offers and everything</p>
                    <form onSubmit={handleSubmit}>
                      <input
                        type="tel"
                        className={`form-control ${
                          !isMobileNoValid ? "is-invalid" : ""
                        }`}
                        name="user"
                        placeholder="Enter your phone number/email address"
                        onChange={handleChange}
                        // pattern="[0-9]{10}" // Regex for a 10-digit number
                        required
                      />
                      {/* {!(isMobileNoValid &&
                        formData?.user != "") && (
                          <div className="invalid-feedback mb-2">
                            Please enter a valid 10-digit mobile number.
                          </div>
                        )} */}
                      <button
                        // disabled={!isMobileNoValid || loadingState}
                        type="submit"
                        className="btn btn-login"
                      >
                        {loadingState ? loadingMessage : "Log in"}
                      </button>
                    </form>
                    <div className="other-links">
                      Don’t have an account?{" "}
                      <a className="authChange" onClick={() => toggleStep()}>
                        Register Now
                      </a>
                    </div>
                  </div>
                ) : (
                  <Regsiter toggleStep={toggleStep} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
