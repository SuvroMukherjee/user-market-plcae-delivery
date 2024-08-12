import "swiper/css";
import "swiper/css/navigation";
import { StarRating } from "../../hero/StarRating";


const InfoTable = ({ productDes, avgRating, reviewData }) => {
  return (
    <div className="container">
      <div className="divider"></div>
      <h4 className="product-name" style={{ color: "#2a9c2a" }}>
        Product Description
      </h4>
      <h3 className="product-name">
        {productDes?.name}{" "}
        {productDes?.specId?.spec_det?.slice(0, 3)?.map((ele, index, array) => (
          <span key={index}>
            {ele.value}
            {index < array.length - 1 ? ", " : ""}
          </span>
        ))}
      </h3>
      <div className="row">
        <div className="col-md-6 col-12">
          <h4 className="table-heading">Additional Details</h4>
          <table>
            <tbody>
              <tr>
                <th>Brand</th>
                <td>{productDes?.productId?.brandId?.title}</td>
              </tr>
              <tr>
                <th>Category</th>
                <td>{productDes?.productId?.categoryId?.title}</td>
              </tr>
              <tr>
                <th>SubCategory</th>
                <td>{productDes?.productId?.subcategoryId?.title}</td>
              </tr>
              <tr>
                <th>Product ID</th>
                <td>{productDes?.productId?.productId}</td>
              </tr>
              <tr>
                <th>SKU</th>
                <td>{productDes?.specId?.skuId?.toUpperCase()}</td>
              </tr>
              <tr>
                <th>Rating</th>
                <td>{<StarRating value={avgRating} />}</td>
              </tr>
              <tr>
                <th>Feedbacks</th>
                <td>{reviewData?.length} customer reviews</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-md-6 col-12">
          <h4 className="table-heading">Technical Information</h4>
          <table>
            <tbody>
              {productDes?.specId?.spec_det?.map((ele, index, array) => (
                <tr key={index}>
                  <th>{ele?.title}</th>
                  <td>{ele?.value}</td>
                </tr>
              ))}
              <tr>
                <th>Seller</th>
                <td>{productDes?.sellerId?.user_name}</td>
              </tr>
              <tr>
                <th>Shop Location</th>
                <td>{productDes?.sellerId?.Shop_Details_Info?.disict}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InfoTable;
