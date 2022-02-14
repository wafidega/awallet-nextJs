import React, { useEffect, useState } from "react";
import Navbar from "components/modules/Navbar";
import Balance from "components/modules/balance";
import Layout from "components/Layout";
import axios from "utils/axios";
import { getDataCookie } from "middleware/authorizationPage";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import SideBar from "components/modules/SideBar";
import { toast, ToastContainer } from "react-toastify";
import { connect } from "react-redux";
import { GetUserById } from "stores/action/profile";
import { UpdateDataProfile } from "stores/action/profile";

function PersonalInfo(props) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
  });
  const id = Cookie.get("id");
  const router = useRouter();
  useEffect(() => {
    setForm({
      firstName: props.profile.dataUser.firstName,
      lastName: props.profile.dataUser.lastName,
    });
  }, [props.profile]);

  // Update Profile
  const handleUpdateProfile = (e) => {
    e.preventDefault();
    console.log(form);
    props
      .UpdateDataProfile(id, form)
      .then((res) => {
        console.log(res);
        toast.info("Success Update", {
          theme: "colored",
        });
        props.GetUserById(id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleProfile = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  // Push Update Phone
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
              <SideBar />
            </div>
            <div className="col-md-9">
              <ToastContainer />
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
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  onChange={handleProfile}
                  value={form.firstName}
                />
                <br />
                <label>Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastname"
                  name="lastName"
                  onChange={handleProfile}
                  value={form.lastName}
                />
                <br />
                <center>
                  <button
                    className="button-submit btn btn-primary mt-3"
                    onClick={handleUpdateProfile}
                  >
                    Update Info
                  </button>
                </center>
                <br />
                <label>Phone Number</label>
                <h3>{props.profile.dataUser.noTelp}</h3>
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
const mapStateToProps = (state) => {
  return { profile: state.profile };
};

const mapDispatchToProps = { GetUserById, UpdateDataProfile };
export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfo);
