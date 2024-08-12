import { Button, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import SideLayout from "./SideLayout";
import { useState } from "react";
import { toast } from "react-toastify";
import { FileUpload, updateUserData } from "../../Api/api";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";
import NoImage from "../../assets/images/noimage.png";

export const UserProfile = () => {
  const userData = useSelector((state) => state?.auth?.userdata);
  const dispatch = useDispatch();

  const [toEdit, setToEdit] = useState("none");

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(userData?.profile_pic ?? NoImage);
  const [name, setName] = useState(userData?.name ?? "");
  const [email, setEmail] = useState(userData?.email ?? "");
  const [phone_no, setPhone_no] = useState(userData?.phone_no ?? "");
  const [gender, setGender] = useState(userData?.gender ?? "");

  console.log(userData);

  const handleUpdate = async (type) => {
    if (type === "name-gender") {
      if (name.trim() === "" || gender.trim() === "") {
        toast.error("Name or gender can't be empty.", {
          theme: "colored",
        });
        return;
      }
      console.log({
        name,
        gender,
      });

      const res = await updateUserData({
        name: name,
        gender: gender,
      });

      console.log(res);

      if (res.status === 200) {
        toast.success("Successfully Updated", {
          theme: "colored",
        });
        dispatch(
          authActions.update({
            ...userData,
            name: name,
            gender: gender,
          })
        );
      } else {
        toast.error("Failed to update", {
          theme: "colored",
        });
      }
      setToEdit("none");
    } else if (type === "email") {
      if (email.trim() === "") {
        toast.error("Email can't be empty.", {
          theme: "colored",
        });
        return;
      }

      console.log({
        email,
      });

      const res = await updateUserData({
        email: email,
      });

      if (res.status === 200) {
        toast.success("Successfully Updated", {
          theme: "colored",
        });
        dispatch(
          authActions.update({
            ...userData,
            email: email,
          })
        );
      } else {
        toast.error("Failed to update", {
          theme: "colored",
        });
      }
      setToEdit("none");
    } else if (type === "mobile") {
      if (phone_no.trim() === "") {
        toast.error("Mobile No can't be empty.", {
          theme: "colored",
        });
        return;
      }
      console.log({
        phone_no,
      });

      const res = await updateUserData({
        phone_no: phone_no,
      });

      if (res.status === 200) {
        toast.success("Successfully Updated", {
          theme: "colored",
        });

        dispatch(
          authActions.update({
            ...userData,
            phone_no: phone_no,
          })
        );
      } else {
        toast.error("Failed to update", {
          theme: "colored",
        });
      }

      setToEdit("none");
    } else if (type === "profilepic") {
      if (!file) {
        toast.error("Please select a file.", { theme: "colored" });
        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      const fileRes = await FileUpload(formData);

      const res = await updateUserData({
        profile_pic: fileRes?.data?.data?.fileurl,
      });

      if (res.status === 200) {
        toast.success("Successfully Updated", { theme: "colored" });
        setTimeout(() => {
          dispatch(
            authActions.update({
              ...userData,
              profile_pic: fileRes?.data?.data?.fileurl,
            })
          );
        }, 1000);
      } else {
        toast.error("Failed to update", { theme: "colored" });
      }
    }
    setToEdit("none");
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  return (
    <>
      <div>
        <Container className="mt-4 mb-4 p-4">
          <Row>
            <Col xl={3} lg={4}>
              <SideLayout />
            </Col>
            <Col xl={9} lg={8}>
              <div className="address-block">
                <h4>Profile Information</h4>

                <div className="profile-info">
                  {/* profilr picture */}
                  <div className="user-info-block">
                    <div className="user-info-block-top">
                      <h6>Profile Picture</h6>

                      {toEdit === "profilepic" ? (
                        <span
                          onClick={() => {
                            setToEdit("none");
                            setFile(null);
                            setPreview(userData?.profile_pic ?? NoImage);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            version="1.1"
                            width="512"
                            height="512"
                            x="0"
                            y="0"
                            viewBox="0 0 512.235 512.235"
                            className="hovered-paths"
                          >
                            <g>
                              <path
                                d="M340.502 258.514a3.394 3.394 0 0 1 0-4.792L501.759 92.386c13.789-13.794 13.789-36.24 0-50.035l-31.968-31.984C463.109 3.681 454.225 0 444.775 0s-18.335 3.681-25.017 10.366L258.501 171.704c-.816.816-1.747.988-2.383.988s-1.567-.171-2.383-.988L92.477 10.366C85.795 3.681 76.911 0 67.46 0S49.126 3.681 42.444 10.366L10.476 42.351c-13.789 13.795-13.789 36.241 0 50.035l161.257 161.336a3.394 3.394 0 0 1 0 4.792L10.476 419.85c-13.788 13.795-13.788 36.24 0 50.035l31.968 31.984c6.682 6.685 15.566 10.366 25.016 10.366s18.335-3.681 25.017-10.366l161.257-161.336c.816-.817 1.746-.988 2.383-.988s1.566.171 2.383.989L419.757 501.87c6.682 6.685 15.566 10.366 25.017 10.366s18.334-3.681 25.016-10.366l31.968-31.984c13.788-13.794 13.788-36.24 0-50.035z"
                                fill="#9af064"
                                opacity="1"
                                data-original="#000000"
                                className="hovered-path"
                              ></path>
                            </g>
                          </svg>
                        </span>
                      ) : (
                        <span onClick={() => setToEdit("profilepic")}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            version="1.1"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            width="512"
                            height="512"
                            x="0"
                            y="0"
                            viewBox="0 0 492.493 492"
                            xml:space="preserve"
                            className=""
                          >
                            <g>
                              <path
                                d="M304.14 82.473 33.165 353.469a10.799 10.799 0 0 0-2.816 4.949L.313 478.973a10.716 10.716 0 0 0 2.816 10.136 10.675 10.675 0 0 0 7.527 3.114 10.6 10.6 0 0 0 2.582-.32l120.555-30.04a10.655 10.655 0 0 0 4.95-2.812l271-270.977zM476.875 45.523 446.711 15.36c-20.16-20.16-55.297-20.14-75.434 0l-36.949 36.95 105.598 105.597 36.949-36.949c10.07-10.066 15.617-23.465 15.617-37.715s-5.547-27.648-15.617-37.719zm0 0"
                                fill="#9af064"
                                opacity="1"
                                data-original="#000000"
                                className=""
                              ></path>
                            </g>
                          </svg>
                        </span>
                      )}
                    </div>

                    {toEdit === "profilepic" ? (
                      <div className="user-info-block-edit">
                        <label htmlFor="profile_pic">
                          <strong>Profile Image : </strong>
                          <div className="profile-pic ms-3 me-4 w-25 h-25 border rounded">
                            {preview && (
                              <img
                                className="w-100 h-100 rounded"
                                src={preview}
                                alt="Profile"
                              />
                            )}
                          </div>
                          <input
                            type="file"
                            id="file"
                            onChange={handleFileChange}
                            accept="image/jpeg, image/png, image/gif"
                          />
                        </label>
                        <Button
                          variant="primary"
                          className="mt-2 btn-update"
                          onClick={() => {
                            handleUpdate("profilepic");
                          }}
                        >
                          Update
                        </Button>
                      </div>
                    ) : (
                      <div className="user-info-block-bottom">
                        <div className="user-info-block-data-block">
                          <strong>Image : </strong>{" "}
                          <div className="profile-pic mt-2 w-25 h-25 border rounded">
                            <img
                              className="w-100 h-100 rounded"
                              src={userData?.profile_pic || NoImage}
                              alt="profilepicture"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="divider"></div>
                  {/* name */}
                  <div className="user-info-block">
                    <div className="user-info-block-top">
                      <h6>Personal Information</h6>
                      {toEdit === "name-gender" ? (
                        <span
                          onClick={() => {
                            setToEdit("none");
                            setName(userData?.name ?? "");
                            setGender(userData?.gender ?? "");
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            version="1.1"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            width="512"
                            height="512"
                            x="0"
                            y="0"
                            viewBox="0 0 512.235 512.235"
                            xml:space="preserve"
                            className="hovered-paths"
                          >
                            <g>
                              <path
                                d="M340.502 258.514a3.394 3.394 0 0 1 0-4.792L501.759 92.386c13.789-13.794 13.789-36.24 0-50.035l-31.968-31.984C463.109 3.681 454.225 0 444.775 0s-18.335 3.681-25.017 10.366L258.501 171.704c-.816.816-1.747.988-2.383.988s-1.567-.171-2.383-.988L92.477 10.366C85.795 3.681 76.911 0 67.46 0S49.126 3.681 42.444 10.366L10.476 42.351c-13.789 13.795-13.789 36.241 0 50.035l161.257 161.336a3.394 3.394 0 0 1 0 4.792L10.476 419.85c-13.788 13.795-13.788 36.24 0 50.035l31.968 31.984c6.682 6.685 15.566 10.366 25.016 10.366s18.335-3.681 25.017-10.366l161.257-161.336c.816-.817 1.746-.988 2.383-.988s1.566.171 2.383.989L419.757 501.87c6.682 6.685 15.566 10.366 25.017 10.366s18.334-3.681 25.016-10.366l31.968-31.984c13.788-13.794 13.788-36.24 0-50.035z"
                                fill="#9af064"
                                opacity="1"
                                data-original="#000000"
                                className="hovered-path"
                              ></path>
                            </g>
                          </svg>
                        </span>
                      ) : (
                        <span onClick={() => setToEdit("name-gender")}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            version="1.1"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            width="512"
                            height="512"
                            x="0"
                            y="0"
                            viewBox="0 0 492.493 492"
                            xml:space="preserve"
                            className=""
                          >
                            <g>
                              <path
                                d="M304.14 82.473 33.165 353.469a10.799 10.799 0 0 0-2.816 4.949L.313 478.973a10.716 10.716 0 0 0 2.816 10.136 10.675 10.675 0 0 0 7.527 3.114 10.6 10.6 0 0 0 2.582-.32l120.555-30.04a10.655 10.655 0 0 0 4.95-2.812l271-270.977zM476.875 45.523 446.711 15.36c-20.16-20.16-55.297-20.14-75.434 0l-36.949 36.95 105.598 105.597 36.949-36.949c10.07-10.066 15.617-23.465 15.617-37.715s-5.547-27.648-15.617-37.719zm0 0"
                                fill="#9af064"
                                opacity="1"
                                data-original="#000000"
                                className=""
                              ></path>
                            </g>
                          </svg>
                        </span>
                      )}
                    </div>

                    {toEdit === "name-gender" ? (
                      <div className="user-info-block-edit">
                        <div className="user-info-block-edit">
                          <label htmlFor="name">
                            <strong>Name : </strong>
                            <input
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              type="text"
                              name="name"
                              id="name"
                              className="form-control"
                              placeholder="Enter Your Name"
                            />
                          </label>
                          <label htmlFor="gender">
                            <strong>Gender : </strong>
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              id="gender"
                              name="gender"
                              value={gender}
                              onChange={(e) => setGender(e.target.value)}
                            >
                              <option value="" disabled>
                                Select Gender
                              </option>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                            </select>
                          </label>
                          <Button
                            variant="primary"
                            className="mt-2 btn-update"
                            onClick={() => {
                              handleUpdate("name-gender");
                            }}
                          >
                            Update
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="user-info-block-bottom">
                        <div className="user-info-block-data-block">
                          <strong>Name : </strong>
                          {userData?.name}
                        </div>
                        <div className="user-info-block-data-block">
                          <strong>Gender : </strong>
                          {userData?.gender ?? "Not Specified"}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="divider"></div>

                  {/* email */}
                  <div className="user-info-block">
                    <div className="user-info-block-top">
                      <h6>Email Address</h6>

                      {toEdit === "email" ? (
                        <span
                          onClick={() => {
                            setToEdit("none");
                            setEmail(userData?.email ?? "");
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            version="1.1"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            width="512"
                            height="512"
                            x="0"
                            y="0"
                            viewBox="0 0 512.235 512.235"
                            xml:space="preserve"
                            className="hovered-paths"
                          >
                            <g>
                              <path
                                d="M340.502 258.514a3.394 3.394 0 0 1 0-4.792L501.759 92.386c13.789-13.794 13.789-36.24 0-50.035l-31.968-31.984C463.109 3.681 454.225 0 444.775 0s-18.335 3.681-25.017 10.366L258.501 171.704c-.816.816-1.747.988-2.383.988s-1.567-.171-2.383-.988L92.477 10.366C85.795 3.681 76.911 0 67.46 0S49.126 3.681 42.444 10.366L10.476 42.351c-13.789 13.795-13.789 36.241 0 50.035l161.257 161.336a3.394 3.394 0 0 1 0 4.792L10.476 419.85c-13.788 13.795-13.788 36.24 0 50.035l31.968 31.984c6.682 6.685 15.566 10.366 25.016 10.366s18.335-3.681 25.017-10.366l161.257-161.336c.816-.817 1.746-.988 2.383-.988s1.566.171 2.383.989L419.757 501.87c6.682 6.685 15.566 10.366 25.017 10.366s18.334-3.681 25.016-10.366l31.968-31.984c13.788-13.794 13.788-36.24 0-50.035z"
                                fill="#9af064"
                                opacity="1"
                                data-original="#000000"
                                className="hovered-path"
                              ></path>
                            </g>
                          </svg>
                        </span>
                      ) : (
                        <span onClick={() => setToEdit("email")}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            version="1.1"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            width="512"
                            height="512"
                            x="0"
                            y="0"
                            viewBox="0 0 492.493 492"
                            xml:space="preserve"
                            className=""
                          >
                            <g>
                              <path
                                d="M304.14 82.473 33.165 353.469a10.799 10.799 0 0 0-2.816 4.949L.313 478.973a10.716 10.716 0 0 0 2.816 10.136 10.675 10.675 0 0 0 7.527 3.114 10.6 10.6 0 0 0 2.582-.32l120.555-30.04a10.655 10.655 0 0 0 4.95-2.812l271-270.977zM476.875 45.523 446.711 15.36c-20.16-20.16-55.297-20.14-75.434 0l-36.949 36.95 105.598 105.597 36.949-36.949c10.07-10.066 15.617-23.465 15.617-37.715s-5.547-27.648-15.617-37.719zm0 0"
                                fill="#9af064"
                                opacity="1"
                                data-original="#000000"
                                className=""
                              ></path>
                            </g>
                          </svg>
                        </span>
                      )}
                    </div>

                    {toEdit === "email" ? (
                      <div className="user-info-block-edit">
                        <label htmlFor="email">
                          <strong>Email : </strong>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            name="email"
                            className="form-control"
                            id="email"
                            placeholder="Enter New Email"
                          />
                        </label>
                        <Button
                          variant="primary"
                          className="mt-2 btn-update"
                          onClick={() => {
                            handleUpdate("email");
                          }}
                        >
                          Update
                        </Button>
                      </div>
                    ) : (
                      <div className="user-info-block-bottom">
                        <div className="user-info-block-data-block">
                          <strong>Email : </strong>
                          {userData?.email}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="divider"></div>

                  {/* mobile number */}
                  <div className="user-info-block">
                    <div className="user-info-block-top">
                      <h6>Mobile Number</h6>

                      {toEdit === "mobile" ? (
                        <span
                          onClick={() => {
                            setToEdit("none");
                            setPhone_no(userData?.phone_no ?? "");
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            version="1.1"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            width="512"
                            height="512"
                            x="0"
                            y="0"
                            viewBox="0 0 512.235 512.235"
                            xml:space="preserve"
                            className="hovered-paths"
                          >
                            <g>
                              <path
                                d="M340.502 258.514a3.394 3.394 0 0 1 0-4.792L501.759 92.386c13.789-13.794 13.789-36.24 0-50.035l-31.968-31.984C463.109 3.681 454.225 0 444.775 0s-18.335 3.681-25.017 10.366L258.501 171.704c-.816.816-1.747.988-2.383.988s-1.567-.171-2.383-.988L92.477 10.366C85.795 3.681 76.911 0 67.46 0S49.126 3.681 42.444 10.366L10.476 42.351c-13.789 13.795-13.789 36.241 0 50.035l161.257 161.336a3.394 3.394 0 0 1 0 4.792L10.476 419.85c-13.788 13.795-13.788 36.24 0 50.035l31.968 31.984c6.682 6.685 15.566 10.366 25.016 10.366s18.335-3.681 25.017-10.366l161.257-161.336c.816-.817 1.746-.988 2.383-.988s1.566.171 2.383.989L419.757 501.87c6.682 6.685 15.566 10.366 25.017 10.366s18.334-3.681 25.016-10.366l31.968-31.984c13.788-13.794 13.788-36.24 0-50.035z"
                                fill="#9af064"
                                opacity="1"
                                data-original="#000000"
                                className="hovered-path"
                              ></path>
                            </g>
                          </svg>
                        </span>
                      ) : (
                        <span onClick={() => setToEdit("mobile")}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            version="1.1"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            width="512"
                            height="512"
                            x="0"
                            y="0"
                            viewBox="0 0 492.493 492"
                            xml:space="preserve"
                            className=""
                          >
                            <g>
                              <path
                                d="M304.14 82.473 33.165 353.469a10.799 10.799 0 0 0-2.816 4.949L.313 478.973a10.716 10.716 0 0 0 2.816 10.136 10.675 10.675 0 0 0 7.527 3.114 10.6 10.6 0 0 0 2.582-.32l120.555-30.04a10.655 10.655 0 0 0 4.95-2.812l271-270.977zM476.875 45.523 446.711 15.36c-20.16-20.16-55.297-20.14-75.434 0l-36.949 36.95 105.598 105.597 36.949-36.949c10.07-10.066 15.617-23.465 15.617-37.715s-5.547-27.648-15.617-37.719zm0 0"
                                fill="#9af064"
                                opacity="1"
                                data-original="#000000"
                                className=""
                              ></path>
                            </g>
                          </svg>
                        </span>
                      )}
                    </div>

                    {toEdit === "mobile" ? (
                      <div className="user-info-block-edit">
                        <label htmlFor="number">
                          <strong>Mobile No : </strong>
                          <input
                            type="number"
                            name="number"
                            value={phone_no}
                            onChange={(e) => setPhone_no(e.target.value)}
                            className="form-control"
                            id="number"
                            placeholder="Enter Mobile Number"
                          />
                        </label>
                        <Button
                          variant="primary"
                          className="mt-2 btn-update"
                          onClick={() => {
                            handleUpdate("mobile");
                          }}
                        >
                          Update
                        </Button>
                      </div>
                    ) : (
                      <div className="user-info-block-bottom">
                        <div className="user-info-block-data-block">
                          <strong>Mobile No : </strong>
                          {userData?.phone_no}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};
