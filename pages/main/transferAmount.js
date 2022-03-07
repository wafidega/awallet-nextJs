import React, { useEffect, useState } from "react";
import { useRouter, withRouter } from "next/router";
import Navbar from "components/modules/Navbar";
import SideBar from "components/modules/SideBar";
import Layout from "components/Layout";
import { Modal, Button } from "react-bootstrap";
import axios from "utils/axios";

function TransactionAmount(props) {
  const router = useRouter();
  const dataUser = router.query;
  console.log(dataUser);
  const [dataTransfer, setDataTransfer] = useState({
    receiverId: dataUser.id,
    amount: "",
    notes: "",
  });
  // console.log(dataTransfer);
  const handleDataTransfer = (event) => {
    setDataTransfer({
      ...dataTransfer,
      [event.target.name]: event.target.value,
    });
  };
  const detailProfile = () => {
    console.log(dataTransfer);
    // router.push("/main/TransferDetail");
    router.push({
      pathname: "/main/TransferDetail",
      query: { ...dataTransfer },
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
                  <h5 className="nunito-700">Transfer Money</h5>

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
                        <h5 className="nunito-600">{dataUser.firstName}</h5>
                        <span className="nunito-400 font-thrid">
                          {dataUser.noTelp}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p
                      className="m-0 nunito-400 font-secondary"
                      style={{ fontSize: "16px" }}
                    >
                      Type the amount you want to transfer and then
                    </p>
                    <p
                      className="m-0 nunito-400 font-secondary"
                      style={{ fontSize: "16px" }}
                    >
                      press continue to the next steps.
                    </p>
                  </div>

                  <div
                    className="text-center"
                    style={{
                      marginTop: "60px",
                      marginBottom: "85px",
                    }}
                  >
                    <input
                      type="number"
                      name="amount"
                      placeholder="0.00"
                      className="nunito-700"
                      style={{
                        height: "86px",
                        width: "100%",
                        textAlign: "center",
                        fontSize: "42px",
                        border: "none",
                        outline: "none",
                      }}
                      onChange={handleDataTransfer}
                    />
                    <h5
                      className="nunito-700"
                      style={{ marginTop: "40px", marginBottom: "60px" }}
                    >
                      Available
                    </h5>

                    <input
                      name="notes"
                      type="text"
                      placeholder="Add some notes"
                      onChange={handleDataTransfer}
                    />
                  </div>

                  <div className="d-flex justify-content-end">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={detailProfile}
                    >
                      Continue
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
export default withRouter(TransactionAmount);
