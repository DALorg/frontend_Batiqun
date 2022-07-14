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
import Link from "next/dist/client/link";
import LoadingSwal from "../components/LoadingSwal";

const EditProfile = () => {
    const dispatch = useDispatch();
    const allProfileData = useSelector((state) => state.Users);
    const { loading, error, user, bitSuccessEdit } = allProfileData;

    useEffect(() => {
      dispatch(getUsers(Cookies.get('ethAddress'), Cookies.get('UserData')));
    }, []);

    const [userEdit, setUserEdit] = useState({
      txtFullName: user.txtFullName,
      txtEmail: user.txtEmail,
      txtPassword: user.txtPassword,
      txtCreatedBy: "user",
      dtmCreatedDate: "2022-06-05",
      txtUpdatedBy: "user",
      dtmUpdatedDate:"2022-06-05",
      NIK:user.NIK,
      Bio: user.Bio,
      Twitter: user.Twitter,
      Instagram:user.Instagram,
      Website: user.Website,
      file:null,
      file_banner:null,
      file_profile:null
    });

    console.log(userEdit);

    const router = useRouter()
    const {errors}  = router.query;

    if(errors==405){
      Swal.fire({
        title: "Are you form Indonesian?",
        text: "Input and Upload your ID",
        icon: "warning",
        confirmButtonColor: '#9b6b43'
      });
    }

    const handleChangeEdit = (e) => {
      let data = { ...userEdit};
      data[e.target.name] = e.target.value;
      setUserEdit(data);
    };

    const handleFileKTP = (e) => {
      let data = { ...userEdit };
      let file = e.target.files[0];
      var extension = file.type;
      var extension_value= extension.replace("image/", ".");
      var blob = file.slice(0, file.size, extension); 
      let newFile = new File([blob], 'KTP' + extension_value, {type: extension});
      data[e.target.name] = newFile;

      setUserEdit(data);
    };

    const handleFilePP = (e) => {
      let data = { ...userEdit };
      let file = e.target.files[0];
      var extension = file.type;
      var extension_value= extension.replace("image/", ".");
      var blob = file.slice(0, file.size, extension); 
      let newFile = new File([blob], 'PP' + extension_value, {type: extension});
      data[e.target.name] = newFile;

      setUserEdit(data);
    };

    const handleFileBanner = (e) => {
      let data = { ...userEdit };
      let file = e.target.files[0];
      var extension = file.type;
      var extension_value= extension.replace("image/", ".");
      var blob = file.slice(0, file.size, extension); 
      let newFile = new File([blob], 'Banner' + extension_value, {type: extension});
      data[e.target.name] = newFile;

      setUserEdit(data);
    };


    const handleUpdate = (e) => {
      e.preventDefault();
      Swal.fire({
        title: 'Loading, Please Wait!',
        html: 'I will close in milliseconds.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading()
        }
      });
      let file = userEdit.file;
      let formData = new FormData();
      formData.append('KTP', file);
      formData.append('PP', userEdit.file_profile);
      formData.append('Banner', userEdit.file_banner);

      axios({
        url: global.apiurl + 'api/user/uploadfile',
        method: 'POST',
        data: formData
      }).then((res)=>{
        var NIKS = userEdit.NIK;
        var Fulname = userEdit.txtFullName;
        var mails = userEdit.txtEmail;
        var NIK_phot = userEdit.file;
        var ppss = userEdit.file_profile;
        var banne = userEdit.file_banner;
        var bias = userEdit.Bio;
        var twtr = userEdit.Twitter;
        var we3 = userEdit.Website;
        var insta = userEdit.Instagram;
        var pws=userEdit.txtPassword;
        if(NIK_phot == null) {
          NIK_phot = user.NIK_Photo
        }
        if(NIKS == null){
          NIKS = user.NIK
        }
        if(Fulname == null){
          Fulname = user.txtFullName
        }
        if(mails == null){
          mails = user.txtEmail
        }
        if(pws == null){
          pws = user.txtPassword
        }
        if(twtr == null){
          twtr = user.Twitter
        }
        if(bias == null){
          bias = user.Bio
        }
        if(insta == null){
          insta = user.Instagram
        }
        if(we3 == null){
          we3 = user.Website
        }
        if(NIK_phot == null){
          NIK_phot == user.NIK_Photo
        }else{
          NIK_phot = res.data.objData.KTP
        }
        if(ppss==null){
          ppss=user.Profile_Image
        }else{
          ppss=res.data.objData.PPimage
        }
        if(banne==null){
          banne=user.Profile_Baner
        }else{
          banne=res.data.objData.BannerImage
        }
        dispatch(
          editUser({
          intUserId: user.encUserId,
          txtFullName: Fulname,
          txtEmail: mails,
          txtUsername:user.txtUsername,
          txtPassword:pws,
          ethAddress: user.ethAddress,
          NIK: NIKS,
          NIK_Photo: NIK_phot,
          Profile_Baner:banne,
          Profile_Image:ppss,
          Bio: bias,
          Twitter: twtr,
          Instagram:insta,
          Website: we3,
          txtCreatedBy: "user",
          dtmCreatedDate: "2022-06-05",
          txtUpdatedBy: "user",
          dtmUpdatedDate:"2022-06-05"
          }, Cookies.get('UserData'))
        );
      })
    };

    if(bitSuccessEdit == true){
      Swal.fire({
      title:"Successfully updated!",
      text:"Profile has been updated",
      icon:"success",
      confirmButtonColor: '#9b6b43'
      }).then(function() {
        bitSuccessEdit = null;
    });
    }else if(bitSuccessEdit == false){
        Swal.fire({
        title:"Oops...",
        text:"Something went wrong!",
        icon:"error",
        confirmButtonColor: '#9b6b43'
        }).then(function() {
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
                  <h4 className="mb-0">Edit profile picture</h4>
                </div>
              </div>
            </div>
            <div className="card-body text-center">
                <img src=
                 {user.Profile_Image == null ?
                  "https://t4.ftcdn.net/jpg/01/18/03/35/360_F_118033506_uMrhnrjBWBxVE9sYGTgBht8S5liVnIeY.jpg"
                    : global.apiurl + "Data/" + user.Profile_Image }

                  alt="profile_pict" className="rounded-circle edit"/>
                  <input type="file" accept="image/*" name="file_profile" 
                  id="input" className="form-control-label" 
                  onChange={handleFilePP} style={{display: 'none'}} 
                  />
                  <label className="image-upload" htmlFor="input">
                    <i className="material-icons">add_a_photo</i> &nbsp;
                    Choose profile picture
                  </label>
            </div>
            </div>


            <div className="card mt-3">
            <div className="card-header">
              <div className="row align-items-center">
                <div className="col-8">
                  <h4 className="mb-0">Edit Banner picture</h4>
                </div>
              </div>
            </div>
              <div className="card-profile">
                <img src=
                {user.Profile_Baner == null ?
                  "https://img.freepik.com/free-photo/black-wall-texture-background-banner-blank-dark-gradient-studio-room-chalkboard_28629-594.jpg"                   
                  :  global.apiurl + "Data/" + user.Profile_Baner}

                alt="bannerPict" className="card-img-top" />
                <input type="file" accept="image/*" name="file_banner" 
                id="input2" className="form-control-label"
                onChange={handleFileBanner} style={{display: "none"}}
                />
                  <label className="image-upload label1" htmlFor="input2">
                    <i className="material-icons">add_a_photo</i>
                    &nbsp; Choose Banner
                  </label>
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
                        value={user.txtFullName}
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
                        value={user.txtEmail}
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
                        value={user.txtPassword}
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
                        value={user.ethAddress}
                        disabled
                      />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label className="form-control-label" 
                        for="input-KTP">Upload ID Card</label>
                        <input
                        type="file"
                        className="form-control"
                        placeholder="Upload your Identity Card"
                        name="file"
                        onChange={handleFileKTP}
                        required
                      />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label className="form-control-label" for="input-NIK">ID Number</label>
                        <input
                        type="number"
                        className="form-control"
                        placeholder="enter your ID number"
                        name="NIK" required
                        minLength="16" 
                        maxLength="16"
                        onChange={handleChangeEdit}
                        value={user.NIK}
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
                        name="Twitter" 
                        onChange={handleChangeEdit}
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
                        name="Instagram"
                        onChange={handleChangeEdit}
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
                        placeholder="www.example.id"
                        name="Website"
                        onChange={handleChangeEdit}
                        value={user.Website}
                      />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pl-lg-4">
                  <div className="form-group">
                    <label className="form-control-label">About me</label>
                    <textarea
                        type="input"
                        className="form-control"
                        placeholder="write about you"
                        name="Bio" required
                        onChange={handleChangeEdit}
                        value={user.Bio}
                      />
                  </div>
                </div>
                
                <div className="row">
                    <div className="col-lg-6 text-end">
                      <div className="d-flex justify-content-between">
                        <Link href={{ pathname: '/Profile'}}>
                          <a className="btn bg-cancel mb-0">Cancel</a>
                        </Link>
                      </div>
                    </div>
                    <div className="col-lg-6 text-end">
                      <button onClick={handleUpdate} className="btn bg-button mb-0" type="button">
                        Save changes
                      </button>
                    </div>
                </div>
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