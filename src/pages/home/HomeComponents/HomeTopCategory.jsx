import React from "react";
import { useNavigate } from "react-router-dom";
import HomeCategoryList from "./HomeCategoryList";

const HomeTopCategory = () => {
    const navigate = useNavigate();
  return (
    <div>
      <section className="category-section">
        <div className="container-fluid container-padding">
          <div className="section-heading">
            <h2>Top Categories</h2>
            <a onClick={() => navigate(`/category/all`)} className="cta-view">
              View All Categories
            </a>
          </div>

          <HomeCategoryList />
        </div>
      </section>
    </div>
  );
};

export default HomeTopCategory;
