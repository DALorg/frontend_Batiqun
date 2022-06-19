import Head from 'next/head'
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import Cookies from "js-cookie";
import { LoginUser } from '../redux/actions/loginActions';
import "./components/GlobalVariable"
import Swal from 'sweetalert2';

export default function Login() {

  function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

  function setCookie(cname,cvalue,exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*60*60*1000));
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
         setCookie("ethAddress", retValue, 3)
       }
    }
    return new Promise((resolve, reject) => resolve(user));
  }

  const {
    isAuthenticated,
    user,
    authenticate
  } = useMoralis()

  const metamaskAuth = async () =>{
    try {
      await authenticate({
        signingMessage : "Batiqun Auth"
      })
    } catch (error){
      console.log(error)
    }
  }
  if(!isAuthenticated) {
    if(Cookies.get("UsrKTPstatus") != null || Cookies.get("ethAddress") != null 
    || Cookies.get("UserData")!=null || Cookies.get("UserRole") != null)
    {
      deleteAllCookies();
    }

    return(
      <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href={global.icon} />
      </Head>

        <div className="container-fluid bg-login">
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
        </>
    )
    }else{
      axios({
        url: global.apiurl + 'api/user/LoginUser',
        method: 'POST',
        data: {        
          objRequestData: {
            ethAddress: user.get('ethAddress')
      }}  
      }).then((res)=>{
        setCookie("UserData", res.data.objData.access_token, 3);
        setCookie("UserRole", res.data.objData.encRole[0].RoleName, 3);
        axios({
          url: global.apiurl + 'api/user/GetUserKTPStatus/' + user.get('ethAddress'),
          method: 'GET'
        }).then((result)=>{
          setCookie('UsrKTPstatus', result.data.bitSuccess, 3);
            checkCookie(user.get('ethAddress')).then(
            function(result) {
              window.location.replace('/');
            }, 
            function(error) {
                // Common error handling
                Swal.fire(
                  "Oops...",
                  "Something went wrong!",
                  "error"
                )
            }
        );
        })
      })
      let timerInterval
      return(
        Swal.fire({
          title: 'Fetching Some Cookies!',
          html: 'I will close in <b></b> milliseconds.',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading()
            const b = Swal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
              b.textContent = Swal.getTimerLeft()
            }, 100)
          },
          willClose: () => {
            clearInterval(timerInterval)
          }
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log('I was closed by the timer')
          }
        })
    )


    }
}
