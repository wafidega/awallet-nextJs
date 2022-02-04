import React, { useState } from "react";
import Layout from "components/Layout";
import axios from "utils/axios";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import { unAuthPage } from "middleware/authorizationPage";

// export async function getServerSideProps(context) {
//   // await unAuthPage(context); //login, register, forgor password
//   // return { props: {} };
// }

export default function Pin() {
  const router = useRouter();
  const [pin, setPin] = useState({});

  // Handle Pin
  const addPin = (event) => {
    if (event.target.value) {
      const nextSibling = document.getElementById(
        `pin-${parseInt(event.target.name, 10) + 1}`
      );

      if (nextSibling !== null) {
        nextSibling.focus();
      }
    }

    setPin({ ...pin, [`pin${event.target.name}`]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(pin);
    const id = Cookie.get("id");
    const allPin = parseInt(
      pin.pin1 + pin.pin2 + pin.pin3 + pin.pin4 + pin.pin5 + pin.pin6
    );
    axios
      .patch(`/user/pin/${id}`, { pin: allPin })
      .then((res) => {
        toast.success(res.data.msg, {
          theme: "colored",
        });
        setTimeout(() => {
          router.push("/main/home");
        }, 3000);
      })
      .catch((err) => {
        toast.error(err.response.data.msg, {
          theme: "colored",
        });
      });
  };
  return (
    <Layout title="Pin Confirmation">
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
              Secure Your Account, Your Wallet, and Your Data With 6 Digits PIN
              That You Created Yourself.
            </p>
            <p className="login-right-detail">
              Create 6 digits pin to secure all your money and your data in
              Zwallet app. Keep it secret and don’t tell anyone about your
              Zwallet account password and the PIN.
            </p>
            <form>
              <div className="row">
                <div className="col">
                  <input
                    type="password"
                    className="form-control"
                    placeholder=""
                    maxLength="1"
                    onChange={(event) => addPin(event)}
                    name="1"
                    id="pin-1"
                  />
                </div>
                <div className="col">
                  <input
                    type="password"
                    className="form-control"
                    placeholder=""
                    maxLength="1"
                    onChange={(event) => addPin(event)}
                    name="2"
                    id="pin-2"
                  />
                </div>
                <div className="col">
                  <input
                    type="password"
                    className="form-control"
                    placeholder=""
                    maxLength="1"
                    onChange={(event) => addPin(event)}
                    name="3"
                    id="pin-3"
                  />
                </div>
                <div className="col">
                  <input
                    type="password"
                    className="form-control"
                    placeholder=""
                    maxLength="1"
                    onChange={(event) => addPin(event)}
                    name="4"
                    id="pin-4"
                  />
                </div>
                <div className="col">
                  <input
                    type="password"
                    className="form-control"
                    placeholder=""
                    maxLength="1"
                    onChange={(event) => addPin(event)}
                    name="5"
                    id="pin-5"
                  />
                </div>
                <div className="col">
                  <input
                    type="password"
                    className="form-control"
                    placeholder=""
                    maxLength="1"
                    onChange={(event) => addPin(event)}
                    name="6"
                    id="pin-6"
                  />
                </div>
                <button
                  className="button-submit btn btn-primary mt-3"
                  onClick={handleSubmit}
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
