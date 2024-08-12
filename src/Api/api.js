import axios from "axios";

// let userdata;

// try {
//     const localStorageData = localStorage?.getItem('persist:auth');
//     if (localStorageData) {
//         const parsedData = JSON.parse(localStorageData);
//         if (parsedData && parsedData.userdata) {
//             userdata = parsedData.userdata;
//         }
//     }
// } catch (error) {
//     console.error('Error parsing JSON from localStorage:', error);
// }

// if (userdata) {
//     try {
//         const parsedUserdata = JSON.parse(userdata);
//         if (parsedUserdata && parsedUserdata[1] && parsedUserdata[1]['accessToken']) {
//             console.log(parsedUserdata[1]['accessToken']);
//         } else {
//             console.error('Invalid userdata format or missing accessToken.');
//         }
//     } catch (error) {
//         console.error('Error parsing userdata JSON:', error);
//     }
// } else {
//     console.error('No valid userdata found in localStorage.');
// }

// console.log(
//   JSON.parse(localStorage.getItem("accessToken")),
//   "toeknnnnnnnnnnnn"
// );
let accessstoken = JSON.parse(localStorage.getItem("accessToken"));
let pincode_local = localStorage.getItem("user_pincode");
// if (JSON.parse(localStorage.getItem('persist:auth'))) {
//     const { userdata } = JSON.parse(localStorage.getItem('persist:auth'));
//     // Rest of your code using 'userdata' variable
//      let u_data = JSON.parse(userdata)
//      pincode = u_data?.pin_code
// }

const headers = {
  "Content-Type": "application/json",
};

export function setAuthHeader() {
  return {
    "Content-Type": "application/json",
    Authorization: "Bearer " + JSON.parse(localStorage.getItem("accessToken")),
  };
}

function setAuthHeaderForRapi() {
  return {
    "content-type": "application/json",
    "Content-Type": "application/json",
    "X-RapidAPI-Key": "14fcfc6491msh621de8d149e4f32p1d0e1ajsn7d2f562a41a4",
    "X-RapidAPI-Host": "pincode.p.rapidapi.com",
  };
}

function setAuthHeaderFormData() {
  return {
    Authorization: "Bearer " + JSON.parse(localStorage.getItem("accessToken")),
  };
}

const apiUrl = import.meta.env.VITE_API_BASE;

const zipcodekey =
  import.meta.env.ZIPCODE_BASE_KEY || "7d89a9a0-b6a0-11ee-bda0-153e0d1683dc";

{
  /*** user auth apis */
}

export async function userRegistration(formData) {
  try {
    const response = await axios.post(apiUrl + "/customer/create", formData);
    return response;
  } catch (error) {
    return error;
  }
}

export async function updateUserData(data) {
  try {
    const response = await axios.patch(apiUrl + "/customer/update", data, {
      headers: setAuthHeader(),
    });
    return response;
  } catch (error) {
    return error;
  }
}

export async function userUpdateData(formData) {
  try {
    const response = await axios.patch(apiUrl + "/customer/update", formData, {
      headers: setAuthHeader(),
    });
    return response;
  } catch (error) {
    return error;
  }
}

export async function userLoginSendOtp(formData) {
  try {
    const response = await axios.post(apiUrl + "/customer/get-otp", formData);
    return response;
  } catch (error) {
    return error;
  }
}

export async function userVerifyOtp(formData) {
  try {
    const response = await axios.post(
      apiUrl + "/customer/verify-otp",
      formData
    );
    return response;
  } catch (error) {
    return error;
  }
}

export async function getCustomerDetails() {
  try {
    const response = await axios.get(apiUrl + "/customer/detail", {
      headers: setAuthHeader(),
    });
    return response;
  } catch (error) {
    return error;
  }
}

{
  /** wishlists apis */
}

export async function createWishList(formData) {
  try {
    const response = await axios.post(apiUrl + "/wishlist/create", formData, {
      headers: setAuthHeader(),
    });
    return response;
  } catch (error) {
    return error;
  }
}

export async function wishLists() {
  try {
    const response = await axios.get(apiUrl + "/wishlist/list", {
      headers: setAuthHeader(),
    });
    return response;
  } catch (error) {
    return error;
  }
}

export async function removeFromWishLists(id) {
  try {
    const response = await axios.delete(apiUrl + `/wishlist/delete/${id}`, {
      headers: setAuthHeader(),
    });
    return response;
  } catch (error) {
    return error;
  }
}

{
  /** product */
}

export async function productDetails(id) {
  try {
    const response = await axios.get(apiUrl + `/seller-product/detail/${id}`);
    return response;
  } catch (error) {
    return error;
  }
}

{
  /**cart */
}

export async function productTocart(formData,isLogin) {
  try {
    let response;
    if (isLogin) {
      response = await axios.post(apiUrl + "/cart/save", formData, {
        headers: setAuthHeader(),
      });
    } else {
      response = await axios.post(apiUrl + "/cart/save", formData);
    }

    return response;
  } catch (error) {
    return error;
  }
}

export async function productReadyBuy(formData, isLogin) {
  try {
    let response;
    if (isLogin) {
      response = await axios.post(apiUrl + "/buy-now/save", formData, {
        headers: setAuthHeader(),
      });
    } else {
      response = await axios.post(apiUrl + "/buy-now/save", formData);
    }

    return response;
  } catch (error) {
    return error;
  }
}

export async function ViewcartList() {
  try {
    const response = await axios.get(apiUrl + `/cart/view`, {
      headers: setAuthHeader(),
    });
    return response;
  } catch (error) {
    return error;
  }
}

export async function ViewBuyList() {
  try {
    const response = await axios.get(apiUrl + `/buy-now/view`, {
      headers: setAuthHeader(),
    });
    return response;
  } catch (error) {
    return error;
  }
}

export async function CartRemove(fromdata) {
  try {
    const response = await axios.post(apiUrl + `/cart/remove-item`, fromdata, {
      headers: setAuthHeader(),
    });
    return response;
  } catch (error) {
    return error;
  }
}

/**search apis */

export async function searchProduct(fromdata) {
  //   console.log(fromdata);

  if (accessstoken) {
    try {
      const response = await axios.get(apiUrl + "/home/search", {
        params: fromdata,
        headers: setAuthHeader(),
      });
      return response;
    } catch (error) {
      return error;
    }
  } else {
    try {
      const response = await axios.get(apiUrl + "/home/search", {
        params: fromdata,
      });
      return response;
    } catch (error) {
      return error;
    }
  }
}

/***banner apis */

export async function getAllBanners() {
  try {
    const response = await axios.get(apiUrl + "/banner/list");
    return response;
  } catch (error) {
    return error;
  }
}

{
  /** caregory product */
}

export async function getCategoryProduct(id) {
  try {
    const response = await axios.get(
      apiUrl + `/seller-product/list-by-category/${id}`
    );
    return response;
  } catch (error) {
    return error;
  }
}

{
  /**all seller by id */
}

export async function getAllSellersById(id) {
  try {
    const response = await axios.get(
      apiUrl + `/seller-product/list-by-proId/${id}`
    );
    return response;
  } catch (error) {
    return error;
  }
}

{
  /** spefiction by seller annd product */
}

export async function getAllSpecproductBySellers(sellerId, productId) {
  try {
    const response = await axios.get(
      apiUrl + `/seller-product/avialable-product/${sellerId}/${productId}`
    );
    return response;
  } catch (error) {
    return error;
  }
}

export async function getUserAddress(id) {
  try {
    const response = await axios.get(apiUrl + `/address/list-by-id/${id}`);
    return response;
  } catch (error) {
    return error;
  }
}

export async function AddAddress(formdata) {
  try {
    const response = await axios.post(apiUrl + `/address/create`, formdata);
    return response;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getallstates() {
  try {
    const response = await axios.post(
      `https://countriesnow.space/api/v0.1/countries/states`,
      { country: "India" }
    );
    return response;
  } catch (error) {
    return error;
  }
}

export async function Deladdress(id) {
  try {
    const response = await axios.delete(apiUrl + `/address/delete/${id}`);
    return response;
  } catch (error) {
    return error;
  }
}

export async function getUserOrders(id) {
  try {
    const response = await axios.get(apiUrl + `/order/list-by-custId/${id}`);
    return response;
  } catch (error) {
    return error;
  }
}

export async function getReturnOrders() {
  try {
    const response = await axios.get(
      apiUrl + `/product-return/list-by-userId`,
      {
        headers: setAuthHeader(),
      }
    );
    return response;
  } catch (error) {
    return error;
  }
}

// /product-return/create
export async function createProductReturn(
  productId,
  orderId,
  reason,
  description,
  images
) {
  try {
    const response = await axios.post(
      apiUrl + `/product-return/create`,
      {
        productId: productId,
        orderId: orderId,
        reason: reason,
        desc: description,
        images: images,
      },
      {
        headers: setAuthHeader(),
      }
    );
    return response;
  } catch (error) {
    return error;
  }
}

{
  /**location api */
}

export async function getLocation(pincode) {
  const options = {
    method: "POST",
    url: "https://pincode.p.rapidapi.com/",
    headers: {
      "content-type": "application/json",
      "Content-Type": "application/json",
      "X-RapidAPI-Key": "14fcfc6491msh621de8d149e4f32p1d0e1ajsn7d2f562a41a4",
      "X-RapidAPI-Host": "pincode.p.rapidapi.com",
    },
    data: {
      searchBy: "pincode",
      value: pincode,
    },
  };
  try {
    const response = await axios.request(options);
    //console.log(response.data);
    return response?.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getDistance(code, compare) {
  const apiUrl = "https://app.zipcodebase.com/api/v1/distance";

  // Construct the request parameters
  const params = {
    apikey: zipcodekey,
    code: code,
    compare: compare,
    country: "IN",
  };

  try {
    // Make the API call using Axios
    const response = await axios.get(apiUrl, { params });
    return response.data;
  } catch (error) {
    console.error("Error:", error.message);
    throw error; // Re-throw the error for further handling if needed
  }
}

export async function getLocationByZipCoder(pincode) {
  try {
    const response = await axios.get(
      `https://app.zipcodebase.com/api/v1/search?apikey=${zipcodekey}&codes=${pincode}`
    );
    return response;
  } catch (error) {
    return error;
  }
}

export async function getHomeAPI(pin) {
  if (pin === "undefined" || pin === null) {

    try {
      const response = await axios.get(apiUrl + "/home/get");
      // console.log("Response without pin:", response);
      return response;
    } catch (error) {
      console.error("Error without pin:", error);
      return error;
    }
  } else {
    console.log("Fetching with pin:", pin);
    let payload = {
      zipCode: pin,
    };
    // try {
    //     const response = await axios.get(apiUrl + `/home/get`, {
    //         params: payload,
    //         headers: setAuthHeader()
    //     });
    //     console.log('Response with pin:', response);
    //     return response;
    // } catch (error) {
    //     console.error('Error with pin:', error);
    //     return error;
    // }
    try {
      const response = await axios.get(apiUrl + "/home/get");
      // console.log("Response without pin:", response);
      return response;
    } catch (error) {
      console.error("Error without pin:", error);
      return error;
    }
  }
}

// export async function getHomeAPI(pin) {
//     try {
//       const response = await axios.get(apiUrl + "/home/all-get");
//       // console.log("Response without pin:", response);
//       return response;
//     } catch (error) {
//       console.error("Error without pin:", error);
//       return error;
//     }
// }

export const PlaceOrder = async (fromdata) => {
  try {
    const response = await axios.post(apiUrl + `/order/create`, fromdata, {
      headers: setAuthHeader(),
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const listBYBrands = async (id) => {
  try {
    const response = await axios.get(
      apiUrl + `/seller-product/list-by-brand/${id}`
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const EditAddress = async (id, fromdata) => {
  try {
    const response = await axios.patch(
      apiUrl + `/address/update/${id}`,
      fromdata,
      { headers: setAuthHeader() }
    );
    return response;
  } catch (error) {
    return error;
  }
};

export async function FileUpload(formData) {
  try {
    const response = await axios.post(apiUrl + `/file/upload`, formData);
    return response;
  } catch (error) {
    return error;
  }
}

export async function submitReview(formdata) {
  try {
    const response = await axios.post(apiUrl + `/review/create`, formdata, {
      headers: setAuthHeader(),
    });
    return response;
  } catch (error) {
    return error;
  }
}

export async function createSellerReview(formData) {
  try {
    const response = await axios.post(
      apiUrl + `/seller-review/create`,
      formData,
      { headers: setAuthHeader() }
    );
    return response;
  } catch (error) {
    return error;
  }
}

export async function searchProductsApi(searchTerm, categoryid) {
  console.log("searchProducts", searchTerm, categoryid);

  try {
    const data = {
      searchTerm: searchTerm,
      categoryId: categoryid === "all" ? null : categoryid,
    };

    console.log("data", data);

    // send the data in the body
    const response = await axios.post(apiUrl + "/home/generalSearch", data);

    return response;
  } catch (error) {
    return error;
  }
}

export async function getAllProductsApi() {
  try {
    const response = await axios.get(apiUrl + "/seller-product/list");
    return response;
  } catch (error) {
    return error;
  }
}

export async function getTestimonialsApi() {
  try {
    const response = await axios.get(apiUrl + "/testimonial/list");
    return response;
  } catch (error) {
    return error;
  }
}

export async function GetProductDetails(id) {
  try {
    const response = await axios.get(apiUrl + `/product/detail/${id}`, {
      headers: setAuthHeader(),
    });
    return response;
  } catch (error) {
    return error;
  }
}

export async function createRazorPayOrder(formData) {
  try {
    const response = await axios.post(apiUrl + `/payment/order`, formData);
    return response;
  } catch (error) {
    return error;
  }
}

export async function RazorPaySuccess(formData) {
  try {
    const response = await axios.post(apiUrl + `/payment/success`, formData);
    return response;
  } catch (error) {
    return error;
  }
}

export async function orderPaymentUpdate(id, fromdata) {
  try {
    const response = await axios.patch(
      apiUrl + `/order/payment-update/${id}`,
      fromdata
    );
    return response;
  } catch (error) {
    return error;
  }
}

export async function getOrderInfo(id) {
  try {
    const response = await axios.get(apiUrl + `/order/detail/${id}`);
    return response;
  } catch (error) {
    return error;
  }
}

export async function getOrderTracking(oId, pId) {
  try {
    const response = await axios.get(
      apiUrl + `/order/order-track/${oId}/${pId}`
    );
    return response;
  } catch (error) {
    return error;
  }
}
export async function getBestSellerProduct() {
  try {
    const response = await axios.get(
      apiUrl + `/seller-product/bestseller-list`
    );
    return response;
  } catch (error) {
    return error;
  }
}

export async function verifyEmail(id) {
  try {
    const response = await axios.get(apiUrl + `/customer/verify-email/${id}`);
    return response;
  } catch (error) {
    return error;
  }
}

export async function AddTempCartData(formdata) {
  try {
    const response = await axios.post(apiUrl + `/cart/bulk-add`, formdata, {
      headers: setAuthHeader(),
    });
    return response;
  } catch (error) {
    return error;
  }
}

{
  /****** */
}

// const apiUrl = import.meta.env.VITE_API_BASE;
// const zipcodekey =
//   import.meta.env.ZIPCODE_BASE_KEY || "7d89a9a0-b6a0-11ee-bda0-153e0d1683dc";

// export function setAuthHeader() {
//   return {
//     "Content-Type": "application/json",
//     Authorization: "Bearer " + JSON.parse(localStorage.getItem("accessToken")),
//   };
// }


export async function getAllCategories() {
  try {
    const response = await axios.get(apiUrl + `/category/ecom-cat-list`);
    return response;
  } catch (error) {
    return error;
  }
}

export async function getAllTopCategories() {
  try {
    const response = await axios.get(apiUrl + `/category/topcat-list`);
    return response;
  } catch (error) {
    return error;
  }
}

export async function PopularProducts() {
  try {
    const response = await axios.get(apiUrl + `/seller-product/popular-list`);
    return response;
  } catch (error) {
    return error;
  }
}


export async function AllBrands() { 
  try {
    const response = await axios.get(apiUrl + `/brand/ecom-brand-list`);
    return response;
  } catch (error) {
    return error;
  }
}