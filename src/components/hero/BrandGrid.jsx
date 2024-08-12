import { useState } from "react";
import { useSelector } from "react-redux";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const BrandGrid = () => {
  const selectedProduct = useSelector((state) => state?.products?.data);

  const { brandData } = selectedProduct || {};

  const [visibleItemCount, setVisibleItemCount] = useState(18);

  const handleViewMore = async () => {
    // Increase the visible item count to show all items
    setVisibleItemCount(brandData?.length);
  };

  const handleViewLess = () => {
    // Reset the visible item count to show only the initial 12 items
    setVisibleItemCount(18);
  };

  return (
    <>
      <section className="section-5">
        <div className="container-fluid container-padding">
          {/* <div className="row">
                        <div className="col-12">
                            <div className="section-heading">
                                <h2>Shop by brands</h2>
                            </div>
                        </div>
                    </div> */}
          {/* <div className="row row-2"> */}
          <div className="row">
            {/* <div className="col-12 item-group-col"> */}
            <div className="col-lg-3 col-12">
              <h3>Crafted in India, Celebrated Worldwide</h3>
              {/* <p>
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
              </p> */}
              <p>Home Grown Indian Brands.</p>
            </div>
            <div className="col-lg-9 col-12">
              {/* <div className="item-group-box item-group-box-2"> */}
              {/* <h3>Popular Indian Brands</h3> */}
              {/* <div className="grid-container">
                                    {brandData?.length > 0 && brandData?.slice(0, visibleItemCount)?.map((ele)=>(
                                        
                                         <div className="grid-item" style={{background:'red'}}>
                                             <a >
                                                 <div className="item-image">
                                                     <img
                                                        src={ele?.image?.[0]?.image_path}
                                                         alt=""
                                                     />
                                                 </div>
                                             </a>
                                         </div>
                                     ))}
                                </div> */}
              <ul className="brands-list">
                {/* <Swiper
                                       // modules={[Navigation, Pagination, Scrollbar, A11y]}
                                        // spaceBetween={50}
                                        // slidesPerView={3}
                                        // navigation
                                        // pagination={{ clickable: true }}
                                        // scrollbar={{ draggable: true }}
                                        // onSwiper={(swiper) => console.log(swiper)}
                                        // onSlideChange={() => console.log('slide change')}
                                        // autoplay={{ delay: 5, disableOnInteraction: false }}
                                        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                                        className="swiper-wrapper"
                                        pagination={{ clickable: true }}
                                        spaceBetween={10}
                                        slidesPerView={6}
                                        freeMode={true}
                                        watchSlidesVisibility={true}
                                        watchSlidesProgress={true}
                                        autoplay={{ delay: 500, disableOnInteraction: false }}
                                    > */}
                {brandData?.length > 0 &&
                  brandData?.slice(0, visibleItemCount)?.map((ele, index) => (
                    // <SwiperSlide>
                    <li key={index}>
                      <div className="item-image">
                        <img
                          style={{
                            // filter: 'grayscale(100%)',
                            // color: "white",
                            filter: "grayscale(100%) brightness(0) invert(1)",
                          }}
                          src={ele?.image?.[0]?.image_path}
                          alt="pic"
                        />
                      </div>
                    </li>
                    // </SwiperSlide>
                  ))}
                {/* </Swiper> */}
              </ul>
              {brandData?.length > 18 && (
                <div className="view-more-brand">
                  {visibleItemCount == 18 ? (
                    <a onClick={handleViewMore}>View More Brands</a>
                  ) : (
                    <a onClick={handleViewLess}>View Less</a>
                  )}
                </div>
              )}
              {/* </div> */}
            </div>
            {/* </div> */}

            {/* <div>
                                <Swiper
                                    // install Swiper modules
                                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                                    spaceBetween={50}
                                    slidesPerView={6}
                                    navigation
                                    pagination={{ clickable: true }}
                                    scrollbar={{ draggable: true }}
                                    autoplay={{ delay: 500, disableOnInteraction: false }}
                                    onSwiper={(swiper) => console.log(swiper)}
                                    onSlideChange={() => console.log('slide change')}
                                >
                                    {brandData?.length > 0 && brandData?.slice(0, visibleItemCount)?.map((ele) => (
                                        <SwiperSlide>
                                        <div className="grid-item" style={{ background: 'red' }}>
                                            <a >
                                                <div className="item-image">
                                                    <img
                                                        src={ele?.image?.[0]?.image_path}
                                                        alt=""
                                                    />
                                                </div>
                                            </a>
                                        </div>
                                        </SwiperSlide>
                                    ))}

                                  
                                    ...
                                </Swiper>
                            </div> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default BrandGrid;
