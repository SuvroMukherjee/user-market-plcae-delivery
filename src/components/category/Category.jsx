import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MultiRangeSlider from "multi-range-slider-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import {
  getAllProductsApi,
  getBestSellerProduct,
  getCategoryProduct,
} from "../../Api/api";
import { ratingCalculation, totalReview } from "../../assets/common/RatingAvg";
import { DownArrow } from "../customSvgs/DownArrow";
import { LoaderComponent } from "../Loader/LoaderComponent";
import { ProductCard } from "../ProductCard/ProductCard";

export const Category = () => {
  const { id: catId } = useParams();
  const navigate = useNavigate();

  const [catsProducts, setCatsProducts] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [selectedOption, setSelectedOption] = useState();
  const [productsBrands, setproductBrands] = useState([]);


  /* Loading State start */
  const loadingState = useSelector((state) => state.loading.loadingState);
  const loadingMessage = useSelector((state) => state.loading.message);
  let loadingToastId = useRef(null);

  // add to cart loading message
  useEffect(() => {
    if (loadingState) {
      loadingToastId.current = toast.info(loadingMessage, {
        autoClose: false,
      });
    }

    if (!loadingState) {
      toast.dismiss(loadingToastId.current);
    }
  }, [loadingMessage, loadingState]);

  /* Loading State ending */

  const selectedProduct = useSelector((state) => state?.products?.data);
  const { reviewData } = selectedProduct || {};

  const data = useSelector((state) => state?.products?.data || []);
  const dataLoading = useSelector(
    (state) => state?.products?.isLoading || false
  );
  const [dataReload, setDataReload] = useState(true);

  const { categoryData = [] } = data;

  const reversedCategoryData = [...categoryData].reverse();

  // console.log({ catsProducts });

  // const brandOfProducts = [...catsProducts]?.map((ele) => {
  //   return ele?.brand;
  // });

  const getBestSellerProducts = async () => {
    try {
      setDataReload(true);
      let res = await getBestSellerProduct();
      let bdata = res?.data?.data?.map((ele) => {
        return ele?.productId?.brandId;
      });
      console.log(bdata, "bdata");
      setCatsProducts(res?.data?.data);
      setOriginalData(res?.data?.data);
    } catch (error) {
      console.error(error);
    } finally {
      setDataReload(false);
    }
  };

  useEffect(() => {
    if (catId == "bestseller") {
      getBestSellerProducts();
    } else if (catId && categoryData?.length > 0) {
      getcatListProducts(catId);
    } else {
      setCatsProducts([]);
    }
  }, [catId, categoryData]);

  async function getcatListProducts(catId) {
    try {
      setDataReload(true);
      let res =
        catId == "all" || !catId
          ? await getAllProductsApi()
          : await getCategoryProduct(catId);
      console.log(res?.data?.data, "Category Products");

      getProdutcsBrandHandler(res?.data?.data);
      setCatsProducts(res?.data?.data);
      setOriginalData(res?.data?.data);
    } catch (error) {
      console.error(error);
    } finally {
      setDataReload(false);
    }
  }

  const getProdutcsBrandHandler = (bdata) => {
    const brandMap = new Map();

    bdata.forEach((item) => {
      if (
        item.productId &&
        item.productId.brandId &&
        !brandMap.has(item.productId.brandId._id)
      ) {
        brandMap.set(item.productId.brandId._id, item.productId.brandId);
      }
    });

    // Convert the map values back to an array
    const uniqueBrands = Array.from(brandMap.values());
    console.log({ uniqueBrands });
    setproductBrands(uniqueBrands);
  };

  const StarFilter = ({ rating }) => {
    return (
      <li>
        <label htmlFor={`brand${rating}`}>
          <div>
            {Array.from({ length: 5 }, (_, index) => {
              if (index < rating) {
                return (
                  <FontAwesomeIcon
                    key={index}
                    icon={solidStar}
                    className="StatIcon"
                  />
                );
              } else {
                return (
                  <FontAwesomeIcon
                    key={index}
                    icon={regularStar}
                    className="StatIcon"
                  />
                );
              }
            })}{" "}
            <span className="mx-2">& up</span>
          </div>
        </label>
      </li>
    );
  };

  function StarcatListProducts(catId, rating) {
    let starData = originalData?.filter((ele) => {
      return ratingCalculation(ele?._id, reviewData) >= rating;
    });
    console.log({ starData });
    setCatsProducts(starData);
  }

  const [minValue, set_minValue] = useState(8000);
  const [maxValue, set_maxValue] = useState(125000);

  const handleInput = (e) => {
    set_minValue(e.minValue);
    set_maxValue(e.maxValue);
    console.log(e.minValue);
    console.log(e.maxValue);
    pricecatListProducts(catId, e.minValue, e.maxValue);
  };

  function pricecatListProducts(catId, min, max) {
    console.log("etffx", minValue);
    let starData = originalData?.filter((ele) => {
      return Math.round(ele?.price) >= min && Math.round(ele?.price) <= max;
    });
    console.log({ starData });
    setCatsProducts(starData);
  }

  const handleClearPrice = () => {
    set_minValue(8000);
    set_maxValue(125000);
    getcatListProducts(catId);
  };

  const [checkedValues, setCheckedValues] = useState([]);

  const handleCheckboxChange = (value) => {
    if (checkedValues.includes(value)) {
      setCheckedValues(checkedValues.filter((item) => item !== value));
      console.log("if", value);
      StarcatListProducts(catId, 0);
    } else {
      setCheckedValues([...checkedValues, value]);
      console.log("else", value);
      StarcatListProducts(catId, parseInt(value));
    }
  };

  const handleSelectChange = (e, type) => {
    console.log(e.target.value);
    setSelectedOption(e.target.value);
    HandleFilterController(e.target.value, type);
  };

  const HandleFilterController = (type) => {
    if (type == "low") {
      let filterData = originalData?.sort((a, b) => {
        return a?.price - b?.price;
      });
      console.log(filterData);
      setCatsProducts(filterData);
    } else if (type == "high") {
      let filterData = originalData?.sort((a, b) => {
        return b?.price - a?.price;
      });
      setCatsProducts(filterData);
    } else if (type == "date") {
      let filterData = originalData?.sort((a, b) => {
        return new Date(b?.updatedAt) - new Date(a?.updatedAt);
      });
      setCatsProducts(filterData);
    } else if (type == "popular") {
      let filterData = originalData?.sort((a, b) => {
        console.log(
          totalReview(a?._id, reviewData) - totalReview(b?._id, reviewData)
        );
        return (
          totalReview(b?._id, reviewData) - totalReview(a?._id, reviewData)
        );
      });
      setCatsProducts(filterData);
    }
  };

  const [selectedBrands, setSelectedBrands] = useState([]);

  const handleBrandChange = (brandId) => {
    setSelectedBrands((prevSelected) =>
      prevSelected.includes(brandId)
        ? prevSelected.filter((id) => id !== brandId)
        : [...prevSelected, brandId]
    );
  };

  return (
    <>
      <div className="page-content category-page">
        <div className="top-filter-bar">
          <div className="container">
            <div className="row">
              <div className="col-sm-6 col-12">
                <div className="content-left">
                  <label>
                    {selectedBrands?.length > 0
                      ? catsProducts?.filter((item) =>
                          selectedBrands.includes(item?.productId?.brandId?._id)
                        )?.length
                      : catsProducts?.length}{" "}
                    Results
                  </label>
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
                <div className="accordion" id="accordionExampleBrand">
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
                        Categories
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
                          {reversedCategoryData?.length > 0 &&
                            reversedCategoryData?.map((ele, index) => (
                              <li
                                key={index}
                                className={
                                  catId == ele?._id ? "selectedLi" : ""
                                }
                                onClick={() => {
                                  navigate(`/category/${ele?._id}`);
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
                <div className="accordion mt-2" id="accordionExample1">
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
                        Brand
                        <DownArrow />
                      </button>
                    </h2>
                    <div
                      id="collapseOne"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionExampleBrand"
                    >
                      <div className="accordion-body">
                        <ul>
                          {productsBrands?.length > 0 ? (
                            productsBrands?.map((ele, index) => (
                              <li
                                key={index}
                                className={
                                  selectedBrands.includes(ele?._id)
                                    ? "selectedLi"
                                    : ""
                                }
                              >
                                <div className="d-flex gap-3">
                                  <input
                                    type="checkbox"
                                    checked={selectedBrands.includes(ele?._id)}
                                    onChange={() => handleBrandChange(ele?._id)}
                                  />
                                  <a>{ele?.title}</a>
                                </div>
                              </li>
                            ))
                          ) : (
                            <li>No Brand</li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="filter-option">
                  <div className="header">
                    <h5>Customer Rating</h5>
                    <button
                      className="clearbtn"
                      onClick={() => {
                        StarcatListProducts(catId, 0);
                        setCheckedValues([]);
                      }}
                    >
                      Clear
                    </button>
                  </div>
                  <ul className="d-flex flex-column">
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="inlineCheckbox1"
                        value="4"
                        onChange={() => handleCheckboxChange("4")}
                        checked={checkedValues.includes("4")}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="inlineCheckbox1"
                      >
                        <StarFilter rating={4} />
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="inlineCheckbox2"
                        value="3"
                        onChange={() => handleCheckboxChange("3")}
                        checked={checkedValues.includes("3")}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="inlineCheckbox2"
                      >
                        <StarFilter rating={3} />
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="inlineCheckbox3"
                        value="2"
                        onChange={() => handleCheckboxChange("2")}
                        checked={checkedValues.includes("2")}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="inlineCheckbox3"
                      >
                        <StarFilter rating={2} />
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="inlineCheckbox4"
                        value="1"
                        onChange={() => handleCheckboxChange("1")}
                        checked={checkedValues.includes("1")}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="inlineCheckbox4"
                      >
                        <StarFilter rating={1} />
                      </label>
                    </div>
                  </ul>
                </div>

                <div className="filter-option">
                  <div className="header">
                    <h5>Price</h5>
                    <button
                      className="clearbtn"
                      onClick={() => handleClearPrice()}
                    >
                      Clear
                    </button>
                  </div>
                  <div className="App">
                    <MultiRangeSlider
                      min={8000}
                      ruler={false}
                      max={125000}
                      label={false}
                      step={1500}
                      stepOnly={true}
                      minValue={minValue}
                      maxValue={maxValue}
                      onChange={(e) => {
                        handleInput(e);
                      }}
                    />
                  </div>
                  <div className="price-value">
                    <span>₹ {minValue?.toLocaleString()}</span>
                    <span>-</span>
                    <span>₹ {maxValue?.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-9 col-12 right-col">
              <div className="right-listing">
                <div className="sectiion-heading"></div>
                <div className="row">
                  {(dataReload || dataLoading) && (
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
                  {selectedBrands?.length > 0
                    ? !dataReload &&
                      !dataLoading &&
                      catsProducts?.length > 0 &&
                      catsProducts
                        ?.filter((item) =>
                          selectedBrands.includes(item?.productId?.brandId?._id)
                        )
                        ?.map((ele) => {
                          return (
                            <>
                              <ProductCard ele={ele} />
                            </>
                          );
                        })
                    : !dataReload &&
                      !dataLoading &&
                      catsProducts?.length > 0 &&
                      catsProducts?.map((ele) => {
                        return (
                          <>
                            <ProductCard ele={ele} />
                          </>
                        );
                      })}

                  {!dataReload && !dataLoading && catsProducts.length === 0 && (
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
