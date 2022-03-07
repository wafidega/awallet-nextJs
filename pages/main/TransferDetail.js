import React, { useEffect, useState } from "react";
import { useRouter, withRouter } from "next/router";
import Navbar from "components/modules/Navbar";
import SideBar from "components/modules/SideBar";
import Layout from "components/Layout";
import { Modal, Button } from "react-bootstrap";
import axios from "utils/axios";
import { toast, ToastContainer } from "react-toastify";
import { connect } from "react-redux";
import { ConfirmPin } from "stores/action/profile";
import { GetUserById } from "stores/action/profile";

function TransferDetail(props) {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // Get Data
  const dataTransfer = router.query;
  console.log(dataTransfer);

  // Data User
  const [dataProfile, setDataProfile] = useState([]);
  const getDataUser = (event) => {
    axios
      .get(`user/profile/${dataTransfer.receiverId}`)
      .then((res) => {
        setDataProfile(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getDataUser();
  }, []);
  console.log(dataProfile);

  // Get User By id
  const id = Cookie.get("id");
  useEffect(() => {}, [props.profile]);

  // Confirm Pin
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
        handleClose();
        handleTransfer();
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

  // Transfer
  const handleTransfer = () => {
    axios
      .post(`transaction/transfer`, dataTransfer)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Layout title="Transfer Page">
        <Navbar></Navbar>
        <main className="home-content">
          <div className="row">
            <SideBar />
            <div className="col-md-9">
              <div
                style={{
                  padding: "30px",
                  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
                  borderRadius: "25px",
                  marginTop: "40px",
                  marginBottom: "40px",
                  background: "#ffffff",
                }}
              >
                <div>
                  <h5 className="nunito-700">Transfer To</h5>

                  <div
                    className="d-flex"
                    style={{
                      boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
                      borderRadius: "10px",
                      padding: "20px",
                      marginTop: "25px",
                      marginBottom: "40px",
                    }}
                  >
                    <div className="d-flex">
                      <img
                        src="/assets/image/zhongli.png"
                        alt="porfile"
                        width="56px"
                        height="56px"
                        style={{
                          borderRadius: "10px",
                          objectFit: "cover",
                        }}
                      />
                      <div className="ms-3">
                        <h5 className="nunito-600">
                          {dataProfile.firstName + " " + dataProfile.lastName}
                        </h5>
                        <span className="nunito-400 font-thrid">
                          {dataProfile.noTelp}
                        </span>
                      </div>
                    </div>
                  </div>

                  <h5 className="nunito-700">Details</h5>

                  <div
                    className="d-flex"
                    style={{
                      boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
                      borderRadius: "10px",
                      padding: "20px",
                      marginTop: "25px",
                      marginBottom: "20px",
                    }}
                  >
                    <div>
                      <div>
                        <span className="nunito-400 font-thrid">Amount</span>
                        <h5 className="nunito-600 mt-2">
                          {dataTransfer.amount}
                        </h5>
                      </div>
                    </div>
                  </div>

                  <div
                    className="d-flex"
                    style={{
                      boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
                      borderRadius: "10px",
                      padding: "20px",
                      marginBottom: "20px",
                    }}
                  >
                    <div>
                      <div>
                        <span className="nunito-400 font-thrid">
                          Balance Left
                        </span>
                        <h5 className="nunito-600 mt-2">
                          {dataProfile.balance}
                        </h5>
                      </div>
                    </div>
                  </div>

                  <div
                    className="d-flex"
                    style={{
                      boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
                      borderRadius: "10px",
                      padding: "20px",
                      marginBottom: "20px",
                    }}
                  >
                    <div>
                      <div>
                        <span className="nunito-400 font-thrid">
                          Date And Time
                        </span>
                        <h5 className="nunito-600 mt-2">Date</h5>
                      </div>
                    </div>
                  </div>

                  <div
                    className="d-flex"
                    style={{
                      boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
                      borderRadius: "10px",
                      padding: "20px",
                      marginBottom: "20px",
                    }}
                  >
                    <div>
                      <div>
                        <span className="nunito-400 font-thrid">Notes</span>
                        <h5 className="nunito-600 mt-2">
                          {dataTransfer.notes}
                        </h5>
                      </div>
                    </div>
                  </div>

                  <div
                    className="d-flex justify-content-end"
                    style={{ marginTop: "35px" }}
                  >
                    <div style={{ width: "50px" }}></div>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleShow}
                    >
                      Transfer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </Layout>
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
  ConfirmPin,
  GetUserById,
};

export default connect(mapStateToProps, mapDispatchToProps)(TransferDetail);
