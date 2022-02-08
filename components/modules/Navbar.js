import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "utils/axios";
import { getDataCookie } from "middleware/authorizationPage";
import Cookie from "js-cookie";
import Image from "next/image";

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
              <div className="col-md-6 mt-1">
                <div className="profile-image">
                  <Image src="/foto-profil.png" width={52} height={52} />
                </div>
              </div>
              <div className="col-md-6 text-md-start mt-1">
                <p>Wafi Dega</p>
                <p>081218049667</p>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
