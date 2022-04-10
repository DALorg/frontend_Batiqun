import styles from "../../styles/Component.module.scss";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { useRouter } from "next/dist/client/router";
// // import Cookies from "js-cookie";
// import { logoutUser } from "../../redux/actions/loginActions";
import { useState } from "react";

const Navsidebar = () => {
    // const dispatch = useDispatch();
    const router = useRouter();

    return (
        <>
        {/* setting navbar */}
        <nav className={styles.nav}>
            <ul className={styles.nav__list}>
                coba aja
            </ul>
        </nav>

        {/* setting sidebar */}
        <div className={styles.sidenav}>
        <div className={styles.logo}>
          <Image src="/" width={70} height={5} /> 
          <h3>Batiqun</h3>
        </div>
{/* <hr/> */}
        <li>
          <a
              onClick={(e) => router.push("../Products")}
              className={
                router.pathname === "/Products"
                ? styles.activeNav
                : styles.nonactiveNav
            }
          >
            <img className={styles.icon} src="/dashboard.png"></img>
            Dashboard
          </a>
        </li>
        <li>
          <a
            onClick={(e) => router.push("../Carts")}
            className={
              router.pathname === "/Carts"
                ? styles.activeNav
                : styles.nonactiveNav
            }
          >
            <img className={styles.icon} src="/instagram.png"></img>
            Product
          </a>
        </li>
        <li>
          <a
            onClick={(e) => router.push("../Users")}
            className={
              router.pathname === "/Users"
                ? styles.activeNav
                : styles.nonactiveNav
            }
          >
            <img className={styles.icon} src="/time.png"></img>
            History
          </a>
        </li>
        <li>
          <a
            onClick={(e) => router.push("../Carts")}
            className={
              router.pathname === "/Carts"
                ? styles.activeNav
                : styles.nonactiveNav
            }
          >
            <img className={styles.icon} src="/account.png"></img>
            Profile
          </a>
        </li>
        
        <br />
      </div>
    </>
  );
};

export default Navsidebar;
