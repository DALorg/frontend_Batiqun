import Head from 'next/head'
import { useMoralis } from "react-moralis";

export default function Login() {

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
         setCookie("ethAddress", retValue, 30);
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
      <section>
      <div className="page-header min-vh-100">
        <div className="container">
          <div className="row">
            <div className="col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0 mx-auto">
              <div className="card card-plain">
                <div className="card-header pb-0 text-start">
                  <h4 className="font-weight-bolder">Sign In</h4>
                  <p className="mb-0">Enter your email and password to sign in</p>
                </div>
                <div className="card-body">
                  <form role="form">
                    <div className="text-center">
                      <button onClick={metamaskAuth} type="button" className="btn btn-lg btn-primary btn-lg w-100 mt-4 mb-0">Sign in</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-6 d-lg-flex d-none h-100 my-auto pe-0 position-absolute top-0 end-0 text-center justify-content-center flex-column">
              <div className="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden" >
                <span className="mask bg-gradient-primary opacity-6"></span>
                <h4 className="mt-5 text-white font-weight-bolder position-relative">"Attention is the new currency"</h4>
                <p className="text-white position-relative">The more effortless the writing looks, the more effort the writer actually put into the process.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    )
    }else{
      checkCookie(user.get('ethAddress'));
      window.location.replace('/')
    }
}