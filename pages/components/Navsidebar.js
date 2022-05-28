import Image from "next/image";
import { useDispatch } from "react-redux";
import { useRouter } from "next/dist/client/router";
import { useMoralis } from "react-moralis";
// // import Cookies from "js-cookie";
// import { logoutUser } from "../../redux/actions/loginActions";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./GlobalVariable";
import Link from 'next/link'

import {
  faImages,
  faUsers,
  faPowerOff,
  faChartLine,
  faUserClock,
} from "@fortawesome/free-solid-svg-icons";

const Navsidebar = () => {
  const {
    logout
  } = useMoralis()
    // const dispatch = useDispatch();
    const router = useRouter();

    function deleteAllCookies() {
      var cookies = document.cookie.split(";");
  
      for (var i = 0; i < cookies.length; i++) {
          var cookie = cookies[i];
          var eqPos = cookie.indexOf("=");
          var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
          document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }
      window.location.replace('/Login');
  }

    function logoff() {
      deleteAllCookies();
      logout();
    }

    return (
        <aside className="sidenav bg-white navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-4 " id="sidenav-main">
          <div className="sidenav-header">
            <i className="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
            <a className="navbar-brand m-0" href=" https://demos.creative-tim.com/argon-dashboard/pages/dashboard.html " target="_blank">
              <img src="/logo.png" className="navbar-brand-img h-100 mx-auto" alt="main_logo"/>
            </a>
          </div>
          <hr className="horizontal dark mt-0"/>
          <div className="collapse navbar-collapse  w-auto " id="sidenav-collapse-main">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link href="/" passHref>
                <a className= {router.pathname.includes("/Dashboard")
                    ? "nav-link active"
                    : "nav-link"
                  }
                >
                  <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                  <FontAwesomeIcon icon={faChartLine} className="text-sm opacity-10" />
                  </div>
                  <span className="nav-link-text ms-1">Dashboard</span>
              </a>
              </Link>
              </li>
              {/* <li className="nav-item mt-3">
                <h6 className="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6">Products Table</h6>
              </li> */}
              <li className="nav-item">
              <Link href="/Product" passHref>
                <a className= {router.pathname.includes("/Product")
                      ? "nav-link active"
                      : "nav-link"
                    }
                  >
                    <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                    <FontAwesomeIcon icon={faImages} className="text-sm opacity-10" />
                    </div>
                    <span className="nav-link-text ms-1"> Products</span>
                </a>
                </Link>
              </li>
              <li className="nav-item">
              <Link href="/Bills" passHref>
                <a className= {router.pathname === "/Bills"
                      ? "nav-link active"
                      : "nav-link"
                    }
                  >
                    <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                    <FontAwesomeIcon icon={faUserClock} className="text-sm opacity-10" />
                    </div>
                    <span className="nav-link-text ms-1"> Bills</span>
                </a>
                </Link>
              </li>
              <li className="nav-item mt-3">
                <h6 className="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6">Account pages</h6>
              </li>
              <li className="nav-item">
                <Link href="/Profile" passHref>
                <a className= {router.pathname.includes("/Profile")
                      ? "nav-link active"
                      : "nav-link"
                    }
                  >
                    <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                    <FontAwesomeIcon icon={faUsers} className="text-sm opacity-10" />
                    </div>
                    <span className="nav-link-text ms-1">Profile</span>
                </a>
                </Link>
              </li>
              <li className="nav-item">
                <a onClick={logoff} className= "nav-link"
                  >
                    <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                    <FontAwesomeIcon icon={faPowerOff} className="text-sm opacity-10" />
                    </div>
                    <span className="nav-link-text ms-1">Logout</span>
                </a>
              </li>
            </ul>
          </div>
        </aside>
  );
};

export default Navsidebar;
