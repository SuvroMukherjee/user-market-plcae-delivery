import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { FaStar } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
import { useParams } from "react-router-dom";
import {
  FileUpload,
  createSellerReview,
  productDetails,
  submitReview,
} from "../../Api/api";
import { calculateReview } from "../../assets/common/RatingAvg";

const RateAndReview = () => {
  const [productdes, setProductDes] = useState();
  const [reviewData, setReviewData] = useState();
  const [avgRating, setAvgRating] = useState();
  const [sellerData, setSellerData] = useState();
  const { id: ProductId } = useParams();

  console.log(sellerData, "sellerData");

  const [formData, setFormData] = useState({
    rating: 0,
    desc: "",
    title: "",
    review_image: [],
    proId: ProductId,
  });

  const [SellerformData, setSellerformData] = useState({
    rating: 0,
    desc: "",
  });

  useEffect(() => {
    getProductDetails();
  }, []);

  async function getProductDetails() {
    let response = await productDetails(ProductId);
    console.log(response?.data?.data, "gfgf");
    setSellerData(response?.data?.data?.SellerProductData?.sellerId);
    setProductDes(response?.data?.data?.SellerProductData);
    setReviewData(response?.data?.data?.reviewData);
    setAvgRating(calculateReview(response?.data?.data?.reviewData));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    let res = await submitReview(formData);
    console.log(res);
    setFormData({
      rating: 0,
      desc: "",
      title: "",
      review_image: [],
      proId: ProductId,
    });
    getProductDetails();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileImageChange = async (event) => {
    const files = event.target.files;

    if (files.length > 0) {
      const selectedFiles = Array.from(files);
      console.log("Selected Files:", selectedFiles);
      selectedFiles.forEach((file, index) => {
        console.log(`File ${index + 1}:`, file);
      });

      for (const file of selectedFiles) {
        await onFileUpload(file);
      }
    }
  };

  const onFileUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await FileUpload(formData);
      console.log(res?.data?.data);

      setTimeout(() => {
        setFormData((prevData) => ({
          ...prevData,
          review_image: [
            ...prevData.review_image,
            { image_path: res?.data?.data?.fileurl },
          ],
        }));
      }, 3000);
    } catch (err) {
      console.error(err, "err");
    }
  };

  // const handleRatingChange = (rating) => {
  //   console.log('Rating changed:', rating);
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     rating: rating,
  //   }));
  // };

  const [rating, setRating] = useState(0);

  const handleRatingChange = (newRating) => {
    setFormData((prevData) => ({
      ...prevData,
      rating: newRating,
    }));
  };

  console.log({ reviewData });

  // const calculateReview = (reviews) =>{
  //   if (reviews.length === 0) {
  //     return 0; // default to 0 if there are no reviews
  //   }

  //   const totalRating = reviews.reduce((sum, review) => sum + parseInt(review.rating), 0);
  //   const averageRating = totalRating / reviews.length;

  //   setAvgRating(averageRating?.toFixed(1))
  // }

  const handleRatingChangeSeller = (newRating) => {
    setSellerformData((prevData) => ({
      ...prevData,
      rating: newRating,
    }));
  };

  const handleChangeSeller = (e) => {
    const { name, value } = e.target;
    setSellerformData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmitForseller = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", SellerformData);

    let payload = {
      sellerId: sellerData?._id,
      desc: SellerformData?.desc,
      rating: SellerformData?.rating,
    };

    console.log(payload);

    let res = await createSellerReview(payload);

    console.log(res);
  };

  return (
    <div>
      <Container className="mt-2 mb-2 p-2 rfirstconatiner">
        <Row>
          <Col className="d-flex align-items-center boldtext">
            Rating & Reviews For Product
          </Col>

          <Col xs={3}>
            <Row>
              <Col className="d-flex align-items-center">
                <Row>
                  <Col xs={12}>{productdes?.name}</Col>
                  <Col>
                    <span className="avgrating">
                      {avgRating} <FaStar color="gold" />
                    </span>{" "}
                    <span className="mx-2">({reviewData?.length}) </span>
                  </Col>
                </Row>
              </Col>
              <Col xs={3}>
                <Image
                  src={productdes?.specId?.image?.[0]?.image_path}
                  thumbnail
                  width={100}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <Container className="mb-5 rfirstconatiner">
        <Row className="d-flex justify-content-center mb-4">
          <Col xs={7}>
            <Form onSubmit={handleSubmit}>
              <Col>
                <Row className="mt-3">
                  <Form.Label className="boldtext2">
                    Rate This Product
                  </Form.Label>
                  <Col>
                    <div className="rating">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          onClick={() => handleRatingChange(star)}
                          style={{
                            cursor: "pointer",
                            color: star <= formData?.rating ? "gold" : "gray",
                          }}
                        >
                          <FaStar size={25} />
                        </span>
                      ))}
                    </div>
                  </Col>
                </Row>
                <hr />
                <Row className="mt-3">
                  <Form.Label className="boldtext2">
                    Review This Product
                  </Form.Label>
                  <Col xs={12}>
                    <Form.Group>
                      <label>Description</label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        name="desc"
                        placeholder="Description"
                        value={formData.desc}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col xs={12}>
                    <Form.Group>
                      <label>Title</label>
                      <Form.Control
                        type="text"
                        name="title"
                        placeholder="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col xs={12}>
                    <Form.Group controlId="formFileMultiple" className="mb-3">
                      <Form.Label>Upload Images</Form.Label>
                      <div className="custom-file">
                        <Form.Control
                          type="file"
                          multiple
                          onChange={handleFileImageChange}
                          className="custom-file-input"
                        />
                      </div>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    {formData.review_image.length > 0 && (
                      <Container>
                        <Row>
                          {formData?.review_image.map((fileUrl, index) => (
                            <Col key={index} xs={4} md={2}>
                              <span>{index + 1}</span>
                              <span>
                                <MdCancel
                                  style={{
                                    color: "red",
                                    fontSize: "20px",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => handleCancelImage(fileUrl)}
                                />
                              </span>
                              <Image src={fileUrl?.image_path} thumbnail />
                            </Col>
                          ))}
                        </Row>
                      </Container>
                    )}
                  </Col>
                </Row>

                <Button type="submit" variant="dark">
                  Submit Rating & Review
                </Button>
              </Col>
            </Form>
          </Col>
        </Row>
      </Container>
      <Container className="mt-2 mb-2 p-2 rfirstconatiner">
        <Row>
          <Col className="d-flex align-items-center boldtext">
            Rating & Reviews For Seller
          </Col>
          <Col xs={3}>
            {/* <Row>
              <Col className='d-flex align-items-center'>
                <Row>
                  <Col xs={12}>{sellerData?.shope_name}</Col>
                </Row>
              </Col>
              <Col xs={3}>
                <Image src={sellerData?.pic_of_shope?.[0]} className='img-fuild' width={100} height={50} />
              </Col>
            </Row> */}
            <Row>
              <Col xs={4}>
                <Image
                  src={sellerData?.Shop_Details_Info?.pic_of_shope?.[0]}
                  alt="Seller Logo"
                  width={50}
                  height={50}
                ></Image>
              </Col>
              <Col className="d-flex align-items-center shp_name">
                {sellerData?.Shop_Details_Info?.shope_name}
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <span style={{ color: "green", fontSize: "14px" }}>
                  {sellerData?.Shop_Details_Info?.old_shope_desc}+
                </span>{" "}
                years in business
              </Col>
              <Col xs={12}>
                <span style={{ color: "green", fontSize: "14px" }}>
                  {sellerData?.Shop_Details_Info?.total_no_of_unit}+
                </span>{" "}
                units sold per year
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <Container className="mb-5 rfirstconatiner">
        <Row className="d-flex justify-content-center mb-4">
          <Col xs={7}>
            <Form onSubmit={handleSubmitForseller}>
              <Col>
                <Row className="mt-3">
                  <Form.Label className="boldtext2">Rate Seller</Form.Label>
                  <Col>
                    <div className="rating">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          onClick={() => handleRatingChangeSeller(star)}
                          style={{
                            cursor: "pointer",
                            color:
                              star <= SellerformData?.rating ? "gold" : "gray",
                          }}
                        >
                          <FaStar size={25} />
                        </span>
                      ))}
                    </div>
                  </Col>
                </Row>
                <hr />
                <Row className="mt-3">
                  <Form.Label className="boldtext2">
                    Feedback Seller Services
                  </Form.Label>
                  <Col xs={12}>
                    <Form.Group>
                      <label>Description</label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        name="desc"
                        placeholder="Description"
                        value={SellerformData?.desc}
                        onChange={handleChangeSeller}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Button type="submit" variant="dark" className="mt-2">
                  Submit
                </Button>
              </Col>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RateAndReview;
