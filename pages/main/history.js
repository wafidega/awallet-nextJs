import React, { useEffect, useState } from "react";
import Navbar from "components/modules/Navbar";
import SideBar from "components/modules/SideBar";
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

function History() {
  // Client Side Rendering
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   getDataUser();
  // }, []);

  // const getDataUser = () => {
  //   axios.get("user?page=1&limit=2&search=&sort=");
  // };

  // console.log(props);

  // Filter
  const [filter, setFilter] = useState({
    page: 1,
    limit: 10,
    filter: "WEEK",
  });
  const [dataHistory, setDataHistory] = useState([]);

  const history = () => {
    axios
      .get(
        `/transaction/history?page=${filter.page}&limit=${filter.limit}&filter=${filter.filter}`
      )
      .then((res) => {
        setDataHistory(res.data.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  useEffect(() => {
    history();
  }, []);

  console.log(dataHistory);
  return (
    <>
      <Layout title="Homepage">
        <Navbar></Navbar>
        <main className="home-content">
          <div className="row">
            <SideBar />
            <div className="col-md-9">
              <div className="history-all card p-5">
                <p>Transaction History</p>
                {/* <input
                  type="text"
                  className="form-control"
                  id="search"
                  name="search"
                  placeholder="Search Receiver Here"
                /> */}
                {/* User */}
                <div>
                  {dataHistory.map((item) => (
                    <div
                      className="d-flex justify-content-between mt-4"
                      key={item.id}
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
                          <h5 className="nunito-600">Wafi Dega</h5>
                          <span className="nunito-400 font-thrid">
                            {item.type}
                          </span>
                        </div>
                      </div>
                      {item.type === "send" ? (
                        <div
                          className="align-self-center nunito-700"
                          style={{ color: "#FF5B37" }}
                        >
                          -{item.amount}
                        </div>
                      ) : item.type === "topup" ? (
                        <div
                          className="align-self-center nunito-700"
                          style={{ color: "#FF5B37" }}
                        >
                          +{item.amount}
                        </div>
                      ) : (
                        <div
                          className="align-self-center nunito-700"
                          style={{ color: "#1EC15F" }}
                        >
                          +{item.amount}
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Tranfer */}
                </div>
              </div>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
}

export default History;
