import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ProductCard } from "../ProductCard/ProductCard";

const BestSeller = () => {
  const selectedProduct = useSelector((state) => state?.products?.data);
  const { productData } = selectedProduct || {};

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="section-heading">
            <h2>Popular Products</h2>
            <Link className="cta-view" to={"/category/all"}>
              View All Products
            </Link>
          </div>
        </div>
      </div>

      <div className="row">
        {productData?.length > 0 &&
          productData
            ?.filter((item) => item?.is_popular == true)
            ?.slice(0, 12)
            .map((ele) => {
              return (
                <>
                  <ProductCard ele={ele} showingNo={3} />
                </>
              );
            })}
      </div>
    </>
  );
};

export default BestSeller;
