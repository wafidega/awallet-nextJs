import React, { useEffect, useState } from "react";
import Navbar from "components/modules/Navbar";
import SideBar from "components/modules/SideBar";
import Layout from "components/Layout";
import axios from "utils/axios";
import { getDataCookie } from "middleware/authorizationPage";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import { connect } from "react-redux";
import { ChangePassword } from "stores/action/profile";

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
function UpdatePassword(props) {
  const id = Cookie.get("id");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // Change Password
  const handleSubmit = (e) => {
    e.preventDefault();
    const changePassword = {
      oldPassword: oldPassword,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    };

    // axios
    //   .patch(`/user/password/${id}`, changePassword)
    //   .then((res) => {
    //     console.log(res);
    //     // toast.info(res.value.data.msg, {
    //     //   theme: "colored",
    //     // });
    //     toast.info(res.data.msg, {
    //       theme: "colored",
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     toast.error(err.response.data.msg, {
    //       theme: "colored",
    //     });
    //   });
    props
      .ChangePassword(id, changePassword)
      .then((res) => {
        console.log(res);
        toast.info(res.value.data.msg, {
          theme: "colored",
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.msg, {
          theme: "colored",
        });
      });
  };

  return (
    <>
      <Layout title="Change Password">
        <Navbar></Navbar>
        <main className="home-content">
          <div className="row">
            <SideBar />
            <div className="col-md-9">
              <div className="profile-personal card p-5">
                <h6>Change Password</h6>
                <br />
                <p>
                  You must enter your current password and then type your new
                  password twice.
                </p>
                <br />
                <div className="row">
                  <div className="col-md-3"></div>
                  <div className="col-md-6">
                    <ToastContainer />
                    <form onSubmit={handleSubmit}>
                      <label className="form-label">Current Password</label>
                      <div className="input-group input-group-sm mb-3">
                        <div className="input-group-prepend"></div>
                        <input
                          type="password"
                          className="form-control"
                          name="oldPassword"
                          onChange={(e) => setOldPassword(e.target.value)}
                        />
                      </div>
                      <label className="form-label">
                        New Password Password
                      </label>
                      <div className="input-group input-group-sm mb-3">
                        <div className="input-group-prepend"></div>
                        <input
                          type="password"
                          className="form-control"
                          name="newPassword"
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                      </div>
                      <label className="form-label">Repeat Password</label>
                      <div className="input-group input-group-sm mb-3">
                        <div className="input-group-prepend"></div>
                        <input
                          type="password"
                          className="form-control"
                          name="confirmPassword"
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </div>
                      <button className="button-submit btn btn-primary mt-3">
                        CHange Password
                      </button>
                    </form>
                  </div>
                  <div className="col-md-3"></div>
                </div>
                <br />
              </div>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
}
const mapStateToProps = (state) => {
  return { profile: state.profile };
};

const mapDispatchToProps = { ChangePassword };

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePassword);
