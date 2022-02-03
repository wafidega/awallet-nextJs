import React, { useState } from "react";
import Layout from "components/Layout";
import axios from "utils/axios";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import { getDataCookie } from "middleware/authorizationPage";
import { toast, ToastContainer } from "react-toastify";

// export async function getServerSideProps(context) {
//   const dataCookie = await getDataCookie(context);
//   if (dataCookie.isLogin) {
//     return {
//       redirect: {
//         destination: "/main/home",
//         permanent: false,
//       },
//     };
//   }
//   return { props: {} };
// }

export default function Login() {
  // Handle Login
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/auth/login", form)
      .then((res) => {
        Cookie.set("token", res.data.data.token);
        Cookie.set("id", res.data.data.id);
        if (res.data.data.pin === null) {
          toast.success(res.data.msg, {
            theme: "colored",
          });
          setTimeout(() => {
            router.push(`/auth/pin`);
          }, 3000);
        } else {
          router.push("/main/home");
        }
      })
      .catch((err) => {
        toast.error("Login Failed", {
          theme: "colored",
        });
      });
    console.log(form);
  };
  const handleChangeText = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // TO register Page
  const register = (e) => {
    e.preventDefault();
    router.push("/auth/register");
  };

  return (
    <Layout title="Login">
      <div className="login-row row">
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
              <label className="form-label">Email</label>
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
                  onChange={handleChangeText}
                />
              </div>
              <label className="form-label">Password</label>
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
                  onChange={handleChangeText}
                />
              </div>
              <button className="button-submit btn btn-primary mt-3">
                Login
              </button>
            </form>
            <br />
            <p>Belum punya akun? </p>
            <button
              className="button-submit btn btn-primary mt-3"
              onClick={register}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
