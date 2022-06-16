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
import Link from "next/dist/client/link";
import Head from "next/dist/shared/lib/head";

const Profile = () => {
    const dispatch = useDispatch();
    const allProfileData = useSelector((state) => state.Users);
    const { loading, error, user } = allProfileData;

    const Profile_Image = user.Profile_Image;
    console.log(user.Profile_Image);

    const router = useRouter()
    const {isCreated, isFav, Page}  = router.query;

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
      dispatch(getProfile(Cookies.get('ethAddress'),Cookies.get('ethAddress'), Cookies.get('UserData'), created, favorite, Pagess, TotalDisplayed));
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
      <>
        <Head>
        <title>Profile</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="g-sidenav-show bg-gray-100">
      <div className="min-height-300 bg-primary position-absolute w-100"></div>
      <Navsidebar/>
      <main className="main-content position-relative border-radius-lg">
      <div className="container-fluid py-1"> 
          <div className="row">
            <div className="col-md-12">
              <div className="card card-profile mt-3">
                <img src=
                {user.Profile_Baner == null ?
                  "https://img.freepik.com/free-photo/black-wall-texture-background-banner-blank-dark-gradient-studio-room-chalkboard_28629-594.jpg"                   
                  :  global.apiurl + "Data/" + user.Profile_Baner} 
                alt="Image placeholder" className="card-img-top"/>
                <div className="row justify-content-center">
                  <div className="col-2 col-lg-2 order-lg-2">
                    <div className="mt-n4 mt-lg-n7 mb-4 mb-lg-0">
                      <a href="javascript:;">
                        <img src=
                        {user.Profile_Image == null ?
                          "https://t4.ftcdn.net/jpg/01/18/03/35/360_F_118033506_uMrhnrjBWBxVE9sYGTgBht8S5liVnIeY.jpg"
                            : global.apiurl + "Data/" + user.Profile_Image }
                        className="rounded-circle img-fluid border border-2 border-white"/>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="card-header text-center border-0 pt-0 pt-lg-2 pb-4 pb-lg-3">
                  <div className="row">
                    <div className="col-lg-6 text-end">
                      <div className="d-flex justify-content-between">
                        <Link href={{ pathname: '/Product/SaveProduct'}}>
                          <a className="btn bg-gradient-dark mb-0"><i className="fas fa-plus"></i>&nbsp;&nbsp;Add New Product</a>
                        </Link>
                      </div>
                    </div>
                    <div className="col-lg-6 text-end">
                        <a onClick={() => {
                            router.push({
                              pathname: './Profile/EditProfile'
                            })
                          }} href="javascript:;" className="btn btn-sm btn-dark mb-0"><i className="fa fa-cog py-2"></i></a>
                    </div>
                  </div>
                </div>
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
                      <a href="./Profile" className={!isCreated && !isFav
                      ? "link active"
                      : "link"
                    }><i className="fa-solid fa-palette"></i> Collections</a>
                    </div>
                    <div className="col-lg">
                      <a href="./Profile?isCreated=true" className={isCreated
                      ? "link active"
                      : "link"
                    }><i className="fa-solid fa-paintbrush"></i> Created</a>
                    </div>
                    <div className="col-lg">
                      <a href="./Profile?isFav=true" className={isFav
                      ? "link active"
                      : "link"
                    }><i className="fa-regular fa-heart"></i> Favorites</a>
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
                          <i className="fa-brands fa-ethereum"></i>{" " + pa.Harga}
                        </div>
                        </div>
                          <p className="card-description mb-4">
                          {pa.Description}
                          </p>
                        </div>
                        <div className="card-footer">
                        <div className="row">
                          <div className="col-lg-6">
                              {pa.isFavProduct == true || isFav
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
        </main>
        </body>
        </>
        )
    }

    export default Profile;

    export const getServerSideProps = requireAuthentication(context => {
      const { req, res } = context;
      const token = req.cookies.ethAddress;
      console.log(token);
      return {props: {}}
  })