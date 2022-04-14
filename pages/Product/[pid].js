import React, { useEffect, useState, setState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getById,
} from "../../redux/actions/productActions";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPen,
  faWindowClose,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { useRouter } from 'next/router'
import axios from "axios";
import "../components/GlobalVariable"


const ProductDetail = () => {
    const dispatch = useDispatch();
    const allProductsData = useSelector((state) => state.Products);
    const { loading, error, product } = allProductsData;

    const router = useRouter();
    const {pid}  = router.query;

    useEffect(() => {
        dispatch(getById(pid));
      }, []);


  return (
        <div className="container-fluid py-4">    
        <title>Product</title>  
        <link rel="icon" href="/icon.png" />

        <div className="row">
        <div className="col-md-4">
            <div className="card">
            <img className="card-img" src={global.apiurl + "Data/" + product.Product_image} />
            </div>
        </div>
        <div className="col-md-8">
            <div className="card">
            <div className="card-header pb-0">
                <div className="d-flex align-items-center">
                <p className="mb-0">Edit Profile</p>
                <button className="btn btn-primary btn-sm ms-auto">Settings</button>
                </div>
            </div>
            <div className="card-body">
                <p className="text-uppercase text-sm">User Information</p>
                <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                    <label for="example-text-input" className="form-control-label">Username</label>
                    <input className="form-control" type="text" value="lucky.jesse"/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                    <label for="example-text-input" className="form-control-label">Email address</label>
                    <input className="form-control" type="email" value="jesse@example.com"/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                    <label for="example-text-input" className="form-control-label">First name</label>
                    <input className="form-control" type="text" value="Jesse"/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                    <label for="example-text-input" className="form-control-label">Last name</label>
                    <input className="form-control" type="text" value="Lucky"/>
                    </div>
                </div>
                </div>
                <hr className="horizontal dark"/>
                <p className="text-uppercase text-sm">Contact Information</p>
                <div className="row">
                <div className="col-md-12">
                    <div className="form-group">
                    <label for="example-text-input" className="form-control-label">Address</label>
                    <input className="form-control" type="text" value="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"/>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="form-group">
                    <label for="example-text-input" className="form-control-label">City</label>
                    <input className="form-control" type="text" value="New York"/>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="form-group">
                    <label for="example-text-input" className="form-control-label">Country</label>
                    <input className="form-control" type="text" value="United States"/>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="form-group">
                    <label for="example-text-input" className="form-control-label">Postal code</label>
                    <input className="form-control" type="text" value="437300"/>
                    </div>
                </div>
                </div>
                <hr className="horizontal dark"/>
                <p className="text-uppercase text-sm">About me</p>
                <div className="row">
                <div className="col-md-12">
                    <div className="form-group">
                    <label for="example-text-input" className="form-control-label">About me</label>
                    <input className="form-control" type="text" value="A beautiful Dashboard for Bootstrap 5. It is Free and Open Source."/>
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
