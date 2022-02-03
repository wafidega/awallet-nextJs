import React, { useEffect, useState } from "react";
import Navbar from "components/modules/Navbar";
import Balance from "components/modules/balance";
import Layout from "components/Layout";
import axios from "utils/axios";
import { AuthPage } from "middleware/authorizationPage";

// Server Side Rendering
// export async function getServerSideProps(context) {
//   console.log("Server render is Running !!");
//   const dataCookie = await AuthPage(context);
//   const response = await axios
//     .get("user?page=1&limit=2&search=&sort=", {
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

export default function History() {
  // Client Side Rendering
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   getDataUser();
  // }, []);

  // const getDataUser = () => {
  //   axios.get("user?page=1&limit=2&search=&sort=");
  // };

  // console.log(props);

  return (
    <>
      <Layout title="HomePage">
        <Navbar></Navbar>
        <main className="home-content">
          <div className="row">
            <div className="col-md-3">
              <div className="home-content-right d-flex align-items-start">
                <div className="nav flex-column nav-pills me-3">
                  <a href="#" className="home-active">
                    <i className="bi bi-ui-checks-grid"> </i>
                    DASHBOARD
                  </a>
                  <br />
                  <a>
                    <i className="bi bi-arrow-up"></i>Transfer
                  </a>
                  <br />
                  <a>
                    <i className="bi bi-plus"></i>Top-Up
                  </a>
                  <br />
                  <a>
                    <i className="bi bi-person"></i>Profile
                  </a>
                  <br />
                </div>
              </div>
            </div>
            <div className="col-md-9">
              <div className="history-all card p-5">
                <div className="row">
                  <div className="col-md-6">
                    <p>transaction History</p>
                  </div>
                  <div className="col-md-6">
                    <select placeholder="Select Filter"></select>
                  </div>
                </div>
                {/* User */}
                <hr />
                <div className="history-user-accept card pt5">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="history-right">
                        <div className="row">
                          <div className="col-sm-2">
                            <img src="/foto-profil.png" />
                          </div>
                          <div className="col-sm-10">
                            <p className="nav-profile-name">Robert Chandler</p>
                            <p className="nav-profile-name">Robert Chandler</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <h4 className="amount-history-accept">+1200000</h4>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="history-user-transfer card pt5">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="history-right">
                        <div className="row">
                          <div className="col-sm-2">
                            <img src="/foto-profil.png" />
                          </div>
                          <div className="col-sm-10">
                            <p className="nav-profile-name">Robert Chandler</p>
                            <p className="nav-profile-name">Robert Chandler</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <h4 className="amount-history-transfer">-1200000</h4>
                    </div>
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
