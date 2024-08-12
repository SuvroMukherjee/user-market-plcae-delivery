import { useCallback, useRef } from "react";
import { useSelector } from "react-redux";
import "swiper/css";
import "swiper/css/navigation";
import { A11y, Navigation, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ProductCard, ProductCardSkeleton } from "../ProductCard/ProductCard";

const SpecificProduct = ({ productsLoading }) => {
  const selectedProduct = useSelector((state) => state?.products?.data);

  const { productData } = selectedProduct || {};

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
      <section className="section-4">
        <div className="container-fluid container-padding">
          <div className="row">
            <div className="col-12">
              <div className="section-heading">
                <h2>Home Grown Indian Products</h2>
              </div>
            </div>
          </div>

          <div className="home-grown-swiper-nav">
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

          <Swiper
            modules={[Navigation, Scrollbar, A11y]}
            className="swiper-wrapper home-grown-swiper"
            spaceBetween={20}
            slidesPerView={4}
            ref={sliderRef}
            breakpoints={{
              280: {
                slidesPerView: 1,
              },
              576: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1200: {
                slidesPerView: 4,
              },
            }}
          >
            {productsLoading &&
              Array.from({ length: 8 }, (_, i) => (
                <SwiperSlide key={i}>
                  <ProductCardSkeleton type={"swiper"} />
                </SwiperSlide>
              ))}

            {!productsLoading &&
              productData?.length > 0 &&
              productData?.slice(0, 100).map((ele, index) => (
                <SwiperSlide key={index}>
                  <ProductCard ele={ele} type={"swiper"} />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default SpecificProduct;
