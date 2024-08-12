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
import { searchProductsApi } from "../../../Api/api";
import { totalReview } from "../../../assets/common/RatingAvg";
import { LoaderComponent } from "../../Loader/LoaderComponent";
import { ProductCard } from "../../ProductCard/ProductCard";
import RenderProducts from "../RenderProducts";
import CFilterBox from "../CategoryPage/CFilterBox";
import SFilterBox from "./SFilterBox";

const SearchPageFilter = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const searchTerm = queryParams.get("search");
  const categoryid = queryParams.get("categoryid");

  const [searchProductLoading, setSearchProductLoading] = useState(true);

  const [selectedOption, setSelectedOption] = useState();

  const [SearchProducts, setSearchProduct] = useState([]);

  const [filterType, setFilterType] = useState("");
  const [checkedValues, setCheckedValues] = useState([]);

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

  const fetchProducts = async (searchTerm, categoryid) => {
    try {
      setSearchProductLoading(true);
      const res = await searchProductsApi(searchTerm, categoryid);
      if (res.status === 200) {
        setSearchProduct(res?.data?.data);
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
    fetchProducts(searchTerm, categoryid);
  }, [categoryid, searchTerm]);

  let filterProductsArray = [...SearchProducts];
  let filterSearchProductArray = [...SearchProducts];

  const handleCheckboxChange = (value) => {
    setCheckedValues((prevChecked) =>
      prevChecked.includes(value)
        ? prevChecked.filter((item) => item !== value)
        : [...prevChecked, value]
    );
  };

  if (filterType !== "") {
    if (filterType === "low") {
      filterProductsArray.sort((a, b) => a?.price - b?.price);
    } else if (filterType === "high") {
      filterProductsArray.sort((a, b) => b?.price - a?.price);
    } else if (filterType === "date") {
      filterProductsArray.sort(
        (a, b) => new Date(b?.updatedAt) - new Date(a?.updatedAt)
      );
    } else if (filterType === "popular") {
      filterProductsArray = filterProductsArray.filter(
        (ele) => ele?.is_popular == true
      );
    } else {
      filterProductsArray = [...allProducts];
    }
  }

  return (
    <div className="page-content category-page">
      <div className="top-filter-bar">
        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-12">
              <div className="content-left">
                <label>{filterProductsArray?.length} Results</label>
              </div>
            </div>
            <div className="col-sm-6 col-12">
              <div className="content-right">
                <div className="sort-by-filter">
                  <label>Sort By:</label>
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                  >
                    <option value="all" selected>
                      Show All
                    </option>
                    <option value="date">New Arrivals</option>
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
            <SFilterBox
              //   pageTitle="Search"
              //   filterProductsArray={filterProductsArray}
              //   selectedBrands={selectedBrands}
              //   setSelectedBrands={setSelectedBrands}
              //   handleBrandChange={handleBrandChange}
              //   filterSearchProductArray={filterSearchProductArray}
              //   checkedValues={checkedValues}
              //   setCheckedValues={setCheckedValues}
              //   handleCheckboxChange={handleCheckboxChange}
              //   handleInput={handleInput}
              //   handleClearPrice={handleClearPrice}
              //   minValue={minValue}
              //   maxValue={maxValue}
              //   selectedDiscounts={selectedDiscounts}
              //   handleDiscountChange={handleDiscountChange}
              //   selectedColors={selectedColors}
              //   handleColorChange={handleColorChange}

              filterSearchProductArray={filterSearchProductArray}
              checkedValues={checkedValues}
              setCheckedValues={setCheckedValues}
              handleCheckboxChange={handleCheckboxChange}
            />
          </div>
          <div className="col-xl-9 col-12 right-col">
            <RenderProducts filterProductsArray={filterProductsArray} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPageFilter;
