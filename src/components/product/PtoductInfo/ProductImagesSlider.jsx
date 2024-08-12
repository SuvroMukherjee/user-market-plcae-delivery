import PropTypes from "prop-types";
import { useState } from "react";
import { Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "./product-image-slider.css";

const ProductImagesSlider = (props) => {
  const [activeThumb, setActiveThumb] = useState(null);
  return (
    <>
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation, Thumbs]}
        grabCursor={true}
        thumbs={{
          swiper: activeThumb && !activeThumb?.destroyed ? activeThumb : null,
        }}
        className="product-images-slider mainProductSwipper"
      >
        {props.images.map((item, index) => (
          <SwiperSlide key={index}>
            {props?.productDes?.is_bestSell && (
              <div className="best-seller-badge">Best Seller</div>
            )}
            <div className="image-wrapper">
              <img
                src={item?.image_path}
                alt="product images"
                className="img-fluid img-thumbnail"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setActiveThumb}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        modules={[Navigation, Thumbs]}
        className="product-images-slider-thumbs mt-2 productThumbSwiper"
      >
        {props.images.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="product-images-slider-thumbs-wrapper image-wrapper">
              <img src={item?.image_path} alt="product images" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

ProductImagesSlider.propTypes = {
  images: PropTypes.array.isRequired,
};

export default ProductImagesSlider;
