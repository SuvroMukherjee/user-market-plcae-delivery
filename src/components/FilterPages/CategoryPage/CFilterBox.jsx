import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MultiRangeSlider from "multi-range-slider-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  colorsWithHex,
  discountArray,
} from "../../../assets/common/FiltersArray";
import { DownArrow } from "../../customSvgs/DownArrow";

const CFilterBox = ({
  catId,
  selectedBrands,
  handleBrandChange,
  filterCatProductArray,
  handleCheckboxChange,
  checkedValues,
  setCheckedValues,
  handleInput,
  handleClearPrice,
  minValue,
  maxValue,
  selectedDiscounts,
  handleDiscountChange,
  selectedColors,
  handleColorChange,
}) => {
  const { productData: allProducts, isLoading: productLoading } = useSelector(
    (state) => state?.products?.data|| []
  );

  // const allCategories = useSelector(
  //   (state) => state?.products?.data?.categoryData
  // );

const {
  data, // Set default to an empty object
  isLoading: categoryLoading,
} = useSelector((state) => state?.category || {});

// Check if categoryWithCounts exists and has length > 0
let sortedCategories = [];
if (data?.categoryWithCounts?.length > 0) {
  // Create a shallow copy of the array before sorting
  sortedCategories = [...data.categoryWithCounts].sort((a, b) =>
    a?.name?.localeCompare(b?.name)
  );
}

  const [filterBrandArray, setFilterBrandArray] = useState([]);
  const [additionalFilters, setAdditionalFilters] = useState({});

  useEffect(() => {
    if (filterCatProductArray) {
      getProductsBrandHandler(filterCatProductArray);
      if (catId !== "all") {
        getOtherFilterHandler(filterCatProductArray);
      }
    }
  }, [filterCatProductArray, catId]);

  useEffect(() => {
    window.scrollTo(0, 5, { behavior: "smooth" });
  }, [filterCatProductArray]);

  const getProductsBrandHandler = (products) => {
    const brandMap = new Map();

    products.forEach((item) => {
      if (
        item?.productId?.brandId &&
        !brandMap.has(item?.productId?.brandId?._id)
      ) {
        brandMap.set(item?.productId?.brandId?._id, item?.productId?.brandId);
      }
    });

    let sortedBrands =
      Array.from(brandMap.values()) &&
      [...Array.from(brandMap.values())].sort((a, b) =>
        a.title.localeCompare(b.title)
      );

    setFilterBrandArray(sortedBrands);
  };

  const getOtherFilterHandler = (products) => {
    const result = {};

    products?.forEach((product) => {
      product?.specId?.spec_det?.forEach((ele) => {
        const titleLowerTrimmed = ele?.title?.toLocaleLowerCase().trim();
        const valueLowerTrimmed = ele?.value?.toLocaleLowerCase().trim();

        // Skip keys 'brand', 'model', or 'color'
        if (
          titleLowerTrimmed === "brand" ||
          titleLowerTrimmed === "model" ||
          titleLowerTrimmed === "color" ||
          titleLowerTrimmed === "colour"
        ) {
          return;
        }

        if (!result[titleLowerTrimmed]) {
          result[titleLowerTrimmed] = [];
        }
        if (!result[titleLowerTrimmed]?.includes(valueLowerTrimmed)) {
          result[titleLowerTrimmed].push(valueLowerTrimmed);
        }
      });
    });

    setAdditionalFilters(result);
  };

  const navigate = useNavigate();

  

  return (
    <div className="left-filter-column" id="filterColumn">
      <div className="close-filer">
        <button className="btn-close" id="filterClose">
          <img src="assets/images/close.png" alt="Close" />
        </button>
      </div>
      {/* Categories Accordion */}
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
                {!categoryLoading && sortedCategories.length > 0
                  ? sortedCategories.map((ele, index) => (
                      <li
                        key={ele._id}
                        className={catId === ele._id ? "selectedLi" : ""}
                        onClick={() => navigate(`/category/${ele._id}`)}
                      >
                        <a>
                          {ele.name}{" "}
                          <span style={{ fontSize: "10px" }}>
                            ({ele?.sellerProductCount})
                          </span>
                        </a>
                      </li>
                    ))
                  : Array.from({ length: 5 }).map((_, index) => (
                      <li key={index} className="skeleton-li">
                        <a className="skeleton"></a>
                      </li>
                    ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* Brand Accordion */}
      {filterBrandArray.length > 0 && (
        <div className="accordion mt-2" id="accordionExample1">
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
                Brand
                <DownArrow />
              </button>
            </h2>
            <div
              id="collapseTwo"
              className="accordion-collapse collapse show"
              aria-labelledby="headingTwo"
              data-bs-parent="#accordionExample1"
            >
              <div className="accordion-body">
                <ul>
                  {filterBrandArray.map((ele) => (
                    <li
                      key={ele._id}
                      className={
                        selectedBrands.includes(ele._id) ? "selectedLi" : ""
                      }
                    >
                      <div className="d-flex gap-3">
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(ele._id)}
                          onChange={() => handleBrandChange(ele._id)}
                        />
                        <a>
                          {ele.title}
                          <span style={{ fontSize: "12px" }}>
                            (
                            {catId === "all"
                              ? allProducts?.filter(
                                  (item) =>
                                    item?.productId?.brandId?._id === ele?._id
                                )?.length
                              : allProducts?.filter((item) => {
                                  return (
                                    item?.productId?.brandId?._id == ele?._id &&
                                    item?.productId?.categoryId?._id == catId
                                  );
                                })?.length}
                            )
                          </span>
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Customer Rating */}
      <div className="filter-option">
        <div className="header">
          <h5>Customer Rating</h5>
          <button className="clearbtn" onClick={() => setCheckedValues([])}>
            Clear
          </button>
        </div>
        <ul className="d-flex flex-column">
          {[4, 3, 2, 1].map((rating) => (
            <div className="form-check form-check-inline" key={rating}>
              <input
                className="form-check-input"
                type="checkbox"
                id={`inlineCheckbox${rating}`}
                value={rating}
                onChange={() => handleCheckboxChange(rating)}
                checked={checkedValues?.includes(rating)}
              />
              <label
                className="form-check-label"
                htmlFor={`inlineCheckbox${rating}`}
              >
                <StarFilter rating={rating} />
              </label>
            </div>
          ))}
        </ul>
      </div>
      {/* Price Range Filter */}
      <div className="filter-option mb-2">
        <div className="header">
          <h5>Price</h5>
          <button className="clearbtn" onClick={handleClearPrice}>
            Clear
          </button>
        </div>
        <div className="App">
          <MultiRangeSlider
            min={8000}
            ruler={false}
            max={125000}
            label={false}
            step={2000}
            stepOnly={true}
            minValue={minValue}
            maxValue={maxValue}
            onChange={handleInput}
          />
        </div>
        <div className="price-value">
          <span>₹ {minValue?.toLocaleString()}</span>
          <span>-</span>
          <span>₹ {maxValue?.toLocaleString()}</span>
        </div>
      </div>

      {/** Discount Filter */}
      {/* <OFFreFilterTab
        selectedDiscounts={selectedDiscounts}
        handleDiscountChange={handleDiscountChange}
      /> */}

      {/** colors Filters  */}
      {/* <ColorFilterTab
        selectedColors={selectedColors}
        handleColorChange={handleColorChange}
      /> */}

      {/**Additional Filters */}
      {/* {Object.keys(additionalFilters).length > 0 && (
        <AdditionalFilterTab
          additionalFilters={additionalFilters}
          selectedDiscounts={selectedDiscounts}
          handleDiscountChange={handleDiscountChange}
        />
      )} */}
    </div>
  );
};

const StarFilter = ({ rating }) => {
  return (
    <li>
      <label htmlFor={`brand${rating}`}>
        <div className="d-flex justify-content-center align-items-center gap-2">
          {Array.from({ length: 5 }, (_, index) => (
            <FontAwesomeIcon
              key={index}
              icon={index < rating ? solidStar : regularStar}
              className="StatIconFilter"
            />
          ))}
          <div>
            <span className="mx-2">& up</span>
          </div>
        </div>
      </label>
    </li>
  );
};

const OFFreFilterTab = ({ selectedDiscounts, handleDiscountChange }) => {
  return (
    <div className="accordion mt-4" id="accordionExampleOffer">
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingOffer">
          <button
            className="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOffer"
            aria-expanded="true"
            aria-controls="collapseOffer"
          >
            Discount
            <DownArrow />
          </button>
        </h2>
        <div
          id="collapseOffer"
          className="accordion-collapse collapse hide"
          aria-labelledby="headingOffer"
          data-bs-parent="#accordionExampleOffer"
        >
          <div className="accordion-body">
            <ul>
              {discountArray?.map((ele) => (
                <li
                  key={ele._id}
                  className={
                    selectedDiscounts.includes(ele._id) ? "selectedLi" : ""
                  }
                >
                  <div className="d-flex gap-3">
                    <input
                      type="checkbox"
                      checked={selectedDiscounts.includes(ele)}
                      onChange={() => handleDiscountChange(ele)}
                    />
                    <a>{ele} % or more</a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const ColorFilterTab = ({ selectedColors, handleColorChange }) => {
  return (
    <div className="accordion mt-4" id="accordionExampleColor">
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingColor">
          <button
            className="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseColor"
            aria-expanded="true"
            aria-controls="collapseColor"
          >
            Colors
            <DownArrow />
          </button>
        </h2>
        <div
          id="collapseColor"
          className="accordion-collapse collapse hide"
          aria-labelledby="headingColor"
          data-bs-parent="#accordionExampleColor"
        >
          <div className="accordion-body">
            <ul>
              {colorsWithHex.map((color, index) => (
                <li
                  key={index}
                  className={
                    selectedColors?.includes(color.name) ? "selectedLi" : ""
                  }
                >
                  <div className="d-flex gap-3 align-items-center">
                    <input
                      type="checkbox"
                      checked={selectedColors.includes(color.name)}
                      onChange={() => handleColorChange(color.name)}
                    />
                    {color.name.toLowerCase() === "multi" ? (
                      <img
                        src="https://m.media-amazon.com/images/I/61k3LEQbOLL.jpg" // Replace with the actual path to your image
                        alt="multi"
                        style={{
                          display: "inline-block",
                          width: "20px",
                          height: "15px",
                          borderRadius: "50%",
                        }}
                      />
                    ) : (
                      <span
                        style={{
                          display: "inline-block",
                          width: "20px",
                          height: "15px",
                          borderRadius: "50%",
                          border:
                            color?.name?.toLowerCase() === "white" ||
                            color?.name?.toLowerCase() === "off white" ||
                            color?.name?.toLowerCase() === "beige"
                              ? "0.5px solid #322C2B"
                              : "none",
                          backgroundColor: color.hex,
                        }}
                      ></span>
                    )}
                    <a>{color?.name}</a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdditionalFilterTab = ({ additionalFilters }) => {
  return (
    <div className="accordion mt-4" id="accordionExampleAdditional">
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingAdditional">
          <button
            className="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseAdditional"
            aria-expanded="true"
            aria-controls="collapseAdditional"
          >
            Additional Filters
            <DownArrow />
          </button>
        </h2>
        <div
          id="collapseAdditional"
          className="accordion-collapse collapse show"
          aria-labelledby="headingAdditional"
          data-bs-parent="#accordionExampleAdditional"
        >
          <div className="accordion-body">
            <ul>
              {Object.keys(additionalFilters).map((key, index) => (
                <li key={index}>
                  <div>
                    <div
                      className="accordion mt-3"
                      id={`accordionNested-${index}`}
                    >
                      <div className="accordion-item">
                        <h2
                          className="accordion-header"
                          id={`headingNested-${index}`}
                        >
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#collapseNested-${index}`}
                            aria-expanded="false"
                            aria-controls={`collapseNested-${index}`}
                          >
                            <a>{key !== "" && key.toUpperCase()}</a>{" "}
                            <DownArrow />
                          </button>
                        </h2>
                        <div
                          id={`collapseNested-${index}`}
                          className="accordion-collapse collapse"
                          aria-labelledby={`headingNested-${index}`}
                          data-bs-parent={`#accordionNested-${index}`}
                        >
                          <div className="accordion-body">
                            <ul>
                              {additionalFilters[key].map((ele, index) => (
                                <li key={index}>
                                  <div className="d-flex gap-3 align-items-center">
                                    <input type="checkbox" />
                                    <a>{ele?.toUpperCase()}</a>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CFilterBox;
