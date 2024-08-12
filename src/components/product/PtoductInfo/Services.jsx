import "swiper/css";
import "swiper/css/navigation";
import { A11y, Navigation, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Services = ({ productDes }) => {
  return (
    <>
      {productDes?.services?.length > 0 && (
        <>
          <div className="divider"></div>
          <div className="pt-2 pb-2">
            <Swiper
              modules={[Navigation, Scrollbar, A11y]}
              className="swiper-wrapper home-grown-swiper"
              spaceBetween={10}
              slidesPerView={6}
              //  ref={sliderRef}
              breakpoints={{
                280: {
                  slidesPerView: 3,
                },
                576: {
                  slidesPerView: 4,
                },
                768: {
                  slidesPerView: 5,
                },
                1200: {
                  slidesPerView: 6,
                },
              }}
            >
              {productDes?.services?.map((ele) => (
                <SwiperSlide className="cursor nck-small">
                  <div className="svDIv">
                    <div className="svImg mt-2">
                      <img
                        src={ele?.product_service?.image}
                        alt="img"
                        width={40}
                      />
                    </div>
                    <div className="mt-4 nck-extrasmall">
                      <p>{ele?.product_service?.name}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </>
      )}
    </>
  );
};

export default Services;
