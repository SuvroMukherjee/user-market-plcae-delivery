import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { getAllTopCategories } from "../../../Api/api";

const chunkArray = (array, chunkSize) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
};

const HomeCategoryList = () => {
  const [topCategories, setTopCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const sliderRef = useRef(null);

  async function getTopCategories() {
    try {
      setIsLoading(true);
      const res = await getAllTopCategories();
      let filterData = res?.data?.data?.filter((ele) => {
        return ele?.status == true;
      });
      setTopCategories(chunkArray(filterData, 5));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getTopCategories();
  }, []);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  return (
    <div>
      <Swiper
        slidesPerView={1}
        loop={true}
        ref={sliderRef}
        className="swiper-wrapper coming-cat-swiper"
      >
        {!isLoading &&
          topCategories?.map((chunk, chunkIndex) => (
            <SwiperSlide>
              <div key={chunkIndex} className="top-cat-blocks">
                {chunk
                  ?.sort(
                    (a, b) => new Date(a?.updatedAt) - new Date(b?.updatedAt)
                  )
                  ?.map((ele, index) => (
                    <div
                      key={index}
                      className="top-cat-block cursor"
                      onClick={() => navigate(`/category/${ele?._id}`)}
                    >
                      <img
                        src={ele?.image?.[0]?.image_path}
                        alt="category_image"
                      />
                      <label>{ele?.title}</label>
                    </div>
                  ))}
              </div>
            </SwiperSlide>
          ))}
      </Swiper>

      {!isLoading && topCategories?.length > 1 && (
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
      )}
    </div>
  );
};

export default HomeCategoryList;
