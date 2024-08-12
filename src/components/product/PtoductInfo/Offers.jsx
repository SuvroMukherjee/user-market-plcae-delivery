
import { IoMdPricetag } from "react-icons/io";


const Offers = ({ offerDatalist }) => {
  return (
    <>
      {offerDatalist?.length > 0 && (
        <div className="offers border shadow-sm rounded p-2">
          <p className="availability2 ms-2 fs-7 text-dark">Offers</p>
          <ul className="offerlists">
            {offerDatalist?.length > 0 &&
              offerDatalist?.map((ele, index) => (
                <li key={index}>
                  <span className="mx-1">
                    <IoMdPricetag size={20} color="#10a003" />
                  </span>
                  <span className="fw-bold ">
                    {" "}
                    {ele?.offerId?.offer_type_name}
                  </span>
                  {"    "}
                  {ele?.discount_percentage}% off on {ele?.offer_on?.bank_name}{" "}
                  Bank {ele?.offer_on?.card_type} Transactions, up to ₹
                  {ele?.min_amount?.toLocaleString()} on orders of ₹
                  {ele?.max_amount?.toLocaleString()} and above <a>T&amp;C</a>
                </li>
              ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Offers;
