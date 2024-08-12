import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import com_cat1 from "../../../assets/images/coomingCat/comcat1.jpg";
import com_cat2 from "../../../assets/images/coomingCat/comcat2.jpg";
import com_cat3 from "../../../assets/images/coomingCat/comcat3.jpg";
import com_cat4 from "../../../assets/images/coomingCat/comcat4.jpg";
import com_cat5 from "../../../assets/images/coomingCat/comcat5.jpg";
import com_cat6 from "../../../assets/images/coomingCat/comcat6.jpg";
import com_cat7 from "../../../assets/images/coomingCat/comcat7.jpg";
import com_cat8 from "../../../assets/images/coomingCat/comcat8.jpg";
import com_cat9 from "../../../assets/images/coomingCat/comcat9.jpg";

const HomeUpComming = () => {


  return (
    <div>
      <section className="coming-cat">
        <div className="container-fluid container-padding">
          <div className="row">
            <div className="col-12">
              <div className="section-heading">
                <h2>Upcoming Categories</h2>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <Swiper
                spaceBetween={20}
                slidesPerView={3}
                loop={true}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="swiper-wrapper coming-cat-swiper"
                breakpoints={{
                  280: {
                    slidesPerView: 1,
                  },
                  576: {
                    slidesPerView: 2,
                  },
                  1200: {
                    slidesPerView: 3,
                  },
                }}
              >
                <SwiperSlide>
                  <div className="content-wrap">
                    <img src={com_cat1} alt="" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="content-wrap">
                    <img src={com_cat2} alt="" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="content-wrap">
                    <img src={com_cat3} alt="" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="content-wrap">
                    <img src={com_cat4} alt="" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="content-wrap">
                    <img src={com_cat5} alt="" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="content-wrap">
                    <img src={com_cat6} alt="" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="content-wrap">
                    <img src={com_cat7} alt="" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="content-wrap">
                    <img src={com_cat8} alt="" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="content-wrap">
                    <img src={com_cat9} alt="" />
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeUpComming;
