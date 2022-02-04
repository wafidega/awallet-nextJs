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
  // Mengambil data
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
  // SideBar
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const logout = () => {
    Cookie.remove("id");
    Cookie.remove("token");
    router.push("/auth/login");
  };

  const home = (e) => {
    e.preventDefault();
    router.push("/main/home");
  };

  const editProfile = (e) => {
    e.preventDefault();
    router.push("/main/profile");
  };
  // BUtton profile
  const ChangePassword = (e) => {
    e.preventDefault();
    router.push("/main/changePassword");
  };

  useEffect(() => {
    getDataUser();
  }, []);

  const personal = (e) => {
    e.preventDefault();
    router.push("/main/personalInfo");
  };

  const changePin = (e) => {
    e.preventDefault();
    router.push("/main/changePin");
  };

  return (
    <>
      <Layout title="Profile">
        <Navbar></Navbar>
        <main className="home-content">
          <div className="row">
            <div className="col-md-3">
              <div className="home-content-right d-flex align-items-start">
                <div className="nav flex-column nav-pills me-3">
                  <a className="home-active" onClick={home}>
                    <i className="bi bi-ui-checks-grid"> </i>
                    DASHBOARD
                  </a>
                  <br />
                  <a href="#" onClick={home}>
                    <i className="bi bi-arrow-up"></i>Transfer
                  </a>
                  <br />
                  <a href="#" onClick={handleShow}>
                    <i className="bi bi-plus"></i>Top-Up
                  </a>
                  <br />
                  <a href="#" onClick={editProfile}>
                    <i className="bi bi-person"></i>Profile
                  </a>
                  <br />
                  <a href="#" onClick={logout}>
                    <i className="bi bi-person"></i>Logout
                  </a>
                </div>
                {/* Modal */}
              </div>
            </div>
            <div className="col-md-9">
              <div className="profile-user-accept card p-5">
                <div className="row">
                  <div className="col-md-3"></div>
                  <div className="col-md-6">
                    <center>
                      <img src="/foto-profil.png" />
                    </center>
                    <h3>{data.firstName + " " + data.lastName}</h3>
                    <p>081218049667</p>
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
                      onClick={changePin}
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
    </>
  );
}
