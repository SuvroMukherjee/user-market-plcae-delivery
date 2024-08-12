import { useState } from "react";
import OtpInput from "react-otp-input";
import loginbg from "../../assets/images/loginbg.png";
import { useParams, useNavigate } from "react-router-dom";
import { AddTempCartData, productReadyBuy, userVerifyOtp } from "../../Api/api";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";
import { toast } from "react-toastify";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { setLoading } from "../../store/loadingSlice";
import zoofiLogo from "../../assets/images/logo-new.png";
import { tempRemoveItem } from "../../store/temporarycartSlice";
import {
  fetchCartLists,
  tempCartItems,
  tempRemoveAllItemsFromCart,
} from "../../store/cartSlice";
import { fetchBuyLists, removeAllBuyitems, tempBuyItems } from "../../store/buyNowSlice";

const OtpComp = () => {
  /* Loading State start */
  const loadingState = useSelector((state) => state.loading.loadingState);
  const loadingMessage = useSelector((state) => state.loading.message);
  let loadingToastId = useRef(null);

  const TempcartItems = useSelector((state) => state?.tempCart);
  const tempCartItemsData = useSelector(tempCartItems);

  const tempBuyItemsData = useSelector(tempBuyItems);

  const { isLoggIn, userdata } = useSelector((state) => state?.auth);

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

  const [otp, setOtp] = useState("");

  const { id: PhoneNo } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleOtp = async () => {
    let payload = {
      user: PhoneNo,
      otp: otp,
    };
    try {
      dispatch(
        setLoading({
          state: true,
          message: "Validating Otp in...",
        })
      );

      let res = await userVerifyOtp(payload);

      // console.log(res);

      if (res?.data?.error) {
        toast.error(res?.data?.message);
      } else {
        localStorage.setItem(
          "accessToken",
          JSON.stringify(res?.data?.data?.accessToken)
        );
        localStorage.setItem("user_pincode", res?.data?.data?.pin_code);
        dispatch(authActions.login(res.data.data));
        tempCartUploadHandler();
      }
    } catch (error) {
      console.error(error);
      toast.dismiss();
      toast.error("Something went wrong");
    } finally {
      dispatch(
        setLoading({
          state: false,
          message: "",
        })
      );
    }
  };

  const tempCartUploadHandler = async () => {
    if (tempCartItemsData?.products?.length > 0) {
      const products = tempCartItemsData?.products.map((item) => {
        return {
          proId: item?.proId?._id,
          quantity: item?.quantity,
        };
      });

      let payload = {
        products,
      };
      let res = await AddTempCartData(payload);
      console.log(res);
      if (res?.data?.error == false) {
        dispatch(tempRemoveAllItemsFromCart());
        dispatch(fetchCartLists());
      }
    }

    if (tempBuyItemsData) {
      console.log(tempBuyItemsData, "tempBuyItemsData");
      let payload = {
        proId: tempBuyItemsData?.proId?._id,
        quantity: tempBuyItemsData?.quantity,
      };

      let res = await productReadyBuy(payload, true);
       if (res?.data?.error == false) {
         dispatch(removeAllBuyitems());
         dispatch(fetchBuyLists());
       }
    }
    await demoOtpVerificationWait();
  };

  const demoOtpVerificationWait = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        navigate(-2);
        toast.success("Login Successful");
      }, 2000);
      resolve();
    });
  };

  return (
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
              <div className="content">
                <div className="mb-3">
                  <img src={zoofiLogo} alt="ZooffiLogo" width={"150px"} />
                </div>
                <h2>Enter Verification Code</h2>
                <p>
                  We have sent you an sms with a code to{" "}
                  <span style={{ color: "#000" }}>
                    <bold>{PhoneNo}</bold>
                  </span>
                </p>
                <div>
                  <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={4}
                    renderSeparator={<span>-</span>}
                    renderInput={(props) => <input {...props} />}
                    containerStyle="otp-input-container" // Add your custom style class
                    inputStyle="otp-input" // Add your custom style class
                  />
                </div>
                <button
                  type="submit"
                  onClick={() => handleOtp()}
                  className="btn btn-login"
                  disabled={loadingState}
                >
                  {loadingState ? loadingMessage : "Verify OTP"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpComp;
