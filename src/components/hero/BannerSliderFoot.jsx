const BannerSliderFoot = ({ FooterBanner }) => {
  return (
    <>
      <section className="ad-banner-section">
        <div className="container">
          <div className="row">
            {FooterBanner[0]?.length > 0 &&
              FooterBanner[0]?.map((ele, index) => (
                <div key={index} className="col-md-6 col-12">
                  <a>
                    <img src={ele?.image_path} alt="Advertisement" />
                  </a>
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default BannerSliderFoot;
