import { ProductCard, ProductCardSkeleton } from "../ProductCard/ProductCard";
import "./renderProduct.css";

const RenderProducts = ({ filterProductsArray, isFetching }) => {
  return (
    <div className="right-listing">
      {isFetching ? (
        <>
          <div className="section-heading"></div>
          <div className="row">
            {Array.from({ length: 7 }).map((_, index) => (
              <ProductCardSkeleton showingNo={4} />
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="section-heading"></div>
          <div className="row">
            {filterProductsArray?.length > 0 ? (
              filterProductsArray.map((ele, index) => (
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
        </>
      )}
    </div>
  );
};

export default RenderProducts;
