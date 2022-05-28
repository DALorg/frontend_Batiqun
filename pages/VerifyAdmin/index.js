import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from "react-redux";
import {requireAuthentication} from "../requireAuthentication"
import "../components/GlobalVariable"
import Navsidebar from "../components/Navsidebar";
import Link from "next/dist/client/link";
import VerifyTable from "../components/VerifyComponent/VerifyTable";
import Custompaginations from "../components/Pagination";
import { Input } from "reactstrap";
import { getVerifpaging } from "../../redux/actions/verifyAction";
import Cookies from 'js-cookie';

const VerifyAdmin = () => {
  const dispatch = useDispatch();
  const allProductsData = useSelector((state) => state.Verifs);
  const { loading, error, verifs } = allProductsData;

  const router = useRouter()
  const {Page, Search}  = router.query;

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      location.href = "?Search=" + e.target.value;
    }
  };

  var Pagess = 0;
  var TotalDisplayed = 10;
  var sear = "";

  if(Page == null){
    Pagess = 1;
  }else{
    Pagess = Page;
  }

  if(Search != null){
    sear = Search;
  }

  // LOAD DATA
  useEffect(() => {
    dispatch(getVerifpaging(Pagess, TotalDisplayed, sear, Cookies.get("UserData")));
  }, []);

  return (
    <>
    <title>Verify Admin</title>
    <meta name="description" content="Generated by create next app" />
    <link rel="icon" href={global.icon} />
    <body class="g-sidenav-show bg-gray-100">
    <Navsidebar/>
    <main className="main-content position-relative border-radius-lg ">
    <div className="container-fluid py-1 mt-3">
        
      <div className="row">
        <div className="col-12">
          <div className="card mb-4">
            <div className="card-header pb-0">
              <div className="row">
                <div className="col-9 d-flex align-items-center">
                  <h5 className="mb-0">Verify Admin</h5>
                </div>
                <div className="col-3 text-end">
                  <div className="input-group mb-4">
                    <span className="input-group-text"><i className="fa-solid fa-magnifying-glass"></i></span>
                    <Input onKeyDown={handleSearch}  placeholder="Search by Address" defaultValue={sear != "" ? sear : null} className="form-control"/>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body px-0 pt-0 pb-2">
              <VerifyTable ProductData={verifs} error={error} loading={loading}/>
            </div>
          </div>
          <Custompaginations PageNow={Pagess} TotalDisplayed={TotalDisplayed} TotalProduct={verifs.intTotalData} isRouterQuery={sear != "" ? true : false}/>
        </div>
      </div>
    </div>
    </main>
    </body>
    </> 
  );
};

export default VerifyAdmin;

export const getServerSideProps = requireAuthentication(context => {
    return {props: {}}
})