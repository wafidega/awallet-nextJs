import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "components/modules/Navbar";
import SideBar from "components/modules/SideBar";
import Layout from "components/Layout";
import axios from "utils/axios";
import { AuthPage } from "middleware/authorizationPage";

export default function TransferPage(props) {
  const router = useRouter();
  const [dataSearch, setDataSearch] = useState({
    page: 1,
    limit: 50,
    sort: "",
  });
  const [searchPage, setSearchPage] = useState("");
  const [SearchView, setSearchView] = useState([]);

  const handleSearch = (event) => {
    axios
      .get(
        `user?page=${dataSearch.page}&limit=${dataSearch.limit}&search=${searchPage}&sort=${dataSearch.sort}`
      )
      .then((res) => {
        setSearchView(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // const changeSearch = (event) => {
  //   setDataSearch({
  //     search: event.target.value,
  //   });
  // };

  const detailProfile = (data) => {
    console.log(data);
    // router.push("/main/transferAmount", { data });
    router.push({ pathname: "/main/transferAmount", query: { ...data } });
    // props.history.push("/main/transferAmount", data);
  };
  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <>
      <Layout title="Transfer Page">
        <Navbar></Navbar>
        <main className="home-content">
          <div className="row">
            <SideBar />
            <div className="col-md-9">
              <div className="history-all card p-5">
                <p>Search Receiver</p>
                <input
                  type="text"
                  className="form-control"
                  id="search"
                  name="search"
                  placeholder="Search Receiver Here"
                  // onChange={changeSearch}
                  onChange={(e) => setSearchPage(e.target.value)}
                />
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{
                    marginTop: "20px",
                  }}
                  onClick={handleSearch}
                >
                  Search
                </button>
                {/* User */}
                <div>
                  {SearchView.map((item) => (
                    <div
                      className="d-flex justify-content-between mt-4"
                      key={item.id}
                    >
                      <div className="d-flex">
                        <img
                          src="/assets/image/zhongli.png"
                          alt="porfile"
                          width="56px"
                          height="56px"
                          style={{
                            borderRadius: "10px",
                            objectFit: "cover",
                          }}
                        />
                        <div className="ms-3">
                          <h5 className="nunito-600">
                            {item.firstName + " " + item.lastName}
                          </h5>
                          <span className="nunito-400 font-thrid">
                            {item.noTelp}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => detailProfile(item)}
                      >
                        Transfer
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
}
