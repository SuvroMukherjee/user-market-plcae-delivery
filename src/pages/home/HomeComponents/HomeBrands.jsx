import { useEffect, useState } from "react";
import { MdKeyboardArrowUp, MdOutlineKeyboardArrowDown } from "react-icons/md";
import { AllBrands } from "../../../Api/api";
import { fetchBrands } from "../../../store/brandSlice";
import { useDispatch, useSelector } from "react-redux";

export const HomeBrands = () => {


  const [visibleItemCount, setVisibleItemCount] = useState(18);

  const dispatch = useDispatch();

  const { data, isLoading } = useSelector(
    (state) => state?.brands || []
  );

  let allBrands = data?.brands || [];

  useEffect(() => {
    dispatch(fetchBrands());
  }, []);

  const handleViewMore = async () => {
    setVisibleItemCount(allBrands?.length);
  };

  const handleViewLess = () => {
    setVisibleItemCount(18);
  };

  return (
    <>
      <section className="section-5">
        <div className="container-fluid container-padding">
          <div className="row">
            <div className="col-lg-3 col-12">
              <h3>Crafted in India, Celebrated Worldwide</h3>
              <p>Home Grown Indian Brands.</p>
            </div>
            <div className="col-lg-9 col-12">
              <ul className="brands-list">
                {!isLoading &&
                  allBrands?.length > 0 &&
                  allBrands?.slice(0, visibleItemCount)?.map((ele, index) => (
                    <li key={index}>
                      <div className="item-image">
                        <img
                          style={{
                            filter: "grayscale(100%) brightness(0) invert(1)",
                          }}
                          src={ele?.image?.[0]?.image_path}
                          alt="pic"
                        />
                      </div>
                    </li>
                  ))}
              </ul>
              {allBrands?.length > 0 && (
                <div className="view-more-brand">
                  {visibleItemCount == 18 ? (
                    <a onClick={handleViewMore}>
                      View More Brands{" "}
                      <span>
                        <MdOutlineKeyboardArrowDown />
                      </span>
                    </a>
                  ) : (
                    <a onClick={handleViewLess}>
                      View Less{" "}
                      <span>
                        <MdKeyboardArrowUp />
                      </span>
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
