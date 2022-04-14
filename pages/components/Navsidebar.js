import Image from "next/image";
import { useDispatch } from "react-redux";
import { useRouter } from "next/dist/client/router";
// // import Cookies from "js-cookie";
// import { logoutUser } from "../../redux/actions/loginActions";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faImages,
  faUsers,
  faUserTie,
  fafaChartLine,
  faChartLine,
  faUserClock,
} from "@fortawesome/free-solid-svg-icons";

const Navsidebar = () => {
    // const dispatch = useDispatch();
    const router = useRouter();

    return (
        <>
        <aside className="sidenav bg-white navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-4 " id="sidenav-main">
          <div className="sidenav-header">
            <i className="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
            <a className="navbar-brand m-0" href=" https://demos.creative-tim.com/argon-dashboard/pages/dashboard.html " target="_blank">
              <img src="/logo-default-428x112.png" className="navbar-brand-img h-100 mx-auto" alt="main_logo"/>
            </a>
          </div>
          <hr className="horizontal dark mt-0"/>
          <div className="collapse navbar-collapse  w-auto " id="sidenav-collapse-main">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a onClick={(e) => router.push("../")} className= {router.pathname === "/"
                    ? "nav-link active"
                    : "nav-link"
                  }
                >
                  <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                  <FontAwesomeIcon icon={faChartLine} className="text-sm opacity-10" />
                  </div>
                  <span className="nav-link-text ms-1">Dashboard</span>
              </a>
              </li>
              {/* <li className="nav-item mt-3">
                <h6 className="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6">Products Table</h6>
              </li> */}
              <li className="nav-item">
                <a onClick={(e) => router.push("../Product")} className= {router.pathname === "/Product"
                      ? "nav-link active"
                      : "nav-link"
                    }
                  >
                    <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                    <FontAwesomeIcon icon={faImages} className="text-sm opacity-10" />
                    </div>
                    <span className="nav-link-text ms-1"> Products</span>
                </a>
              </li>
              <li className="nav-item">
                <a onClick={(e) => router.push("../history")} className= {router.pathname === "/history"
                      ? "nav-link active"
                      : "nav-link"
                    }
                  >
                    <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                    <FontAwesomeIcon icon={faUserClock} className="text-sm opacity-10" />
                    </div>
                    <span className="nav-link-text ms-1"> History</span>
                </a>
              </li>
              {/* <li className="nav-item mt-3">
                <h6 className="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6">Account pages</h6>
              </li> */}
              <li className="nav-item">
                <a onClick={(e) => router.push("../Users")} className= {router.pathname === "/Users"
                      ? "nav-link active"
                      : "nav-link"
                    }
                  >
                    <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                    <FontAwesomeIcon icon={faUsers} className="text-sm opacity-10" />
                    </div>
                    <span className="nav-link-text ms-1">Users</span>
                </a>
              </li>
              <li className="nav-item">
                <a onClick={(e) => router.push("../Role")} className= {router.pathname === "/Role"
                      ? "nav-link active"
                      : "nav-link"
                    }
                  >
                    <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                    <FontAwesomeIcon icon={faUserTie} className="text-sm opacity-10" />
                    </div>
                    <span className="nav-link-text ms-1">Role</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link " href="../pages/sign-up.html">
                  <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                    <i className="ni ni-collection text-info text-sm opacity-10"></i>
                  </div>
                  <span className="nav-link-text ms-1">Sign Up</span>
                </a>
              </li>
            </ul>
          </div>
        </aside>
    </>
  );
};

export default Navsidebar;
