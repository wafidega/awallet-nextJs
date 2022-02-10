import { useRouter } from "next/router";
import Link from "next/link";

export default function Balance() {
  return (
    <>
      <div className="content-balance">
        <div className="row">
          <div className="balance-detail col-md-6">
            <p>Balance:</p>
            <h1>120.000</h1>
            <p>+62 813-9387-7946</p>
          </div>
          <div className="balance-button col-md-6">
            <div className="btn-group-vertical">
              <button className="transfer btn btn-light">
                <i className="bi bi-arrow-up"></i>Transfer
              </button>
              <button className="top-up btn btn-light">
                <i className="bi bi-plus"></i>Top-Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
