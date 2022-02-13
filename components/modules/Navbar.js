import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "utils/axios";
import { getDataCookie } from "middleware/authorizationPage";
import Cookie from "js-cookie";
import Image from "next/image";
import { connect } from "react-redux";
import { GetUserById } from "stores/action/profile";

// // Render
// export async function getServerSideProps(context) {
//   const dataCookie = await getDataCookie(context);
//   if (!dataCookie.isLogin) {
//     return {
//       redirect: {
//         destination: "/auth/login",
//         permanent: false,
//       },
//     };
//   }

//   const response = await axios
//     .get("/user?page=1&limit=2&search=&sort=", {
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

function Navbar(props) {
  const [data, setData] = useState({});
  const id = Cookie.get("id");

  useEffect(() => {
    setData(props.profile.dataUser);
  }, [props.profile]);
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
                  <img
                    src={
                      data.image
                        ? `https://zwalet.herokuapp.com/uploads/${data.image}`
                        : "/assets/image/zhongli.png"
                    }
                    // src="/assets/image/zhongli.png"
                    className="image-profile-navbar"
                    alt="image-profile"
                  />
                </div>
              </div>
              <div className="col-md-6 text-md-start mt-1">
                <p>{data.firstName + " " + data.lastName}</p>
                <p>{data.noTelp}</p>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
const mapStateToProps = (state) => {
  return { profile: state.profile };
};

const mapDispatchToProps = { GetUserById };

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
