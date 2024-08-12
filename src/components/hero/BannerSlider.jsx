import React from "react";

const BannerSlider = ({ MiddleBanner }) => {
  return (
    <>
      <section className="ad-banner-section">
        <div className="container">
          <div className="row">
            {MiddleBanner?.[0]?.length > 0 &&
              MiddleBanner?.[0]?.map((ele) => (
                <div className="col-md-6 col-12">
                  <a>
                    <img src={ele?.image_path} alt="Advertisement" />
                  </a>
                </div>
              ))}
            {/* 
                        <div className="col-md-6 col-12">
                            <a >
                                <img src={adbanner2} alt="Advertisement" />
                            </a>
                        </div> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default BannerSlider;
