import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SearchedProduct } from "./components/category/SearchedProduct";
import { BrandFilterPage } from "./components/FilterPages/BrandPage/BrandFilterPage";
import { CategoryFilterPage } from "./components/FilterPages/CategoryPage/CategoryFilterPage";
import { Footer } from "./components/footer/Footer";
import { LocationModal } from "./components/header/LocationModal";
import { HeaderPath } from "./components/HeaderPath";
import PolicyPage from "./components/PoliciesPages/PolicyPage";
import AllSellerByProduct from "./components/product/AllSellerByProduct";
import { BuyProductCart } from "./components/product/BuyProductCart";
import { LivePrevireProduct } from "./components/product/LivePrevireProduct";
import { ProductCart } from "./components/product/ProductCart";
import { DetailsProductPage } from "./components/product/PtoductInfo/DetailsProductPage";
import { TempBuyProductcart } from "./components/product/TempBuyProductcart";
import { TempProductCartView } from "./components/product/TempProductCartView";
import { Account } from "./pages/account/Account";
import ManageAddress from "./pages/AccountSetting/ManageAddress";
import OrderPlace from "./pages/AccountSetting/OrderPlace";
import RateAndReview from "./pages/AccountSetting/RateAndReview";
import { ReturnOrderlist } from "./pages/AccountSetting/ReturnOrderlist";
import SingleOrder from "./pages/AccountSetting/SingleOrder";
import { UserProfile } from "./pages/AccountSetting/UserProfile";
import { Home } from "./pages/home/Home";
import Login from "./pages/login/Login";
import OtpComp from "./pages/login/OtpComp";
import Register from "./pages/login/Register";
import VerifyEmail from "./pages/login/VerifyEmail";
import { WishlistsComp } from "./pages/WishLists/WishlistsComp";

import { fetchAddress } from "./store/addressSlice";
import { fetchBanners } from "./store/bannerSlice";
import { fetchCartLists } from "./store/cartSlice";
import { fetchCustomerData } from "./store/customerInfoSlice";
import { fetchProducts } from "./store/productsSlice";
import { fetchWishLists } from "./store/wishlistSlice";
import "./style.css";
import "./responsive.css";
// import SearchPageFilter from "./components/FilterPages/SearchPage/SearchPageFilter";
// import CategoryFilterNew from "./components/FilterPages/CategoryPage/CategoryFilterNew";
import { fetchBrands } from "./store/brandSlice";
import { fetchCategory } from "./store/categorySlice";

const App = () => {
  const isLoggIn = useSelector((state) => state.auth.isLoggIn);
  // const cartItems = useSelector((state) => state.cart.itemsList);
  const dispatch = useDispatch();

  useEffect(() => {
    let pincode = localStorage.getItem("user_pincode");
    // console.log(pincode);
    setTimeout(() => {
      dispatch(fetchProducts(pincode));
      dispatch(fetchWishLists());
      dispatch(fetchCartLists());
      dispatch(fetchBanners(pincode));
      dispatch(fetchCustomerData());
      dispatch(fetchAddress());
    }, 0);
  }, [isLoggIn, dispatch]);

  useEffect(() => {
    window.history.scrollRestoration = "manual";
  }, []);

  useEffect(() => {
    dispatch(fetchCategory());
    dispatch(fetchBrands());
  }, [dispatch]);

  return (
    <>
      <div className="main">
        <Router>
          <HeaderPath />
          <LocationModal />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/otp-verfication/:id"
              element={
                <div className="inner-pages-wrapper">
                  <OtpComp />
                </div>
              }
            />

            <Route
              path="/login"
              element={
                !isLoggIn ? (
                  <div className="inner-pages-wrapper">
                    <Login />
                  </div>
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />

            <Route
              path="/register"
              element={
                !isLoggIn ? (
                  <div className="inner-pages-wrapper">
                    <Register />
                  </div>
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />

            <Route
              path="/account"
              element={
                isLoggIn ? (
                  <div className="inner-pages-wrapper">
                    <Account />
                  </div>
                ) : (
                  <div className="inner-pages-wrapper">
                    <Login />
                  </div>
                )
              }
            />
            <Route
              path="/category/:id?"
              element={
                <div className="inner-pages-wrapper">
                  <CategoryFilterPage />
                </div>
              }
            />
            <Route
              path="/brand/:id?"
              element={
                <div className="inner-pages-wrapper">
                  <BrandFilterPage />
                </div>
              }
            />
            <Route
              path="/searchproduct"
              element={
                <div className="inner-pages-wrapper">
                  <SearchedProduct />
                </div>
              }
            />

            <Route
              path="/product-details/:id"
              element={
                <div className="inner-pages-wrapper">
                  <DetailsProductPage />
                </div>
              }
            />
            <Route
              path="/allSellerByProduct/:id/:specId?"
              element={
                <div className="inner-pages-wrapper">
                  <AllSellerByProduct />
                </div>
              }
            />
            <Route
              path="/product-cart"
              element={
                isLoggIn ? (
                  <div className="inner-pages-wrapper">
                    <ProductCart />
                  </div>
                ) : (
                  <div className="inner-pages-wrapper">
                    <TempProductCartView />
                  </div>
                )
              }
            />
            <Route
              path="/product-buynow"
              element={
                isLoggIn ? (
                  <div className="inner-pages-wrapper">
                    <BuyProductCart />
                  </div>
                ) : (
                  <div className="inner-pages-wrapper">
                    <TempBuyProductcart />
                  </div>
                )
              }
            />
            <Route
              path="/wishlists"
              element={
                isLoggIn ? (
                  <div className="inner-pages-wrapper">
                    <WishlistsComp />
                  </div>
                ) : (
                  <div className="inner-pages-wrapper">
                    <Login />
                  </div>
                )
              }
            />

            <Route
              path="/user/manageaddress"
              element={
                isLoggIn ? (
                  <div className="inner-pages-wrapper">
                    <ManageAddress />
                  </div>
                ) : (
                  <div className="inner-pages-wrapper">
                    <Login />
                  </div>
                )
              }
            />
            <Route
              path="/user/userprofile"
              element={
                isLoggIn ? (
                  <div className="inner-pages-wrapper">
                    <UserProfile />
                  </div>
                ) : (
                  <div className="inner-pages-wrapper">
                    <Login />
                  </div>
                )
              }
            />
            <Route
              path="/user/orderlist"
              element={
                isLoggIn ? (
                  <div className="inner-pages-wrapper">
                    <OrderPlace />
                  </div>
                ) : (
                  <div className="inner-pages-wrapper">
                    <Login />
                  </div>
                )
              }
            />
            <Route
              path="/user/order/:id"
              element={
                isLoggIn ? (
                  <div className="inner-pages-wrapper">
                    <SingleOrder />
                  </div>
                ) : (
                  <div className="inner-pages-wrapper">
                    <Login />
                  </div>
                )
              }
            />
            <Route
              path="/user/returnorderlist"
              element={
                isLoggIn ? (
                  <div className="inner-pages-wrapper">
                    <ReturnOrderlist />
                  </div>
                ) : (
                  <div className="inner-pages-wrapper">
                    <Login />
                  </div>
                )
              }
            />
            <Route
              path="/user/rateandreview/:id?"
              element={
                isLoggIn ? (
                  <div className="inner-pages-wrapper">
                    <RateAndReview />
                  </div>
                ) : (
                  <div className="inner-pages-wrapper">
                    <Login />
                  </div>
                )
              }
            />
            <Route
              path="/livepreview/:id?"
              element={
                <div className="inner-pages-wrapper">
                  <LivePrevireProduct />
                </div>
              }
            />
            <Route
              path="/policy/:page?"
              element={
                <div className="inner-pages-wrapper">
                  <PolicyPage />
                </div>
              }
            />
            <Route
              path="/customer/email-verify/:userId"
              element={
                <div className="inner-pages-wrapper">
                  <VerifyEmail />
                </div>
              }
            />
          </Routes>

          <ToastContainer
            theme="colored"
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
          />

          <Footer />
        </Router>
      </div>
    </>
  );
};

export default App;
