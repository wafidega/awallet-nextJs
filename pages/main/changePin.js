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
import { UpdatePin } from "stores/action/profile";

function ChangePin(props) {
  const id = Cookie.get("id");
  // Change Pin
  const [pin, setPin] = useState({});
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
    const allPin = parseInt(
      pin.pin1 + pin.pin2 + pin.pin3 + pin.pin4 + pin.pin5 + pin.pin6
    );
    const id = Cookie.get("id");
    props
      .UpdatePin(id, { pin: allPin })
      .then((res) => {
        toast.info(res.value.data.msg, {
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
    <>
      <Layout title="Change Pin">
        <Navbar></Navbar>
        <main className="home-content">
          <div className="row">
            <SideBar />
            <div className="col-md-9">
              <div className="profile-personal card p-5">
                <h6>Change PIN</h6>
                <br />
                <p>Enter Your New Pin</p>
                <br />
                <ToastContainer />
                <form onSubmit={handleSubmit}>
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
                      type="submit"
                      className="button-submit btn btn-primary mt-3"
                    >
                      Change Your Pin
                    </button>
                  </div>
                </form>
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

const mapDispatchToProps = {
  UpdatePin,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePin);
