import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "utils/axios";
import { getDataCookie } from "middleware/authorizationPage";
import Cookie from "js-cookie";
import { Modal, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { Logout } from "stores/action/auth";

// Render
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

function SideBar(props) {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const logoutShow = () => setShow(true);

  const logout = () => {
    props
      .Logout()
      .then((res) => {
        Cookie.remove("id");
        Cookie.remove("token");
        router.push("/auth/login");
      })
      .catch((err) => {
        console.log(err);
      });
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
const mapStateToProps = (state) => {
  return { auth: state.auth };
};

const mapDispatchToProps = { Logout };

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
