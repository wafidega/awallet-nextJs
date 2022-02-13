import React, { useEffect, useState } from "react";
import Navbar from "components/modules/Navbar";
import SideBar from "components/modules/SideBar";
import Balance from "components/modules/balance";
import Layout from "components/Layout";
import axios from "utils/axios";
import { getDataCookie } from "middleware/authorizationPage";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import { Modal, Button } from "react-bootstrap";
import Chart from "components/modules/Chart";

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
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
  return (
    <>
      <Layout title="HomePage">
        <Navbar></Navbar>
        <main className="home-content">
          <div className="row">
            <SideBar />
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
                      <button
                        className="top-up btn btn-light"
                        onClick={handleShow}
                      >
                        <i className="bi bi-plus"></i>Top-Up
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-md-6">
                  {/* Insert Chart */}
                  {/* <img src="/diagram.png" className="image-diagram" /> */}
                  <Chart />
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
      </Layout>
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
    </>
  );
}
