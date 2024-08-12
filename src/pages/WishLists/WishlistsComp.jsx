import { useEffect, useRef } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { productTocart, removeFromWishLists } from "../../Api/api";
import { setLoading } from "../../store/loadingSlice";
import { WishlistsData, fetchWishLists } from "../../store/wishlistSlice";
import { alreadyInCart, fetchCartLists } from "../../store/cartSlice";
import { ProductCard } from "../../components/ProductCard/ProductCard";

export const WishlistsComp = () => {
  const allWishlists = useSelector(WishlistsData);

  const wishListLoadingState = useSelector(
    (state) => state?.wishList?.isLoading
  );

  const allCartItems = useSelector((state) => state?.cart?.data);

  const loadingState = useSelector((state) => state.loading.loadingState);
  const loadingMessage = useSelector((state) => state.loading.message);
  let loadingToastId = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  function calculateDiscountPercentage(mrp, sellPrice) {
    const discount = mrp - sellPrice;
    const discountPercentage = (discount / mrp) * 100;
    return discountPercentage;
  }

  const redirectTodetailsPage = (id) => {
    navigate(`/product-details/${id}`);
  };

  const addTocart = async (id, quans = 1) => {
    let payload = {
      proId: id,
      quantity: quans,
    };

    try {
      dispatch(
        setLoading({
          state: true,
          message: "Adding to cart...",
        })
      );
      let res = await productTocart(payload);

      if (res?.response?.data?.error) {
        toast.error(res?.response?.data?.msg);
      } else {
        dispatch(fetchWishLists());
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

  useEffect(() => {
    if (loadingState) {
      loadingToastId.current = toast.info(loadingMessage, {
        autoClose: false,
      });
    }

    if (!loadingState) {
      toast.dismiss(loadingToastId.current);
    }
  }, [loadingMessage, loadingState]);

  return (
    <div className="container mb-4">
      <div className="row mt-4 mb-3">
        <div className="col-5">
          <h5>
            Wish Lists <span className="separator">|</span>{" "}
            {wishListLoadingState && "Loading..."}
            {
              <span className="count">
                {!wishListLoadingState &&
                  allWishlists?.length > 0 &&
                  allWishlists?.length + " Items"}
              </span>
            }
          </h5>
        </div>
      </div>
      <hr />
      <div className="row mb-3">
        {wishListLoadingState && (
          <div
            className="col-12 text-center"
            style={{
              minHeight: "200px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="spinner-border" role="status"></div>
          </div>
        )}
        
        {/** sssss */}
        {!wishListLoadingState &&
          allWishlists?.length > 0 &&
          allWishlists.map((ele, index) => {
            return <ProductCard ele={ele?.proId} showingNo={3} type={"wishlist"} additionalRef={ele}/>;
          })}
      </div>
    </div>
  );
};
