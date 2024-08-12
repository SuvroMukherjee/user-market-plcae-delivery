import React, { useState } from "react";
import { createRazorPayOrder, RazorPaySuccess } from "../../Api/api";
import blackzofi from "../../assets/images/blackzofi.png";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { SiRazorpay } from "react-icons/si";
import { Spinner } from "react-bootstrap";

const RazorPay = ({ CartAmount, cartId, productPlaceWithRazorPay }) => {
  const { userdata } = useSelector((state) => state?.auth);
  const [payloading, setPayloading] = useState(false);

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay() {
    setPayloading(true);
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    // creating a new order
    const result = await createRazorPayOrder({
      amount: CartAmount,
      receipt: cartId,
    });

    if (!result) {
      alert("Server error. Are you online?");
      setPayloading(false);
      return;
    }

    // Getting the order details back
    const { amount, id: order_id, currency } = result.data;

    const options = {
      key: "rzp_test_EengNXHJprOxwB", // Enter the Key ID generated from the Dashboard
      amount: result?.data?.amount?.toString(),
      currency: currency,
      name: `Zoofi`,
      description: "Zoofi",
      image: blackzofi,
      order_id: result?.data?.order_id,
      handler: async function (response) {
        console.log({ response });
        const data = {
          // orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        console.log({ data });

        const result = await RazorPaySuccess(data);
        if (result?.data?.msg) {
          productPlaceWithRazorPay(data?.razorpayPaymentId);
          setTimeout(() => {
            toast.success("Payment successfully");
            setPayloading(false);
          }, 1500);
        } else {
          setPayloading(true);
          toast.error("Payment failed");
        }
      },
      prefill: {
        name: `${userdata?.name}`,
        email: `${userdata?.email}`,
        contact: `${userdata?.phone_no}`,
      },
      // notes: {
      //   address: "Soumya Dey Corporate Office",
      // },
      theme: {
        color: "#9af064",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return (
    <div>
      <a
        className="btn btn-cart d-flex align-items-center justify-content-center"
        onClick={displayRazorpay}
      >
        {!payloading ? (
          <>
            Complete Payment
            <span className="mx-2">
              {/* <SiRazorpay color="sky"/> */}
              <img
                src="https://w7.pngwing.com/pngs/88/578/png-transparent-razorpay-logo-thumbnail-tech-companies-thumbnail.png"
                alt="razorpay"
                className="rzor"
                width={20}
              />
            </span>
          </>
        ) : (
          <Spinner />
        )}
      </a>
    </div>
  );
};

export default RazorPay;
