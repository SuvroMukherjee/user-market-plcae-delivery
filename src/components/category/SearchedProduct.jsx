import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MultiRangeSlider from "multi-range-slider-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { searchProductsApi } from "../../Api/api";
import { totalReview } from "../../assets/common/RatingAvg";
import { LoaderComponent } from "../Loader/LoaderComponent";
import { ProductCard } from "../ProductCard/ProductCard";

export const SearchedProduct = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const searchTerm = queryParams.get("search");
  const categoryid = queryParams.get("categoryid");

  console.log({ searchTerm, categoryid }, "searchTerm, categoryid");

  const [searchProductLoading, setSearchProductLoading] = useState(true);

  const [selectedOption, setSelectedOption] = useState();

  const [SearchProducts, setSearchProduct] = useState([]);
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

  const [minValue, set_minValue] = useState(0);
  const [maxValue, set_maxValue] = useState(30000);

  const handleInput = (e) => {
    set_minValue(e.minValue);
    set_maxValue(e.maxValue);
  };

  const [checkedValues, setCheckedValues] = useState([]);

  const handleCheckboxChange = (value) => {
    if (checkedValues.includes(value)) {
      setCheckedValues(checkedValues.filter((item) => item !== value));
    } else {
      setCheckedValues([...checkedValues, value]);
    }
  };

  const handleSelectChange = (e, type) => {
    console.log(e.target.value);
    setSelectedOption(e.target.value);
    HandleFilterController(e.target.value, type);
  };

  const HandleFilterController = (type) => {
    if (type == "low") {
      let filterData = [...SearchProducts]?.sort((a, b) => {
        return a?.price - b?.price;
      });
      console.log(filterData);
      setSearchProduct(filterData);
    } else if (type == "high") {
      let filterData = [...SearchProducts]?.sort((a, b) => {
        return b?.price - a?.price;
      });
      setSearchProduct(filterData);
    } else if (type == "date") {
      let filterData = [...SearchProducts]?.sort((a, b) => {
        return new Date(b?.updatedAt) - new Date(a?.updatedAt);
      });
      setSearchProduct(filterData);
    } else if (type == "popular") {
      let filterData = [...SearchProducts]?.sort((a, b) => {
        console.log(
          totalReview(a?._id, reviewData) - totalReview(b?._id, reviewData)
        );
        return (
          totalReview(b?._id, reviewData) - totalReview(a?._id, reviewData)
        );
      });
      setSearchProduct(filterData);
    }
  };

const fetchProducts = async () => {
  try {
    setSearchProductLoading(true);
    const res = await searchProductsApi(searchTerm, categoryid);
    if (res.status === 200) {
      const products = res?.data?.data;
     setSearchProduct(products);
    } else {
      setSearchProduct([]);
    }
  } catch (error) {
    console.error(error);
  } finally {
    setSearchProductLoading(false);
  }
};


  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryid, searchTerm]);

  let filteredProducts = [...SearchProducts];

  if (checkedValues.length > 0) {
    filteredProducts = filteredProducts.filter((item) => {
      return checkedValues.includes(item?.rating?.toString());
    });
  }

  if (minValue > 0 || maxValue < 30000) {
    filteredProducts = filteredProducts.filter((item) => {
      return item?.price >= minValue && item?.price <= maxValue;
    });
  }

  return (
    <>
      <div className="page-content category-page">
        <div className="top-filter-bar">
          <div className="container">
            <div className="row">
              <div className="col-sm-6 col-12">
                <div className="content-left">
                  <label>{SearchProducts?.length} Products</label>
                </div>
              </div>
              <div className="col-sm-6 col-12">
                <div className="content-right">
                  <div>Sort By:</div>
                  <div>
                    <select
                      value={selectedOption}
                      onChange={handleSelectChange}
                    >
                      <option value="" disabled selected>
                        Select Filter
                      </option>
                      <option value="low">Low to high</option>
                      <option value="high">High to low</option>
                      <option value="date">New Arrivals</option>
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
                <div className="filter-option">
                  <div className="header">
                    <h5>Customer Rating</h5>
                    <button
                      className="clearbtn"
                      onClick={() => {
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
                  <div className="d-flex justify-content-between">
                    <div
                      className="header"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <h5>Filter Price</h5>
                      <button
                        className="clearbtn"
                        onClick={() => {
                          set_minValue(0);
                          set_maxValue(30000);
                        }}
                      >
                        Clear
                      </button>
                    </div>
                  </div>
                  <div className="App">
                    <MultiRangeSlider
                      min={0}
                      ruler={false}
                      max={30000}
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
                  <div className="d-flex justify-content-between mt-4">
                    <div>
                      <h5 style={{ color: "#727272" }}>
                        ₹ {minValue?.toLocaleString()}
                      </h5>
                    </div>
                    <div>
                      <h5 style={{ color: "#727272" }}>To</h5>
                    </div>
                    <div>
                      <h5 style={{ color: "#727272" }}>
                        ₹ {maxValue?.toLocaleString()}
                      </h5>
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
                    filteredProducts?.length > 0 &&
                    filteredProducts.map((ele) => {
                      return (
                        <>
                          <ProductCard ele={ele} />
                        </>
                      );
                    })}
                  {!searchProductLoading && filteredProducts.length === 0 && (
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
