import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import tv from '../../assets/images/tv.png'
// import iron from '../../assets/images/iron.png'
// import waterpurify from '../../assets/images/waterpurify.png'
// import fridge from '../../assets/images/fridge.png'
// import buttonarrow from '../../assets/images/arrow-right.png'
// import electronics from '../../assets/images/electronics.jpg'
// import kitchen from '../../assets/images/kitchen.jpg'
// import sports from '../../assets/images/sports.jpg'
// import fashion from '../../assets/images/Fashion.jpg'
// import computer from '../../assets/images/Computer.jpg'
// import mobileacc from '../../assets/images/mobileacc.jpg'

const CategoryBox = () => {
  // const { categoryData = [] } = useSelector(state => state?.products?.data || []);
  // const { subcategoryData = [] } = useSelector(state => state?.products?.data || []);

  const data = useSelector((state) => state?.products?.data || []);
  const { categoryData = [], subcategoryData = [] } = data;

  const navigate = useNavigate();

  const [visibleItemCount, setVisibleItemCount] = useState(4);

  const handleViewMore = () => {
    // Increase the visible item count to show all items
    setVisibleItemCount(subcategoryData.length);
  };

  const handleViewLess = () => {
    // Reset the visible item count to show only the initial 12 items
    setVisibleItemCount(4);
  };

  return (
    <>
      {/* <div className="row row-3"> */}
      <ul className="category-list">
        {categoryData?.length > 0 &&
          categoryData?.slice(0,12)?.map((ele) => {
            return (
              <li
                className="item-group-col"
                key={ele?._id}
                onClick={() => navigate(`/category/${ele?._id}`)}
              >
                <div className="item-group-box">
                  <div className="cat-img">
                    {/* <svg
                      width="70"
                      height="70"
                      viewBox="0 0 70 70"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_201_525)">
                        <path
                          d="M68.8335 0H38.5002C38.1907 0 37.894 0.122916 37.6752 0.341709C37.4564 0.560501 37.3335 0.857247 37.3335 1.16667V66.5C37.3335 66.8094 37.4564 67.1062 37.6752 67.325C37.894 67.5437 38.1907 67.6667 38.5002 67.6667H39.6668V70H42.0002V67.6667H65.3335V70H67.6668V67.6667H68.8335C69.1429 67.6667 69.4397 67.5437 69.6585 67.325C69.8773 67.1062 70.0002 66.8094 70.0002 66.5V1.16667C70.0002 0.857247 69.8773 0.560501 69.6585 0.341709C69.4397 0.122916 69.1429 0 68.8335 0ZM67.6668 65.3333H39.6668V24.5H67.6668V65.3333ZM67.6668 22.1667H39.6668V2.33333H67.6668V22.1667Z"
                          fill="white"
                        />
                        <path
                          d="M43.1667 8.16675H45.5V19.8334H43.1667V8.16675ZM43.1667 26.8334H45.5V43.1667H43.1667V26.8334ZM1.16667 67.6667H2.33333V70.0001H4.66667V67.6667H30.3333V70.0001H32.6667V67.6667H33.8333C34.1428 67.6667 34.4395 67.5438 34.6583 67.325C34.8771 67.1062 35 66.8095 35 66.5001V25.6667C35 25.3573 34.8771 25.0606 34.6583 24.8418C34.4395 24.623 34.1428 24.5001 33.8333 24.5001H1.16667C0.857247 24.5001 0.560501 24.623 0.341709 24.8418C0.122916 25.0606 0 25.3573 0 25.6667L0 66.5001C0 66.8095 0.122916 67.1062 0.341709 67.325C0.560501 67.5438 0.857247 67.6667 1.16667 67.6667ZM2.33333 26.8334H32.6667V33.8334H2.33333V26.8334ZM2.33333 36.1667H32.6667V65.3334H2.33333V36.1667Z"
                          fill="white"
                        />
                        <path
                          d="M17.5 37.3333C10.4122 37.3333 4.66667 43.0789 4.66667 50.1667C4.66667 57.2545 10.4122 63 17.5 63C24.5878 63 30.3333 57.2545 30.3333 50.1667C30.3247 43.0824 24.5843 37.3419 17.5 37.3333ZM17.5 60.6667C12.8886 60.674 8.81154 57.672 7.45062 53.2656C6.08971 48.86 7.76271 44.081 11.5749 41.4862C15.387 38.8918 20.4463 39.0884 24.046 41.971L22.3883 43.6332C19.0193 41.0777 14.2581 41.5096 11.4034 44.6301C8.54948 47.7502 8.54219 52.5308 11.387 55.6595C14.2319 58.7885 18.9914 59.2346 22.3682 56.6894L24.046 58.3669C22.1902 59.8576 19.8804 60.6691 17.5 60.6667ZM20.1752 54.4915L20.7038 55.0201C18.268 56.6386 15.01 56.2039 13.0846 54.0028C11.1586 51.8016 11.1608 48.5147 13.089 46.3158C15.0172 44.1169 18.2758 43.6857 20.7095 45.3075L20.1752 45.8418C19.9564 46.0606 19.8334 46.3573 19.8333 46.6667V53.6667C19.8333 53.976 19.9564 54.2728 20.1752 54.4915ZM25.6957 56.7082L22.1667 53.1834V47.1495L25.6958 43.6205C28.768 47.4435 28.768 52.8895 25.6958 56.7125L25.6957 56.7082ZM4.66667 29.1667H7V31.5H4.66667V29.1667ZM9.33333 29.1667H11.6667V31.5H9.33333V29.1667ZM14 29.1667H16.3333V31.5H14V29.1667ZM23.3333 29.1667H30.3333V31.5H23.3333V29.1667ZM1.16667 22.1667H33.8333C34.1427 22.1667 34.4395 22.0438 34.6583 21.825C34.8771 21.6062 35 21.3094 35 21V1.16667C35 0.857247 34.8771 0.560501 34.6583 0.341709C34.4395 0.122916 34.1427 0 33.8333 0L1.16667 0C0.857247 0 0.560501 0.122916 0.341709 0.341709C0.122916 0.560501 0 0.857247 0 1.16667L0 21C0 21.3094 0.122916 21.6062 0.341709 21.825C0.560501 22.0438 0.857247 22.1667 1.16667 22.1667ZM25.6667 2.33333H32.6667V19.8333H25.6667V2.33333ZM2.33333 2.33333H23.3333V19.8333H2.33333V2.33333Z"
                          fill="white"
                        />
                        <path
                          d="M27.9998 4.66675H30.3332V7.00008H27.9998V4.66675ZM27.9998 9.33342H30.3332V11.6667H27.9998V9.33342ZM19.8332 4.66675H5.83317C5.52375 4.66675 5.22701 4.78966 5.00821 5.00846C4.78942 5.22725 4.6665 5.524 4.6665 5.83341V16.3334C4.6665 16.6428 4.78942 16.9396 5.00821 17.1584C5.22701 17.3772 5.52375 17.5001 5.83317 17.5001H19.8332C20.1426 17.5001 20.4393 17.3772 20.6581 17.1584C20.8769 16.9396 20.9998 16.6428 20.9998 16.3334V5.83341C20.9998 5.524 20.8769 5.22725 20.6581 5.00846C20.4393 4.78966 20.1426 4.66675 19.8332 4.66675ZM18.6665 15.1667H6.99984V7.00008H18.6665V15.1667ZM29.1665 14.5834C28.1998 14.5834 27.4165 15.3667 27.4165 16.3334C27.4165 17.3001 28.1998 18.0834 29.1665 18.0834C30.1332 18.0834 30.9165 17.3001 30.9165 16.3334C30.9165 15.3667 30.1332 14.5834 29.1665 14.5834ZM29.1665 16.9167C28.8442 16.9167 28.5832 16.6557 28.5832 16.3334C28.5832 16.0111 28.8442 15.7501 29.1665 15.7501C29.4888 15.7501 29.7498 16.0111 29.7498 16.3334C29.7498 16.6557 29.4888 16.9167 29.1665 16.9167Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_201_525">
                          <rect width="70" height="70" fill="white" />
                        </clipPath>
                      </defs>
                    </svg> */}
                    {/* <img style={{
                      filter: "grayscale(100%) brightness(0) invert(1)",
                    }} src={ele?.image?.[0]?.image_path} alt="category_image" width="70" height="70" /> */}
                    <img src={ele?.image?.[0]?.image_path} alt="category_image" width="70" height="70" />
                  </div>
                  <h3>{ele?.title}</h3>
                  {/* <div className="grid-container-category">
                    {subcategoriesForCategory?.map((item) => (
                      <div className="grid-item" key={item?._id}>
                        <a>
                          <div className="item-image">
                            <img src={item?.image[0]?.image_path} alt="" />
                          </div>
                          {item?.title}
                        </a>
                      </div>
                    ))}
                  </div>
                  {subcategoriesForCategory?.length > 4 && (
                    <div className="view-more-link">
                      {visibleItemCount === 4 ? (
                        <a onClick={handleViewMore}>View More</a>
                      ) : (
                        <a onClick={handleViewLess}>View Less</a>
                      )}
                    </div>
                  )} */}
                </div>
              </li>
            );
          })}
      </ul>
      {/* </div> */}
    </>
  );
};

export default CategoryBox;

//     const handleViewMore = () => {
//         // Increase the visible item count to show all items
//         setVisibleItemCount(subcategoryData.length);
//     };

//     const handleViewLess = () => {
//         // Reset the visible item count to show only the initial 12 items
//         setVisibleItemCount(4);
//     };

//     return (
//         <>
//             <div class="main-cat-place">
//                 <a href="#" class="cat-image">
//                     <img src={electronics} alt="img1" />
//                     <div class="cat-lavel">Electronics</div>
//                 </a>
//                 <a href="#" class="cat-image">
//                     <img src={sports} alt="img1" />
//                     <div class="cat-lavel">Sports</div>
//                 </a>
//                 <a href="#" class="cat-image">
//                     <img src={kitchen} alt="img1" />
//                     <div class="cat-lavel">Kitchen</div>
//                 </a>
//                 <a href="#" class="cat-image">
//                     <img src={fashion} alt="img1" />
//                     <div class="cat-lavel">Fashion</div>
//                 </a>
//                 <a href="#" class="cat-image">
//                     <img src={computer} alt="img1" />
//                     <div class="cat-lavel">Computer</div>
//                 </a>
//                 <a href="#" class="cat-image">
//                     <img src={mobileacc} alt="img1" />
//                     <div class="cat-lavel">Mobiles & Accessories</div>
//                 </a>
//             </div>

//             <div className="row row-3">
//                 {categoryData?.length > 0 &&
//                     categoryData?.map((ele) => {
//                         const subcategoriesForCategory = subcategoryData
//                             ?.filter((e) => e?.category?._id === ele?._id)
//                             .slice(0, visibleItemCount);
//                         return (
//                             <div className="col-lg-4 col-md-6 col-12 item-group-col" key={ele?._id} onClick={() => navigate(`/category/${ele?._id}`)}>
//                                 <div className="item-group-box">
//                                     <h3>{ele?.title}</h3>
//                                     <div className="grid-container-category">
//                                         {subcategoriesForCategory?.map((item) => (
//                                             <div className="grid-item" key={item?._id}>
//                                                 <a href="#">
//                                                     <div className="item-image">
//                                                         <img src={item?.image[0]?.image_path} alt="" />
//                                                     </div>
//                                                     {item?.title}
//                                                 </a>
//                                             </div>
//                                         ))}
//                                     </div>
//                                     {subcategoriesForCategory?.length > 4 && (
//                                         <div className="view-more-link">
//                                             {visibleItemCount === 4 ? (
//                                                 <a onClick={handleViewMore}>
//                                                     View More
//                                                 </a>
//                                             ) : (
//                                                 <a onClick={handleViewLess}>
//                                                     View Less
//                                                 </a>
//                                             )}
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//                         );
//                     })}
//             </div>

//         </>
//     )
// }

// export default CategoryBox
