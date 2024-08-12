import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CustomSvg } from "../../assets/customSvgs/CustomSvg.jsx";
import { useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { OrderFilterContext } from "../../context/context.js";
import { TbTruckReturn } from "react-icons/tb";

const SideLayout = () => {
  const { userdata } = useSelector((state) => state?.auth);

  const [orderYears] = useState([2024, 2023, 2022, 2021]);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  const { filterState, setFilterState, isChecked } =
    useContext(OrderFilterContext);

  const handleStatusFilterChange = (e) => {
    let statusFilter = filterState.statusFilter;
    if (e.target.checked) {
      statusFilter.push(e.target.value);
    } else {
      statusFilter = statusFilter.filter((item) => item !== e.target.value);
    }
    setFilterState({ ...filterState, statusFilter });
  };

  const handleTimeFilterChange = (e) => {
    setFilterState({ ...filterState, timeFilter: e.target.value });
  };

  const handleStatusFilterReset = (e) => {
    e.preventDefault();
    setFilterState({ ...filterState, statusFilter: [] });
  };

  const handleTimeFilterReset = (e) => {
    e.preventDefault();
    setFilterState({ ...filterState, timeFilter: "" });
  };

  return (
    <>
      <div className="inner-left-panel">
        <div className="panel-top">
          <div className="top-inner">
            <div className="inner-left">
              {/* <img src={personwhite} alt="User" /> */}
              <FaUserCircle size={34} />
            </div>
            <div className="inner-right">
              <div className="right-row-1">Hello, {userdata?.name}</div>
              <div className="right-row-2">Appliance Customer</div>
            </div>
          </div>
        </div>
        <div className="panel-middle">
          <div className="middle-row">
            <div className="row-inner">
              {/* order list navigation */}
              <div className="inner-row">
                <div className="menu-icon">
                  <CustomSvg svgName="order-icon" />
                </div>
                <a
                  className="menu-link"
                  onClick={() => navigate("/user/orderlist")}
                >
                  My Orders
                  <span className="right-angle">
                    <CustomSvg svgName="forward-icon" />
                  </span>
                </a>
              </div>
              {/* return order list navigation */}
              <div className="inner-row">
                <div className="menu-icon">
                  <TbTruckReturn size={20} />
                </div>
                <a
                  className="menu-link"
                  onClick={() => navigate("/user/returnorderlist")}
                >
                  Return Orders
                  <span className="right-angle">
                    <CustomSvg svgName="forward-icon" />
                  </span>
                </a>
              </div>
            </div>
            <div className="bottom-border"></div>
          </div>
          <div className="middle-row">
            <div className="row-inner">
              <div className="inner-row">
                <div className="menu-icon">
                  <CustomSvg svgName="profile-icon" />
                </div>
                <div className="menu-item">Account Settings</div>
              </div>
              <div className="submenu">
                <a className="submenu-link"
                onClick={() => navigate("/user/userprofile")}
                >
                  <div>Profile Information</div>
                </a>
                <a
                  className="submenu-link"
                  onClick={() => navigate("/user/manageaddress")}
                >
                  <div>Manage Addresses</div>
                </a>
              </div>
            </div>
            {/* <div className="bottom-border"></div> */}
          </div>
        </div>

        {/* order filter */}
        {location.pathname.includes("/user/orderlist") && (
          <div className="panel-bottom">
            <div className="card">
              {/* order status filter */}
              <article className="card-group-item">
                <header
                  className="card-header"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h6 className="title">Order Status</h6>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleStatusFilterReset}
                  >
                    Reset
                  </Button>
                </header>
                <div className="filter-content">
                  <div className="card-body">
                    <form>
                      <label className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value="order_placed"
                          name="statusFilter"
                          checked={isChecked("order_placed")}
                          onChange={handleStatusFilterChange}
                        />
                        <span className="form-check-label">Order Placed</span>
                      </label>
                      <label className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value="confirmed"
                          name="statusFilter"
                          checked={isChecked("confirmed")}
                          onChange={handleStatusFilterChange}
                        />
                        <span className="form-check-label">
                          Order Confirmed
                        </span>
                      </label>
                      <label className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value="order_packed"
                          name="statusFilter"
                          checked={isChecked("order_packed")}
                          onChange={handleStatusFilterChange}
                        />
                        <span className="form-check-label">Order Picked</span>
                      </label>
                      <label className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value="shipped"
                          name="statusFilter"
                          checked={isChecked("shipped")}
                          onChange={handleStatusFilterChange}
                        />
                        <span className="form-check-label">Order Shipped</span>
                      </label>
                      <label className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value="delivered"
                          name="statusFilter"
                          checked={isChecked("delivered")}
                          onChange={handleStatusFilterChange}
                        />
                        <span className="form-check-label">
                          Order Delivered
                        </span>
                      </label>
                      <label className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value="cancel"
                          name="statusFilter"
                          checked={isChecked("cancel")}
                          onChange={handleStatusFilterChange}
                        />
                        <span className="form-check-label">Order Canceled</span>
                      </label>
                    </form>
                  </div>
                </div>
              </article>
              {/* order time filter */}
              <article className="card-group-item">
                <header
                  className="card-header"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h6 className="title">Order Time</h6>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleTimeFilterReset}
                  >
                    Reset
                  </Button>
                </header>
                <div className="filter-content">
                  <div className="card-body">
                    {orderYears.length > 0 &&
                      orderYears.map((year, index) => (
                        <label className="form-check" key={index}>
                          <input
                            className="form-check-input"
                            type="radio"
                            name="exampleRadio"
                            value={year}
                            checked={filterState.timeFilter === year.toString()}
                            onChange={handleTimeFilterChange}
                          />
                          <span className="form-check-label">{year}</span>
                        </label>
                      ))}
                  </div>
                </div>
              </article>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SideLayout;
