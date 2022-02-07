import React, { useState } from "react";
import Layout from "components/Layout";
import axios from "utils/axios";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import { unAuthPage } from "middleware/authorizationPage";
import { ToastContainer, toast } from "react-toastify";
import { connect } from "react-redux";
import { RegisterUser } from "stores/action/auth";

// export async function getServerSideProps(context) {
//   // await unAuthPage(context); //login, register, forgor password
//   // return { props: {} };
// }

function Register(props) {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // axios
    //   .post("/auth/register", form)
    //   .then((res) => {
    //     toast.success("Sukses register Silahkan Cek Akun", {
    //       theme: "colored",
    //     });
    //     router.push("/auth/login");
    //   })
    //   .catch((err) => {
    //     toast.error(err.response.data.msg, {
    //       theme: "colored",
    //     });
    //   });
    props
      .RegisterUser(form)
      .then((res) => {
        console.log(res);
        toast.success(res.value.data.msg, {
          theme: "colored",
        });
        setTimeout(() => {
          router.push("/auth/login");
        }, 3000);
      })
      .catch((err) => {
        toast.error(err.response.data.msg, {
          theme: "colored",
        });
      });
  };
  const handleChangeText = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // To Login Page
  const Login = (e) => {
    router.push("/auth/login");
  };

  return (
    <Layout title="Register">
      <div className="row">
        <div className="col-md-6">
          {/* <img src="/background.png" className="image-left" />
            <h1 className="banner__overlay__title">A-WALLET</h1> */}
          <div className="item-left">
            <h1 className="title-left">A-WALLET</h1>
            <img src="/device.png" />
            <h3 className="login-about">App that Covering Banking Needs.</h3>
            <p className="login-detail">
              Zwallet is an application that focussing in banking needs for all
              users in the world. Always updated and always following world
              trends. 5000+ users registered in Zwallet everyday with worldwide
              users coverage.
            </p>
          </div>
        </div>
        <div className="col-md-6">
          <div className="content-right mt-2">
            <p>
              Start Accessing Banking Needs With All Devices and All Platforms
              With 30.000+ Users
            </p>
            <p className="login-right-detail">
              Transfering money is eassier than ever, you can access Zwallet
              wherever you are. Desktop, laptop, mobile phone? we cover all of
              that for you!
            </p>
            <ToastContainer />
            <form onSubmit={handleSubmit}>
              {/* <label className="form-label">First Name</label> */}
              <div className="input-group input-group-sm mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="inputGroup-sizing-sm">
                    <i className="bi bi-person"></i>
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  placeholder="Enter Your First Name"
                  onChange={handleChangeText}
                />
              </div>
              {/* <label className="form-label">Last Name</label> */}
              <div className="input-group input-group-sm mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="inputGroup-sizing-sm">
                    <i className="bi bi-person"></i>
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  placeholder="Enter Your Last Name"
                  onChange={handleChangeText}
                />
              </div>
              {/* <label className="form-label">Email</label> */}
              <div className="input-group input-group-sm mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="inputGroup-sizing-sm">
                    <i className="bi bi-envelope"></i>
                  </span>
                </div>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Enter Your Email Adress"
                  onChange={handleChangeText}
                />
              </div>
              {/* <label className="form-label">Password</label> */}
              <div className="input-group input-group-sm mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="inputGroup-sizing-sm">
                    <i className="bi bi-lock"></i>
                  </span>
                </div>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Enter Your Password"
                  onChange={handleChangeText}
                />
              </div>
              <button
                className="button-submit btn btn-primary mt-3"
                type="submit"
              >
                Sign Up
              </button>
            </form>
            <br />
            <p>If you already have account go to sign in </p>
            <button
              className="button-submit btn btn-primary mt-3"
              onClick={Login}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

const mapDispatchToProps = { RegisterUser };

export default connect(mapStateToProps, mapDispatchToProps)(Register);
