import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2";
import "/GlobalVariable";
import {requireAuthentication} from "../requireAuthentication"
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { editUser, getUsers } from "../../redux/actions/userActions";
import axios from "axios";
import { Button } from "reactstrap";
import Link from "next/dist/client/link";


const DataProfile = () => {
    const dispatch = useDispatch();
    const allProfileData = useSelector((state) => state.Users);
    const { loading, error, user, bitSuccessEdit } = allProfileData;


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
      Profile_Baner:user.Profile_Baner,
      Profile_Image: user.Profile_Image,
      Bio: user.Bio,
      Twitter: user.Twitter,
      Instagram:user.Instagram,
      Website: user.Website,
      file:"",
      file_banner:"",
      file_profile:""
    });

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
        dispatch(
          editUser({
          intUserId: userEdit.intUserId,
          txtFullName: userEdit.txtFullName,
          txtEmail: userEdit.txtEmail,
          txtUsername:userEdit.txtUsername,
          txtPassword:userEdit.txtPassword,
          ethAddress:userEdit.ethAddress,
          NIK: userEdit.NIK,
          NIK_Photo: res.data.objData.KTP,
          Profile_Baner:res.data.objData.BannerImage,
          Profile_Image:res.data.objData.PPimage,
          Bio: userEdit.Bio,
          Twitter: userEdit.Twitter,
          Instagram:userEdit.Instagram,
          Website: userEdit.Website,
          txtCreatedBy: "user",
          dtmCreatedDate: "2022-06-05",
          txtUpdatedBy: "user",
          dtmUpdatedDate:"2022-06-05"
          }, Cookies.get('UserData'))
        );
      })
    };

    if(bitSuccessEdit == true){
      Swal.fire(
        "Berhasil Update Profile!",
        "Profile Berhasil di Update",
        "success"
      ).then(function() {
        bitSuccessEdit = null;
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
          Profile_Baner:"",
          Profile_Image:"",
          Bio: "",
          Twitter: "",
          Instagram:"",
          Website: ""
        });
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
                        onChange={handleFileKTP}
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
                        // maxLength="16"
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
                        name="Twitter" 
                        onChange={handleChangeEdit}
                        value={userEdit.Twitter}
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
                        value={userEdit.Instagram}
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
                        value={userEdit.Website}
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
                        value={userEdit.Bio}
                      />
                  </div>
                </div>
                
                <div className="row">
                    <div className="col-lg-6 text-end">
                      <div className="d-flex justify-content-between">
                        <Link href={{ pathname: '/Profile'}}>
                          <a className="btn bg-red mb-0">Cancel</a>
                        </Link>
                      </div>
                    </div>
                    <div className="col-lg-6 text-end">
                      <Button onClick={handleUpdate} color="primary" type="button">
                        Save changes
                      </Button>
                    </div>
                </div>
              </form>
            </div>
          </div>
        )
    }

    export default DataProfile;