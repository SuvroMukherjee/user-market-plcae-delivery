import { useEffect, useState } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FaMicrophoneAlt, FaUserCircle } from "react-icons/fa";
import { GoPackageDependents } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { searchProduct } from "../../Api/api";
import cartwhite from "../../assets/images/cartwhite.png";
import heartwhite from "../../assets/images/heartwhite.png";
import mappinwhite from "../../assets/images/mappinwhite.png";
import personwhite from "../../assets/images/personwhite.png";
import newlogo from "../../assets/images/zoofilogo.png";
import zoofiLogo from "../../assets/images/blackzofi-new-preview.png";
import { authActions } from "../../store/authSlice";
import { allCartItems, tempCartItems } from "../../store/cartSlice";
import { userInformation } from "../../store/customerInfoSlice";
import { locationActions } from "../../store/locationSlice";
import { searchProudct } from "../../store/searchproductSlice";
import { WishlistsData } from "../../store/wishlistSlice";

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showAccountMenu, setShowAccountMenu] = useState(false);

  const { deliveyAddress } = useSelector((state) => state?.address);

  const handleShoeAccountMenu = () => {
    setShowAccountMenu(!showAccountMenu);
  };

  useEffect(() => {
    // close account menu on click outside
    const handleClick = (e) => {
      if (e.target.closest(".account-details-menu-toggle")) return;
      setShowAccountMenu(false);
    };

    document.addEventListener("mousedown", handleClick);
  }, []);

  const [searchcategory, setSearchCateryId] = useState("all");
  const [searchText, setsearchtext] = useState("");
  const [resultList, setResultList] = useState([]);

  const { isLoggIn, userdata } = useSelector((state) => state?.auth);
  const allWishlists = useSelector(WishlistsData);
  const cartItems = useSelector(allCartItems);

  const TempcartItems = useSelector((state) => state?.tempCart);
  const tempCartItemsData = useSelector(tempCartItems);

  const data = useSelector((state) => state?.products?.data || []);
  const { categoryData = [] } = data;

  const UserAddress = useSelector(userInformation);

  // console.log(UserAddress);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user_pincode");
    dispatch(authActions?.logout());
    setShowAccountMenu(false);
    toast.success("Logout Successfully");
    navigate("/");
  };

  const handleModalOpen = () => {
    {
      isLoggIn ? dispatch(locationActions?.openModal()) : navigate("/login");
    }
  };

  const reversedCategories = [...categoryData]?.reverse();

  // const popover = (
  //   <Popover id="popover-basic">
  //     <Popover.Body>
  //       <ListGroup>
  //         <ListGroupItem>
  //           <strong>Name:</strong> {userdata?.name}
  //         </ListGroupItem>
  //         <ListGroupItem>
  //           <strong>Phone No:</strong> {userdata?.phone_no}
  //         </ListGroupItem>
  //         <ListGroupItem>
  //           <strong>Email:</strong> {userdata?.email}
  //         </ListGroupItem>
  //         <ListGroupItem
  //           onClick={() => navigate("/user/manageaddress")}
  //           className="text-center cursor"
  //         >
  //           <strong>
  //             <span>
  //               <FaUserCircle size={25} />
  //             </span>{" "}
  //             Manage Account
  //           </strong>
  //         </ListGroupItem>
  //         <ListGroupItem
  //           onClick={() => navigate("/user/orderlist")}
  //           className="text-center cursor"
  //         >
  //           <span>
  //             <GoPackageDependents size={25} />
  //           </span>{" "}
  //           <strong>
  //             <span></span> Orders
  //           </strong>
  //         </ListGroupItem>
  //         <ListGroupItem onClick={() => handleLogout()}>
  //           <div className="logout">LOGOUT</div>
  //         </ListGroupItem>
  //       </ListGroup>
  //     </Popover.Body>
  //   </Popover>
  // );

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

  // const keyWordChangeFunc = (e) => {
  //   setsearchtext(e.target.value);
  // };

  const handleSearch = async () => {
    dispatch(searchProudct?.clearSearchproduct());
    if (searchText?.length > 2) {
      let payload = {
        searchText: searchText,
        categoryId: searchcategory,
      };

      let res = await searchProduct(payload);
      // console.log({ res });
      // console.log(res?.data?.data);

      const filtered = res?.data?.data.filter((item) => {
        const productName = item?.productId?.name?.toLowerCase() || "";
        const brandName = item?.productId?.brandId?.title?.toLowerCase() || "";
        const combinedName = productName + " " + brandName;

        const searchTextLower = searchText?.toLowerCase() || "";

        // Split strings into arrays of words
        const subStringArray = searchTextLower.split(" ");
        const mainStringArray = combinedName.split(" ");

        // Check if all words in searchText are present in combinedName
        const matchFound = subStringArray.every((word) =>
          mainStringArray.includes(word)
        );

        return matchFound;
      });
      dispatch(searchProudct?.addSearchProduct(filtered));
      setResultList(filtered);
      navigate("/searchproduct");

      // const uniqueProducts = [];

      // const uniqueIds = new Set();

      // filtered.forEach((product) => {
      //   if (!uniqueIds.has(product?.productId?._id)) {
      //     uniqueIds.add(product?.productId?._id);
      //     uniqueProducts.push(product);
      //   }
      // });

      // console.log({filtered})
      // console.log(uniqueProducts);
      // setResultList(filtered);

      //new command
      // const uniqueProducts = [];

      // const uniqueIds = new Set();

      // filtered.forEach((product) => {
      //   if (!uniqueIds.has(product?.productId?._id)) {
      //     uniqueIds.add(product?.productId?._id);
      //     uniqueProducts.push(product);
      //   }
      // });

      // setResultList(uniqueProducts);
    }
  };

  useEffect(() => {
    if (searchText == "") {
      setResultList([]);
    }
  }, [searchText]);

  // useEffect(() => {

  //     setResultList([])
  // }, [searchText])

  // const navigateToProductDesp = (id) =>{
  //   setResultList([])
  //   setsearchtext('');
  //   setSearchCateryId('')
  //   navigate(`/product-details/${id}`)
  // }

  const handleKeyDown = async (event) => {
    // Check if the pressed key is Enter
    if (event.key === "Enter") {
      if (searchText?.length > 2) {
        let payload = {
          searchText: searchText,
          categoryId: searchcategory,
        };

        let res = await searchProduct(payload);
        const filtered = res?.data?.data.filter((item) =>
          item?.productId?.name
            ?.toLowerCase()
            .includes(searchText?.toLowerCase())
        );
        dispatch(searchProudct?.addSearchProduct(filtered));
        setResultList(filtered);
        navigate("/searchproduct");
      }
    }
  };

  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    if (
      !("SpeechRecognition" in window || "webkitSpeechRecognition" in window)
    ) {
      alert(
        "Speech recognition is not supported in your browser. Please use a supported browser."
      );
    }
  }, []);

  const recognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognitionInstance = new recognition();

  recognitionInstance.onstart = () => {
    setIsListening(true);
  };

  recognitionInstance.onresult = (event) => {
    const last = event.results.length - 1;
    const text = event.results[last][0].transcript;
    setTranscript(text);
    setsearchtext(text);
  };

  recognitionInstance.onend = () => {
    setIsListening(false);
  };

  const startListening = () => {
    recognitionInstance.start();
  };

  // console.log({ resultList });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <header className="inner-header">
        {/* <div className="discount-bar">
          30% discount on all products special for November!
        </div> */}
        <nav className="navbar navbar-expand-xl">
          <div className="container-fluid row-1">
            <Link to={"/"} className="navbar-brand">
              {/* Appliance */}
              <img src={zoofiLogo} alt="logo" width={150} />
            </Link>
            {/* <Speech /> */}
            <div className="search-form">
              {/* <div class="input-group input-group-lg">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="inputGroup-sizing-sm">Large</span>
                </div>
                <input type="text" class="form-control" placeholder="Search for Products, Brands & more" aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
              </div>
              <button className="btn" type="submit">
                Go
              </button> */}
              {/* <img src={search} alt="Search" /> */}
              <select
                className="filter-dropdown categoryFilterIcon"
                value={searchcategory}
                onChange={(e) => setSearchCateryId(e.target.value)}
              >
                <option value={"all"}>
                  {" "}
                  &nbsp;&nbsp;&nbsp;All&nbsp;&nbsp;&nbsp;
                </option>
                {categoryData.map((option, index) => (
                  <option key={index} value={option?._id}>
                    &nbsp;&nbsp;&nbsp;{option?.title}&nbsp;&nbsp;&nbsp;
                  </option>
                ))}
              </select>
              <input
                className="form-control"
                type="search"
                value={searchText}
                placeholder="Search for Products, Brands & more"
                aria-label="Search"
                onChange={(e) => setsearchtext(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    if (searchText?.length < 3) {
                      toast.error(
                        "Please enter minimum 3 characters to search",
                        {
                          color: "red",
                        }
                      );
                      return;
                    }
                    navigate(
                      "/searchproduct?search=" +
                        searchText +
                        "&categoryid=" +
                        searchcategory
                    );
                  }
                }}
              />
              {isListening ? (
                <span className="m-2">
                  <FaMicrophoneAlt size={26} color="#FF6969" />
                </span>
              ) : (
                <span className="m-2">
                  <FaMicrophoneAlt
                    size={20}
                    onClick={startListening}
                    disabled={isListening}
                  />
                </span>
              )}
              {/* {resultList?.length > 0 && 
              
                <MdCancel onClick={() => {setResultList([]);setsearchtext('')}}/>
              } */}
              <button
                className="btn"
                onClick={(e) => {
                  e.preventDefault();
                  if (searchText?.length < 3) {
                    toast.error("Please enter minimum 3 characters to search", {
                      color: "red",
                    });
                    return;
                  }
                  navigate(
                    "/searchproduct?search=" +
                      searchText +
                      "&categoryid=" +
                      searchcategory
                  );
                }}
              >
                Go
              </button>
              {/** result tab */}
              {/* {(resultList?.length > 0 && searchText) ? (
              <ul className="list-group search-result-container" style={{
                position: 'absolute',
                width: '500px',
                left: '0px',
                top: '105%',
                listStyle: 'none',
                margin: 0,
                zIndex: 999
              }}>
                {resultList?.map((ele) => (
                  <li className="list-group-item d-flex align-items-center" style={{ cursor: 'pointer' }} key={ele?.productId?._id} onClick={() => navigateToProductDesp(ele?._id)}>
                    <div className="row d-flex align-items-center" style={{width:'500px'}}>
                      <div className="col-10" style={{fontSize:'14px',fontWeight:'bold'}}>
                        {ele?.productId?.brandId?.title} {ele?.productId?.name} {ele?.specId?.spec_det?.length > 0 && (
                          <div style={{ color:'#2874f0',fontSize:'12px'}}>
                            (
                            {ele?.specId?.spec_det?.map((ele, index, array) => (
                              <span key={index}>
                                {ele?.value}
                                {index < array?.length - 1 ? ', ' : ''}
                              </span>
                            ))}
                            )
                          </div>
                        )}
                      </div>

                      <div className="col-2" >
                        <Image src={ele?.specId?.image?.[0]?.image_path} style={{ objectFit: 'contain', width: '50px', height: '50px' }} />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              searchText && (
                <ul className="list-group search-result-container" style={{
                    position: 'absolute',
                    width: '500px',
                    left: '0px',
                    top: '105%',
                    listStyle: 'none',
                    margin: 0,
                    zIndex: 999
                }}>
                  <li className="list-group-item" >No Result Found</li>
                </ul>
              )
            )} */}
            </div>
            {/* {(resultList?.length > 0 && searchText) ? (
              <ul className="list-group search-result-container" style={{
                position: 'absolute',
                width: '470px',
                left: '315px',
                top: '72px',
                listStyle: 'none',
                margin: 0,
                zIndex: 999
              }}>
                {resultList?.map((ele) => (
                  <li className="list-group-item" style={{ cursor: 'pointer' }} key={ele?.productId?._id} onClick={() => navigateToProductDesp(ele?._id)}>
                    {ele?.productId?.name}
                  </li>
                ))}
              </ul>
            ) : (
              searchText && (
                <ul className="list-group search-result-container" style={{
                    position: 'absolute',
                    width: '470px',
                    left: '315px',
                    top: '72px',
                    listStyle: 'none',
                    margin: 0,
                    zIndex: 999
                }}>
                  <li className="list-group-item" >No Result Found</li>
                </ul>
              )
            )} */}

            <ul
              className="navbar-nav"
              style={{
                position: "relative",
              }}
            >
              {!isLoggIn ? (
                <li className="nav-item" onClick={() => navigate("/login")}>
                  <a className="nav-link">
                    <div className="link-left">
                      <img src={personwhite} alt="Login" />
                    </div>
                    <div className="link-right">
                      <label>Sign In</label>
                      {/* <label>Account &amp; Listing</label> */}
                    </div>
                  </a>
                </li>
              ) : (
                <li className="nav-item account-details-menu-toggle">
                  {/* <OverlayTrigger
                    trigger="click"
                    placement="bottom"
                    overlay={popover}
                  >
                    <a className="nav-link">
                      <div className="link-left">
                        <img src={personwhite} alt="Login" />
                      </div>
                      <div className="link-right">
                        <label>{userdata?.phone_no}</label>
                        <label>{userdata?.name}</label>
                      </div>
                    </a>
                  </OverlayTrigger> */}

                  <div onClick={handleShoeAccountMenu}>
                    <a className="nav-link">
                      <div
                        style={{
                          width: "40px",
                          display: "flex",
                          overflow: "hidden",
                          alignItems: "center",
                          justifyContent: "end",
                        }}
                        className="link-left"
                      >
                        {userdata?.profile_pic ? (
                          <img
                            style={{
                              width: "100%",
                              objectFit: "cover",
                              borderRadius: "100%",
                            }}
                            src={userdata?.profile_pic}
                            alt="Login"
                          />
                        ) : (
                          <img src={personwhite} alt="Login" />
                        )}
                      </div>
                      <div className="link-right">
                        {/* <label>{userdata?.phone_no}</label> */}
                        <label>{userdata?.name}</label>
                      </div>
                    </a>

                    {showAccountMenu && (
                      <div
                        style={{
                          position: "absolute",
                          top: "40px",
                          right: "0",
                          left: "0",
                          zIndex: 999,
                        }}
                        className="account-menu"
                      >
                        <div
                          style={{
                            maxWidth: "300px",
                            overflow: "hidden",
                          }}
                        >
                          <ListGroup>
                            <ListGroupItem>
                              <strong>Name:</strong> {userdata?.name}
                            </ListGroupItem>
                            <ListGroupItem>
                              <strong>Phone No:</strong> {userdata?.phone_no}
                            </ListGroupItem>
                            <ListGroupItem>
                              <strong>Email:</strong> {userdata?.email}
                            </ListGroupItem>
                            <ListGroupItem
                              onClick={() => navigate("/user/userprofile")}
                              className="text-center cursor"
                            >
                              <strong>
                                <span>
                                  <FaUserCircle size={25} />
                                </span>{" "}
                                Manage Account
                              </strong>
                            </ListGroupItem>
                            <ListGroupItem
                              onClick={() => navigate("/user/orderlist")}
                              className="text-center cursor"
                            >
                              <span>
                                <GoPackageDependents size={25} />
                              </span>{" "}
                              <strong>
                                <span></span> Orders
                              </strong>
                            </ListGroupItem>
                            <ListGroupItem onClick={() => handleLogout()}>
                              <div className="logout">LOGOUT</div>
                            </ListGroupItem>
                          </ListGroup>
                        </div>
                      </div>
                    )}
                  </div>
                </li>
              )}
              <li className="nav-item" onClick={() => handlecartRedirection()}>
                <a className="nav-link">
                  <div className="link-left">
                    <img src={cartwhite} alt="Login"></img>
                    <span className="cart-count">
                      {isLoggIn
                        ? cartItems?.products?.length || 0
                        : tempCartItemsData?.products?.length || 0}
                    </span>
                  </div>
                  <div className="link-right">
                    <label>Cart</label>
                  </div>
                </a>
              </li>

              <li className="nav-item" onClick={() => handleWishRedirect()}>
                <a className="nav-link">
                  <div className="link-left">
                    <img src={heartwhite} alt="Login" />
                    <span className="cart-count">
                      {allWishlists?.length || 0}
                    </span>
                  </div>
                </a>
              </li>
              <li
                className="nav-item"
                onClick={() => navigate("/user/manageaddress")}
              >
                <a className="nav-link">
                  <div className="link-left">
                    <img src={mappinwhite} alt="Login" />
                  </div>
                  {deliveyAddress ? (
                    <div className="link-right location">
                      <label style={{ fontSize: "10px" }}>
                        <span>
                          Delivering to <br /> {deliveyAddress?.city} -{" "}
                          {deliveyAddress?.pincode}
                        </span>
                      </label>
                    </div>
                  ) : (
                    <div className="link-right location">
                      <label style={{ fontSize: "10px" }}>
                        Your Address <br />
                        <span style={{ fontSize: "12px", color: "white" }}>
                          location
                        </span>
                      </label>
                    </div>
                  )}
                </a>
              </li>
            </ul>
          </div>
          <div className="container-fluid row-2">
            <div className="nav-item-all ">
              <a onClick={() => handleShow()} aria-current="page">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M3 12H21"
                    stroke="black"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3 6H21"
                    stroke="black"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3 18H21"
                    stroke="black"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                All Categories
              </a>
            </div>
            {/* <div className="nav-item-all mx-4" onClick={() => navigate('/brand')}>
              <a aria-current="page"> 
                Home Grown Brands
              </a>
            </div> */}
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarContent"
              aria-controls="navbarContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              {/* <span class="navbar-toggler-icon"></span> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M3 12H21"
                  stroke="black"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 6H21"
                  stroke="black"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 18H21"
                  stroke="black"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div className="collapse navbar-collapse" id="navbarContent">
              <ul className="navbar-nav">
                {/* <li
                  className="nav-item"
                  onClick={() => navigate("/category/bestseller")}
                >
                  <a className="nav-link" aria-current="page">
                    Best Seller
                  </a>
                </li> */}
                {reversedCategories?.length > 0 &&
                  reversedCategories
                    // ?.filter((ele) => ele?.topCat === true)
                    // .sort(
                    //   (a, b) => new Date(a?.updatedAt) - new Date(b?.updatedAt)
                    // )
                    .slice(0, 10)
                    .map((ele, index) => (
                      <li
                        key={index}
                        className="nav-item"
                        onClick={() => navigate(`/category/${ele?._id}`)}
                      >
                        <a className="nav-link" aria-current="page">
                          {ele?.title}
                        </a>
                      </li>
                    ))}
              </ul>
            </div>
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
                  {reversedCategories?.length > 0 &&
                    reversedCategories
                      ?.sort((a, b) => a?.title.localeCompare(b?.title)) // Sort by title
                      .map((ele, index) => (
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
        </nav>
      </header>
    </>
  );
};
