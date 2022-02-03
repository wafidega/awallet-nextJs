import React, { useEffect, useState } from "react";
import Navbar from "components/modules/Navbar";
import Balance from "components/modules/balance";
import Layout from "components/Layout";
import axios from "utils/axios";
import { getDataCookie } from "middleware/authorizationPage";
import Cookie from "js-cookie";
import { useRouter } from "next/router";

// Rendering
export async function getServerSideProps(context) {
  const dataCookie = await getDataCookie(context);
  if (!dataCookie.isLogin) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  const response = await axios
    .get("/user?page=1&limit=2&search=&sort=", {
      headers: {
        Authorization: `Bearer ${dataCookie.token}`,
      },
    })
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => {
      return [];
    });
  return {
    props: { data: response },
  };
}
export default function Profile(props) {
  const [data, setData] = useState(props.data);
  const id = Cookie.get("id");
  console.log(id);
  const getDataUser = () => {
    axios
      .get(`/user/profile/${id}`)
      .then((res) => {
        // console.log(res);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  useEffect(() => {
    getDataUser();
  }, []);
  console.log(data);
  // Change Pin
  const handleSubmit = (e) => {
    e.preventDefault();
    const allPin = parseInt(
      pin.pin1 + pin.pin2 + pin.pin3 + pin.pin4 + pin.pin5 + pin.pin6
    );
    console.log(allPin);
    const id = Cookie.get("id");

    axios
      .patch(`/user/pin/${id}`, { pin: allPin })
      .then((res) => {
        if (res.data.status === 200) setSuccess(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Layout title="Change Pin">
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
              <div className="profile-personal card p-5">
                <h6>Change PIN</h6>
                <br />
                <p>
                  Enter your current 6 digits Zwallet PIN below to continue to
                  the next steps.
                </p>
                <br />
                <form>
                  <div className="row" onSubmit={handleSubmit}>
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        maxLength="1"
                        onChange={(event) => addPin(event)}
                        name="1"
                        id="pin-1"
                      />
                    </div>
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        maxLength="1"
                        onChange={(event) => addPin(event)}
                        name="2"
                        id="pin-2"
                      />
                    </div>
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        maxLength="1"
                        onChange={(event) => addPin(event)}
                        name="3"
                        id="pin-3"
                      />
                    </div>
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        maxLength="1"
                        onChange={(event) => addPin(event)}
                        name="4"
                        id="pin-4"
                      />
                    </div>
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        maxLength="1"
                        onChange={(event) => addPin(event)}
                        name="5"
                        id="pin-5"
                      />
                    </div>
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        maxLength="1"
                        onChange={(event) => addPin(event)}
                        name="6"
                        id="pin-6"
                      />
                    </div>
                    <button className="button-submit btn btn-primary mt-3">
                      Continue
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
}
