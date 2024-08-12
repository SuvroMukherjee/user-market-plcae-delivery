import { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createWishList,
  productReadyBuy,
  productTocart,
  removeFromWishLists,
} from "../../Api/api";
import { ratingCalculation, totalReview } from "../../assets/common/RatingAvg";
import { fetchBuyLists, tempAddItemToBuy } from "../../store/buyNowSlice";
import {
  alreadyInCart,
  fetchCartLists,
  InTempCart,
  tempAddItemToCart,
  tempCartItems,
} from "../../store/cartSlice";
import { setLoading } from "../../store/loadingSlice";
import { fetchWishLists, WishlistsData } from "../../store/wishlistSlice";
import { StarRating } from "../hero/StarRating";

export const ProductCard = ({ ele, type, showingNo = 4, additionalRef , productsLoading }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allCartItems = useSelector((state) => state?.cart?.data);
  const isLoggIn = useSelector((state) => state?.auth?.isLoggIn);
  const selectedProduct = useSelector((state) => state?.products?.data);
  const allWishlists = useSelector(WishlistsData);
  const tempCartItemsData = useSelector(tempCartItems);

  let isLoading = productsLoading ? true : productsLoading;

  const [hoveredItem, setHoveredItem] = useState(null);
  const { reviewData } = selectedProduct || {};

  const handleMouseEnter = (index) => {
    setHoveredItem(index);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const handleAddTempCart = async (product, quans) => {
    let payload = {
      proId: ele,
      quantity: quans,
      prodPrice: ele?.price,
      totalPrice: ele.price * quans,
    };
    dispatch(tempAddItemToCart(payload));
    toast.success("Product added to cart");
  };

 

  function calculateDiscountPercentage(mrp, sellPrice) {
    const discount = mrp - sellPrice;
    const discountPercentage = (discount / mrp) * 100;
    return discountPercentage;
  }

  const addTocart = async (ele, quans = 1) => {
    if (isLoggIn == false) {
      handleAddTempCart(ele?._id, quans);
      return;
    }

    try {
      dispatch(
        setLoading({
          state: true,
          message: "Adding Item To the cart...",
        })
      );
      let payload = {
        proId: ele?._id,
        quantity: quans,
      };

      let res = await productTocart(payload, isLoggIn);
      if (res?.response?.data?.error) {
        toast.error(res?.response?.data?.msg || "Something went wrong");
      } else {
        dispatch(fetchCartLists());
        toast.success("Product added to cart");
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

  const SavetoWishList = async (ele) => {
    if (isLoggIn == false) {
      navigate("/login");
    } else {
      let payload = {
        proId: ele?._id,
      };
      let res = await createWishList(payload);
      if (res?.response?.data.error) {
        alert(res?.response?.data?.message);
      } else {
        dispatch(fetchWishLists());
      }
    }
  };

  const isAlreadywishedFunc = (productId) => {
    let response = allWishlists?.filter((item) => {
      return item?.proId?._id == productId;
    });

    if (response?.length < 0) {
      return response?.length;
    } else {
      return response?.length;
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

  const buyNowHandler = async (ele, quans = 1) => {
    if (isLoggIn == false) {
      handleAddTempBuy(ele, quans);
      return;
    }

    try {
      dispatch(
        setLoading({
          state: true,
          message: "Adding Item To the cart...",
        })
      );
      let payload = {
        proId: ele?._id,
        quantity: quans,
      };

      let res = await productReadyBuy(payload, isLoggIn);
      console.log(res, "ress");
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

  const Removefunc = async (id) => {
    try {
      dispatch(
        setLoading({
          state: true,
          message: "Removing Item...",
        })
      );
      let response = await removeFromWishLists(id);

      if (response?.response?.data?.error) {
        toast.error(response?.response?.data?.msg || "Something went wrong");
      } else {
        dispatch(fetchWishLists());
        toast.success("Product removed from wishlist");
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

 return (
   <>
     {isLoading && (
       <ProductCardSkeleton type={type} showingNo={showingNo} />
     )}
     {!isLoading && (
       <div
         className={`${
           type === "swiper" ? "" : `col-lg-${showingNo} col-md-6 col-12`
         } product-card-col`}
       >
         <div
           className="card product-card"
           onMouseEnter={() => handleMouseEnter(ele?._id)}
           onMouseLeave={handleMouseLeave}
         >
           <div
             style={{
               position: "relative",
             }}
             className="card-img-top"
           >
             {/* Best seller badge */}
             {ele?.is_bestSell && (
               <div className="best-seller-badge">Best Seller</div>
             )}

             <img src={ele?.specId?.image?.[0]?.image_path} alt="product" />

             {type === "wishlist" && (
               <button
                 type="button"
                 className="btn delete-icon position-absolute top-0 end-0"
                 onClick={() => Removefunc(additionalRef?._id)}
               >
                 <IoMdCloseCircle size={32} />
               </button>
             )}

             {hoveredItem === ele?._id && (
               <div className="wishlistBtn" onClick={() => SavetoWishList(ele)}>
                 {isAlreadywishedFunc(ele?._id) ? (
                   <div className="wrapper added disablebackground">
                     <FaHeart size={20} />
                     Added To Wishlist
                   </div>
                 ) : (
                   <div className="wrapper">
                     <CiHeart size={24} />
                     Add To Wishlist
                   </div>
                 )}
               </div>
             )}
           </div>

           <div className="card-body">
             <Link
               to={`/product-details/${ele?._id}`}
               style={{ textDecoration: "none" }}
             >
               <div className="card-title">
                 {ele?.productId?.name}
                 {ele?.specId?.spec_det?.length > 0 && (
                   <span>
                     (
                     {ele?.specId?.spec_det
                       ?.slice(0, 3)
                       ?.map((ele, index, array) => (
                         <span key={index}>
                           {ele.value}
                           {index < array.length - 1 ? ", " : ""}
                         </span>
                       ))}
                     )
                   </span>
                 )}
               </div>
             </Link>
             <div className="cart-view-key mb-2">{ele?.productId?.desc}</div>
             <div className="card-text">
               <label className="price">
                 ₹{ele?.price?.toLocaleString()}
                 <span>
                   <span style={{ textDecoration: "none" }} className="mx-1">
                     M.R.P
                   </span>
                   ₹{ele?.specId?.price}
                 </span>
                 <span className="off-price">
                   {Math.round(
                     calculateDiscountPercentage(ele?.specId?.price, ele?.price)
                   )}
                   % Off
                 </span>
               </label>
             </div>
             <div className="rate-review">
               <StarRating value={ratingCalculation(ele?._id, reviewData)} />
               <span>Total {totalReview(ele?._id, reviewData)} Reviews</span>
             </div>
             <div className="cart-cta-row gap-2">
               {(
                 isLoggIn
                   ? alreadyInCart(allCartItems?.products, ele?._id)
                   : alreadyInCart(allCartItems?.products, ele?._id) ||
                     InTempCart(tempCartItemsData?.products, ele?._id)
               ) ? (
                 <a
                   onClick={() => navigate("/product-cart")}
                   className="btn btn-cart btn-go-to-cart"
                 >
                   Go To Cart
                 </a>
               ) : (
                 <a className="btn btn-cart" onClick={() => addTocart(ele)}>
                   Add To Cart
                 </a>
               )}
               <a
                 className="btn btn-cart btn-buy"
                 onClick={() => buyNowHandler(ele)}
               >
                 Buy Now
               </a>
             </div>
           </div>
         </div>
       </div>
     )}
   </>
 );

};

export const ProductCardSkeleton = ({ type, showingNo }) => {
  return (
    <>
     
        <div
       
          className={`${
            type === "swiper" ? "" : `col-lg-${showingNo} col-md-6 col-12`
          } product-card-col`}
        >
          <div className="card product-card" style={{ padding: "10px" }}>
            <div
              style={{
                position: "relative",
                height: "200px",
              }}
              className="card-img-top"
            >
              <Skeleton
                height={170}
                width={300}
                style={{ borderRadius: "10px" }}
              />
            </div>
            <div className="card-body">
              <Skeleton height={20} width="80%" />
              <Skeleton height={15} width="60%" className="my-2" />
              <div className="cart-view-key mb-2">
                <Skeleton height={15} width="90%" />
              </div>
              <div className="card-text text-center">
                <Skeleton height={20} width={200} />
              </div>
              <div className="rate-review text-center">
                <Skeleton height={15} width={100} />
                <Skeleton height={15} width={100} className="ml-2" />
              </div>
              <div className="cart-cta-row gap-4">
                <Skeleton
                  height={35}
                  width={100}
                  style={{ borderRadius: "30px" }}
                />
                <Skeleton
                  height={35}
                  width={100}
                  style={{ borderRadius: "30px" }}
                />
              </div>
            </div>
          </div>
        </div>
      
    </>
  );
};
