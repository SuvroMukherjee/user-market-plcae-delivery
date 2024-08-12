import { useEffect, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { CiShop, CiUser } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import cartIcon from "../../assets/images/cart-icon.svg";
import hamburger from "../../assets/images/hamburger.png";
import hearIcon from "../../assets/images/heartIcon.svg";
import locationIcon from "../../assets/images/locationIcon.svg";
import newlogo from "../../assets/images/blackzofi-new-preview.png";
import { authActions } from "../../store/authSlice";
import { allCartItems, tempCartItems } from "../../store/cartSlice";
import { WishlistsData } from "../../store/wishlistSlice";

const HomeHeader = () => {
  const dispatch = useDispatch();

  const { isLoggIn, userdata } = useSelector((state) => state?.auth);

  const { deliveyAddress } = useSelector((state) => state?.address);

  const allWishlists = useSelector(WishlistsData);
  const cartItems = useSelector(allCartItems);
  const tempCartItemsData = useSelector(tempCartItems);

  const [showAccountMenu, setShowAccountMenu] = useState(false);

  const handleShoeAccountMenu = () => {
    setShowAccountMenu(!showAccountMenu);
  };

  useEffect(() => {
    // close account menu on click outside
    const handleClick = (e) => {
      if (e.target.closest(".nav-account-menu-dropdown")) return;
      setShowAccountMenu(false);
    };

    document.addEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user_pincode");
    dispatch(authActions?.logout());
    setShowAccountMenu(false);
    toast.success("Logout Successfully");
    navigate("/");
  };

  const handleWishRedirect = () => {
    if (allWishlists) {
      navigate("/wishlists");
    } else {
      navigate("/login");
    }
  };

  const handlecartRedirection = () => {
    // if (allWishlists) {
    navigate("/product-cart");
    // } else {
    //   navigate("/login");
    // }
  };

  const [show, setShow] = useState(false);

  const data = useSelector((state) => state?.products?.data || []);

  const [headerBgColor, setHeaderBgColor] = useState("transparent");

  const { categoryData = [] } = data;
  const reversedCategoryData = [...categoryData]?.reverse();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;

      if (scrolled > 0) {
        setHeaderBgColor("black"); // Change to red when scrolled 50 pixels down
      } else {
        setHeaderBgColor("transparent"); // Reset to initial color when not scrolled
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className="home-header"
        style={{ backgroundColor: headerBgColor }}
      >
        <div className="container">
          <div className="nav-wrap">
            <div className="d-flex align-items-center gap-3">
              <div className="nav-all" onClick={handleShow}>
                <img src={hamburger} alt="menu" />
                <span>All</span>
              </div>
              <Link
                to={"/"}
                className={`navbar-brand ${
                  headerBgColor === "transparent" ? "d-none" : "d-block"
                }`}
              >
                {/* Appliance */}
                <img src={newlogo} alt="logo" width={150} />
              </Link>
            </div>
            <>
              <Offcanvas className="offcanvas" show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title>Categories</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <ul>
                    {/* <li
                      onClick={() => {
                        handleClose();
                        navigate("/category/all");
                      }}
                    >
                      <a>All</a>
                    </li> */}
                    {reversedCategoryData?.length > 0 &&
                      reversedCategoryData
                        ?.sort((a, b) => a?.title.localeCompare(b?.title)) // Sort by title
                        ?.map((ele, index) => (
                          <li
                            key={index}
                            onClick={() => {
                              handleClose();
                              navigate(`/category/${ele?._id}`);
                            }}
                          >
                            <a>{ele?.title}</a>
                          </li>
                        ))}
                  </ul>
                </Offcanvas.Body>
              </Offcanvas>
            </>

            <div className="nav-wrap-right">
              {!isLoggIn ? (
                <div className="nav-account" onClick={() => navigate("/login")}>
                  <div className="nav-account-left">
                    <CiUser size={30} />
                  </div>
                  <div className="nav-account-right">
                    <div className="top-row">Sign In</div>
                    {/* <div className="bottom-row">Account &amp; Listing</div> */}
                  </div>
                </div>
              ) : (
                <div className="nav-account" onClick={handleShoeAccountMenu}>
                  <div className="nav-account-left">
                    {userdata?.profile_pic ? (
                      <img
                        className="object-fit-cover rounded-circle"
                        src={userdata?.profile_pic}
                        alt="user"
                      />
                    ) : (
                      <CiUser size={30} />
                    )}
                  </div>
                  <div className="nav-account-right">
                    <div className="top-row">{userdata?.name}</div>
                    {/* <div className="bottom-row">{userdata?.phone_no}</div> */}
                  </div>

                  {showAccountMenu && (
                    <div className="nav-account-menu-dropdown">
                      <div className="list-group">
                        <div className="list-group-item">
                          <strong>Name:</strong> {userdata?.name}
                        </div>
                        <div className="list-group-item">
                          <strong>Phone No:</strong> {userdata?.phone_no}
                        </div>
                        <div className="list-group-item">
                          <strong>Email:</strong> {userdata?.email}
                        </div>
                        <div
                          onClick={() => navigate("/user/userprofile")}
                          className="text-center cursor list-group-item"
                        >
                          <strong>
                            <span>
                              <CiUser size={25} />
                            </span>{" "}
                            Manage Account
                          </strong>
                        </div>
                        <div
                          onClick={() => navigate("/user/orderlist")}
                          className="text-center cursor list-group-item"
                        >
                          <strong>
                            <span>
                              <svg
                                stroke="currentColor"
                                fill="currentColor"
                                strokeWidth="0"
                                viewBox="0 0 24 24"
                                height="25"
                                width="25"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M9.126.64a1.748 1.748 0 0 1 1.75 0l8.25 4.762c.103.06.199.128.286.206a.75.75 0 0 1 .554.96c.023.113.035.23.035.35v3.332a.75.75 0 0 1-1.5 0V7.64l-7.75 4.474V22.36a.75.75 0 0 1-1.125.65l-8.75-5.052a1.75 1.75 0 0 1-.875-1.515V6.917c0-.119.012-.236.035-.35a.749.749 0 0 1 .554-.96c.088-.078.184-.146.286-.205L9.126.639Zm.875 10.173v.001l7.75-4.474-7.625-4.402a.248.248 0 0 0-.25 0L2.251 6.34Zm-8.5-3.175v8.803c0 .09.048.172.125.216l7.625 4.402v-8.947Z"></path>
                                <path d="m21.347 17.5-2.894-2.702a.75.75 0 1 1 1.023-1.096l4.286 4a.75.75 0 0 1 0 1.096l-4.286 4a.75.75 0 1 1-1.023-1.096L21.347 19h-6.633a.75.75 0 0 1 0-1.5h6.633Z"></path>
                              </svg>
                            </span>
                            Orders
                          </strong>
                        </div>
                        <div
                          onClick={() => handleLogout()}
                          className="list-group-item"
                        >
                          <div className="logout">LOGOUT</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="nav-cart" onClick={() => handlecartRedirection()}>
                <div className="nav-cart-left">
                  <img src={cartIcon} alt="cart" />
                  <span>
                    {isLoggIn
                      ? cartItems?.products?.length || 0
                      : tempCartItemsData?.products?.length || 0}
                  </span>
                </div>
                <div className="nav-cart-right">
                  <div className="top-row">Cart</div>
                </div>
              </div>

              <div className="nav-fav" onClick={() => handleWishRedirect()}>
                <img src={hearIcon} alt="fav" />
                <span>{allWishlists?.length || 0}</span>
              </div>

              {deliveyAddress ? (
                <div
                  className="nav-location"
                  style={{ fontSize: "12px" }}
                  onClick={() => navigate("/user/manageaddress")}
                >
                  <img src={locationIcon} alt="location" />
                  <span>
                    Delivering to <br /> {deliveyAddress?.city} -{" "}
                    {deliveyAddress?.pincode}
                  </span>
                </div>
              ) : (
                <div
                  className="nav-location"
                  style={{ fontSize: "12px" }}
                  onClick={() => navigate("/user/manageaddress")}
                >
                  <img src={locationIcon} alt="location" />
                  <span>
                    Your Address <br /> location
                  </span>
                </div>
              )}
              <a
                href="https://sell.zoofi.in/"
                target="_blank"
                style={{ textDecoration: "none" }}
                rel="noreferrer"
              >
                <div className="d-flex justify-content-start align-items-center bc-seller">
                  {" "}
                  <span className="mx-2">
                    <CiShop size={30} color="#9af064" />
                  </span>{" "}
                  Become a Seller
                </div>
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default HomeHeader;
