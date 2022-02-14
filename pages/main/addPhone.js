import React, { useEffect, useState } from "react";
import Navbar from "components/modules/Navbar";
import SideBar from "components/modules/SideBar";
import Layout from "components/Layout";
import axios from "utils/axios";
import { getDataCookie } from "middleware/authorizationPage";
import Cookie from "js-cookie";
import router, { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import { connect } from "react-redux";
import { UpdatePhoneNumber } from "stores/action/profile";
import { GetUserById } from "stores/action/profile";

function AddPhone(props) {
  const [form, setForm] = useState({
    noTelp: "",
  });
  const id = Cookie.get("id");
  console.log(props.profile);
  useEffect(() => {
    setForm({
      noTelp: props.profile.dataUser.noTelp,
    });
  }, [props.profile]);
  // Change Phone
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    props
      .UpdatePhoneNumber(id, form)
      .then((res) => {
        toast.info(res.value.data.msg, {
          theme: "colored",
        });
        router.push("/main/personalInfo");
        props.GetUserById(id);
      })
      .catch((err) => {
        toast.error(err.response.data.msg, {
          theme: "colored",
        });
      });
  };
  return (
    <>
      <Layout title="Add Phone">
        <Navbar></Navbar>
        <main className="home-content">
          <div className="row">
            <div className="col-md-3">
              <SideBar />
            </div>
            <div className="col-md-9">
              <div className="profile-personal card p-5">
                <h6>Add Phone</h6>
                <br />
                <p>
                  Add at least one phone number for the transfer ID so you can
                  start transfering your money to another user.
                </p>
                <br />
                <ToastContainer />
                <form onSubmit={handleSubmit}>
                  <label className="form-label">Add Phone Number</label>
                  <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend"></div>
                    <input
                      type="number"
                      placeholder="Enter your phone number"
                      name="noTelp"
                      value={form.noTelp}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          [e.target.name]: e.target.value,
                        })
                      }
                      style={{
                        height: "70px",
                        width: "100%",
                        textAlign: "center",
                        fontSize: "20px",
                        marginTop: "40px",
                        marginBottom: "50px",
                        border: "1px solid rgba(169, 169, 169, 0.6)",
                        borderRadius: "10px",
                        outline: "none",
                      }}
                    />
                  </div>
                  <button className="button-submit btn btn-primary mt-3">
                    Add Phone Number
                  </button>
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

const mapDispatchToProps = { UpdatePhoneNumber, GetUserById };

export default connect(mapStateToProps, mapDispatchToProps)(AddPhone);
