import { useState } from "react";
import { useSelector } from "react-redux";
import { ratingCalculation } from "../../../assets/common/RatingAvg";
import { LoaderComponent } from "../../Loader/LoaderComponent";
import { ProductCard } from "../../ProductCard/ProductCard";
import BFilterBox from "./BFilterBox";
import RenderProducts from "../RenderProducts";

export const BrandFilterPage = () => {
  const [filterType, setFilterType] = useState("");
  const [selectedId, setSelectedtId] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [minValue, setMinValue] = useState(8000);
  const [maxValue, setMaxValue] = useState(125000);
  const [checkedValues, setCheckedValues] = useState([]);
  const [selectedDiscounts, setSelectedDiscounts] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);

  const selectedProduct = useSelector((state) => state?.products?.data);
  const { reviewData } = selectedProduct || {};
  
  const dataLoading = useSelector(
    (state) => state?.products?.isLoading || false
  );
  const { productData: allProducts, isLoading: productLoading } = useSelector(
    (state) => state?.products?.data || []
  );

  let filterProductsArray = allProducts ? [...allProducts] : [];
  let filterCatProductArray = allProducts ? [...allProducts] : [];

  const handleCategoryChange = (brandId) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(brandId)
        ? prevSelected.filter((id) => id !== brandId)
        : [...prevSelected, brandId]
    );
  };

  const handleInput = (e) => {
    setMinValue(e.minValue);
    setMaxValue(e.maxValue);
  };

  const handleClearPrice = () => {
    setMinValue(8000);
    setMaxValue(125000);
  };

  const handleCheckboxChange = (value) => {
    setCheckedValues((prevChecked) =>
      prevChecked.includes(value)
        ? prevChecked.filter((item) => item !== value)
        : [...prevChecked, value]
    );
  };

  const handleDiscountChange = (discount) => {
    setSelectedDiscounts((prevSelected) =>
      prevSelected.includes(discount)
        ? prevSelected.filter((item) => item !== discount)
        : [...prevSelected, discount]
    );
  };

  const handleColorChange = (discount) => {
    setSelectedColors((prevSelected) =>
      prevSelected.includes(discount)
        ? prevSelected.filter((item) => item !== discount)
        : [...prevSelected, discount]
    );
  };

  function calculateDiscountPercentage(mrp, sellPrice) {
    const discount = mrp - sellPrice;
    const discountPercentage = (discount / mrp) * 100;
    return discountPercentage;
  }

  if (selectedId !== "") {
    filterProductsArray = filterProductsArray?.filter((ele) => {
      return ele?.productId?.brandId?._id == selectedId;
    });
    filterCatProductArray = filterProductsArray.filter(
      (ele) => ele?.productId?.brandId?._id == selectedId
    );
  }

  if (selectedCategories.length > 0) {
    filterProductsArray = filterProductsArray.filter((ele) =>
      selectedCategories.includes(ele?.productId?.categoryId?._id)
    );
  }

  if (checkedValues.length > 0) {
    filterProductsArray = filterProductsArray.filter((ele) => {
      const rating = ratingCalculation(ele?._id, reviewData);
      return checkedValues.some((value) => value <= rating);
    });
  }

  if (minValue !== 8000 || maxValue !== 125000) {
    filterProductsArray = filterProductsArray.filter(
      (ele) =>
        Math.round(ele?.price) >= minValue && Math.round(ele?.price) <= maxValue
    );

    if (minValue !== 8000) {
      filterProductsArray.sort((a, b) => a?.price - b?.price);
    } else if (maxValue !== 125000) {
      filterProductsArray.sort((a, b) => b?.price - a?.price);
    }
  }

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

  if (selectedDiscounts?.length > 0) {
    filterProductsArray = filterProductsArray
      .filter((ele) => {
        const discount = Math.round(
          calculateDiscountPercentage(ele?.specId?.price, ele?.price)
        );
        return selectedDiscounts.some((value) => value <= discount);
      })
      .sort((a, b) => {
        const discountA = calculateDiscountPercentage(
          a?.specId?.price,
          a?.price
        );
        const discountB = calculateDiscountPercentage(
          b?.specId?.price,
          b?.price
        );
        return discountB - discountA;
      });
  }

  if (selectedColors?.length > 0) {
    filterProductsArray = filterProductsArray.filter((product) => {
      const colorSpec = product?.specId?.spec_det.find((spec) => {
        if (
          spec.title.toLowerCase() === "colour" ||
          spec.title.toLowerCase() === "color"
        ) {
          return selectedColors.some((color) =>
            spec.value.trim().toLowerCase().includes(color.toLowerCase())
          );
        }
        return false;
      });
      return !!colorSpec;
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
                  <label>{filterProductsArray.length} Results</label>
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
              <BFilterBox
                selectedId={selectedId}
                setSelectedtId={setSelectedtId}
                filterProductsArray={filterProductsArray}
                setSelectedCategories={setSelectedCategories}
                selectedCategories={selectedCategories}
                handleCategoryChange={handleCategoryChange}
                filterCatProductArray={filterCatProductArray}
                checkedValues={checkedValues}
                setCheckedValues={setCheckedValues}
                handleCheckboxChange={handleCheckboxChange}
                handleInput={handleInput}
                handleClearPrice={handleClearPrice}
                minValue={minValue}
                maxValue={maxValue}
                selectedDiscounts={selectedDiscounts}
                handleDiscountChange={handleDiscountChange}
                selectedColors={selectedColors}
                handleColorChange={handleColorChange}
              />
            </div>
            <div className="col-xl-9 col-12 right-col">
              <RenderProducts filterProductsArray={filterProductsArray} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
