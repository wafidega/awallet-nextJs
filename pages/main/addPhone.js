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
  const [phone, setPhone] = useState("");
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
    const addPhone = {
      noTelp: phone,
    };

    axios
      .patch(`/user/profile/${id}`, addPhone)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Layout title="Add Phone">
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
                <h6>Add Phone</h6>
                <br />
                <p>
                  Add at least one phone number for the transfer ID so you can
                  start transfering your money to another user.
                </p>
                <br />
                <form onSubmit={handleSubmit}>
                  <label className="form-label">Add Phone Number</label>
                  <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend"></div>
                    <input
                      type="number"
                      placeholder="Enter your phone number"
                      name="phone"
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <button className="button-submit btn btn-primary mt-3">
                    Add Phone Number
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
}
