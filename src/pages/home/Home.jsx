import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { updateUserData } from "../../Api/api";
import BestSeller from "../../components/hero/BestSeller";
import BrandGrid from "../../components/hero/BrandGrid";
import SpecificProduct from "../../components/hero/SpecificProduct";
import { TopSlider } from "../../components/hero/TopSlider";
import { FullPageLoader } from "../../components/Loader/FullPageLoader";
import { authActions } from "../../store/authSlice";
import { bannerListdata } from "../../store/bannerSlice";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import com_cat1 from "../../assets/images/coomingCat/comcat1.jpg";
import com_cat2 from "../../assets/images/coomingCat/comcat2.jpg";
import com_cat3 from "../../assets/images/coomingCat/comcat3.jpg";
import com_cat4 from "../../assets/images/coomingCat/comcat4.jpg";
import com_cat5 from "../../assets/images/coomingCat/comcat5.jpg";
import com_cat6 from "../../assets/images/coomingCat/comcat6.jpg";
import com_cat7 from "../../assets/images/coomingCat/comcat7.jpg";
import com_cat8 from "../../assets/images/coomingCat/comcat8.jpg";
import com_cat9 from "../../assets/images/coomingCat/comcat9.jpg";
import TopCatComp from "../../components/category/TopCatComp";
import HomePage from "./HomePage";

// export const Home = () => {
//   const totalBannerLists = useSelector(bannerListdata) || [];

//   const userData = useSelector((state) => state?.auth?.userdata);

//   const { isLoggIn } = useSelector((state) => state?.auth);

//   console.log({ userData });

//   const dispatch = useDispatch();

//   const navigate = useNavigate();

//   const [userDataUpdating, setUserDataUpdating] = useState(false);

//   const [showWelcomeModal, setShowWelcomeModal] = useState(
//     !userData?.isWelcome
//   );

//   const handleHideWelcomeModal = async () => {
//     try {
//       setUserDataUpdating(true);
//       const res = await updateUserData({
//         isWelcome: true,
//       });

//       if (res.status === 200) {
//         dispatch(
//           authActions.update({
//             ...userData,
//             isWelcome: true,
//           })
//         );
//       }
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setShowWelcomeModal(false);
//       setUserDataUpdating(false);
//     }
//   };

//   console.log({ totalBannerLists });

//   const topBannerImages = totalBannerLists
//     .filter((item) => item?.banner_typeId?.banner_type === "Top Banner")
//     .map((item) => item.image);

//   // const IndianGrownProductVideo = totalBannerLists
//   //   .filter(
//   //     (item) =>
//   //       item?.banner_typeId?.banner_type === "indian grown product videos new"
//   //   )
//   //   .map((item) => item.image);

//   const { isLoading: productsLoading } = useSelector((state) => state.products);
//   // useEffect(() => {
//   //   if (productsLoading || showWelcomeModal) {
//   //     document.body.style.overflow = "hidden";
//   //   } else {
//   //     document.body.style.overflow = "auto";
//   //   }
//   // }, [productsLoading, showWelcomeModal]);

//   return (
//     <>
//       {/* {productsLoading && <FullPageLoader />} */}
//       {true && (
//         <>
//           <div className="page-content mb-4">
//             <TopSlider topBannerImages={topBannerImages} productsLoading={productsLoading} />
//             <SpecificProduct productsLoading={productsLoading} />
//             {/* <AdSlider exploreAll={exploreAll}/> */}
//             <section className="category-section">
//               <div className="container-fluid container-padding">
//                 <div className="section-heading">
//                   <h2>Top Categories</h2>
//                   <a
//                     onClick={() => navigate(`/category/all`)}
//                     className="cta-view"
//                   >
//                     View All Categories
//                   </a>
//                 </div>
//                 {/* <CategoryBox /> */}
//                 {/* <div className="top-cat-blocks">
//                   <div className="top-cat-block">
//                     <img src={top_cat1} alt="" />
//                     <label>Refrigerator</label>
//                   </div>
//                   <div className="top-cat-block">
//                     <img src={top_cat2} alt="" />
//                     <label>Air Conditioners</label>
//                   </div>
//                   <div className="top-cat-block">
//                     <img src={top_cat3} alt="" />
//                     <label>LED TV</label>
//                   </div>
//                   <div className="top-cat-block">
//                     <img src={top_cat4} alt="" />
//                     <label>Kitchen Appliances</label>
//                   </div>
//                   <div className="top-cat-block">
//                     <img src={top_cat5} alt="" />
//                     <label>Washing Machine</label>
//                   </div>
//                 </div> */}
//                 <TopCatComp />
//               </div>
//             </section>
//             <section className="coming-cat">
//               <div className="container-fluid container-padding">
//                 <div className="row">
//                   <div className="col-12">
//                     <div className="section-heading">
//                       <h2>Upcoming Categories</h2>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="row">
//                   <div className="col-12">
//                     <Swiper
//                       // modules={[Navigation, Scrollbar, A11y, Autoplay]}
//                       // className="swiper-wrapper coming-cat-swiper"
//                       // spaceBetween={20}
//                       // slidesPerView={3}
//                       // autoPlay={{ delay: 500, disableOnInteraction: false }}
//                       // loop={true}
//                       // breakpoints={{
//                       //   280: {
//                       //     slidesPerView: 1,
//                       //   },
//                       //   576: {
//                       //     slidesPerView: 2,
//                       //   },
//                       //   1200: {
//                       //     slidesPerView: 3,
//                       //   },
//                       // }}
//                       spaceBetween={20}
//                       // centeredSlides={true}
//                       slidesPerView={3}
//                       loop={true}
//                       autoplay={{
//                         delay: 3000,
//                         disableOnInteraction: false,
//                       }}
//                       // pagination={{
//                       //   clickable: true,
//                       // }}
//                       navigation={true}
//                       modules={[Autoplay, Pagination, Navigation]}
//                       className="swiper-wrapper coming-cat-swiper"
//                       breakpoints={{
//                         280: {
//                           slidesPerView: 1,
//                         },
//                         576: {
//                           slidesPerView: 2,
//                         },
//                         1200: {
//                           slidesPerView: 3,
//                         },
//                       }}
//                     >
//                       <SwiperSlide>
//                         <div className="content-wrap">
//                           <img src={com_cat1} alt="" />
//                         </div>
//                       </SwiperSlide>
//                       <SwiperSlide>
//                         <div className="content-wrap">
//                           <img src={com_cat2} alt="" />
//                         </div>
//                       </SwiperSlide>
//                       <SwiperSlide>
//                         <div className="content-wrap">
//                           <img src={com_cat3} alt="" />
//                         </div>
//                       </SwiperSlide>
//                       <SwiperSlide>
//                         <div className="content-wrap">
//                           <img src={com_cat4} alt="" />
//                         </div>
//                       </SwiperSlide>
//                       <SwiperSlide>
//                         <div className="content-wrap">
//                           <img src={com_cat5} alt="" />
//                         </div>
//                       </SwiperSlide>
//                       <SwiperSlide>
//                         <div className="content-wrap">
//                           <img src={com_cat6} alt="" />
//                         </div>
//                       </SwiperSlide>
//                       <SwiperSlide>
//                         <div className="content-wrap">
//                           <img src={com_cat7} alt="" />
//                         </div>
//                       </SwiperSlide>
//                       <SwiperSlide>
//                         <div className="content-wrap">
//                           <img src={com_cat8} alt="" />
//                         </div>
//                       </SwiperSlide>
//                       <SwiperSlide>
//                         <div className="content-wrap">
//                           <img src={com_cat9} alt="" />
//                         </div>
//                       </SwiperSlide>
//                     </Swiper>
//                   </div>
//                 </div>
//               </div>
//             </section>
//             {/* <section className="testimonial-section">
//               <div className="container-fluid container-padding">
//                 <Testimonial />
//               </div>
//             </section> */}
//             <section className="section-3 best-seller">
//               <div className="container-fluid container-padding">
//                 <BestSeller />
//               </div>
//             </section>
//             <BrandGrid />
//             {/* <SecondSlider IndianGrownProductVideo={IndianGrownProductVideo} /> */}
//           </div>
//           {/* {isLoggIn && (
//             <Modal
//               size="md"
//               show={showWelcomeModal}
//               onHide={() => handleHideWelcomeModal()}
//               aria-labelledby="example-modal-sizes-title-sm"
//               centered
//             >
//               <Modal.Body>
               
//                 <div className={WelcomeModelStyles.welcome_message}>
//                   <h4>
//                     Welcome to Zoffi {userData?.name ? userData?.name : "User"}
//                   </h4>
//                   <p className={WelcomeModelStyles.welcome_message_content}>
//                     Thank you for joining our community! We are thrilled to have
//                     you on board. At Zoofi, we offer a wide range of
//                     high-quality products tailored to meet all your needs.
//                     Whether you are looking for the latest trends or everyday
//                     essentials, we have something for everyone. Do not forget to
//                     check out our exclusive deals and discounts, available only
//                     to our members. If you have any questions, our customer
//                     support team is here to help 24/7.
//                   </p>
//                   <button
//                     className={WelcomeModelStyles.welcome_model_close_btn}
//                     onClick={() => handleHideWelcomeModal()}
//                     disabled={userDataUpdating}
//                   >
//                     {userDataUpdating ? (
//                       <Spinner animation="border" size="sm" />
//                     ) : (
//                       "Got it!"
//                     )}
//                   </button>
//                 </div>
//               </Modal.Body>
//             </Modal>
//           )} */}
//         </>
//       )}
//     </>
//   );
// };


export const Home = () => {
  return (
    <div>
      <HomePage />
    </div>
  )
}