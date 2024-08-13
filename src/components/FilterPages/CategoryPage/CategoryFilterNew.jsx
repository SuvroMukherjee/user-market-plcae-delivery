import React, { useEffect, useState } from "react";
import { useGetAllProductsQuery } from "../../../store/productApiSlice";
import ReactPaginate from "react-paginate";
import RenderProducts from "../RenderProducts";
import CFilterBox from "./CFilterBox";

const CategoryFilterNew = () => {
  const ITEMS_PER_PAGE = 18;

  // State for current page
  const [currentPage, setCurrentPage] = useState(0); // React Paginate uses 0-based index

  // Filter states
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedDiscounts, setSelectedDiscounts] = useState([]);

  // Build the query parameters
  const queryParams = {
    page: currentPage + 1,
    limit: ITEMS_PER_PAGE,
    brands: selectedBrands,
    categories: selectedCategories,
    minPrice: priceRange.min,
    maxPrice: priceRange.max,
    colors: selectedColors,
    discounts: selectedDiscounts,
  };

  // Fetch products based on current page and filters
  const {
    data: products,
    error,
     isLoading: productsLoading,
    isFetching,
  } = useGetAllProductsQuery(queryParams);

  const filterProductsArray = products?.data;

  const pageCount = products?.totalPages || 0;

  // Handle page change
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // Handler functions for filters
  const handleBrandChange = (brandId) => {
    setCurrentPage(0); // Reset to first page
    if (selectedBrands.includes(brandId)) {
      setSelectedBrands(selectedBrands.filter((id) => id !== brandId));
    } else {
      setSelectedBrands([...selectedBrands, brandId]);
    }
  };

  const handleCategoryChange = (categoryId) => {
    setCurrentPage(0); // Reset to first page
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(
        selectedCategories.filter((id) => id !== categoryId)
      );
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  const handlePriceRangeChange = (min, max) => {
    setCurrentPage(0); // Reset to first page
    setPriceRange({ min, max });
  };

  const handleColorChange = (color) => {
    setCurrentPage(0); // Reset to first page
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter((c) => c !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };

  const handleDiscountChange = (discount) => {
    setCurrentPage(0); // Reset to first page
    if (selectedDiscounts.includes(discount)) {
      setSelectedDiscounts(selectedDiscounts.filter((d) => d !== discount));
    } else {
      setSelectedDiscounts([...selectedDiscounts, discount]);
    }
  };

  const handleClearFilters = () => {
    setCurrentPage(0); // Reset to first page
    setSelectedBrands([]);
    setSelectedCategories([]);
    setPriceRange({ min: 0, max: 0 });
    setSelectedColors([]);
    setSelectedDiscounts([]);
  };

  return (
    <div className="page-content category-page">
      <div className="top-filter-bar">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-sm-6 col-12">
              <div className="content-left">
                <label>
                  {products?.totalItems || 0} Results{" "} {" "}
                  {isFetching && productsLoading ? (
                    <span style={{ color: "red" }}>( Loading...)</span>
                  ) : null}
                </label>
              </div>
            </div>
            <div className="col-sm-6 col-12">
              <div className="pagination-container mt-4 mb-4 d-flex justify-content-end">
                <ReactPaginate
                  previousLabel={"<"}
                  nextLabel={">"}
                  breakLabel={"..."}
                  pageCount={pageCount}
                  forcePage={currentPage}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={handlePageClick}
                  containerClassName={"pagination"}
                  pageClassName={"page-item"}
                  pageLinkClassName={"page-link"}
                  previousClassName={"page-item"}
                  previousLinkClassName={"page-link"}
                  nextClassName={"page-item"}
                  nextLinkClassName={"page-link"}
                  breakClassName={"page-item"}
                  breakLinkClassName={"page-link"}
                  activeClassName={"active"}
                  disabledClassName={"disabled"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row category-page-content">
          <div className="col-xl-3 col-12">
            <CFilterBox
              selectedBrands={selectedBrands}
              handleBrandChange={handleBrandChange}
              selectedCategories={selectedCategories}
              handleCategoryChange={handleCategoryChange}
              priceRange={priceRange}
              handlePriceRangeChange={handlePriceRangeChange}
              selectedColors={selectedColors}
              handleColorChange={handleColorChange}
              selectedDiscounts={selectedDiscounts}
              handleDiscountChange={handleDiscountChange}
              handleClearFilters={handleClearFilters}
            />
          </div>

          <div className="col-xl-9 col-12 right-col">
            <RenderProducts
              filterProductsArray={filterProductsArray}
              isFetching={isFetching}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryFilterNew;
