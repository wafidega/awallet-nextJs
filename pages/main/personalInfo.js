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
        console.log(res);
        setData(res.data.data);
        setUpdateProfile({
          firstName: res.data.data.firstName,
          lastName: res.data.data.lastName,
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  useEffect(() => {
    getDataUser();
  }, []);
  console.log(data);

  // Update Profile
  const [updateProfile, setUpdateProfile] = useState({
    firstName: "",
    lastName: "",
  });

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    axios
      .patch(`/user/profile/${id}`, updateProfile)
      .then((res) => {
        toast.info("Success Update", {
          theme: "colored",
        });
        getDataUser();
      })
      .catch((err) => {
        toast.error(err.response.data.msg, {
          theme: "colored",
        });
      });
  };

  const handleProfile = (event) => {
    setUpdateProfile({
      ...updateProfile,
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
                  value={updateProfile.firstName}
                />
                <br />
                <label>Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastname"
                  name="lastName"
                  onChange={handleProfile}
                  value={updateProfile.lastName}
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
