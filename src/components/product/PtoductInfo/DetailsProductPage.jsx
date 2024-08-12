import { useEffect, useRef, useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import { AiFillFacebook } from "react-icons/ai";
import { CiHeart } from "react-icons/ci";
import { FaHeart, FaStar } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FiPaperclip } from "react-icons/fi";
import { IoLogoWhatsapp } from "react-icons/io";
import { IoMail } from "react-icons/io5";
import {
  RiArrowDropDownLine,
  RiArrowDropUpLine,
  RiShareForwardFill,
} from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "swiper/css";
import "swiper/css/navigation";
import {
  createWishList,
  getAllSpecproductBySellers,
  getDistance,
  productDetails
} from "../../../Api/api";
import { estimatedDeliveryTimes } from "../../../assets/common/dateformat";
import { calculateReview } from "../../../assets/common/RatingAvg";
import makeInIndia from "../../../assets/images/makeinindia.png";
import comming from "../../../assets/images/product/truck.gif";
import addressSlice from "../../../store/addressSlice";
import { allCartItems } from "../../../store/cartSlice";
import {
  recentProducts
} from "../../../store/recentViewSlice";
import { WishlistsData, fetchWishLists } from "../../../store/wishlistSlice";
import { StarRating } from "../../hero/StarRating";
import { LoaderComponent } from "../../Loader/LoaderComponent";
import InfoTable from "./InfoTable";
import Offers from "./Offers";
import Pincheck from "./Pincheck";
import ProductImagesSlider from "./ProductImagesSlider";
import ProductRating from "./ProductRating";
import QansAndBuy from "./QansAndBuy";
import RecentView from "./RecentView";
import Services from "./Services";

export const DetailsProductPage = () => {
  const { id: ProductId } = useParams();
  const [productDes, setProductDes] = useState();
  const [quans, setquans] = useState(1);
  const [seller, SetSeller] = useState();
  const [showInfo, setShowInfo] = useState(false);
  const [otherProductSpecs, setOtherProductSpecs] = useState([]);
  const [stock, setStock] = useState(0);
  const [avgRating, setAvgRating] = useState();
  const [reviewData, setReviewData] = useState([]);
  const [enterPincode, setEnterPincode] = useState();
  const [Isdeliverable, setIsdeliverable] = useState("");
  const [isDelivertStatus, setIsDeliveryStatus] = useState(false);
  const [offerDatalist, setOfferDatalist] = useState([]);
  const [productPageLoading, setProductPageLoading] = useState(true);
  const [desView, setDesview] = useState(false);
  const [showsOptiopns, setShowOptions] = useState(false);
  const [loccheckLoading, setLocCheckLoading] = useState(null);
  const technicalSectionRef = useRef(null);


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { isLoggIn } = useSelector((state) => state?.auth);
  const { userdata } = useSelector((state) => state?.auth);

  const { data: Alladdressdata, deliveyAddress } = useSelector(
    (state) => state?.address
  );

  const cartItems = useSelector(allCartItems);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const target = useRef(null);

  const scrollToSection = (sectionRef) => {
    sectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  async function getProductDetails() {
    try {
      setProductPageLoading(true);
      let response = await productDetails(ProductId);
      if (response?.data?.data?.SellerProductData.status == false) {
        toast.error("Product Not Available Now");
        navigate("/");
        return;
      }
      dispatch(recentProducts?.addToRecent(response?.data?.data));
      if (response?.data?.data) {
        setProductPageLoading(false);
      }
      setProductDes(response?.data?.data?.SellerProductData);
      setStock(response?.data?.data?.avilableStock);
      getAllSameSpecproducts(
        response?.data?.data?.SellerProductData?.sellerId?._id,
        response?.data?.data?.SellerProductData?.productId?._id
      );
      SetSeller(response?.data?.data?.SellerProductData?.sellerId);
      isAlreadywishedFunc(response?.data?.data?.productId);
      setReviewData(response?.data?.data?.reviewData);
      setAvgRating(calculateReview(response?.data?.data?.reviewData));
      setOfferDatalist(response?.data?.data?.OfferData);
      extractYouTubeVideoId(
        response?.data?.data?.SellerProductData?.productId?.video_link
      );

      // don't put anything after extractYouTubeVideoId
    } catch (error) {
      console.log(error);
    } finally {
      setProductPageLoading(false);
    }
  }

  async function getAllSameSpecproducts(sellerId, productId) {
    let res = await getAllSpecproductBySellers(sellerId, productId);
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
      iframeString && iframeString.match(/youtube\.com\/embed\/([^"?]+)/);;
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

  const redirectTodetailsPage = (id) => {
    navigate(`/product-details/${id}`, { replace: true });
  };

  const handleAddressChange = (e) => {
    setIsDeliveryStatus(false);
    setIsDeliveryStatus("");
    setLocCheckLoading(true);
    dispatch(addressSlice.actions.updateDeliveryAddress(e));
    setSelectedAdd(e);
    setEnterPincode(e?.pincode);
    getPincodeDistance(seller?.Shop_Details_Info?.pin_code, e?.pincode);
  };

  const getPincodeDistance = async (Sellercode, deliveryCode) => {
    await getDistance(Sellercode, deliveryCode)
      .then((data) => {
        if (data?.results?.[deliveryCode] <= 1000) {
          setIsDeliveryStatus(true);
          setIsdeliverable("");
        } else {
          setIsDeliveryStatus(false);
          setIsdeliverable(`Delivery Not Available Is This Area`);
        }
        setLocCheckLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsDeliveryStatus(false);
        setIsdeliverable(`Something went wrong! please try again`);
        setLocCheckLoading(false);
      });
  };

 
  function createMarkup(val) {
    return { __html: val };
  }

  const checkPincodeHandler = () => {
    setLocCheckLoading(true);
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
                            `/searchproduct?search=${productDes?.productId?.categoryId?.title}`
                          );
                        }}
                      >
                        {productDes?.productId?.categoryId?.title}
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => {
                          navigate(
                            `/searchproduct?search=${productDes?.productId?.subcategoryId?.title}`
                          );
                        }}
                      >
                        {productDes?.productId?.subcategoryId?.title}
                      </a>
                    </li>
                    <li>
                      <a
                        href="javascript:void(0)"
                        onClick={() => {
                          navigate(`/searchproduct?search=${productDes?.name}`);
                        }}
                      >
                        {productDes?.name}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="row product-page-content">
                <div className="col-lg-5 col-12 left-col">
                  <div className="left-content">
                    <div className="swiper productImageSwiper">
                      <ProductImagesSlider
                        images={productDes?.specId?.image}
                        productDes={productDes}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-7 col-12 right-col">
                  <div className="right-content">
                    <div className="category-name">
                      {productDes?.categoryId?.title}
                    </div>
                    <div className="product-name">
                      {/* {productDes?.productId?.brandId?.title}  */}
                      {productDes?.name}{" "}
                      {productDes?.specId?.spec_det?.length > 0 && (
                        <>
                          <span>
                            (
                            {productDes?.specId?.spec_det
                              ?.slice(0, 3)
                              ?.map((ele, index, array) => (
                                <span key={index}>
                                  {ele.value}
                                  {index < array.length - 1 ? ", " : ""}
                                </span>
                              ))}
                            )
                          </span>

                          <Modal
                            size="md"
                            show={showsOptiopns}
                            onHide={() => setShowOptions(false)}
                            aria-labelledby="example-modal-sizes-title-sm"
                            centered
                          >
                            <Modal.Body>
                              <Row className="p-2 flex align-items-center">
                                <Col className="text-center d-flex justify-content-center flex-column align-items-center">
                                  <a
                                    href={`https://web.whatsapp.com/send?text=Check out ${productDes?.name}  https://zoofi.in/product-details/${ProductId}`}
                                    rel="nofollow noopener noreferrer"
                                    target="_blank"
                                    className="share-icon-wp"
                                  >
                                    <div className="icon-cont">
                                      <IoLogoWhatsapp size={30} />
                                    </div>
                                  </a>
                                  <p className="mt-2 shrtext">WhatsApp</p>
                                </Col>
                                <Col className="text-center d-flex justify-content-center flex-column align-items-center">
                                  <a
                                    href={`https://www.facebook.com/sharer/sharer.php?u=https://zoofi.in/product-details/${ProductId}`}
                                    rel="nofollow noopener noreferrer"
                                    target="_blank"
                                    className="share-icon-fb"
                                  >
                                    <div className="icon-cont">
                                      <AiFillFacebook size={30} />{" "}
                                    </div>
                                  </a>
                                  <p className="mt-2 shrtext">Facebook</p>
                                </Col>
                                <Col className="text-center d-flex justify-content-center flex-column align-items-center">
                                  <a
                                    href={`https://twitter.com/share?url=https://zoofi.in/product-details/${ProductId}&via=TWITTER_HANDLE&text=Check out this`}
                                    target="_blank"
                                    rel="noreferrer"
                                    title="Share on Twitter"
                                    className="share-icon-twitter"
                                  >
                                    <div className="icon-cont">
                                      <FaSquareXTwitter size={30} />
                                    </div>
                                  </a>
                                  <p className="mt-2 shrtext">Twitter</p>
                                </Col>
                                <Col className="text-center d-flex justify-content-center flex-column align-items-center">
                                  <a
                                    href={`mailto:?subject=I wanted you to see this site&amp;body=Check out this site https://zoofi.in/product-details/${ProductId}`}
                                    title="Share by Email"
                                  >
                                    <div className="icon-cont">
                                      <IoMail color="#686D76" size={30} />
                                    </div>
                                  </a>
                                  <p className="mt-2 shrtext">E-Mail</p>
                                </Col>
                                <Col
                                  className="text-center d-flex justify-content-center flex-column align-items-center"
                                  onClick={() =>
                                    navigator.clipboard.writeText(
                                      `https://zoofi.in/product-details/${ProductId}`
                                    )
                                  }
                                >
                                  <div className="icon-cont">
                                    <FiPaperclip size={30} />
                                  </div>
                                  <p className="mt-2 shrtext">Copy</p>
                                </Col>
                              </Row>
                            </Modal.Body>
                          </Modal>
                        </>
                      )}
                    </div>
                    {productDes?.productId?.brandId?.brand_origin ? (
                      <div className="product-rating">
                        <span className="MIN-Home">
                          Home Grown Indian Brand
                        </span>
                      </div>
                    ) : (
                      <div className="MIN-row">
                        <img src={makeInIndia} alt="" />
                      </div>
                    )}
                    <div className="product-rating">
                      <div className="rating-stars">
                        <StarRating value={avgRating} />({reviewData?.length}{" "}
                        customer reviews)
                      </div>

                      <div className="rating-stars">
                        <span
                          className="mx-4 share-btn"
                          ref={target}
                          onClick={() => setShowOptions(!showsOptiopns)}
                        >
                          <RiShareForwardFill col /> Share{" "}
                        </span>
                      </div>
                    </div>
                    <div className="divider"></div>
                    <div className="supplier-stock">
                      <label className="availability">
                        Availability:
                        {stock?.productId?.available_qty > 0 ? (
                          <span className="mx-2 instock">
                            {`${stock?.productId?.available_qty} in stock`}
                          </span>
                        ) : (
                          <span className="mx-2 outofstock">Out of stock</span>
                        )}
                      </label>
                    </div>
                    <div className="sku">
                      <strong>SKU: </strong>
                      {productDes?.specId?.skuId?.toUpperCase()}
                    </div>
                    <div className="price-row">
                      <div className="price">
                        ₹{(productDes?.price * quans)?.toLocaleString()}
                        <span className="percent-off">
                          {calculateDiscountPercentage(
                            productDes?.specId?.price,
                            productDes?.price
                          ).toFixed(2)}
                          % Off
                        </span>
                        <br />
                        <div className="price-original">
                          M.R.P -{" "}
                          <span>
                            ₹
                            {(
                              productDes?.specId?.price * quans
                            )?.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <div className="wishlist-compare">
                        {isAlreadywishedFunc() ? (
                          <a onClick={() => SavetoWishList()} className="added">
                            <FaHeart size={30} />
                            Added to Wishlist
                          </a>
                        ) : (
                          <a onClick={() => SavetoWishList()}>
                            <CiHeart size={40} />
                            Add To Wishlist
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="divider"></div>
                    <div className="color-quantity">
                      <QansAndBuy
                        quans={quans}
                        setquans={setquans}
                        isAlreadycart={isAlreadycart}
                        stock={stock}
                        isDelivertStatus={isDelivertStatus}
                        checkDeisableClick={checkDeisableClick}
                        ProductId={ProductId}
                        productDes={productDes}
                      />
                    </div>
                    <div className="divider"></div>

                    <div className="delivery-to">
                      <Pincheck
                        deliveyAddress={deliveyAddress}
                        handleAddressChange={handleAddressChange}
                        setEnterPincode={setEnterPincode}
                        checkPincodeHandler={checkPincodeHandler}
                        enterPincode={enterPincode}
                        Isdeliverable={Isdeliverable}
                        isDelivertStatus={isDelivertStatus}
                        loccheckLoading={loccheckLoading}
                      />
                    </div>
                    {productDes?.estimateDate && (
                      <div
                        className="nck-vsmall mt-1"
                        style={{
                          fontSize: "10px",
                          color: deliveyAddress ? "darkgreen" : "darkblack",
                          fontWeight: "bold",
                        }}
                      >
                        <div className="customMargin">
                          <span className="mx-2">
                            <img src={comming} width={25} />
                          </span>{" "}
                          {estimatedDeliveryTimes(productDes?.estimateDate)}
                        </div>
                      </div>
                    )}
                    <div className="key-features mb-4 mt-4">
                      <p className="availability2 fs-7 text-dark">
                        Key Features
                      </p>
                      <ul>
                        {productDes?.productId?.features?.length > 0 &&
                          productDes.productId.features.map((ele, index) =>
                            ele ? <li key={index}>{ele}</li> : null
                          )}
                      </ul>
                    </div>
                    <Offers offerDatalist={offerDatalist} />
                    <Services productDes={productDes} />
                    <div className="divider"></div>

                    <div className="specContainer mt-4">
                      {otherProductSpecs?.length > 0 &&
                        otherProductSpecs
                          ?.filter((ele) => ele?.specId !== null)
                          ?.map((ele) => (
                            <ul
                              className={
                                productDes?.specId?._id == ele?.specId?._id
                                  ? "otherspecContainer hightlited shadow-sm rounded"
                                  : "otherspecContainer shadow-sm rounded"
                              }
                              key={ele.key}
                              onClick={() => redirectTodetailsPage(ele?._id)}
                            >
                              {ele?.specId?.spec_det
                                ?.slice(0, 3)
                                ?.map((item) => (
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

                    <div className="divider"></div>

                    <div className="supplier-stock">
                      <label className="availability2">Sold By:</label>
                      <div
                        className="shop_name"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      >
                        <span className="seller-name">
                          {seller?.Shop_Details_Info?.shope_name?.slice(0, 10)}
                          {"..."}
                        </span>

                        <span className="sellerratingstar">
                          {" "}
                          {Math.round(seller?.review) || 0}{" "}
                          <FaStar color="#9af064" />
                        </span>

                        {showInfo && (
                          <div className="seller-info">
                            <div className="wrapper">
                              <div className="seller-info-content">
                                <p>{seller?.user_name}</p>
                                <p>({seller?.Shop_Details_Info?.state})</p>
                                <p>
                                  <span>
                                    {seller?.Shop_Details_Info?.old_shope_desc}+
                                  </span>
                                  years in business
                                </p>
                                <p>
                                  <span>
                                    {
                                      seller?.Shop_Details_Info
                                        ?.total_no_of_unit
                                    }
                                    +
                                  </span>
                                  units sold per year
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <p
                      className="otherSellerText"
                      onClick={() =>
                        navigate(
                          `/allSellerByProduct/${productDes?.productId?._id}/${productDes?.specId?._id}`
                        )
                      }
                    >
                      See All Other Sellers
                    </p>

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
                                {productDes?.specId?.spec_det?.length > 0 &&
                                  productDes?.specId?.spec_det?.map(
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
                              {productDes?.productId?.desc}
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
                                    productDes?.productId?.full_desc
                                  )}
                                />
                              )}
                              <span
                                className="v-specs"
                                onClick={() =>
                                  scrollToSection(technicalSectionRef)
                                }
                              >
                                View Full Specification
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="expandables">
                      <ProductRating
                        avgRating={avgRating}
                        reviewData={reviewData}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="related-product-section mb-4">
              <RecentView />
            </div>
            <div className="mb-4" ref={technicalSectionRef}>
              {""}
            </div>
            <div className="product-specifications mt-5">
              <InfoTable
                productDes={productDes}
                avgRating={avgRating}
                reviewData={reviewData}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
