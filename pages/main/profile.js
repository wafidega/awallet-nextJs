import React, { useEffect, useState } from "react";
import Navbar from "components/modules/Navbar";
import Balance from "components/modules/balance";
import Layout from "components/Layout";
import axios from "utils/axios";
import { getDataCookie } from "middleware/authorizationPage";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import SideBar from "components/modules/SideBar";
import { Modal, Button } from "react-bootstrap";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import { connect } from "react-redux";
import { GetUserById } from "stores/action/profile";
import { ConfirmPin } from "stores/action/profile";
import { UpdateProfileImage } from "stores/action/profile";

// Rendering
// export async function getServerSideProps(context) {
//   const dataCookie = await getDataCookie(context);
//   if (!dataCookie.isLogin) {
//     return {
//       redirect: {
//         destination: "/auth/login",
//         permanent: false,
//       },
//     };
//   }

//   const response = await axios
//     .get("/user?page=1&limit=2&search=&sort=", {
//       headers: {
//         Authorization: `Bearer ${dataCookie.token}`,
//       },
//     })
//     .then((res) => {
//       return res.data.data;
//     })
//     .catch((err) => {
//       return [];
//     });
//   return {
//     props: { data: response },
//   };
// }
function Profile(props) {
  // Mengambil data
  const [data, setData] = useState({});
  const id = Cookie.get("id");
  const router = useRouter();

  useEffect(() => {
    setData(props.profile.dataUser);
  }, [props.profile]);
  // Modal Pin and Confirm Pin
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [pin, setPin] = useState({});

  const addPin = (event) => {
    if (event.target.value) {
      const nextSibling = document.getElementById(
        `pin-${parseInt(event.target.name, 10) + 1}`
      );

      if (nextSibling !== null) {
        nextSibling.focus();
      }
    }

    setPin({ ...pin, [`pin${event.target.name}`]: event.target.value });
  };

  const handleConfirmPin = (e) => {
    e.preventDefault();
    const allPin = parseInt(
      pin.pin1 + pin.pin2 + pin.pin3 + pin.pin4 + pin.pin5 + pin.pin6
    );
    props
      .ConfirmPin(allPin)
      .then((res) => {
        console.log(res);
        toast.info(res.value.data.msg, {
          theme: "colored",
        });
        setTimeout(() => {
          router.push("/main/changePin");
        }, 3000);
      })
      .catch((err) => {
        toast.error(err.response.data.msg, {
          theme: "colored",
        });
        ResetPin();
      });
  };

  const ResetPin = () => {
    setPin({});
  };
  // Update Image
  const [image, setImage] = useState(null);
  const [updateImage, setUpdateImage] = useState(null);

  const handleUpdateImage = (e) => {
    const formData = new FormData();
    formData.append("image", updateImage);
    props
      .UpdateProfileImage(id, formData)
      .then((res) => {
        console.log(res);
        console.log(formData);
        toast.info(res.value.data.msg, {
          theme: "colored",
        });
        props.GetUserById(id);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.msg, {
          theme: "colored",
        });
      });
  };
  const handleImage = (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
    setUpdateImage(event.target.files[0]);
  };

  // Button push Profile Page
  const ChangePassword = (e) => {
    e.preventDefault();
    router.push("/main/changePassword");
  };

  const personal = (e) => {
    e.preventDefault();
    router.push("/main/personalInfo");
  };
  return (
    <>
      <Layout title="Profile">
        <Navbar></Navbar>
        <main className="home-content">
          <div className="row">
            <SideBar />
            <div className="col-md-9">
              <div className="profile-user-accept card p-5">
                <ToastContainer />
                <div className="row">
                  <div className="col-md-3"></div>
                  <div className="col-md-6">
                    <center>
                      <img
                        src={
                          data.image
                            ? `https://zwalet.herokuapp.com/uploads/${data.image}`
                            : "/assets/image/zhongli.png"
                        }
                        className="image-profile"
                        alt="image-profile"
                      />
                      <input
                        type="file"
                        name="image"
                        className="form-control"
                        style={{ margin: 5 }}
                        onChange={handleImage}
                      />
                      <button
                        type="submit"
                        className="update-button btn btn-primary"
                        style={{ margin: 10 }}
                        onClick={handleUpdateImage}
                      >
                        Update Image
                      </button>
                    </center>
                    <br />
                    <br />
                    <br />
                    <button
                      type="button"
                      className="profile-button btn btn-primary"
                      onClick={personal}
                    >
                      Personal Information
                    </button>
                    <br />
                    <button
                      type="button"
                      className="profile-button btn btn-primary"
                      onClick={ChangePassword}
                    >
                      Change Password
                    </button>
                    <br />
                    <button
                      type="button"
                      className="profile-button btn btn-primary"
                      onClick={handleShow}
                    >
                      Change Pin
                    </button>
                    <br />
                  </div>
                  <div className="col-md-3"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </Layout>
      {/* Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>CONFIRM PIN</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
            Enter your current 6 digits Zwallet PIN below to continue to the
            next steps.
          </p>
          <br />
          <ToastContainer />
          <form>
            <div className="row">
              <div className="col">
                <input
                  type="password"
                  className="form-control"
                  placeholder=""
                  maxLength="1"
                  name="1"
                  id="pin-1"
                  onChange={(event) => addPin(event)}
                />
              </div>
              <div className="col">
                <input
                  type="password"
                  className="form-control"
                  placeholder=""
                  maxLength="1"
                  name="2"
                  id="pin-2"
                  onChange={(event) => addPin(event)}
                />
              </div>
              <div className="col">
                <input
                  type="password"
                  className="form-control"
                  placeholder=""
                  maxLength="1"
                  name="3"
                  id="pin-3"
                  onChange={(event) => addPin(event)}
                />
              </div>
              <div className="col">
                <input
                  type="password"
                  className="form-control"
                  placeholder=""
                  maxLength="1"
                  name="4"
                  id="pin-4"
                  onChange={(event) => addPin(event)}
                />
              </div>
              <div className="col">
                <input
                  type="password"
                  className="form-control"
                  placeholder=""
                  maxLength="1"
                  name="5"
                  id="pin-5"
                  onChange={(event) => addPin(event)}
                />
              </div>
              <div className="col">
                <input
                  type="password"
                  className="form-control"
                  placeholder=""
                  maxLength="1"
                  name="6"
                  id="pin-6"
                  onChange={(event) => addPin(event)}
                />
              </div>
              <button
                className="button-submit btn btn-primary mt-3"
                onClick={handleConfirmPin}
              >
                Continue
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
const mapStateToProps = (state) => {
  return { profile: state.profile };
};

const mapDispatchToProps = {
  GetUserById,
  ConfirmPin,
  UpdateProfileImage,
  GetUserById,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
