import React, { useEffect, useState } from "react";
import { FaMicrophoneAlt } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "swiper/css";
import { getAllCategories } from "../../../Api/api";
import logoNew from "../../../assets/images/logo-new.png";
import shoppingVideo from "../../../assets/videos/shopping.mp4";
import { fetchCategory } from "../../../store/categorySlice";
import { useDispatch, useSelector } from "react-redux";

export const MainHomeView = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [searchcategory, setSearchCateryId] = useState("all");
  const [searchText, setsearchtext] = useState("");
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);


  const { data: allCategories, isLoading } = useSelector(
    (state) => state?.category || []
  );

  useEffect(() => {
    dispatch(fetchCategory());
  }, []);

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

  return (
    <>
      <section className="section-1">
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

                  {allCategories?.length > 0 &&
                    allCategories.map((option, index) => (
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

              {!isLoading && (
                <ul className="navbar-nav category-nav">
                  {allCategories?.length > 0 &&
                    allCategories.slice(0, 10).map((ele, index) => (
                      <li
                        key={ele?._id || index}
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

              {isLoading && (
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
