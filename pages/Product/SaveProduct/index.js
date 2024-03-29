import React, { useState } from "react";
import { useRouter } from 'next/router'
import { useDispatch } from "react-redux";
import { requireAuthenticationAdmin } from "../../requireAuthenticationAdmin";
import Cookies from 'js-cookie';
import { useSelector } from "react-redux";
import {
  addProduct,
} from "../../../redux/actions/productActions";
import { Button } from 'reactstrap';
import Swal from "sweetalert2";
import axios from "axios";
import "../../components/GlobalVariable"
import { Table } from "reactstrap";
import Navsidebar from "../../components/Navsidebar";
import Head from "next/dist/shared/lib/head";
import Link from "next/dist/client/link";


const AddProducts = () => {
  const dispatch = useDispatch();
  const allProductsData = useSelector((state) => state.Products);
  const { bitSuccessEdit } = allProductsData;

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
    ethAddress: Cookies.get('ethAddress'),
    mintedAddress: Cookies.get('ethAddress'),
    TokenID: "",
    Product_image: "",
    intFavorites: 0,
    bitApprove: "",
    Harga: 0,
    Description: "",
    file: "",
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
    //UPLOAD IMAGE
    let file = userEdit.file;
    let formData = new FormData();
    formData.append('Product', file);

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
          ethAddress: userEdit.ethAddress,
          mintedAddress: userEdit.mintedAddress,
          TokenID: userEdit.TokenID,
          Product_image: res.data.objData.ProductImage,
          intFavorites: userEdit.intFavorites,
          bitApprove: userEdit.bitApprove,
          Harga: null,
          Description: userEdit.Description
        }, Cookies.get("UserData"))
      )
    });

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

  if(bitSuccessEdit == true){
    Swal.fire(
      "Berhasil Menambahkan Product!",
      "Product Berhasil di tambahkan",
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
      <title>Add Product</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <body className="g-sidenav-show bg-gray-100">
    <div className="min-height-300 bg-primary position-absolute w-100"></div>
    <Navsidebar/>
    <main className="main-content position-relative border-radius-lg">
    <div className="container-fluid py-1">
    <div className="col-xl-8 order-xl-1">
      <div className="card mt-3">
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
                  <label for="example-text-input" 
                  className="form-control-label">Id</label>
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
                  <label for="example-text-input" 
                  className="form-control-label">Files</label>
                    <input
                              type="file"
                              className="form-control"
                              name="file"
                              onChange={handleFile}
                              required
                            />
                  </div>
                </div>
            </div>
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group">
                  <label for="example-text-input" 
                  className="form-control-label">Nama Product</label>
                    <input
                        type="input"
                        className="form-control"
                        placeholder="Nama Product"
                        name="Nama_Product" required
                        onChange={handleChangeEdit}
                        value={userEdit.Nama_Product}
                      />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                  <label for="example-text-input" className="form-control-label">Eth Address</label>
                    <input
                        type="input"
                        className="form-control"
                        placeholder="ethAddress"
                        name="ethAddress"
                        onChange={handleChangeEdit}
                        value={userEdit.ethAddress}
                        disabled
                      />
                  </div>
                </div>
              </div> 
            </div>
            
            <hr className="my-4" />
            {/* <!-- Description --> */}
            <div className="pl-lg-4">
              <div className="form-group">
                <label className="form-control-label">Description</label>
                <textarea maxLength="100"
                    type="input"
                    className="form-control"
                    placeholder="Tell your product description!"
                    name="Description" required
                    onChange={handleChangeEdit}
                    value={userEdit.Description}
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
                    <Button onClick={handleUpdate} className="btn bg-button mb-0" type="button">
                        Save changes
                    </Button>
                    </div>
                </div>
            
          </form>
        </div>
        </div>
        </div>
      </div>
      </main>
      </body>
      </>
    );
};

export default AddProducts;

export const getServerSideProps = requireAuthenticationAdmin(context => {
  return {props: {}}
})
