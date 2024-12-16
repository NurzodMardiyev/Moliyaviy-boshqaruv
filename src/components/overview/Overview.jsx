import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { VscKebabVertical } from "react-icons/vsc";
import { FaPlus } from "react-icons/fa6";
import "./overview.css";

export default function Overview() {
  // const data = [
  //   { month: "Jan", value: 20 },
  //   { month: "Feb", value: 40 },
  //   { month: "Mar", value: 80 },
  //   { month: "Apr", value: 60 },
  //   { month: "May", value: 100, active: true },
  //   { month: "Jun", value: 80 },
  // ];
  return (
    <div>
      <div className="ps-2 border d-flex justify-content-between ps-2">
        <div className="overview w-100">
          <div className="d-flex gap-2  balance-box">
            <div className="allBalance d-flex border rounded flex-column">
              <div className="d-flex align-items-start  p-4   py-2 w-100 justify-content-between bg-info rounded">
                <div className="d-flex flex-column fs-5">
                  <MdOutlineAccountBalanceWallet />
                  Balans
                </div>
                <div
                  className="modal fade"
                  id="exampleModal"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">
                          Modal title
                        </h1>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">...</div>
                    </div>
                  </div>
                </div>
                <button
                  className="btn m-0 "
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  <FaPlus />
                </button>
              </div>
              <div className="p-4 py-3">
                <p className="fs-1 fw-semibold">
                  $<span>1200</span>
                </p>
              </div>
            </div>

            <div className="allBalance d-flex border rounded flex-column">
              <div className="d-flex align-items-start  p-4 py-2 w-100 justify-content-between bg-info rounded">
                <div className="d-flex flex-column fs-5">
                  <MdOutlineAccountBalanceWallet />
                  Balans
                </div>
                <button className="btn m-0 ">
                  <FaPlus />
                </button>
              </div>
              <div className="p-4 py-3">
                <p className="fs-1 fw-semibold">
                  $<span>1200</span>
                </p>
              </div>
            </div>

            <div className="allBalance d-flex border rounded flex-column">
              <div className="d-flex align-items-start  p-4  py-2 w-100 justify-content-between bg-info rounded">
                <div className="d-flex flex-column fs-5">
                  <MdOutlineAccountBalanceWallet />
                  Balans
                </div>
                <button className="btn m-0 ">
                  <VscKebabVertical />
                </button>
              </div>
              <div className="p-4 py-3">
                <p className="fs-1 fw-semibold">
                  $<span>1200</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
