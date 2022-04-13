import React, { useEffect, useState, setState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  deleteProduct,
  saveProduct,
} from "../redux/actions/productActions";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPen,
  faWindowClose,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Modal, ModalBody, ModalFooter, Button } from 'reactstrap';
import EditProduct from "react-modal";
import Swal from "sweetalert2";
import axios from "axios";
import "./components/GlobalVariable"

(Modal, EditProduct).setAppElement();


const ProductDetail = (data) => {
  const dispatch = useDispatch();
  console.log(data);
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

  // EDIT AND CREATE PRODUCT
  const [userEdit, setUserEdit] = useState({
    ProductId: "",
    Nama_Product: "",
    TokenID: "",
    Product_image: "",
    intFavorites: "",
    bitApprove: "",
    Harga: "",
    file: "",
  });

  const handleEdit = (product) => {
    debugger;
    if(product != null){
    setUserEdit({
        ProductId: product.encProductId,
        Nama_Product: product.Nama_Product,
        TokenID: product.TokenID,
        Product_image: product.Product_image,
        intFavorites: product.intFavorites,
        bitApprove: product.bitApprove,
        Harga: product.Harga,
    })}else{
      setUserEdit({
        ProductId: "7Tk$K9N2nJIPW1BkBiCjpA__",
        Nama_Product: "",
        TokenID: "",
        Product_image: "11.png",
        intFavorites: 0,
        bitApprove: null,
        Harga: "",
    })
    };
  };

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
        saveProduct({
          ProductId: userEdit.ProductId,
          Nama_Product: userEdit.Nama_Product,
          TokenID: userEdit.TokenID,
          Product_image: res.data.objData,
          intFavorites: userEdit.intFavorites,
          bitApprove: userEdit.bitApprove,
          Harga: userEdit.Harga,
        })
      );
      Swal.fire(
        "Berhasil Update Produk!",
        "Product " + userEdit.Nama_Product + " Berhasil di Update!",
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
        <div class="container-fluid py-4">
        <div class="row">
        <div class="col-md-4">
            <div class="card">
            <img src="../assets/img/slide-01.jpg" alt="Image placeholder" class="card-img"/>
            </div>
        </div>
        <div class="col-md-8">
            <div class="card">
            <div class="card-header pb-0">
                <div class="d-flex align-items-center">
                <p class="mb-0">Edit Profile</p>
                <button class="btn btn-primary btn-sm ms-auto">Settings</button>
                </div>
            </div>
            <div class="card-body">
                <p class="text-uppercase text-sm">User Information</p>
                <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                    <label for="example-text-input" class="form-control-label">Username</label>
                    <input class="form-control" type="text" value="lucky.jesse"/>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                    <label for="example-text-input" class="form-control-label">Email address</label>
                    <input class="form-control" type="email" value="jesse@example.com"/>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                    <label for="example-text-input" class="form-control-label">First name</label>
                    <input class="form-control" type="text" value="Jesse"/>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                    <label for="example-text-input" class="form-control-label">Last name</label>
                    <input class="form-control" type="text" value="Lucky"/>
                    </div>
                </div>
                </div>
                <hr class="horizontal dark"/>
                <p class="text-uppercase text-sm">Contact Information</p>
                <div class="row">
                <div class="col-md-12">
                    <div class="form-group">
                    <label for="example-text-input" class="form-control-label">Address</label>
                    <input class="form-control" type="text" value="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"/>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                    <label for="example-text-input" class="form-control-label">City</label>
                    <input class="form-control" type="text" value="New York"/>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                    <label for="example-text-input" class="form-control-label">Country</label>
                    <input class="form-control" type="text" value="United States"/>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                    <label for="example-text-input" class="form-control-label">Postal code</label>
                    <input class="form-control" type="text" value="437300"/>
                    </div>
                </div>
                </div>
                <hr class="horizontal dark"/>
                <p class="text-uppercase text-sm">About me</p>
                <div class="row">
                <div class="col-md-12">
                    <div class="form-group">
                    <label for="example-text-input" class="form-control-label">About me</label>
                    <input class="form-control" type="text" value="A beautiful Dashboard for Bootstrap 5. It is Free and Open Source."/>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>  
  );
};

export default ProductDetail;
