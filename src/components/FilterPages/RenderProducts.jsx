import { useState } from "react";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import { LoaderComponent } from "../Loader/LoaderComponent";
import { ProductCard, ProductCardSkeleton } from "../ProductCard/ProductCard";
import "./renderProduct.css";
import { useGetAllProductsQuery } from "../../store/productApiSlice";

const ITEMS_PER_PAGE = 18;

const RenderProducts = ({  filterProductsArray }) => {
  const {
    data: products,
    error,
    isLoading: productsLoading,
  } = useGetAllProductsQuery({ page: 1, limit: 18 });

  console.log(products, "products");

  const dataLoading = useSelector(
    (state) => state?.products?.isLoading || false
  );

  const [currentPage, setCurrentPage] = useState(0);

  // Calculate the number of pages
  const pageCount = Math.ceil(filterProductsArray?.length / ITEMS_PER_PAGE);

  // Get the items for the current page
  const currentItems = filterProductsArray?.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  return (
    <div className="right-listing">
      {filterProductsArray?.length > 18 && (
        <div className="pagination-container mt-4 mb-4">
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            pageCount={pageCount}
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
          />
        </div>
      )}
      <div className="sectiion-heading"></div>
      {dataLoading ? (
        Array.from({ length: 18 }, (_, i) => (
          <div className="row">
            <ProductCardSkeleton type={"swiper"} />
          </div>
        ))
      ) : (
        <div className="row">
          {currentItems?.length > 0 ? (
            currentItems?.map((ele, index) => (
              <ProductCard key={index} ele={ele} />
            ))
          ) : (
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
      )}
      {/* {filterProductsArray?.length > 18 && (
        <div className="pagination-container mt-4 mb-4">
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            pageCount={pageCount}
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
          />
        </div>
      )} */}
    </div>
  );
};

export default RenderProducts;
