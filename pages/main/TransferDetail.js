import React, { useEffect, useState } from "react";
import Navbar from "components/modules/Navbar";
import SideBar from "components/modules/SideBar";
import Layout from "components/Layout";
import { Modal, Button } from "react-bootstrap";
import axios from "utils/axios";

export default function TransferDetail(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log(props);

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
                        <h5 className="nunito-600">zhongli</h5>
                        <span className="nunito-400 font-thrid">Notelp</span>
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
                        <h5 className="nunito-600 mt-2">Nominal</h5>
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
                        <h5 className="nunito-600 mt-2">Nominal</h5>
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
                        <h5 className="nunito-600 mt-2">Note</h5>
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
          <Modal.Title>Transfer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <p>Enter Receiver Number</p>
            <input type="text" name="receiverId" />
            <p>Enter Amount</p>
            <input type="text" name="amount" />
            <p>Enter Notes</p>
            <input type="text" name="notes" />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary">Transfer</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
