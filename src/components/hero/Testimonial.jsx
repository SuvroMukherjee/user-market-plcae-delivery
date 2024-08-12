import React, { useEffect, useState, useRef, useCallback } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import leftQuote from "../../assets/images/left-quote.png";
import rightQuote from "../../assets/images/right-quote.png";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import './styles.css';
// import './Testimonial.css'

// import required modules
import { A11y, FreeMode, Navigation,  Scrollbar, Thumbs } from "swiper/modules";
import { getTestimonialsApi } from "../../Api/api";
import { EmptyStar } from "../customSvgs/EmptyStar";
import { Star } from "../customSvgs/Star";

export default function Testimonial() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const getTestimonials = async () => {
      try {
        const response = await getTestimonialsApi();
        if (response.status === 200) {
          setTestimonials(response?.data?.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getTestimonials();
  }, []);
  

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
      {/*}
      <div className="testimonial-main-swiper">
        <Swiper
          style={{
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          }}
          loop={true}
          spaceBetween={10}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="testimonialMainSwiper"
        >
          {testimonials.length > 0 &&
            testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="testimonial-content">
                  <div className="top-row">
                    <div className="quote-mark left-side">
                      <img src={leftQuote} alt="" />
                    </div>
                    <div
                      className="quote-text"
                      style={{
                        textAlign: "justify",
                      }}
                    >
                      {testimonial?.description.length > 300
                        ? testimonial?.description.slice(0, 300) + "..."
                        : testimonial?.description}
                    </div>
                    <div className="quote-mark right-side">
                      <img src={rightQuote} alt="" />
                    </div>
                  </div>
                  <div className="bottom-row">
                    <p className="author">{testimonial?.name}</p>
                    <div className="rating-stars">
                      {Array.from({ length: testimonial?.review }, (_, i) => (
                        <Star key={i} />
                      ))}
                      {Array.from(
                        { length: 5 - testimonial?.review },
                        (_, i) => (
                          <EmptyStar key={i} />
                        )
                      )}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
      <div className="testimonial-thumb-swiper">
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          slidesPerView={7}
          centeredSlides={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="testimonialThumbSwiper"
          breakpoints={{
            320: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 5,
            },
            1024: {
              slidesPerView: 7,
            },
          }}
        >
          {testimonials.length > 0 &&
            testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="thumb-img">
                  <img src={testimonial?.img} alt="" />
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
      */}

      <div className="testimonial-swiper-wrapper">
        <Swiper
          modules={[Navigation, Scrollbar, A11y]}
          className="testimonialMainSwiper"
          spaceBetween={20}
          slidesPerView={4}
          loop={true}
          ref={sliderRef}
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            992: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
        >
          {testimonials.length > 0 && testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="testimonial-content">
                <div className="top-row">
                  <div className="quote-mark left-side">
                    <img src={leftQuote} alt="" />
                  </div>
                  <div className="quote-text">
                    {testimonial?.description.length > 300
                      ? testimonial?.description.slice(0, 300) + "..."
                      : testimonial?.description}
                  </div>
                  <div className="quote-mark right-side">
                    <img src={rightQuote} alt="" />
                  </div>
                </div>
                <div className="bottom-row">
                  <p className="author">{testimonial?.name}</p>
                  <div className="product-name">{testimonial?.productName}</div>
                  <div className="rating-stars">
                    {Array.from({ length: testimonial?.review }, (_, i) => (
                      <Star key={i} />
                    ))}
                    {Array.from(
                      { length: 5 - testimonial?.review },
                      (_, i) => (
                        <EmptyStar key={i} />
                      )
                    )}
                  </div>
                </div>
              </div>
              <div className="testimonial-content-bottom">
                  <div className="thumb-img">
                    <img src={testimonial?.img} alt="testimonialImg" />
                  </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="testimonial-swiper-nav">
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
    </>
  );
}
