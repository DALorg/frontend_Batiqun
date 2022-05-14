import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2";
import "../components/GlobalVariable";
import {requireAuthentication} from "../requireAuthentication"
import Navsidebar from "../components/Navsidebar";
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { getUsers } from "../../redux/actions/userActions";

const Profile = () => {
    const dispatch = useDispatch();
    const allProfileData = useSelector((state) => state.Users);
    const { loading, error, user } = allProfileData;

    useEffect(() => {
      dispatch(getUsers(Cookies.get('ethAddress'), Cookies.get('UserData')));
    }, []);

    const router = useRouter()

    return (
          <div className="container-fluid py-4">
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
                <div className="card-body pt-0">
                  <div className="row">
                    <div className="col">
                      <div className="d-flex justify-content-center">
                        <div className="d-grid text-center">
                          <span className="text-lg font-weight-bolder">22</span>
                          <span className="text-sm opacity-8">Collections</span>
                        </div>
                        <div className="d-grid text-center mx-4">
                          <span className="text-lg font-weight-bolder">10</span>
                          <span className="text-sm opacity-8">Created</span>
                        </div>
                        <div className="d-grid text-center">
                          <span className="text-lg font-weight-bolder">89</span>
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
                      {Cookies.get('ethAddress')}
                    </div>
                  </div>
                  <br/>
                  <div className="row">
                    <div className="col-lg">
                      <a href="#"><i className="fa-solid fa-rectangle-history"></i> Collections</a>
                    </div>
                    <div className="col-lg">
                      <a href="#"><i className="fa-solid fa-plus"></i> Created</a>
                    </div>
                    <div className="col-lg">
                      <a href="#">Favorites</a>
                    </div>
                  </div>

                  <hr/>
                  <div className="row">
                    <div className="col-md-3">
                      <div className="card">
                        <div className="card-header p-0 mx-3 mt-3 position-relative z-index-1">
                          <a href="javascript:;" className="d-block">
                            <img src="/curved-10.jpg" className="img-fluid border-radius-lg"/>
                          </a>
                        </div>
                      
                        <div className="card-body pt-2">
                          <span className="text-gradient text-primary text-uppercase text-xs font-weight-bold my-2">House</span>
                          <a href="javascript:;" className="card-title h5 d-block text-darker">
                            Shared Coworking
                          </a>
                          <p className="card-description mb-4">
                            Use border utilities to quickly style the border and border-radius of an element. Great for images, buttons.
                          </p>
                          <div className="author align-items-center">
                            <img src="/curved-10.jpg" alt="..." className="avatar shadow"/>
                            <div className="name ps-3">
                              <span>Mathew Glock</span>
                              <div className="stats">
                                <small>Posted on 28 February</small>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>                  
                    </div>
                    <div className="col-md-3">
                      <div className="card">
                        <div className="card-header p-0 mx-3 mt-3 position-relative z-index-1">
                          <a href="javascript:;" className="d-block">
                            <img src="/curved-11.jpg" className="img-fluid border-radius-lg"/>
                          </a>
                        </div>
                      
                        <div className="card-body pt-2">
                          <span className="text-gradient text-primary text-uppercase text-xs font-weight-bold my-2">House</span>
                          <a href="javascript:;" className="card-title h5 d-block text-darker">
                            Shared Coworking
                          </a>
                          <p className="card-description mb-4">
                            Use border utilities to quickly style the border and border-radius of an element. Great for images, buttons.
                          </p>
                          <div className="author align-items-center">
                            <img src="/team-2.jpg" alt="..." className="avatar shadow"/>
                            <div className="name ps-3">
                              <span>Mathew Glock</span>
                              <div className="stats">
                                <small>Posted on 28 February</small>
                              </div>
                            </div>
                          </div>
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
    }

    export default Profile;

    export const getServerSideProps = requireAuthentication(context => {
      const { req, res } = context;
      const token = req.cookies.ethAddress;
      console.log(token);
      return {props: {}}
  })