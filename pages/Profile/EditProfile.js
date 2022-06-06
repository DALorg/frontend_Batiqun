import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2";
import "../components/GlobalVariable";
import {requireAuthentication} from "../requireAuthentication"
import Navsidebar from "../components/Navsidebar";
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { editUser, getUsers } from "../../redux/actions/userActions";
import axios from "axios";
import Head from "next/head";
import { Button } from "reactstrap";
import LoadingSwal from "../components/LoadingSwal";

const EditProfile = () => {
    const dispatch = useDispatch();
    const allProfileData = useSelector((state) => state.Users);
    const { loading, error, user, bitSuccessEdit } = allProfileData;

    const handleChangeEdit = (e) => {
      let data = { ...userEdit};
      data[e.target.name] = e.target.value;
      setUserEdit(data);
    };

    const handleFile = (e) => {
      let data = { ...userEdit };
      let file = e.target.files[0];
      data[e.target.name] = file;

      setUserEdit(data);
    };

    useEffect(() => {
      dispatch(getUsers(Cookies.get('ethAddress'), Cookies.get('UserData')));
    }, []);

    const [userEdit, setUserEdit] = useState({
      intUserId: user.encUserId,
      txtFullName: user.txtFullName,
      txtEmail: user.txtEmail,
      txtUsername:user.txtUsername,
      txtPassword:user.txtPassword,
      ethAddress:user.ethAddress,
      txtCreatedBy: "user",
      dtmCreatedDate: "2022-06-05",
      txtUpdatedBy: "user",
      dtmUpdatedDate:"2022-06-05",
      NIK:user.NIK,
      NIK_Photo:user.NIK_Photo,
      file:"",
    });

    const handleUpdate = (e) => {
      e.preventDefault();
      Swal.fire({
        title: 'Loading, Please Wait!',
        html: 'I will close in <b></b> milliseconds.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading()
        }
      });
      let file = userEdit.file;
      let formData = new FormData();
      formData.append('image', file);

      axios({
        url: global.apiurl + 'api/user/uploadfile',
        method: 'POST',
        data: formData
      }).then((res)=>{
        console.log(res.data.objData);

        dispatch(
          editUser({
          intUserId: userEdit.intUserId,
          txtFullName: userEdit.txtFullName,
          txtEmail: userEdit.txtEmail,
          txtUsername:userEdit.txtUsername,
          txtPassword:userEdit.txtPassword,
          ethAddress:userEdit.ethAddress,
          txtCreatedBy: "user",
          dtmCreatedDate: "2022-06-05",
          txtUpdatedBy: "user",
          dtmUpdatedDate:"2022-06-05",
          NIK: parseInt(userEdit.NIK),
          NIK_Photo:res.data.objData,
          }, Cookies.get('UserData'))
        );
      })

      setUserEdit({
        intUserId: "",
        txtFullName: "",
        txtEmail: "",
        txtPassword: "",
        ethAddress:Cookies.get('ethAddress'),
        txtCreatedBy:"user",
        dtmCreatedDate:"2022-06-05",
        txtUpdatedBy: "user",
        dtmUpdatedDate:"2022-06-05",
        NIK:"",
        NIK_Photo:"",
        // TokenID: Cookies.get('ethAddress'),
      });
    };

    if(bitSuccessEdit == true){
      Swal.fire(
        "Berhasil Update Profile!",
        "Profile Berhasil di Update",
        "success"
      ).then(function() {
        bitSuccessEdit = null;
    });
    }else if(bitSuccessEdit == false){
        Swal.fire(
          "Oops...",
          "Something went wrong!",
          "error"
        ).then(function() {
          bitSuccessEdit = null;
      });
    }

    return (
    <>
          <Head>
            <title>Edit Profile</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
      <body className="g-sidenav-show bg-gray-100">
      <div className="min-height-300 bg-primary position-absolute w-100"></div>
      <Navsidebar/>
      <main className="main-content position-relative border-radius-lg">
      <div className="container-fluid py-1"> 
      <div className="row">
        <div className="col-lg-4">
        <div className="card mt-3">
            <div className="card-header">
              <div className="row align-items-center">
                <div className="col-8">
                  <h3 className="mb-0">Edit profile picture</h3>
                </div>
                
              </div>
            </div>
            <div className="card-body text-center">
                  <img src="/curved11.jpg" alt="profile_pict" className="rounded-circle edit"/>
                  <input type="file" accept="image/*" name="image-upload" id="input" className="upload_pict"
                  // onChange={this.imageHandler} 
                  />
                  <div className="label">
                  <label className="image-upload" htmlFor="input">
                    <i className="material-icons">add_a_photo</i> &nbsp;
                    Choose profile picture
                  </label>
                  </div>
            </div>
            </div>
            <div className="card mt-3">
            <div className="card-header">
              <div className="row align-items-center">
                <div className="col-8">
                  <h3 className="mb-0">Edit Banner picture</h3>
                </div>
                
              </div>
            </div>
              <div className="card-profile">
                <img src="/header.jpg" alt="bannerPict" className="card-img-top" />
                <input type="file" accept="image/*" name="image-upload" className="upload_pict"
                // onChange={}
                />
                <div className="label1">
                  <label className="image-upload" htmlFor="input">
                    <i className="material-icons">add_a_photo</i>
                    Choose profile picture
                  </label>
                  </div>
              </div>
            </div>
        </div>

        <div className="col-lg-8">
          <div className="card mt-3">
            <div className="card-header">
              <div className="row align-items-center">
                <div className="col-8">
                  <h3 className="mb-0">Edit profile </h3>
                </div>
                
              </div>
            </div>

            <div className="card-body">
              <form>
                <h6 className="heading-small text-muted mb-4">User information</h6>
                <div className="pl-lg-4">
                    
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form-group">
                      <label className="form-control-label" for="input-full-name">Fullname</label>
                        <input
                        type="input"
                        className="form-control"
                        placeholder= "enter your name"
                        name="txtFullName" required
                        onChange={handleChangeEdit}
                        value={userEdit.txtFullName}
                      />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label className="form-control-label" for="input-email">Email Address</label>
                        <input
                        type="email"
                        className="form-control"
                        placeholder="enter your email"
                        name="txtEmail" required
                        onChange={handleChangeEdit}
                        value={userEdit.txtEmail}
                      />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label className="form-control-label" for="input-Password">Password</label>
                        <input
                        type="password"
                        className="form-control"
                        placeholder="enter password"
                        name="txtPassword" required
                        onChange={handleChangeEdit}
                        value={userEdit.txtPassword}
                      />
                      </div>
                    </div> 
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label className="form-control-label" 
                        for="input-tokenID">Eth Address</label>
                        <input
                        type="input"
                        className="form-control"
                        name="ethAddress"
                        onChange={handleChangeEdit}
                        value={userEdit.ethAddress}
                        disabled
                      />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label className="form-control-label" 
                        for="input-KTP">Upload KTP</label>
                        <input
                        type="file"
                        className="form-control"
                        placeholder="choose file"
                        name="file"
                        onChange={handleFile}
                        required
                      />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label className="form-control-label" for="input-NIK">NIK/Induk kependudukan</label>
                        <input
                        type="number"
                        className="form-control"
                        placeholder="enter your id number"
                        name="NIK" required
                        // minLength="16" 
                        onChange={handleChangeEdit}
                        value={userEdit.NIK}
                      />
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="my-4" />
                {/* <!-- Address --> */}
                <h6 className="heading-small text-muted mb-4">Contact information</h6>
                <div className="pl-lg-4">
                  
                  <div className="row">
                    <div className="col-lg-4">
                      <div className="form-group">
                        <label className="form-control-label" for="input-twitter">Twitter</label>
                        <input
                        type="input"
                        className="form-control"
                        placeholder="@example"
                        name="twitter" 
                        // onChange={handleChangeEdit}
                        value={user.Twitter}
                      />
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="form-group">
                        <label className="form-control-label" for="input-instagram">Instagram</label>
                        <input
                        type="input"
                        className="form-control"
                        placeholder="@example"
                        name="instagram"
                        // onChange={handleChangeEdit}
                        value={user.Instagram}
                      />
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="form-group">
                        <label className="form-control-label" for="input-website">Website</label>
                        <input
                        type="input"
                        className="form-control"
                        placeholder="www@example.id"
                        name="website"
                        // onChange={handleChangeEdit}
                        value={user.Website}
                      />
                      </div>
                    </div>
                  </div>
                </div>
                {/* <hr className="my-4" />
                <h6 className="heading-small text-muted mb-4">About me</h6> */}
                <div className="pl-lg-4">
                  <div className="form-group">
                    <label className="form-control-label">About me</label>
                    <textarea
                        type="input"
                        className="form-control"
                        placeholder="write about you"
                        name="bio" required
                        // onChange={handleChangeEdit}
                        value={userEdit.Bio}
                      />
                  </div>
                </div>
                
                <Button onClick={handleUpdate} color="primary" type="button">
                    Save changes
                </Button>

              </form>
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

    export default EditProfile;

    export const getServerSideProps = requireAuthentication(context => {
      return {props: {}}
  })