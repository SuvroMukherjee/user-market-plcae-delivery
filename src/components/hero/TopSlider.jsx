import React, { useEffect, useState } from "react";
import { FaMicrophoneAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import { searchProduct } from "../../Api/api";
import logoNew from "../../assets/images/logo-new.png";
import qrCode from "../../assets/images/QR_code.png";
import shoppingVideo from "../../assets/videos/shopping.mp4";
import { searchProudct } from "../../store/searchproductSlice";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";

export const TopSlider = ({ topBannerImages, productsLoading }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const data = useSelector((state) => state?.products?.data || []);
  const { categoryData = [] } = data;
  const reversedCategoryData = [...categoryData]?.reverse();

  const [searchcategory, setSearchCateryId] = useState("all");
  const [searchText, setsearchtext] = useState("");
  const [resultList, setResultList] = useState([]);

  const handleKeyDown = async (event) => {
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

  const [transcript, setTranscript] = useState("");
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

  useEffect(() => {
    if (searchText == "") {
      setResultList([]);
    }
  }, [searchText]);

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

  const handleSearch = async () => {
    dispatch(searchProudct?.clearSearchproduct());

    if (searchText?.length > 2) {
      let payload = {
        searchText: searchText,
        categoryId: searchcategory,
      };

      let res = await searchProduct(payload);

      const filtered = res?.data?.data.filter((item) => {
        const productName = item?.productId?.name?.toLowerCase() || "";
        const brandName = item?.productId?.brandId?.title?.toLowerCase() || "";
        const combinedName = productName + " " + brandName;

        const searchTextLower = searchText?.toLowerCase() || "";

        const subStringArray = searchTextLower.split(" ");
        const mainStringArray = combinedName.split(" ");

        const matchFound = subStringArray.every((word) =>
          mainStringArray.includes(word)
        );

        return matchFound;
      });
      console.warn("filtered", filtered);
      dispatch(searchProudct?.addSearchProduct(filtered));
      setResultList(filtered);
      navigate("/searchproduct");
    }
  };

  return (
    <>
      <section className="section-1">
        {/*<div className="container">
          <div className="row">
            <div className="col-12">*/}
        {/*<Swiper
                className="banner-slide"
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: true,
                }}
                // pagination={{
                //   clickable: true,
                // }}
                // navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
              >
                {topBannerImages[0]?.length > 0 &&
                  topBannerImages[0]?.map((ele) => (
                    <SwiperSlide onClick={() => navigate("/brand")}>
                      <a>
                        <img src={ele?.image_path} alt="top_banner" />
                      </a>
                    </SwiperSlide>
                  ))}
                {/* <SwiperSlide>
                  <a >
                    <img src={homebanner1} alt="img1" />
                  </a>
                </SwiperSlide>
                <SwiperSlide>
                  <a >
                    <img src={homebanner1} alt="img2" />
                  </a>
                </SwiperSlide> */}
        {/* Add more SwiperSlides here for additional images */}
        {/*</Swiper>*/}
        {/*</div>
          </div>
        </div>*/}
        <div className="home-banner">
          <div className="video-holder">
            <video loop autoPlay muted>
              <source src={shoppingVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="overlay"></div>
          </div>

          <div className="contentHolder">
            <div className="container">
              <div className="logo-row" onClick={() => navigate("/")}>
                <img src={logoNew} alt="" />
              </div>

              <div className="search-form">
                <select
                  className="filter-dropdown categoryFilterIcon"
                  value={searchcategory}
                  onChange={(e) => setSearchCateryId(e.target.value)}
                >
                  <option value={"all"}>All</option>
                  {reversedCategoryData.map((option, index) => (
                    <option key={index} value={option?._id}>
                      {option?.title}
                    </option>
                  ))}
                </select>
                <input
                  className="form-control"
                  type="search"
                  value={searchText}
                  placeholder="Search for Products, Brands & more..."
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

                {/* <span className="search-mph">
                  <FaMicrophoneAlt size={30} />
                </span> */}
                {isListening ? (
                  <span className="search-mph">
                    <FaMicrophoneAlt size={30} color="#FF6969" />
                  </span>
                ) : (
                  <span className="search-mph">
                    <FaMicrophoneAlt
                      size={30}
                      onClick={startListening}
                      disabled={isListening}
                    />
                  </span>
                )}
                <button
                  className="btn"
                  onClick={(e) => {
                    e.preventDefault();
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
                  }}
                >
                  Go
                </button>
              </div>

              {!productsLoading && (
                <ul className="navbar-nav category-nav">
                  {reversedCategoryData?.length > 0 &&
                    reversedCategoryData.slice(0, 10).map((ele, index) => (
                      <li
                        key={ele?._id || index} // Use a unique key if available
                        className="nav-item"
                        onClick={() => navigate(`/category/${ele?._id}`)}
                      >
                        <a className="nav-link" aria-current="page">
                          {ele?.title}
                        </a>
                      </li>
                    ))}
                </ul>
              )}

              {/* <ul className="navbar-nav category-nav">
                {reversedCategoryData?.length > 0 &&
                  reversedCategoryData.slice(0, 10).map((ele, index) => (
                    <li
                      key={ele?._id || index} // Use a unique key if available
                      className="nav-item"
                      onClick={() => navigate(`/category/${ele?._id}`)}
                    >
                      <a className="nav-link" aria-current="page">
                        {ele?.title}
                      </a>
                    </li>
                  ))}
              </ul> */}

              {productsLoading && (
                <ul className="navbar-nav category-nav">
                  {Array.from({ length: 7 }).map((_, index) => (
                    <li key={index} className="nav-item">
                      <Skeleton
                        height={10}
                        width={150}
                        className="skeleton-nav"
                      />
                    </li>
                  ))}
                </ul>
              )}

              {/* <ul className="navbar-nav category-nav">
                {Array.from({ length: 7 }).map((_, index) => (
                  <li key={index} className="nav-item">
                    <Skeleton
                      height={10}
                      width={150}
                      className="skeleton-nav"
                    />
                  </li>
                ))}
              </ul> */}

              <div className="cta-row">
                <div
                  className="view-all-cta"
                  onClick={() => navigate("/brand")}
                >
                  View all Home Grown Brands
                </div>
                {/* <div className="qr-cta">
                  <span>Download App Now</span>
                  <img src={qrCode} alt="" />
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
