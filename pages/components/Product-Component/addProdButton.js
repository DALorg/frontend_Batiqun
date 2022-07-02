import react from "react";
import { useMoralisFile } from "react-moralis";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { contractABI, contractAddress } from '../../../contract';
import Moralis from 'moralis';
import Cookies from 'js-cookie';
import { SellProduct } from "../../../redux/actions/productActions";
import Web3 from "web3";
import Swal from "sweetalert2";
import "../GlobalVariable";

const web3 = new Web3(Web3.givenProvider)

const AddProdButton = ({ profile }) => {

    const dispatch = useDispatch();
    const currentUser = Cookies.get("ethAddress");

      // EDIT AND CREATE PRODUCT
    const [userEdit, setUserEdit] = useState({
        intUserId: profile.intUserId,
        txtFullName: profile.txtFullName,
        txtEmail: profile.txtEmail,
        txtUsername: profile.txtUsername,
        txtPassword: profile.txtPassword,
        ethAddress: profile.ethAddress,
        txtCreatedBy: profile.txtCreatedBy,
        dtmCreatedDate: profile.dtmCreatedDate,
        txtUpdatedBy: profile.txtUpdatedBy,
        dtmUpdatedDate: profile.dtmUpdatedDate,
        NIK: "",
        NIK_Photo: "",
        file: "",
    });

    const handleChangeEdit = (e) => {
        let data = { ...userEdit };
        data[e.target.name] = e.target.value;
        setUserEdit(data);
      };

    const handleFile = (e) =>{
        let data = { ...userEdit };
        let file = e.target.files[0];
        data[e.target.name] = file;
    
        setUserEdit(data);
      };

    const ApproveMint =  (Prodlist) => {
    return async function (e){
    e.preventDefault();
    //UPLOAD IMAGE
    let file = userEdit.file;

    let formData = new FormData();

    formData.append('image', file);

    axios({
      url: global.apiurl + 'api/user/uploadfile',
      method: 'POST',
      data: formData  
    }).then((res)=>{
      console.log(res.data.objData);
          //SELESAI UPLOAD IMAGE
      dispatch(
        addProduct({
          intUserId: userEdit.intUserId,
          txtFullName: userEdit.txtFullName,
          txtEmail: userEdit.txtEmail,
          txtUsername: userEdit.txtUsername,
          txtPassword: userEdit.txtPassword,
          ethAddress: userEdit.ethAddress,
          txtCreatedBy: userEdit.txtCreatedBy,
          dtmCreatedDate: userEdit.dtmCreatedDate,
          txtUpdatedBy: userEdit.txtUpdatedBy,
          dtmUpdatedDate: userEdit.dtmUpdatedDate,
          NIK: userEdit.NIK,
          NIK_Photo: res.data.objData
        }, Cookies.get("UserData"))
      );
      Swal.fire({
        title: "Successfully Add New Product!",
        text: "Your Product will be reviewed by admins!",
        icon: "success",
        confirmButtonColor: '#9b6b43'
      }
      );
    })
        }
    }
        
      

  return (
    <>
    {!profile.NIK && !profile.NIK_Photo && profile.txtRoleName != global.superadmin || profile.txtRoleName != global.admin ?
     <a className="btn bg-dark text-white mb-0" data-bs-toggle="modal" data-bs-target="#modal-form"><i class="fa-solid fa-plus"></i>&nbsp;&nbsp;Add Product</a> 
    : <a className="btn bg-dark text-white mb-0" href="/Product/SaveProduct"><i class="fa-solid fa-plus"></i>&nbsp;&nbsp;Add Product</a> 
    }
    
    <div className="modal fade" id="modal-form" tabindex="-1" role="dialog" aria-labelledby="modal-form" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-md" role="document">
        <div className="modal-content">
          <div className="modal-body p-0">
            <div className="card card-plain">
              <div className="card-header pb-0 text-center">
                <h3 className="font-weight-bolder text-info text-gradient">Add Product</h3>
                <p className="mb-0">Please verify that you are an Indonesian citizen</p>
              </div>
              <div className="card-body text-left">
                <form role="form">
                  <label>KTP Photo</label>
                  <div className="input-group mb-3">
                  <input type="file" className="form-control" name="file" onChange={handleFile} />
                  </div>
                  <label>NIK</label>
                  <div className="input-group mb-3">
                  <input type="text" className="form-control" name="NIK" onChange={handleChangeEdit} />
                  </div>
                  <div className="text-center">
                    <button onClick={ApproveMint(profile)} type="button" className="btn btn-round bg-primary text-white btn-lg w-100 mt-4 mb-0">Sell Now!</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default AddProdButton;
