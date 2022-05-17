import Head from 'next/head'
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { LoginUser } from '../redux/actions/loginActions';
import "./components/GlobalVariable"

export default function Login() {
  const dispatch = useDispatch();
  const allLoginData = useSelector((state) => state.Logins);
  const { loading, error, userdata } = allLoginData;

  function setCookie(cname,cvalue,exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  
  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  
  function checkCookie(retValue) {
    let user = getCookie("ethAddress");
    if (user != "") {
    } else {
       if (retValue != "" && retValue != null) {
         setCookie("ethAddress", retValue, 3);
       }
    }
  }

  const {
    isAuthenticated,
    user,
    authenticate
  } = useMoralis()

  const metamaskAuth = async () =>{
    try {
      await authenticate({
        signingMessage : "Auth to start lazy minting your NFTS"
      })
    } catch (error){
      console.log(error)
    }
  }
  if(!isAuthenticated) {

    return(
      <div className="container-fluid bg-login">
        <title>Login</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/icon.png" />
        
        <div className="main-content">
          <div className="container mt-5 pb-5">
            <div className="row justify-content-center" style={{ marginTop: "10%", marginBottom:"6.8%" }}>
              <div className="col-lg-5 col-md-7">
                <div className="border-0 mb-0">
                  <div className="bg-card card-header pb-5">
                  <div className="card-body px-lg-5 py-lg-5">
                    <div className="text-center text-muted mb-4">
                      <img className="img-login" src="logo.png"/>
                      <h4 className="textnih">Login With Your Wallet</h4>
                    </div>

                    <div className="text-center">
                      <button type="button" onClick={metamaskAuth} 
                      className="btnConnect"><img src="image5.png"></img>Connect with Metamask </button>
                    </div>
                    
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
        </div>
    )
    }else{
      axios({
        url: global.apiurl + 'api/user/LoginUser',
        method: 'POST',
        data: {        
          objRequestData: {
          TokenId: user.get('ethAddress')
      }}  
      }).then((res)=>{
        setCookie("UserData", res.data.objData.access_token, 3);
        res.data.objData.encRole.RoleName
        setCookie("UserRole", res.data.objData.encRole[0].RoleName, 3);
        checkCookie(user.get('ethAddress'));
        setTimeout(function(){window.location.replace('/')}, 5000);
      })
    }
}
