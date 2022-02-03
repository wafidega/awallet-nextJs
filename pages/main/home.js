import React, { useEffect, useState } from "react";
import Navbar from "components/modules/Navbar";
import Balance from "components/modules/balance";
import Layout from "components/Layout";
import axios from "utils/axios";
import { getDataCookie } from "middleware/authorizationPage";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import { Modal, Button } from "react-bootstrap";

// Server Side Rendering
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

export default function Home(props) {
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

  // SideBar
  const router = useRouter();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const logoutShow = () => setShow(true);

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

  return (
    <>
      <Layout title="HomePage">
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
              </div>
            </div>
            <div className="col-md-9">
              <div className="content-balance">
                <div className="row">
                  <div className="balance-detail col-md-6">
                    <p>Balance:</p>
                    <h1>RP {data.balance}</h1>
                    <p>{data.noTelp}</p>
                  </div>
                  <div className="balance-button col-md-6">
                    <div className="btn-group-vertical">
                      <button className="transfer btn btn-light">
                        <i className="bi bi-arrow-up"></i>Transfer
                      </button>
                      <button className="top-up btn btn-light">
                        <i className="bi bi-plus"></i>Top-Up
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-md-6">
                  {/* <img src="/diagram.png" className="image-diagram" /> */}
                </div>
                <div className="col-md-6">
                  <div className="history-profile card p-5">
                    <div className="d-flex">
                      <p>Transsaction History</p>
                      <a href="#" className="get-all">
                        See All
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Top Up</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <form>
              <p>Enter amount of money</p>
              <input type="text" />
            </form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="primary">Transfer</Button>
          </Modal.Footer>
        </Modal>
      </Layout>
    </>
  );
}
