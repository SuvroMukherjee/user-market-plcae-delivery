import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllSellersById } from "../../Api/api";
import { totalReview } from "../../assets/common/RatingAvg";

const AllSellerByProduct = () => {
  const [SellerproductDetails, setSellerProductDetails] = useState();

  const { id: productId } = useParams();

  const { specId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    getAllsSeller();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  async function getAllsSeller() {
    let res = await getAllSellersById(productId);
    let filterData = res?.data?.data?.filter((ele) => {
      return ele?.specId?._id == specId;
    });
    setSellerProductDetails(filterData);
  }

  const redirectTodetailsPage = (id) => {
    navigate(`/product-details/${id}`);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="all-seller-page">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="container-fluid content-wrapper">
              <div className="row top-info-row">
                <div className="col-sm-4 col-12 left-col">
                  <h4> All Sellers </h4>
                </div>
                <div className="col-sm-8 col-12 right-col">
                  <div className="right-col-content">
                    <div className="right-col-content-left">
                      <p>
                        {SellerproductDetails?.[0]?.productId?.brandId?.title}{" "}
                        {SellerproductDetails?.[0]?.productId?.name}
                      </p>
                      <label>
                        {totalReview(SellerproductDetails?.[0]?.productId?._id)}{" "}
                        Ratings
                      </label>
                    </div>
                    <div className="right-col-content-right">
                      <img
                        src={
                          SellerproductDetails?.[0]?.specId?.image[0].image_path
                        }
                        alt="product_image"
                        className="img-fluid "
                        width={100}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row heading-row">
                <div className="col-md-3 col-12">
                  <label>Seller</label>
                </div>
                <div className="col-md-3 col-12">
                  <label>Price</label>
                </div>
                <div className="col-md-3 col-12">
                  <label>Description</label>
                </div>
                <div className="col-md-3 col-12"></div>
              </div>

              {SellerproductDetails?.length > 0 &&
                SellerproductDetails?.map((ele, index) => (
                  <div key={index} className="seller-box">
                    <div className="row">
                      <div className="col-lg-3 col-12">
                        <h5>{ele?.sellerId?.Shop_Details_Info?.shope_name}</h5>
                        <h6>{ele?.sellerId?.Shop_Details_Info?.state}</h6>
                      </div>
                      <div className="col-lg-3 col-12">
                        <p>
                          {ele?.productId?.brandId?.title}{" "}
                          {ele?.productId?.name}
                          {ele?.specId?.spec_det?.length > 0 && (
                            <span>
                              (
                              {ele?.specId?.spec_det
                                ?.slice(0, 3)
                                ?.map((ele, index, array) => (
                                  <span key={index}>
                                    {ele.value}
                                    {index < array.length - 1 ? ", " : ""}
                                  </span>
                                ))}
                              )
                            </span>
                          )}
                        </p>
                        <p className="price">₹{ele?.price?.toLocaleString()}</p>
                      </div>
                      <div className="col-lg-3 col-12">
                        <ul>
                          <li>{ele?.productId?.desc?.slice(0, 56)}</li>
                        </ul>
                      </div>
                      <div className="col-lg-3 col-12">
                        <div className="cta-box">
                          <a
                            className="btn btn-buy"
                            onClick={() => redirectTodetailsPage(ele?._id)}
                          >
                            View
                          </a>
                        </div>
                      </div>
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

export default AllSellerByProduct;
