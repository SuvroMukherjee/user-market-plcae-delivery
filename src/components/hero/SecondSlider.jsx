import React, { useCallback, useRef } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import hg1 from "../../assets/images/hg-1.png";
import hg2 from "../../assets/images/hg-2.png";
import youtube1 from "../../assets/images/youtube1.png";

const SecondSlider = ({ IndianGrownProductVideo }) => {
  const swiperRef = useRef(null);

  const goPrev = () => {
    if (swiperRef && swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const goNext = () => {
    if (swiperRef && swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  function extractYouTubeVideoId(iframeString) {
    const match =
      iframeString && iframeString.match(/youtube\.com\/embed\/([^"?]+)/);
    return match ? match[1] : null;
  }
  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
      mute: 1,
      controls: 0,
    },
  };

  const sliderRef = useRef(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  return (
    <>
      <section className="section-2">
        <div className="container-fluid">
          <div className="row">
            {/* <div className="col-12"> */}
            {/* <div className="section-heading"> */}
            {/* <h2>Discover Home Grown Indian Brands</h2> */}
            {/* <div className="slider-nav-arrow">
                                    <button type="button" className="disabled" onClick={goPrev}>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288 480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 73.4-73.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-128 128z" /></svg>
                                    </button>
                                    <button onClick={goNext}>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z" /></svg>
                                    </button>
                                </div> */}
            {/* </div> */}
            {/* </div> */}
            <div className="col-lg-3 col-12 content-left">
              <h3>Discover Home Grown Indian Brands</h3>
              <div className="discover-swiper-nav">
                <button className="prev-arrow nav-btn" onClick={handlePrev}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 12H5"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 5L5 12L12 19"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button className="next-arrow nav-btn" onClick={handleNext}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 12H19"
                      stroke="#9AF064"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 19L19 12L12 5"
                      stroke="#9AF064"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="col-lg-9 col-12 content-right">
              <Swiper
                spaceBetween={20}
                // ref={swiperRef}
                slidesPerView={"auto"}
                ref={sliderRef}
                className="discover-slider"
              >
                {/* {Array.from({ length: 20 }).map((_, index) => (
                                    <SwiperSlide key={index}>
                                        <div class="col-md-4">
                                            <div class="silder-content">
                                                video
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))} */}
                {/* <div className="custom-buttons">
                            <button onClick={goPrev}>Previous</button>
                            <button onClick={goNext}>Next</button>
                        </div> */}

                {/*{IndianGrownProductVideo[0]?.length > 0 && IndianGrownProductVideo[0]?.map((ele,index)=>(
                                    <SwiperSlide key={index}>
                                        <div class="silder-content">
                                            <YouTube videoId={extractYouTubeVideoId(ele?.image_path)} opts={opts} className="discover-video" />
                                            {/* <YouTube videoId={"xqyUdNxWazA"} opts={opts} /> */}
                {/*</div>
                                    </SwiperSlide>
                                ))} */}
                <SwiperSlide key="1">
                  <div className="video-wrap">
                    <a href="#" target="_blank">
                      <img src={hg1} alt="" />
                      <div className="overlay"></div>
                      <div className="content">
                        <span>Watch Now</span>
                        <img src={youtube1} alt="" />
                      </div>
                    </a>
                  </div>
                </SwiperSlide>
                <SwiperSlide key="2">
                  <div className="video-wrap">
                    <a href="#" target="_blank">
                      <img src={hg2} alt="" />
                      <div className="overlay"></div>
                      <div className="content">
                        <span>Watch Now</span>
                        <img src={youtube1} alt="" />
                      </div>
                    </a>
                  </div>
                </SwiperSlide>
                <SwiperSlide key="3">
                  <div className="video-wrap">
                    <a href="#" target="_blank">
                      <img src={hg2} alt="" />
                      <div className="overlay"></div>
                      <div className="content">
                        <span>Watch Now</span>
                        <img src={youtube1} alt="" />
                      </div>
                    </a>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SecondSlider;
