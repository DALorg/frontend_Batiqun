import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from "react-redux";
import { requireAuthenticationAdmin } from "../../requireAuthenticationAdmin";
import Cookies from 'js-cookie';
import {
  getProducts,
  deleteProduct,
  addProduct,
} from "../../../redux/actions/productActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPen,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Modal, ModalBody, ModalFooter, Button } from 'reactstrap';
import Swal from "sweetalert2";
import axios from "axios";
import "../../components/GlobalVariable"
import { Table } from "reactstrap";
import Navsidebar from "../../components/Navsidebar";

const AddProducts = () => {
  const dispatch = useDispatch();

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

  const router = useRouter()

  // EDIT AND CREATE PRODUCT
  const [userEdit, setUserEdit] = useState({
    ProductId: "7Tk$K9N2nJIPW1BkBiCjpA__",
    Nama_Product: "",
    TokenID: Cookies.get('ethAddress'),
    Product_image: "",
    intFavorites: 0,
    bitApprove: "",
    Harga: 0,
    file: "",
  });

  const handleUpdate = (e) => {
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
          ProductId: userEdit.ProductId,
          Nama_Product: userEdit.Nama_Product,
          TokenID: userEdit.TokenID,
          Product_image: res.data.objData,
          intFavorites: userEdit.intFavorites,
          bitApprove: userEdit.bitApprove,
          Harga: userEdit.Harga,
        }, Cookies.get("UserData"))
      );
      Swal.fire(
        "Berhasil Menambah Produk!",
        "Product " + userEdit.Nama_Product + " Berhasil di Tambahkan!",
        "success"
      );
    })


    setUserEdit({
      ProductId: "",
      Nama_Product: "",
      TokenID: "",
      Product_image: "",
      intFavorites: "",
      bitApprove: "",
      Harga: "",
    });
  };

  return (
    <div className="container-fluid py-4">
    <title>Add Product</title>
    <meta name="description" content="Generated by create next app" />
    <link rel="icon" href={global.icon} />
    <Navsidebar/>

    <div className="col-xl-8 order-xl-1">
      <div className="card">
        <div className="card-header">
          <div className="row align-items-center">
            <div className="col-8">
              <h3 className="mb-0">Add Product </h3>
            </div>
          </div>
        </div>
        <div className="card-body">
          <form>
            {/* <h6 className="heading-small text-muted mb-4">User information</h6> */}
            <div className="pl-lg-4">
            <div className="row">
                <div className="col-lg-6">
                  <div className="form-group">
                  <label for="example-text-input" className="form-control-label">Id</label>
                    <input
                              type="input"
                              className="form-control"
                              placeholder="Title"
                              name="id"
                              value={userEdit.ProductId}
                              disabled
                            />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                  <label for="example-text-input" className="form-control-label">Files</label>
                    <input
                              type="file"
                              className="form-control"
                              name="file"
                              onChange={handleFile}
                            />
                  </div>
                </div>
            </div>
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group">
                  <label for="example-text-input" className="form-control-label">Nama Product</label>
                    <input
                        type="input"
                        className="form-control"
                        placeholder="Nama Product"
                        name="Nama_Product"
                        onChange={handleChangeEdit}
                        value={userEdit.Nama_Product}
                      />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                  <label for="example-text-input" className="form-control-label">TokenID</label>
                    <input
                        type="input"
                        className="form-control"
                        placeholder="TokenID"
                        name="TokenID"
                        onChange={handleChangeEdit}
                        value={userEdit.TokenID}
                        disabled
                      />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                  <label for="example-text-input" className="form-control-label">Price</label>
                  <div class="input-group input-group-alternative mb-4">
                        <input class="form-control" 
                        placeholder="Price" 
                        name="Harga"
                        type="number"
                        onChange={handleChangeEdit}
                        value={userEdit.Harga}/>
                        <span class="input-group-text"><i class="fa-brands fa-ethereum"></i></span>
                    </div>
                  </div>
                </div>
              </div> 
            </div>
            
            <hr className="my-4" />
            {/* <!-- Description --> */}
            <div className="pl-lg-4">
              <div className="form-group">
                <label className="form-control-label">Bio</label>
                <textarea maxLength="100"
                    type="input"
                    className="form-control"
                    placeholder="Tell your description!"
                    name="bio"
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
    );
};

export default AddProducts;

export const getServerSideProps = requireAuthenticationAdmin(context => {
  return {props: {}}
})