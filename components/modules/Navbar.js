import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "utils/axios";
import { getDataCookie } from "middleware/authorizationPage";
import Cookie from "js-cookie";

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

export default function Navbar(props) {
  // const handleLogout = () => {
  //   console.log("Logout");
  //   Router.push("/login");
  // };
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
  return (
    <>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand">A-Wallet</a>
          <div className="navbar-right d-flex">
            <div className="row">
              <div className="col-sm-6">
                <img src="/foto-profil.png" />
              </div>
              <div className="col-sm-6">
                <p className="nav-profile-name">Wafi Dega</p>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
