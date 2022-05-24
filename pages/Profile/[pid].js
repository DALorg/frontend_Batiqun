import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2";
import "../components/GlobalVariable";
import {requireAuthentication} from "../requireAuthentication"
import Navsidebar from "../components/Navsidebar";
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { getProfile, getUsers } from "../../redux/actions/userActions";
import axios from "axios";
import Custompaginations from "../components/Pagination";

const ProfileDetail = () => {
    const dispatch = useDispatch();
    const allProfileData = useSelector((state) => state.Users);
    const { loading, error, user } = allProfileData;

    const router = useRouter();
    const {pid, isCreated, isFav, Page}  = router.query;

    var created = false
    var favorite = false
    var Pagess = 0;
    var TotalDisplayed = 4;

    if(isCreated){
      created = true
    }

    if(isFav){
      favorite = true
    }

    if(Page == null){
      Pagess = 1;
    }else{
      Pagess = Page;
    }

    useEffect(() => {
        dispatch(getProfile(pid.toString(), Cookies.get('ethAddress'), Cookies.get('UserData'),created,favorite,Pagess, TotalDisplayed));
    }, []);

    const handleFav = (ProductId) => {
      return function (e){
        e.preventDefault();
        axios({
          url: global.apiurl + 'api/Favorite/Fav',
          method: 'POST',
          data: {        
            objRequestData: {
              FavoriteProductId: "7Tk$K9N2nJIPW1BkBiCjpA__",
              ProductId: ProductId,
              ethAddress: Cookies.get('ethAddress')
        }}  
        }).then((res)=>{
          console.log(res);
          location.reload(); 
        })
      }
    }

    return (
          <div className="container-fluid py-4">
            <title>Profile</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href={global.icon} />
          <Navsidebar/>
          <div className="row">
            <div className="col-md-12">
              <div className="card card-profile">
                <img src="/default-bg.png" alt="Image placeholder" className="card-img-top"/>
                <div className="row justify-content-center">
                  <div className="col-2 col-lg-2 order-lg-2">
                    <div className="mt-n4 mt-lg-n7 mb-4 mb-lg-0">
                      <a href="javascript:;">
                        <img src="/curved11.jpg" className="rounded-circle img-fluid border border-2 border-white" height="800px" width="800px"/>
                      </a>
                    </div>
                  </div>
                </div>
                {pid === Cookies.get('ethAddress') ? (
                  <div className="card-header text-center border-0 pt-0 pt-lg-2 pb-4 pb-lg-3">
                  <div className="row">
                    <div className="col-lg-11"></div>
                    <div className="col-lg-1">
                      <div className="d-flex justify-content-between">
                        <a onClick={() => {
                            router.push({
                              pathname: './Profile/EditProfile'
                            })
                          }} href="javascript:;" className="btn btn-sm btn-dark float-right mb-0 d-none d-lg-block"><i className="fa fa-cog py-2"></i></a>
                      </div>
                    </div>
                  </div>
                </div>
                ) : 
                (                  
                <div className="card-header text-center border-0 pt-0 pt-lg-2 pb-4 pb-lg-3">
                <div className="row">
                  <div className="col-lg-11"></div>
                  <div className="col-lg-1">
                    <div className="d-flex justify-content-between">
                      <a onClick={() => {
                          router.push({
                            pathname: './Profile/EditProfile'
                          })
                        }} href="javascript:;" className="btn btn-sm btn-dark float-right mb-0 d-none d-lg-block"><i class="fa-solid fa-font-awesome"></i> Report</a>
                    </div>
                  </div>
                </div>
                </div>)}
                <div className="card-body pt-0">
                  <div className="row">
                    <div className="col">
                      <div className="d-flex justify-content-center">
                        <div className="d-grid text-center">
                          <span className="text-lg font-weight-bolder">{user.TotalCollections}</span>
                          <span className="text-sm opacity-8">Collections</span>
                        </div>
                        <div className="d-grid text-center mx-4">
                          <span className="text-lg font-weight-bolder">{user.TotalCreated}</span>
                          <span className="text-sm opacity-8">Created</span>
                        </div>
                        <div className="d-grid text-center">
                          <span className="text-lg font-weight-bolder">{user.TotalFavorite}</span>
                          <span className="text-sm opacity-8">Favorites</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-4">
                    <h5>
                    {user.txtFullName == null ? "Unnamed": user.txtFullName }
                    </h5>
                    <div className="h6 font-weight-300">
                      {user.ethAddress}
                    </div>
                  </div>
                  <br/>
                  <div className="row" align="center">
                    <div className="col-lg">
                      <a href={"/Profile/" + user.ethAddress} className={!isCreated && !isFav
                      ? "link active"
                      : "link"
                    }><i class="fa-solid fa-palette"></i> Collections</a>
                    </div>
                    <div className="col-lg">
                      <a href="?isCreated=true" className={isCreated
                      ? "link active"
                      : "link"
                    }><i class="fa-solid fa-paintbrush"></i> Created</a>
                    </div>
                    <div className="col-lg">
                      <a href="?isFav=true" className={isFav
                      ? "link active"
                      : "link"
                    }><i class="fa-regular fa-heart"></i> Favorites</a>
                    </div>
                  </div>

                  <hr/>
                  <div className="row">
                  {user.Products?.map((pa) => (
                    <div className="col-md-3">
                      <div className="card mt-4">
                        <div className="card-header p-0 mx-3 mt-3 position-relative z-index-1">
                          <a href={"/Product/" + pa.encProductId} className="d-block">
                            <img src={global.apiurl + "Data/" + pa.Product_image} className="border-radius-lg" width="100%" height="290px" style={{objectFit: "contain"}}/>
                          </a>
                        </div>
                        <div className="card-body pt-2">
                        <br/>
                        <div className="row">
                        <div className="col-lg-9">                          
                        <a href={"/Product/" + pa.encProductId} className="card-title h5 d-block text-darker">
                            {pa.Nama_Product}
                          </a>
                        </div>
                        <div className="col-lg-3">
                          <i class="fa-brands fa-ethereum"></i>{" " + pa.Harga}
                        </div>
                        </div>
                          <p className="card-description mb-4">
                          {pa.Description}
                          </p>
                        </div>
                        <div className="card-footer">
                        <div className="row">
                        <div className="col-lg-6">
                              {pa.isFavProduct == true
                                ? <a href="#" onClick={handleFav(pa.encProductId)}><i className="fa-solid fa-heart"></i>  {pa.intFavorites} </a>
                                : <a href="#" onClick={handleFav(pa.encProductId)}><i className="fa-regular fa-heart"></i> {pa.intFavorites} </a>
                              }
                            
                        </div>
                        <div className="col-lg-6">
                          <button className="btn bg-gradient-dark">Buy Now!</button>
                          </div>
                          </div>
                        </div>
                      </div>                  
                    </div>
                    ))}
                  </div>
                  <br/>
                  {
                    user.Products != null ?
                    <Custompaginations PageNow={Pagess} TotalDisplayed={TotalDisplayed} TotalProduct={user.TotalProduct} isRouterQuery={created || favorite ? true : false}/>
                    : null
                  }
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
    }

    export default ProfileDetail;

    export const getServerSideProps = requireAuthentication(context => {
      const { req, res } = context;
      const token = req.cookies.ethAddress;
      console.log(token);
      return {props: {}}
  })