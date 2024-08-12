import React, { useState } from "react";
import { FaChevronDown, FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import location from "../../../assets/images/location.png";

const Pincheck = ({
  handleAddressChange,
  setEnterPincode,
  checkPincodeHandler,
  enterPincode,
  Isdeliverable,
  isDelivertStatus,
  loccheckLoading,
}) => {
  const { data: Alladdressdata, deliveyAddress } = useSelector(
    (state) => state?.address
  );
  const [showDrop, setshowDrop] = useState(false);
  const { isLoggIn, userdata } = useSelector((state) => state?.auth);

  return (
    <>
      <div className="d-to availability">
        <span className="location-icon">
          <img src={location} alt="location" />
        </span>
        Deliver to :
      </div>

      {isLoggIn ? (
        <div className="address-part">
          <div className="defaultaddbox" onClick={() => setshowDrop(!showDrop)}>
            <span className="selectAddName">
              {deliveyAddress?.name} - {deliveyAddress?.pincode}
            </span>
            <span className="ms-auto">
              <FaChevronDown />
            </span>
          </div>

          {showDrop && (
            <div className="otheraddboxMainConatiner">
              <p>Select from saved addresses:</p>
              <div className="otheraddbox-wrap">
                {Alladdressdata?.length > 0 &&
                  Alladdressdata?.map((ele, index) => (
                    <div
                      key={index}
                      className="otheraddbox"
                      onClick={() => handleAddressChange(ele)}
                    >
                      <span className="selectAddName">
                        {ele?.name} - {ele?.pincode}
                      </span>
                      <span className="addressType">{ele?.address_type}</span>
                    </div>
                  ))}
              </div>
              <div className="row mt-2">
                <div className="col-8">
                  <input
                    className="pinInput"
                    placeholder="Enter Delivery Pincode"
                    type="number"
                    value={enterPincode}
                    onChange={(e) => setEnterPincode(e?.target?.value)}
                  />
                  <span
                    className="changeColor"
                    onClick={() => {
                      checkPincodeHandler();
                    }}
                  >
                    Check
                  </span>
                </div>
                {loccheckLoading && <p className="mt-2 chText">checking...</p>}
                {Isdeliverable != "" && (
                  <p className="mt-2 no-dil">{Isdeliverable}</p>
                )}

                {isDelivertStatus == true && (
                  <p className="avlProduct mt-2">
                    Product is available in this area
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="address-part">
          <div className="addnewText mx-2">
            <div onClick={() => setshowDrop(!showDrop)}>
              {" "}
              <span>
                <FaPlus />
              </span>{" "}
              Enter pincode to search
            </div>
            {showDrop && (
              <div className="otheraddboxMainConatiner-not">
                <div className="row mt-2">
                  <div className="col-8">
                    <input
                      className="pinInput"
                      placeholder="Enter Delivery Pincode"
                      type="number"
                      value={enterPincode}
                      onChange={(e) => setEnterPincode(e?.target?.value)}
                    />
                    <span
                      className="changeColor"
                      onClick={() => {
                        checkPincodeHandler();
                      }}
                    >
                      Check
                    </span>
                  </div>
                  {loccheckLoading && (
                    <p className="mt-2 chText">checking...</p>
                  )}
                  {Isdeliverable != "" && (
                    <p className="mt-2 no-dil">{Isdeliverable}</p>
                  )}

                  {isDelivertStatus == true && (
                    <p className="avlProduct mt-2">
                      Product is available in this area
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Pincheck;
