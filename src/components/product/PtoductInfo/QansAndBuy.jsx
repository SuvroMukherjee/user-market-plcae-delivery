import React from "react";
import { useNavigate } from "react-router-dom";
import minus from "../../../assets/images/minus.png";
import plus from "../../../assets/images/plus.png";
import { toast } from "react-toastify";
import { productReadyBuy, productTocart } from "../../../Api/api";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartLists, tempAddItemToCart } from "../../../store/cartSlice";
import { tempAddItem } from "../../../store/temporarycartSlice";
import { fetchBuyLists, tempAddItemToBuy } from "../../../store/buyNowSlice";
import { setLoading } from "../../../store/loadingSlice";


const QansAndBuy = ({
  quans,
  setquans,
  isAlreadycart,
  stock,
  isDelivertStatus,
  checkDeisableClick,
  ProductId,
  productDes,
}) => {
 
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const isLoggIn = useSelector((state) => state.auth.isLoggIn);

  const BuyNowHandler = () => {
    if (stock?.productId?.available_qty <= 0) {
      toast.error("Sorry, this item is out of stock.");
    } else if (stock?.productId?.available_qty < quans) {
      toast.error(
        `You can purchase a maximum of ${stock?.productId?.available_qty} units of this item.`
      );
    } else {
      toast.success("Item is available. You can proceed to buy now.");
      buyNowHandler(ProductId, quans);
    }
  };

  const buyNowHandler = async (ProductId, quans = 1) => {
    if (isLoggIn == false) {
       handleAddTempBuy(productDes, quans);
      return;
    }

    try {
      dispatch(
        setLoading({
          state: true,
          message: "Adding Item To buy...",
        })
      );
      let payload = {
        proId: ProductId,
        quantity: quans,
      };

      let res = await productReadyBuy(payload, isLoggIn);
      if (res?.response?.data?.error) {
        toast.error(res?.response?.data?.msg || "Something went wrong");
      } else {
        dispatch(fetchBuyLists());
        toast.success("Product ready to buy");
        setTimeout(() => {
          navigate("/product-buynow");
        }, 1000);
      }
    } catch (error) {
      console.error(error);
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


    const handleAddTempBuy = async (ele, quans) => {
      let payload = {
        proId: ele,
        quantity: quans,
        prodPrice: ele?.price,
        shipping_price: ele?.shipping_cost,
        totalPrice: ele?.price * quans,
        overallTotal: ele?.price * quans + ele?.shipping_cost,
      };
      localStorage.setItem("tempBuyitem", JSON.stringify(payload));
      toast.success("Product ready to buy");
      dispatch(tempAddItemToBuy(payload));
      setTimeout(() => {
        navigate("/product-buynow");
      }, 1000);
    };

  const AddToCartHandler = () => {
    addTocart();
  };

  const addTocart = async () => {
    let payload = {
      proId: ProductId,
      quantity: quans,
    };

    if (isLoggIn == false) {
      handleAddTempCart(productDes, quans);
      return;
    } else {
      let res = await productTocart(payload, isLoggIn);
      if (res?.response?.data?.error) {
        alert(res?.response?.data?.msg);
      } else {
        dispatch(fetchCartLists());
        toast.success("Added to Your Cart");
      }
    }
  };

  const handleAddTempCart = async (product, quans) => {
    let payload = {
      proId: product,
      quantity: quans,
      prodPrice: product?.price,
      totalPrice: product?.price * quans,
    };
    dispatch(tempAddItemToCart(payload));
    toast.success("Product added to cart");
  };

  return (
    <>
      <div className="content-left">
        <label className="availability2">Quantity:</label>
        <div className="input-group">
          <button
            className="btn"
            type="button"
            id="button-addon1"
            onClick={() => {
              if (quans > 1) setquans(quans - 1);
            }}
          >
            <img src={minus} alt="" />
          </button>
          <input type="text" className="form-control" value={quans} />
          <button
            className="btn"
            type="button"
            id="button-addon2"
            disabled={quans >= stock?.productId?.available_qty}
            onClick={() => setquans(quans + 1)}
          >
            <img src={plus} alt="" />
          </button>
        </div>
      </div>

      {/** buy */}

      <div className="content-right">
        <div className="cart-buy">
          <a
            className={
              stock?.productId?.available_qty > 0
                ? "btn btn-buy"
                : "btn btn-buy disableclass"
            }
            onClick={() => BuyNowHandler()}
          >
            Buy Now
          </a>

          {!isAlreadycart() ? (
            <a className="btn btn-cart" onClick={() => AddToCartHandler()}>
              Add to Cart
            </a>
          ) : (
            <a
              className="btn btn-cart"
              onClick={() => {
                navigate(`/product-cart`);
              }}
            >
              Go to Cart
            </a>
          )}
        </div>
      </div>
    </>
  );
};

export default QansAndBuy;
