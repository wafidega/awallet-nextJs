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

function TransferSuccess(props) {
  const router = useRouter();
  const dataTransfer = router.query;
  console.log(dataTransfer);

  // Data User Transfer Receiver
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

  return (
    <>
      <Layout title="Transfer Success">
        <Navbar></Navbar>
        <main className="home-content">
          <div className="row">
            <SideBar />
            <div className="col-md-9">
              <center>
                <img
                  src="/assets/image/success.gif"
                  className="image-profile"
                  alt="image-profile"
                />
              </center>
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
                        <h5 className="nunito-600">Zhongli</h5>
                        <span className="nunito-400 font-thrid">
                          081218049667
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
                        <h5 className="nunito-600 mt-2">10000</h5>
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
                        <h5 className="nunito-600 mt-2">5000000</h5>
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
                        <h5 className="nunito-600 mt-2">Jajan</h5>
                      </div>
                    </div>
                  </div>

                  <div
                    className="d-flex justify-content-end"
                    style={{ marginTop: "35px" }}
                  >
                    <div style={{ width: "50px" }}></div>
                    <button type="button" className="btn btn-primary">
                      Back To Home
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
}

export default TransferSuccess;
