import Group49 from "../../assets/images/Group49.png";

const AddSlider = ({ exploreAll }) => {
  return (

    <section class="product-ad-link">
      <div class="container">
        <div class="row">
          {/* <div class="col-12">
            <div class="ad-container">
              <a href="#">
                <img src={exploreAll ?  exploreAll?.[0]?.[0]?.image_path :  Group49} alt="" />
              </a>
            </div>
          </div> */}
          <div class="col-md-6">
            <a href="#" class="imege-holder">
              <img src={exploreAll ?  exploreAll?.[0]?.[0]?.image_path :  Group49} alt="" />
            </a>
          </div>

          <div class="col-md-6">
            <a href="#" class="imege-holder">
              <img src={exploreAll ?  exploreAll?.[0]?.[0]?.image_path :  Group49} alt="" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AddSlider;
