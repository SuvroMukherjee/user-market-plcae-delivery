import React from "react";
import { useSelector } from "react-redux";
import { recentProductData } from "../../../store/recentViewSlice";
import { ProductCard } from "../../ProductCard/ProductCard";

const RecentView = () => {
  const recentproducts = useSelector(recentProductData);
  return (
    <div className="related-product-section mb-4">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h4>Recently Viewed</h4>
          </div>
        </div>
        <div className="row">
          {recentproducts?.length > 0 &&
            recentproducts?.slice(0,4)?.map((ele, index) => (
              <ProductCard ele={ele?.SellerProductData} showingNo={3} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default RecentView;
