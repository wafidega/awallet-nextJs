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
  const router = useRouter();
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

  const addPhone = (e) => {
    e.preventDefault();
    router.push("/main/addPhone");
  };
  return (
    <>
      <Layout title="Personal Info">
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
                <h6>Personal Information</h6>
                <br />
                <p>
                  We got your personal information from the sign up proccess. If
                  you want to make changes on your information, contact our
                  support.
                </p>
                <br />
                <label>First Name</label>
                <h3>{data.firstName}</h3>
                <br />
                <label>Last Name</label>
                <h3>{data.lastName}</h3>
                <br />
                <label>Verified E-mail</label>
                <h3>{data.email}</h3>
                <br />
                <label>Phone Number</label>
                <h3>{data.noTelp}</h3>
                <a className="d-flex" onClick={addPhone}>
                  Manage
                </a>
                <br />
              </div>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
}
