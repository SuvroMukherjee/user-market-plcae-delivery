import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { getAllProductsApi, listBYBrands } from "../../Api/api";
import { totalReview } from "../../assets/common/RatingAvg";
import { DownArrow } from "../customSvgs/DownArrow";
import { LoaderComponent } from "../Loader/LoaderComponent";
import { ProductCard } from "../ProductCard/ProductCard";

export const Brand = () => {
  const { id: brandId } = useParams();

  const [allBrandsProducts, setAllBrandsProducts] = useState([]);

  const navigate = useNavigate();

  const selectedProduct = useSelector((state) => state?.products?.data);

  const { reviewData } = selectedProduct || {};

  const data = useSelector((state) => state?.products?.data || []);

  const { brandData } = data;

  const { productData } = selectedProduct || [];

  const [searchProductLoading, setSearchProductLoading] = useState(true);

  async function getcatListProducts(BId) {
    try {
      setSearchProductLoading(true);
      let res = await listBYBrands(BId);
      console.log(res?.data?.data, "adtatatata");
      setAllBrandsProducts(res?.data?.data);
    } catch (error) {
      console.error(error);
    } finally {
      setSearchProductLoading(false);
    }
  }

  async function getAllProducts() {
    try {
      setSearchProductLoading(true);
      let res = await getAllProductsApi();
      console.log(res);
      setAllBrandsProducts(res?.data?.data);
    } catch (error) {
      console.error(error);
    } finally {
      setSearchProductLoading(false);
    }
  }

  useEffect(() => {
    if (brandId) {
      getcatListProducts(brandId);
    } else {
      getAllProducts();
    }
  }, [brandId]);

  const [selectedOption, setSelectedOption] = useState();

  const handleSelectChange = (e, type) => {
    console.log(e.target.value);
    setSelectedOption(e.target.value);
    HandleFilterController(e.target.value, type);
  };

  const HandleFilterController = (type) => {
    console.log({ productData });
    if (type == "low") {
      let filterData = [...allBrandsProducts]?.sort((a, b) => {
        // console.log(a?.price,b?.price)
        return a?.price - b?.price;
      });
      console.log(filterData);
      setAllBrandsProducts(filterData);
    } else if (type == "high") {
      let filterData = [...allBrandsProducts]?.sort((a, b) => {
        return b?.price - a?.price;
      });
      setAllBrandsProducts(filterData);
    } else if (type == "date") {
      let filterData = [...allBrandsProducts]?.sort((a, b) => {
        return new Date(b?.updatedAt) - new Date(a?.updatedAt);
      });
      setAllBrandsProducts(filterData);
    } else if (type == "popular") {
      let filterData = [...allBrandsProducts]?.sort((a, b) => {
        console.log(
          totalReview(a?._id, reviewData) - totalReview(b?._id, reviewData)
        );
        return (
          totalReview(b?._id, reviewData) - totalReview(a?._id, reviewData)
        );
      });
      setAllBrandsProducts(filterData);
    }
  };

  console.log({ brandData });

  return (
    <>
      <div className="page-content category-page">
        <div className="top-filter-bar">
          <div className="container">
            <div className="row">
              <div className="col-sm-6 col-12">
                <div className="content-left">
                  <label>{allBrandsProducts?.length} Results</label>
                </div>
              </div>
              <div className="col-sm-6 col-12">
                <div className="content-right">
                  <div className="sort-by-filter">
                    <label>Sort By:</label>
                    <select
                      value={selectedOption}
                      onChange={handleSelectChange}
                    >
                      <option value="date" selected>
                        New Arrivals
                      </option>
                      <option value="low">Low to high</option>
                      <option value="high">High to low</option>
                      <option value="popular">Popular</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row category-page-content">
            <div className="col-xl-3 col-12">
              <div className="left-filter-column" id="filterColumn">
                <div className="close-filer">
                  <button className="btn-close" id="filterClose">
                    <img src="assets/images/close.png" alt="" />
                  </button>
                </div>
                <div className="accordion" id="accordionExample1">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        Show All Brands
                        <DownArrow />
                      </button>
                    </h2>
                    <div
                      id="collapseOne"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <ul>
                          {brandData?.length > 0 &&
                            [...brandData] // Create a new array
                              .sort((a, b) => a?.title.localeCompare(b?.title)) // Sort by title
                              .map((ele, index) => (
                                <li
                                  key={index}
                                  className={
                                    brandId === ele?._id ? "selectedLi" : ""
                                  }
                                  style={{
                                    paddingLeft: "10px",
                                  }}
                                  onClick={() => {
                                    navigate(`/brand/${ele?._id}`);
                                  }}
                                >
                                  <a>{ele?.title}</a>
                                </li>
                              ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-9 col-12 right-col">
              <div className="right-listing">
                <div className="sectiion-heading"></div>
                <div className="row">
                  {searchProductLoading && (
                    <div
                      className="address-box mt-4"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <LoaderComponent />
                    </div>
                  )}
                  {!searchProductLoading &&
                    allBrandsProducts?.length > 0 &&
                    allBrandsProducts.map((ele) => {
                      return (
                        <>
                          <ProductCard ele={ele} />
                        </>
                      );
                    })}
                  {!searchProductLoading && allBrandsProducts.length === 0 && (
                    <div className="d-flex justify-content-center">
                      <div className="card product-card">
                        <div className="card-img-top">
                          <img
                            src="https://cdn.dribbble.com/users/3512533/screenshots/14168376/media/1357b33cb4057ecb3c6f869fc977561d.jpg?resize=400x300&vertical=center"
                            alt="product"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
