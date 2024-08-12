import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <>
      {/* <footer className='boxItems'>
        <div className='container flex'>
          <p>Cartsy Medicine - All right reserved - Design & Developed by RedQ ,Inc</p>
          <div className='social'>
            <BsFacebook className='icon' />
            <RiInstagramFill className='icon' />
            <A href="#"iFillTwitterCircle className='icon' />
            <A href="#"iFillLinkedin className='icon' />
          </div>
        </div>
      </footer> */}
      <footer>
        <div className="upper">
          <div className="container">
            <div className="row">
              <div className="col">
                <h5>Shop by Category</h5>
                <ul>
                  <li>
                    <a href="#">Refrigerator</a>
                  </li>
                  <li>
                    <a href="#">Microwave</a>
                  </li>
                  <li>
                    <a href="#">Washing machine</a>
                  </li>
                  <li>
                    <a href="#">Dishwasher</a>
                  </li>
                  <li>
                    <a href="#">Blender</a>
                  </li>
                  <li>
                    <a href="#">Vacuum cleaner</a>
                  </li>
                  <li>
                    <a href="#">Toaster</a>
                  </li>
                  <li>
                    <a href="#">Mixer</a>
                  </li>
                  <li>
                    <a href="#">Coffee maker</a>
                  </li>
                  <li>
                    <a href="#">Dryer</a>
                  </li>
                  <li>
                    <a href="#">Oven</a>
                  </li>
                  <li>
                    <a href="#">Rice cooker</a>
                  </li>
                </ul>
              </div>
              <div className="col">
                <h5>&nbsp;</h5>
                <ul>
                  <li>
                    <a href="#">Fan</a>
                  </li>
                  <li>
                    <a href="#">Kitchen stove</a>
                  </li>
                  <li>
                    <a href="#">Air purifier</a>
                  </li>
                  <li>
                    <a href="#">Convection oven</a>
                  </li>
                  <li>
                    <a href="#">Slow cooker</a>
                  </li>
                  <li>
                    <a href="#">Juicer</a>
                  </li>
                  <li>
                    <a href="#">Food processor</a>
                  </li>
                  <li>
                    <a href="#">Pressure cooking</a>
                  </li>
                  <li>
                    <a href="#">Humidifier</a>
                  </li>
                  <li>
                    <a href="#">Freezer</a>
                  </li>
                  <li>
                    <a href="#">Toaster Oven</a>
                  </li>
                  <li>
                    <a href="#">Electric stove</a>
                  </li>
                </ul>
              </div>
              <div className="col">
                <h5>Shop by Brands</h5>
                <ul>
                  <li>
                    <a href="#">Sony</a>
                  </li>
                  <li>
                    <a href="#">Apple</a>
                  </li>
                  <li>
                    <a href="#">Panasonic</a>
                  </li>
                  <li>
                    <a href="#">Philips</a>
                  </li>
                  <li>
                    <a href="#">Toshiba</a>
                  </li>
                  <li>
                    <a href="#">Samsung Group</a>
                  </li>
                  <li>
                    <a href="#">Best Buy</a>
                  </li>
                  <li>
                    <a href="#">Intel</a>
                  </li>
                  <li>
                    <a href="#">Asus</a>
                  </li>
                  <li>
                    <a href="#">Nintendo</a>
                  </li>
                  <li>
                    <a href="#">Haier</a>
                  </li>
                  <li>
                    <a href="#">Dell</a>
                  </li>
                </ul>
              </div>
              <div className="col">
                <h5>&nbsp;</h5>
                <ul>
                  <li>
                    <a href="#">Acer</a>
                  </li>
                  <li>
                    <a href="#">Sharp</a>
                  </li>
                  <li>
                    <a href="#">LG Electronics</a>
                  </li>
                  <li>
                    <a href="#">Hitachi</a>
                  </li>
                  <li>
                    <a href="#">Microsoft</a>
                  </li>
                  <li>
                    <a href="#">Huawei</a>
                  </li>
                  <li>
                    <a href="#">IBM</a>
                  </li>
                  <li>
                    <a href="#">Fujitsu</a>
                  </li>
                  <li>
                    <a href="#">Lenovo Group</a>
                  </li>
                  <li>
                    <a href="#">Siemens</a>
                  </li>
                  <li>
                    <a href="#">NEC</a>
                  </li>
                  <li>
                    <a href="#">Samsung</a>
                  </li>
                </ul>
              </div>
              <div className="col col-last">
                <div className="col-last-block">
                  <h5>Help</h5>
                  <ul>
                    <li>
                      <a href="#">Track Your Order</a>
                    </li>
                    <li>
                      <a href="#">Warranty &amp; Support</a>
                    </li>
                    <li>
                      <a href="#">Return Policy</a>
                    </li>
                    <li>
                      <a href="#">Service Centres</a>
                    </li>
                    <li>
                      <a href="#">FAQs</a>
                    </li>
                  </ul>
                </div>
                <div className="col-last-block">
                  <h5>Contact Us</h5>
                  <ul>
                    <li>
                      <Link to="/policy/about-us">About Us</Link>
                    </li>
                    <li>
                      <Link to="mailto:support@zoofi.in">
                        Email : Support@zoofi.in
                      </Link>
                    </li>
                    <li>
                      <a href="#">Phone : +91 80772-04945</a>
                    </li>
                    <li>
                      <a href="#">
                        Address : 6S 2nd floor -<br /> Sai Residency Rajendra
                        Nagar <br /> Pincode :- 243122 , Uttar Pradesh India.
                      </a>
                    </li>
                    <li>
                      <a href="#">Investor Relations</a>
                    </li>
                    <li>
                      <a href="#">Warranty Policy</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lower">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <p>© 2023 Appliance PVT LTD. All Rights Reserved</p>
                <ul>
                  <li>
                    <Link to={"/policy/terms&condition"}>
                      <p>Terms &amp; Conditions</p>
                    </Link>
                  </li>
                  <li>
                    <Link to="/policy/cancellation-refund">
                      <p>Cancellation &amp; Refund Policy</p>
                    </Link>
                  </li>
                  {/* <li>
                    <Link to="/policy/shipping-delivery">
                      <p>Shipping &amp; Delivery Policy</p>
                    </Link>
                  </li> */}
                  <li>
                    <Link to="/policy/privacy-policy">
                      <p>Privacy Policy</p>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
