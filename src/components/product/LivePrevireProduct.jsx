import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { CiHeart } from "react-icons/ci";
import { FaHeart, FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import YouTube from "react-youtube";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import makeInIndia from "../../assets/images/makeinindia.png";

import { FaChevronDown, FaStar } from "react-icons/fa";
import { IoMdPricetag } from "react-icons/io";
import { toast } from "react-toastify";
import "swiper/css";
import "swiper/css/navigation";
import {
  createWishList,
  getAllSpecproductBySellers,
  getDistance,
  GetProductDetails,
  productDetails,
  productTocart,
} from "../../Api/api";
import { calculateReview } from "../../assets/common/RatingAvg";
import location from "../../assets/images/location.png";
import minus from "../../assets/images/minus.png";
import plus from "../../assets/images/plus.png";
import addressSlice from "../../store/addressSlice";
import { allCartItems, fetchCartLists } from "../../store/cartSlice";
import { recentProductData, recentProducts } from "../../store/recentViewSlice";
import { WishlistsData, fetchWishLists } from "../../store/wishlistSlice";
import { StarRating } from "../hero/StarRating";
import { LoaderComponent } from "../Loader/LoaderComponent";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiArrowDropUpLine } from "react-icons/ri";
import "./previewBadge.css";

export const LivePrevireProduct = () => {
  const { id: ProductId } = useParams();
  const [productDes, setProductDes] = useState();
  const [selectedContent, setSelectedContent] = useState({
    type: "image",
    source: null,
  });
  const [videoId, setVideoId] = useState(null);
  const [quans, setquans] = useState(1);
  const [seller, SetSeller] = useState();
  const [showInfo, setShowInfo] = useState(false);
  const [otherProductSpecs, setOtherProductSpecs] = useState([]);
  const [stock, setStock] = useState(0);
  const [avgRating, setAvgRating] = useState();
  const [reviewData, setReviewData] = useState([]);
  const [selectedAdd, setSelectedAdd] = useState();
  const [enterPincode, setEnterPincode] = useState();
  const [Isdeliverable, setIsdeliverable] = useState("");
  const [isDelivertStatus, setIsDeliveryStatus] = useState(false);
  const [allsavedAddress, setallSavedAddress] = useState([]);
  const [showDrop, setshowDrop] = useState(false);
  const [offerDatalist, setOfferDatalist] = useState([]);
  const [additinalAttached, setAdditionalAttached] = useState([]);
  const [productPageLoading, setProductPageLoading] = useState(true);
  const [desView, setDesview] = useState(false);
  const [intitialProduct,setInitialProduct] = useState()

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const recentproducts = useSelector(recentProductData);

  const { isLoggIn } = useSelector((state) => state?.auth);
  const { userdata } = useSelector((state) => state?.auth);

  const { data: Alladdressdata, deliveyAddress } = useSelector(
    (state) => state?.address
  );

  const cartItems = useSelector(allCartItems);

  console.log({ productDes });

  console.log({ intitialProduct });

  const navigate = useNavigate();

  const dispatch = useDispatch();

  async function getProductDetails() {
    try {
      setProductPageLoading(true);
      let response = await GetProductDetails(ProductId);
      console.log(response?.data?.data, "rdaar");
      setProductDes(response?.data?.data);
      setInitialProduct(response?.data?.data?.specificationdata[0]);
      // setStock(response?.data?.data?.avilableStock);
      // getAllSameSpecproducts(
      //   response?.data?.data?.SellerProductData?.sellerId?._id,
      //   response?.data?.data?.SellerProductData?.productId?._id
      // );
      // SetSeller(response?.data?.data?.SellerProductData?.sellerId);
      console.log(
        response?.data?.data?.specificationdata?.[0]?.image?.[0]?.image_path,"image-Path"
      );
      handleThumbnailClick({
        type: "image",
        source: response?.data?.data?.specificationdata?.[0]?.image?.[0],
      });
      // isAlreadywishedFunc(response?.data?.data?.productId);
      // setReviewData(response?.data?.data?.reviewData);
      // setAvgRating(calculateReview(response?.data?.data?.reviewData));
      // checkFirstAddressDelivery(
      //   response?.data?.data?.SellerProductData?.sellerId
      // );
      // setOfferDatalist(response?.data?.data?.OfferData);
      // setAdditionalAttached(response?.data?.data?.additionalSpec);
      extractYouTubeVideoId(response?.data?.data?.ProductData?.video_link);

      // don't put anything after extractYouTubeVideoId
    } catch (error) {
      console.log(error);
    } finally {
      setProductPageLoading(false);
    }
  }

  async function getAllSameSpecproducts(sellerId, productId) {
    let res = await getAllSpecproductBySellers(sellerId, productId);
    console.log(res, "hehehehhehe");
    setOtherProductSpecs(res?.data?.data);
  }

  const allWishlists = useSelector(WishlistsData);

  useEffect(() => {
    getProductDetails(ProductId);
  }, [navigate]);

  const checkFirstAddressDelivery = (sellerId) => {
    if (sellerId && deliveyAddress?.pincode) {
      getPincodeDistance(
        sellerId?.Shop_Details_Info?.pin_code,
        deliveyAddress?.pincode
      );
    }
  };

  const SavetoWishList = async () => {
    if (isLoggIn == false) {
      navigate("/login");
    } else {
      let payload = {
        proId: ProductId,
      };
      let res = await createWishList(payload);
      console.log({ res });
      if (res?.response?.data.error) {
        toast.info(res?.response?.data?.message);
      } else {
        dispatch(fetchWishLists());
      }
    }
  };

  const isAlreadywishedFunc = () => {
    let response = allWishlists?.filter((item) => {
      return item?.proId?._id == ProductId;
    });

    if (response?.length < 0) {
      return response?.length;
    } else {
      return response?.length;
    }
  };

  const isAlreadycart = () => {
    let response = cartItems?.products?.find((item) => {
      return item?.proId?._id == ProductId;
    });

    if (response) {
      return true;
    } else {
      return false;
    }
  };

  function extractYouTubeVideoId(iframeString) {
    const match =
      iframeString && iframeString.match(/youtube\.com\/embed\/([^"?]+)/);
      console.warn(match, "match");
    match ? setVideoId(match[1]) : setVideoId(null);
  }

  const opts = {
    height: "475",
    width: "650",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
      mute: 1,
      controls: 0,
    },
  };

  const handleThumbnailClick = (content) => {
    console.log("clikc", content);
    setSelectedContent(content);
  };

  const addTocart = async (goToCart = false) => {
    let payload = {
      proId: ProductId,
      quantity: quans,
    };

    if (isLoggIn == false) {
      navigate("/login");
    } else {
      let res = await productTocart(payload);
      if (res?.response?.data?.error) {
        alert(res?.response?.data?.msg);
      } else {
        dispatch(fetchCartLists());
        toast.success("Added to Your Cart");
      }
    }

    if (goToCart) {
      navigate("/product-cart");
    }
  };

  const handleMouseEnter = () => {
    setShowInfo(true);
  };

  const handleMouseLeave = () => {
    setShowInfo(false);
  };

  function calculateDiscountPercentage(mrp, sellPrice) {
    const discount = mrp - sellPrice;
    const discountPercentage = (discount / mrp) * 100;
    return discountPercentage;
  }

  const redirectTodetailsPage = (ele) => {
   // navigate(`/livepreview/${id}`, { replace: true });
   setInitialProduct(ele)
   handleThumbnailClick({
     type: "image",
     source: ele?.image?.[0],
   });
  };

  const handleAddressChange = (e) => {
    dispatch(addressSlice.actions.updateDeliveryAddress(e));
    setSelectedAdd(e);
    getPincodeDistance(seller?.Shop_Details_Info?.pin_code, e?.pincode);
    setshowDrop(!showDrop);
  };

  const getPincodeDistance = async (Sellercode, deliveryCode) => {
    console.log(Sellercode, deliveryCode, "Sellercode, deliveryCode");
    await getDistance(Sellercode, deliveryCode)
      .then((data) => {
        console.log(data);
        if (data?.results?.[deliveryCode] <= 1000) {
          setIsDeliveryStatus(true);
          setIsdeliverable("");
        } else {
          setIsDeliveryStatus(false);
          setIsdeliverable(`Delivery Not Available Is This Area`);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  console.log({ showDrop });

  function createMarkup(val) {
    return { __html: val };
  }

  const checkPincodeHandler = () => {
    getPincodeDistance(seller?.Shop_Details_Info?.pin_code, enterPincode);
  };

  const checkDeisableClick = () => {
    if (isLoggIn == false) {
      navigate("/login");
    } else {
      if (!deliveyAddress) {
        toast.error("Add Delivery Address");
      }
    }
  };

  console.log({ selectedContent });

  return (
    <>
      {productPageLoading && (
        <>
          <div
            style={{
              minHeight: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              padding: "100px",
            }}
          >
            <LoaderComponent />
          </div>
        </>
      )}

      {!productPageLoading && (
        <div className="main">
          <div className="page-content inner">

          <div className="cr cr-top cr-right cr-sticky cr-red">Preview Page</div>

            <div className="container">
              <div className="row">
                <div className="col-12">
                  <ul className="breadcrumb">
                    <li>
                      <a>Home</a>
                    </li>
                    <li>
                      <a
                        onClick={() => {
                          navigate(
                            `/searchproduct?search=${productDes?.ProductData?.categoryId?.title}`
                          );
                        }}
                      >
                        {productDes?.ProductData?.categoryId?.title}
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => {
                          navigate(
                            `/searchproduct?search=${productDes?.ProductData?.subcategoryId?.title}`
                          );
                        }}
                      >
                        {productDes?.ProductData?.subcategoryId?.title}
                      </a>
                    </li>
                    <li>
                      <a
                        href="javascript:void(0)"
                        onClick={() => {
                          navigate(
                            `/searchproduct?search=${productDes?.ProductData?.name}`
                          );
                        }}
                      >
                        {productDes?.ProductData?.name}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="row product-page-content">
                <div className="col-lg-5 col-12 left-col">
                  <div className="left-content">
                    <div className="swiper productImageSwiper">
                      {selectedContent.type === "image" ? (
                        <Swiper
                          className="swiper-wrapper"
                          spaceBetween={30}
                          slidesPerView={1}
                        >
                          <SwiperSlide>
                            <div className="image-wrapper">
                              <Image
                                thumbnail
                                src={selectedContent?.source?.image_path}
                                className="img-fluid"
                                alt="Product Image"
                              />
                            </div>
                          </SwiperSlide>
                        </Swiper>
                      ) : (
                        <div>
                          {/* <YouTube videoId={videoId} opts={opts} /> */}
                          <div className="d-md-flex justify-content-center align-items-center mb-0">
                            <YouTube videoId={videoId} opts={opts} />
                          </div>
                        </div>
                      )}
                    </div>
                    <div
                      // thumbsslider=""
                      className="swiper productThumbSwiper"
                    >
                      <Swiper
                        className="swiper-wrapper"
                        spaceBetween={10}
                        slidesPerView={4}
                        freeMode={true}
                        watchSlidesVisibility={true}
                        watchSlidesProgress={true}
                        autoplay={{ delay: 500, disableOnInteraction: false }}
                        // navigation={true}
                        // modules={[Navigation]}
                      >
                        {productDes?.specificationdata?.length > 0
                          ? [
                              ...(intitialProduct?.image || []),
                              ...(additinalAttached?.[0]?.image || []),
                            ]?.map((ele, index) => (
                              <SwiperSlide key={index}>
                                <div
                                  className={
                                    selectedContent?.source?._id == ele?._id
                                      ? "image-wrapper activeProductSlide"
                                      : "image-wrapper"
                                  }
                                >
                                  <Image
                                    thumbnail
                                    src={ele?.image_path}
                                    alt="Product Thumbnail"
                                    className="img-fluid"
                                    onClick={() =>
                                      handleThumbnailClick({
                                        type: "image",
                                        source: ele,
                                      })
                                    }
                                  />
                                </div>
                              </SwiperSlide>
                            ))
                          : (productDes?.ProductData?.image || []).map(
                              (ele, index) => (
                                <SwiperSlide key={index}>
                                  <div
                                    className={
                                      selectedContent?.source?._id == ele?._id
                                        ? "image-wrapper activeProductSlide"
                                        : "image-wrapper"
                                    }
                                  >
                                    <Image
                                      thumbnail
                                      src={ele?.image_path}
                                      alt="Product Thumbnail"
                                      className="img-fluid"
                                      onClick={() =>
                                        handleThumbnailClick({
                                          type: "image",
                                          source: ele,
                                        })
                                      }
                                    />
                                  </div>
                                </SwiperSlide>
                              )
                            )}
                        {productDes?.ProductData?.video_link != " " && (
                          <SwiperSlide>
                            <div className="image-wrapper">
                              <Image
                                thumbnail
                                src="https://static.vecteezy.com/system/resources/previews/018/930/572/original/youtube-logo-youtube-icon-transparent-free-png.png"
                                alt="Product Thumbnail video"
                                className="img-fluid"
                                o
                                onClick={() =>
                                  handleThumbnailClick({
                                    type: "video",
                                    source: videoId,
                                  })
                                }
                              />
                            </div>
                          </SwiperSlide>
                        )}
                      </Swiper>
                    </div>
                  </div>
                </div>
                <div className="col-lg-7 col-12 right-col">
                  <div className="right-content">
                    <div className="category-name">
                      {productDes?.ProductData?.categoryId?.title}
                    </div>
                    <div className="product-name">
                      {/* {productDes?.productId?.brandId?.title}  */}
                      {productDes?.ProductData?.name}{" "}
                      {intitialProduct?.spec_det?.length > 0 && (
                        <span>
                          (
                          {intitialProduct?.spec_det
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
                    {productDes?.ProductData?.brandId?.brand_origin ? (
                      <div className="product-rating">
                        <span className="MIN-Home">
                          Home Grown Indian Brand
                        </span>
                        {/* <img src={madeinindia} alt='madeinindia' /> */}
                      </div>
                    ) : (
                      <div className="MIN-row">
                        {/* <span className="MIN">Make In India</span> */}
                        <img src={makeInIndia} alt="" />
                        {/* <img src={madeinindia} alt='madeinindia' /> */}
                      </div>
                    )}
                    <div className="product-rating">
                      <div className="rating-stars">
                        <StarRating value={5} />
                      </div>
                      (100 customer reviews)
                    </div>

                    <div className="divider"></div>
                    <div className="delivery-to">
                      <div className="d-to availability">
                        <span className="location-icon">
                          <img src={location} alt="location" />
                        </span>
                        Deliver to : {console.log({ selectedAdd })}
                      </div>
                      {false ? (
                        <div className="address-part">
                          <div
                            className="defaultaddbox"
                            onClick={() => setshowDrop(!showDrop)}
                          >
                            <span className="selectAddName">
                              {deliveyAddress?.name} - {deliveyAddress?.pincode}
                            </span>
                            <span className="ms-auto">
                              <FaChevronDown />
                            </span>
                          </div>

                          {showDrop && (
                            <div className="otheraddboxMainConatiner">
                              <p>Select from saved addresses:</p>
                              <div className="otheraddbox-wrap">
                                {Alladdressdata?.length > 0 &&
                                  Alladdressdata?.map((ele, index) => (
                                    <div
                                      key={index}
                                      className="otheraddbox"
                                      onClick={() => handleAddressChange(ele)}
                                    >
                                      <span className="selectAddName">
                                        {ele?.name} - {ele?.pincode}
                                      </span>
                                      <span className="addressType">
                                        {ele?.address_type}
                                      </span>
                                    </div>
                                  ))}
                              </div>
                              <div className="row mt-2">
                                <div className="col-8">
                                  <input
                                    className="pinInput"
                                    placeholder="Enter Delivery Pincode"
                                    type="number"
                                    value={enterPincode}
                                    onChange={(e) =>
                                      setEnterPincode(e?.target?.value)
                                    }
                                  />
                                  <span
                                    className="changeColor"
                                    onClick={() => {
                                      // SetIsChange(true);
                                      checkPincodeHandler();
                                    }}
                                  >
                                    Check
                                  </span>
                                </div>
                                {Isdeliverable != "" && (
                                  <p className="mt-2 no-dil">{Isdeliverable}</p>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div
                          className="addnewText mx-2"
                          // onClick={() => navigate("/user/manageaddress")}
                        >
                          <div>
                            {" "}
                            <span>
                              <FaPlus />
                            </span>{" "}
                            Add New Delivery Address
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="key-features mb-4 mt-4">
                      <p className="availability2 fs-7 text-dark">
                        Key Features
                      </p>
                      <ul>
                        {productDes?.ProductData?.features?.length > 0 &&
                          productDes?.ProductData?.features.map((ele, index) =>
                            ele ? <li key={index}>{ele}</li> : null
                          )}
                      </ul>
                    </div>

                    {productDes?.OfferData?.length > 0 && (
                      <div className="offers border shadow-sm rounded p-2">
                        <p className="availability2 ms-2 fs-7 text-dark">
                          Offers
                        </p>
                        <ul className="offerlists">
                          {productDes?.OfferData?.length > 0 &&
                            productDes?.OfferData?.map((ele, index) => (
                              <li key={index}>
                                <span className="mx-1">
                                  <IoMdPricetag size={20} color="#10a003" />
                                </span>
                                <span className="fw-bold ">
                                  {" "}
                                  {ele?.offerId?.offer_type_name}
                                </span>
                                {"    "}
                                {ele?.discount_percentage}% off on{" "}
                                {ele?.offer_on?.bank_name} Bank{" "}
                                {ele?.offer_on.card_type} Transactions, up to ₹
                                {ele?.min_amount?.toLocaleString()} on orders of
                                ₹{ele?.max_amount?.toLocaleString()} and above{" "}
                                <a>T&amp;C</a>
                              </li>
                            ))}
                        </ul>
                      </div>
                    )}

                    {/* <div className="supplier-stock">
                      <label className="availability">
                        Availability:
                        <span className="mx-2">
                          {stock?.productId?.available_qty > 0
                            ? `${stock?.productId?.available_qty} in`
                            : "Out Of"}{" "}
                          stock
                        </span>
                      </label>
                    </div> */}
                    <div className="sku">
                      <strong>SKU: </strong>
                      {intitialProduct?.skuId?.toUpperCase()}
                    </div>
                    <div className="price-row">
                      <div className="price">
                        ₹{(intitialProduct?.price * quans)?.toLocaleString()}
                        <span className="percent-off">
                          {calculateDiscountPercentage(
                            intitialProduct?.price,
                            intitialProduct?.price
                          ).toFixed(2)}
                          % Off
                        </span>
                        <br />
                        <div className="price-original">
                          M.R.P -{" "}
                          <span>
                            ₹
                            {(intitialProduct?.price * quans)?.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <div className="wishlist-compare">
                        <a>
                          <CiHeart size={40} />
                          Add To Wishlist
                        </a>
                      </div>
                    </div>

                    <div className="supplier-stock">
                      <label className="availability">
                        Availability:
                        <span className="mx-2">
                          {100 > 0 ? `${100} in` : "Out Of"} stock
                        </span>
                      </label>
                    </div>

                    <div className="divider"></div>

                    {/* <div className="key-description">
                      <p className="availability2">Description</p>
                      {productDes?.productId?.desc}
                    </div> */}

                    <div className="specContainer mt-4">
                      {productDes?.specificationdata?.length > 0 &&
                        productDes?.specificationdata
                          ?.filter((ele) => ele?.specId !== null)
                          ?.map((ele) => (
                            <ul
                              className={
                                ele?._id == intitialProduct?._id
                                  ? "otherspecContainer hightlited shadow-sm rounded"
                                  : "otherspecContainer shadow-sm rounded"
                              }
                              key={ele.key}
                              onClick={() => redirectTodetailsPage(ele)}
                            >
                              {ele?.spec_det?.slice(0, 3)?.map((item) => (
                                <li key={item._id}>
                                  <strong className="">{item?.title}:</strong>{" "}
                                  {item?.value}
                                </li>
                              ))}
                              <li>
                                <strong>Price :</strong>{" "}
                                {ele?.price?.toLocaleString()}
                              </li>
                            </ul>
                          ))}
                    </div>

                    {/* {offerDatalist?.length > 0 && (
                      <div className="offers">
                        <p className="availability2">Offers</p>
                        <ul className="offerlists">
                          {offerDatalist?.length > 0 &&
                            offerDatalist?.map((ele, index) => (
                              <li key={index}>
                                <span className="mx-2">
                                  <IoMdPricetag size={20} color="#10a003" />
                                </span>
                                {ele?.offer_type_name}
                                {"    "}
                                {ele?.discount_percentage}% off on{" "}
                                {ele?.offer_on?.bank_name} Bank{" "}
                                {ele?.offer_on.card_type} Transactions, up to ₹
                                {ele?.min_amount?.toLocaleString()} on orders of
                                ₹{ele?.max_amount?.toLocaleString()} and above{" "}
                                <a>T&amp;C</a>
                              </li>
                            ))}
                        </ul>
                      </div>
                    )} */}

                    <div className="divider"></div>

                    {/*************************************************** NEW START DELIVERY******************************* */}

                    {/*************************************************** NEW DELIVERY******************************** */}

                    {/* <div>{Isdeliverable} ssssss</div> */}

                    {/** seller & all seller  */}
                    <div className="supplier-stock">
                      <label className="availability2">Sold By:</label>
                      <div
                        className="shop_name"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      >
                        <span className="seller-name">
                          Nearest Shop
                          {"..."}
                        </span>

                        <span className="sellerratingstar">
                          {" "}
                          {Math.round(5) || 0} <FaStar color="#9af064" />
                        </span>

                        {showInfo && (
                          <div className="seller-info">
                            <div className="wrapper">
                              <Image
                                src="https://cdn2.vectorstock.com/i/1000x1000/06/41/shop-store-with-windows-greenery-lanterns-vector-14190641.jpg"
                                alt="Seller Logo"
                                className="seller-info-logo"
                              ></Image>
                              <div className="seller-info-content">
                                <p>Nearest Shop</p>
                                <p>West Bengal</p>
                                <p>
                                  <span>20+</span>
                                  years in business
                                </p>
                                <p>
                                  <span>2000 +</span>
                                  units sold per year
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <p className="otherSellerText">See All Other Sellers</p>

                    {/** Quanity */}
                    <div className="color-quantity">
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
                          <input
                            type="text"
                            className="form-control"
                            value={quans}
                          />
                          <button
                            className="btn"
                            type="button"
                            id="button-addon2"
                            disabled={quans == stock?.productId?.available_qty}
                            onClick={() => setquans(quans + 1)}
                          >
                            <img src={plus} alt="" />
                          </button>
                        </div>
                      </div>

                      <div className="content-right">
                        {/** Add to cart */}

                        <div className="cart-buy">
                          <a
                            className={
                              true > 0
                                ? "btn btn-cart"
                                : "btn btn-cart disableclass"
                            }
                          >
                            Add to Cart
                          </a>

                          <a
                            className={
                              true > 0
                                ? "btn btn-buy"
                                : "btn btn-buy disableclass"
                            }
                          >
                            Buy Now
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="divider"></div>

                    <div className="expandables">
                      <div className="accordion" id="accordionExample1">
                        <div className="accordion-item">
                          <h2 className="accordion-header" id="headingOne">
                            <button
                              className="accordion-button"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseOne"
                              aria-expanded="true"
                              aria-controls="collapseOne"
                            >
                              Specifications
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  d="M6 9L12 15L18 9"
                                  stroke="black"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>
                          </h2>
                          <div
                            id="collapseOne"
                            className="accordion-collapse collapse show"
                            aria-labelledby="headingOne"
                            data-bs-parent="#accordionExample1"
                          >
                            <div className="accordion-body">
                              <h5>General</h5>
                              <ul className="spec-list">
                                {intitialProduct?.spec_det?.length > 0 &&
                                  intitialProduct?.spec_det?.map(
                                    (ele, index) => (
                                      <li key={index}>
                                        <label>{ele?.title}</label>
                                        <label>{ele?.value}</label>
                                      </li>
                                    )
                                  )}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="expandables">
                      <div className="accordion" id="accordionExampledesc">
                        <div className="accordion-item">
                          <h2 className="accordion-header" id="headingdesc">
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapsedesc"
                              aria-expanded="true"
                              aria-controls="collapsedesc"
                            >
                              Product Description
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  d="M6 9L12 15L18 9"
                                  stroke="black"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>
                          </h2>
                          <div
                            id="collapsedesc"
                            className="accordion-collapse collapse hide"
                            aria-labelledby="headingdesc"
                            data-bs-parent="#accordionExampledesc"
                          >
                            <div className="accordion-body largeDescription">
                              {productDes?.ProductData?.desc}
                              {!desView ? (
                                <p
                                  className="mt-2 v-more"
                                  onClick={() => setDesview(true)}
                                >
                                  View More{" "}
                                  <span className="mx-2">
                                    <RiArrowDropDownLine size={25} />
                                  </span>
                                </p>
                              ) : (
                                <p
                                  className="mt-2 v-more"
                                  onClick={() => setDesview(false)}
                                >
                                  View Less{" "}
                                  <span className="mx-2">
                                    <RiArrowDropUpLine size={25} />
                                  </span>
                                </p>
                              )}
                              {desView && (
                                <p
                                  dangerouslySetInnerHTML={createMarkup(
                                    productDes?.ProductData?.full_desc
                                  )}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="expandables">
                      <div className="accordion" id="accordionExample2">
                        <div className="accordion-item">
                          <h2 className="accordion-header" id="headingTwo">
                            <button
                              className="accordion-button"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseTwo"
                              aria-expanded="true"
                              aria-controls="collapseTwo"
                            >
                              Ratings &amp; Reviews
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  d="M6 9L12 15L18 9"
                                  stroke="black"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>
                          </h2>
                          <div
                            id="collapseTwo"
                            className="accordion-collapse collapse show"
                            aria-labelledby="headingTwo"
                            data-bs-parent="#accordionExample2"
                          >
                            <div className="accordion-body">
                              <div className="row rating-info">
                                <div className="col-lg-3 col-12 left-col">
                                  <div className="row-1">
                                    <label>{5}</label>
                                    <i className="fa-solid fa-star" />
                                  </div>
                                  <p>
                                    {100} Ratings &amp; <br />
                                    Reviews
                                  </p>
                                </div>
                                <div className="col-lg-9 right-col">
                                  {/* <ul className="rate-info-list">{renderRatingList(reviewData)}</ul> */}
                                  <ul className="rate-info-list">
                                    <li>
                                      <span className="first-col">
                                        5 <i className="fa-solid fa-star" />
                                      </span>
                                      <div className="progress">
                                        <div
                                          className="progress-bar type-1"
                                          role="progressbar"
                                          style={{
                                            width: `${
                                              reviewData
                                                ? (reviewData?.filter(
                                                    (ele) => ele?.rating == "5"
                                                  )?.length /
                                                    reviewData?.length) *
                                                  100
                                                : 80
                                            }%`,
                                          }}
                                          aria-valuenow={Math.floor(
                                            reviewData
                                              ? (reviewData?.filter(
                                                  (ele) => ele?.rating == "5"
                                                )?.length /
                                                  reviewData?.length) *
                                                  100
                                              : 0
                                          )}
                                          aria-valuemin={0}
                                          aria-valuemax={100}
                                        />
                                      </div>
                                      <span className="last-col">
                                        {
                                          reviewData?.filter(
                                            (ele) => ele?.rating == "5"
                                          )?.length
                                        }
                                      </span>
                                    </li>
                                    <li>
                                      <span className="first-col">
                                        4 <i className="fa-solid fa-star" />
                                      </span>
                                      <div className="progress">
                                        <div
                                          className="progress-bar type-1"
                                          role="progressbar"
                                          style={{
                                            width: `${
                                              reviewData
                                                ? (reviewData?.filter(
                                                    (ele) => ele?.rating == "4"
                                                  )?.length /
                                                    reviewData?.length) *
                                                  100
                                                : 60
                                            }%`,
                                          }}
                                          aria-valuenow={Math.floor(
                                            reviewData
                                              ? (reviewData?.filter(
                                                  (ele) => ele?.rating == "4"
                                                )?.length /
                                                  reviewData?.length) *
                                                  100
                                              : 0
                                          )}
                                          aria-valuemin={0}
                                          aria-valuemax={100}
                                        />
                                      </div>
                                      <span className="last-col">
                                        {
                                          reviewData?.filter(
                                            (ele) => ele?.rating == "4"
                                          )?.length
                                        }
                                      </span>
                                    </li>
                                    <li>
                                      <span className="first-col">
                                        3 <i className="fa-solid fa-star" />
                                      </span>
                                      <div className="progress">
                                        <div
                                          className="progress-bar type-1"
                                          role="progressbar"
                                          style={{
                                            width: `${
                                              reviewData
                                                ? (reviewData?.filter(
                                                    (ele) => ele?.rating == "3"
                                                  )?.length /
                                                    reviewData?.length) *
                                                  100
                                                : 50
                                            }%`,
                                          }}
                                          aria-valuenow={Math.floor(
                                            reviewData
                                              ? (reviewData?.filter(
                                                  (ele) => ele?.rating == "3"
                                                )?.length /
                                                  reviewData?.length) *
                                                  100
                                              : 0
                                          )}
                                          aria-valuemin={0}
                                          aria-valuemax={100}
                                        />
                                      </div>
                                      <span className="last-col">
                                        {
                                          reviewData?.filter(
                                            (ele) => ele?.rating == "3"
                                          )?.length
                                        }
                                      </span>
                                    </li>
                                    <li>
                                      <span className="first-col">
                                        2 <i className="fa-solid fa-star" />
                                      </span>
                                      <div className="progress">
                                        <div
                                          className="progress-bar type-2"
                                          role="progressbar"
                                          style={{
                                            width: `${
                                              reviewData
                                                ? (reviewData?.filter(
                                                    (ele) => ele?.rating == "2"
                                                  )?.length /
                                                    reviewData?.length) *
                                                  100
                                                : 40
                                            }%`,
                                          }}
                                          aria-valuenow={Math.floor(
                                            reviewData
                                              ? (reviewData?.filter(
                                                  (ele) => ele?.rating == "2"
                                                )?.length /
                                                  reviewData?.length) *
                                                  100
                                              : 0
                                          )}
                                          aria-valuemin={0}
                                          aria-valuemax={100}
                                        />
                                      </div>
                                      <span className="last-col">
                                        {
                                          reviewData?.filter(
                                            (ele) => ele?.rating == "2"
                                          )?.length
                                        }
                                      </span>
                                    </li>
                                    <li>
                                      <span className="first-col">
                                        1 <i className="fa-solid fa-star" />
                                      </span>
                                      <div className="progress">
                                        <div
                                          className="progress-bar type-3"
                                          role="progressbar"
                                          style={{
                                            width: `${
                                              reviewData
                                                ? (reviewData?.filter(
                                                    (ele) => ele?.rating == "1"
                                                  )?.length /
                                                    reviewData?.length) *
                                                  100
                                                : 35
                                            }%`,
                                          }}
                                          aria-valuenow={Math.floor(
                                            reviewData
                                              ? (reviewData?.filter(
                                                  (ele) => ele?.rating == "1"
                                                )?.length /
                                                  reviewData?.length) *
                                                  100
                                              : 0
                                          )}
                                          aria-valuemin={0}
                                          aria-valuemax={100}
                                        />
                                      </div>
                                      <span className="last-col">
                                        {
                                          reviewData?.filter(
                                            (ele) => ele?.rating == "1"
                                          )?.length
                                        }
                                      </span>
                                    </li>
                                  </ul>
                                </div>
                              </div>

                              <div className="rating-comment">
                                {reviewData?.length > 0 &&
                                  reviewData?.map((ele, index) => (
                                    <div key={index}>
                                      <div className="product-rating">
                                        <div className="rating-stars">
                                          <StarRating value={ele?.rating} />
                                        </div>
                                        {ele?.title}
                                      </div>
                                      <p>{ele?.desc}</p>
                                      <div>
                                        <Swiper
                                          className="swiper-wrapper"
                                          spaceBetween={10}
                                          slidesPerView={4}
                                          freeMode={true}
                                          watchSlidesVisibility={true}
                                          watchSlidesProgress={true}
                                          autoplay={{
                                            delay: 500,
                                            disableOnInteraction: false,
                                          }}
                                        >
                                          {ele?.review_image?.map(
                                            (ele, index) => (
                                              <SwiperSlide key={index}>
                                                <div className="image-wrapper">
                                                  <Image
                                                    thumbnail
                                                    src={ele?.image_path}
                                                    alt="Product Thumbnail"
                                                    // className="img-fluid"
                                                    className="reviewImg"
                                                  />
                                                </div>
                                              </SwiperSlide>
                                            )
                                          )}
                                        </Swiper>
                                      </div>
                                      <div className="customer-info mt-4">
                                        {console.log("user", ele?.user)}
                                        <ul>
                                          <li>{ele?.user?.name}</li>
                                          {/* <li>
                                            {(() => {
                                              try {
                                                const address = JSON.parse(
                                                  ele?.user?.address
                                                );
                                                return (
                                                  address?.state ||
                                                  "No state found"
                                                );
                                              } catch (error) {
                                                console.error(
                                                  "Error parsing JSON:",
                                                  error
                                                );
                                                return "Invalid JSON";
                                              }
                                            })()}
                                          </li> */}
                                          <li>
                                            {moment(ele?.updatedAt).fromNow()}
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="related-product-section mb-4">
              <div className="container">
                <div className="row">
                  <div className="col-12">
                    <h4>Recently Viewed</h4>
                  </div>
                </div>
                <div className="row">
                  {recentproducts?.length > 0 &&
                    recentproducts?.map((ele, index) => (
                      <div
                        key={index}
                        className="col-lg-3 col-md-6 col-12 d-flex justify-content-start"
                      >
                        <div className="card related-product-card">
                          <div className="card-img-top">
                            <img
                              src={
                                ele?.SellerProductData?.specId?.image?.[0]
                                  ?.image_path
                              }
                              alt=""
                            />
                          </div>
                          <div className="card-body">
                            <p className="card-title">
                              {
                                ele?.SellerProductData?.productId?.brandId
                                  ?.title
                              }{" "}
                              {ele?.SellerProductData?.name}{" "}
                              {ele?.SellerProductData?.specId?.spec_det
                                ?.length > 0 && (
                                <span>
                                  (
                                  {ele?.SellerProductData?.specId.spec_det
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
                            </p>
                            <p className="card-text">
                              {
                                ele?.SellerProductData?.productId?.categoryId
                                  ?.title
                              }
                            </p>
                            <p className="card-text-bottom">
                              <label className="price">
                                ₹
                                {ele?.SellerProductData?.price?.toLocaleString()}
                                <span>
                                  ₹{ele?.SellerProductData?.specId?.price}
                                </span>
                              </label>
                            </p>
                            <div className="rate-review">
                              <div className="rating-stars">
                                <FontAwesomeIcon
                                  icon={solidStar}
                                  className="StatIcon"
                                />
                                <FontAwesomeIcon
                                  icon={solidStar}
                                  className="StatIcon"
                                />
                                <FontAwesomeIcon
                                  icon={solidStar}
                                  className="StatIcon"
                                />
                                <FontAwesomeIcon
                                  icon={regularStar}
                                  className="StatIcon"
                                />
                                <FontAwesomeIcon
                                  icon={regularStar}
                                  className="StatIcon"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div className="product-specifications">
              <div className="container">
                <div className="divider"></div>
                <h4 className="product-name" style={{ color: "#2a9c2a" }}>
                  Product Description
                </h4>
                <h3 className="product-name">
                  {productDes?.name}{" "}
                  {productDes?.specId?.spec_det
                    ?.slice(0, 3)
                    ?.map((ele, index, array) => (
                      <span key={index}>
                        {ele.value}
                        {index < array.length - 1 ? ", " : ""}
                      </span>
                    ))}
                </h3>
                <div className="row">
                  <div className="col-md-6 col-12">
                    <h4 className="table-heading">Technical Details</h4>
                    <table>
                      <tbody>
                        <tr>
                          <th>Brand</th>
                          <td>{productDes?.ProductData?.brandId?.title}</td>
                        </tr>
                        <tr>
                          <th>Category</th>
                          <td>{productDes?.ProductData?.categoryId?.title}</td>
                        </tr>
                        <tr>
                          <th>SubCategory</th>
                          <td>
                            {productDes?.ProductData?.subcategoryId?.title}
                          </td>
                        </tr>
                        <tr>
                          <th>Product ID</th>
                          <td>{productDes?.ProductData?.productId}</td>
                        </tr>
                        <tr>
                          <th>SKU</th>
                          <td>{intitialProduct?.skuId?.toUpperCase()}</td>
                        </tr>
                        <tr>
                          <th>Rating</th>
                          <td>{<StarRating value={5} />}</td>
                        </tr>
                        <tr>
                          <th>Feedbacks</th>
                          <td>100 customer reviews</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="col-md-6 col-12">
                    <h4 className="table-heading">Additional Information</h4>
                    <table>
                      <tbody>
                        {intitialProduct?.spec_det?.map((ele, index, array) => (
                          <tr>
                            <th>{ele?.title}</th>
                            <td>{ele?.value}</td>
                          </tr>
                        ))}
                        <tr>
                          <th>Seller</th>
                          <td>Nearest Shop</td>
                        </tr>
                        <tr>
                          <th>Shop Location</th>
                          <td>West Bengal</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
