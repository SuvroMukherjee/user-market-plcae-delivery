import moment from "moment";
import { Image } from "react-bootstrap";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { StarRating } from "../../hero/StarRating";


const ProductRating = ({ avgRating, reviewData }) => {
  return (
    <div className="accordion" id="accordionExample2">
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingTwo">
          <button
            className="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseTwo"
            aria-expanded="true"
            aria-controls="collapseTwo"
          >
            Ratings &amp; Reviews
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M6 9L12 15L18 9"
                stroke="black"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </h2>
        <div
          id="collapseTwo"
          className="accordion-collapse collapse show"
          aria-labelledby="headingTwo"
          data-bs-parent="#accordionExample2"
        >
          <div className="accordion-body">
            <div className="row rating-info">
              <div className="col-lg-3 col-12 left-col">
                <div className="row-1">
                  <label>{avgRating}</label>
                  <i className="fa-solid fa-star" />
                </div>
                <p>
                  {reviewData?.length} Ratings &amp; <br />
                  Reviews
                </p>
              </div>
              <div className="col-lg-9 right-col">
                <ul className="rate-info-list">
                  <li>
                    <span className="first-col">
                      5 <i className="fa-solid fa-star" />
                    </span>
                    <div className="progress">
                      <div
                        className="progress-bar type-1"
                        role="progressbar"
                        style={{
                          width: `${
                            reviewData
                              ? (reviewData?.filter((ele) => ele?.rating == "5")
                                  ?.length /
                                  reviewData?.length) *
                                100
                              : 0
                          }%`,
                        }}
                        aria-valuenow={Math.floor(
                          reviewData
                            ? (reviewData?.filter((ele) => ele?.rating == "5")
                                ?.length /
                                reviewData?.length) *
                                100
                            : 0
                        )}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                    <span className="last-col">
                      {reviewData?.filter((ele) => ele?.rating == "5")?.length}
                    </span>
                  </li>
                  <li>
                    <span className="first-col">
                      4 <i className="fa-solid fa-star" />
                    </span>
                    <div className="progress">
                      <div
                        className="progress-bar type-1"
                        role="progressbar"
                        style={{
                          width: `${
                            reviewData
                              ? (reviewData?.filter((ele) => ele?.rating == "4")
                                  ?.length /
                                  reviewData?.length) *
                                100
                              : 0
                          }%`,
                        }}
                        aria-valuenow={Math.floor(
                          reviewData
                            ? (reviewData?.filter((ele) => ele?.rating == "4")
                                ?.length /
                                reviewData?.length) *
                                100
                            : 0
                        )}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                    <span className="last-col">
                      {reviewData?.filter((ele) => ele?.rating == "4")?.length}
                    </span>
                  </li>
                  <li>
                    <span className="first-col">
                      3 <i className="fa-solid fa-star" />
                    </span>
                    <div className="progress">
                      <div
                        className="progress-bar type-1"
                        role="progressbar"
                        style={{
                          width: `${
                            reviewData
                              ? (reviewData?.filter((ele) => ele?.rating == "3")
                                  ?.length /
                                  reviewData?.length) *
                                100
                              : 0
                          }%`,
                        }}
                        aria-valuenow={Math.floor(
                          reviewData
                            ? (reviewData?.filter((ele) => ele?.rating == "3")
                                ?.length /
                                reviewData?.length) *
                                100
                            : 0
                        )}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                    <span className="last-col">
                      {reviewData?.filter((ele) => ele?.rating == "3")?.length}
                    </span>
                  </li>
                  <li>
                    <span className="first-col">
                      2 <i className="fa-solid fa-star" />
                    </span>
                    <div className="progress">
                      <div
                        className="progress-bar type-2"
                        role="progressbar"
                        style={{
                          width: `${
                            reviewData
                              ? (reviewData?.filter((ele) => ele?.rating == "2")
                                  ?.length /
                                  reviewData?.length) *
                                100
                              : 0
                          }%`,
                        }}
                        aria-valuenow={Math.floor(
                          reviewData
                            ? (reviewData?.filter((ele) => ele?.rating == "2")
                                ?.length /
                                reviewData?.length) *
                                100
                            : 0
                        )}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                    <span className="last-col">
                      {reviewData?.filter((ele) => ele?.rating == "2")?.length}
                    </span>
                  </li>
                  <li>
                    <span className="first-col">
                      1 <i className="fa-solid fa-star" />
                    </span>
                    <div className="progress">
                      <div
                        className="progress-bar type-3"
                        role="progressbar"
                        style={{
                          width: `${
                            reviewData
                              ? (reviewData?.filter((ele) => ele?.rating == "1")
                                  ?.length /
                                  reviewData?.length) *
                                100
                              : 0
                          }%`,
                        }}
                        aria-valuenow={Math.floor(
                          reviewData
                            ? (reviewData?.filter((ele) => ele?.rating == "1")
                                ?.length /
                                reviewData?.length) *
                                100
                            : 0
                        )}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                    <span className="last-col">
                      {reviewData?.filter((ele) => ele?.rating == "1")?.length}
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="rating-comment">
              {reviewData?.length > 0 &&
                reviewData?.map((ele, index) => (
                  <div key={index}>
                    <div className="product-rating">
                      <div className="rating-stars">
                        <StarRating value={ele?.rating} />
                      </div>
                      {ele?.title}
                    </div>
                    <p>{ele?.desc}</p>
                    <div>
                      <Swiper
                        className="swiper-wrapper"
                        spaceBetween={10}
                        slidesPerView={4}
                        freeMode={true}
                        watchSlidesVisibility={true}
                        watchSlidesProgress={true}
                        autoplay={{
                          delay: 500,
                          disableOnInteraction: false,
                        }}
                      >
                        {ele?.review_image?.map((ele, index) => (
                          <SwiperSlide key={index}>
                            <div className="image-wrapper">
                              <Image
                                thumbnail
                                src={ele?.image_path}
                                alt="Product Thumbnail"
                                className="reviewImg"
                              />
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                    <div className="customer-info mt-4">
                      {console.log("user", ele?.user)}
                      <ul>
                        <li>{ele?.user?.name}</li>
                        <li>{moment(ele?.updatedAt).fromNow()}</li>
                      </ul>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductRating;
