import React from "react";
import { Link } from "react-router-dom";
import { ProductCard } from "../../../components/ProductCard/ProductCard";
import { PopularProducts } from "../../../Api/api";

const HomePopularProducts = () => {
  const [productData, setProductData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    getPopularProducts();
  }, []);

  async function getPopularProducts() {
    try {
      const res = await PopularProducts();
      let filterData = res?.data?.data?.filter((ele) => {
        return ele?.status == true;
      });
      setProductData(filterData);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <section className="section-3 best-seller">
        <div className="container-fluid container-padding">
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
            {!isLoading &&
              productData?.length > 0 &&
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
        </div>
      </section>
    </div>
  );
};

export default HomePopularProducts;
