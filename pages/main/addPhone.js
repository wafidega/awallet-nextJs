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
function AddPhone(props) {
  const [data, setData] = useState(props.data);
  const id = Cookie.get("id");
  const [phone, setPhone] = useState("");
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
  // Change Pin
  const handleSubmit = (e) => {
    e.preventDefault();
    const addPhone = {
      noTelp: phone,
    };
    props
      .UpdatePhoneNumber(id, addPhone)
      .then((res) => {
        toast.info(res.value.data.msg, {
          theme: "colored",
        });
        router.push("/main/personalInfo");
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
                      name="phone"
                      onChange={(e) => setPhone(e.target.value)}
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

const mapDispatchToProps = { UpdatePhoneNumber };

export default connect(mapStateToProps, mapDispatchToProps)(AddPhone);
