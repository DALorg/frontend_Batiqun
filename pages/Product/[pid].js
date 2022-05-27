import React, { useEffect, useState, setState } from "react";
import {requireAuthentication} from "../requireAuthentication"
import { useDispatch, useSelector } from "react-redux";
import { getById } from "../../redux/actions/productActions";
import Swal from "sweetalert2";
import { useRouter } from 'next/router'
import "../components/GlobalVariable"
import Navsidebar from "../components/Navsidebar";
import Navbarz from "../components/navbars";
import Link from "next/dist/client/link";
import { useMoralisFile, useWeb3Transfer } from "react-moralis";
import Cookies from 'js-cookie';
import TransferButton from "../components/Product-Component/TransferButton";
import IC_Table from "../components/Product-Component/ItemActivities";
import BuyButton from "../components/Product-Component/BuyButton";
import MintButton from "../components/Product-Component/MintButton";
import TransferAfterBuyButton from "../components/Product-Component/TransferAfterBuy";
import SellButton from "../components/Product-Component/SellButton";

const ProductDetail = () => {
    const dispatch = useDispatch();
    const allProductsData = useSelector((state) => state.Products);
    const { loading,error, product } = allProductsData;

    const router = useRouter();
    const {pid}  = router.query;

    useEffect(() => {
        dispatch(getById(pid));
      }, []);

      const ProductethAddress = product.ethAddress;

      const currentUser = Cookies.get("ethAddress");

  return (
      <>
    <body className="g-sidenav-show   bg-gray-100">
    <div className="min-height-300 bg-primary position-absolute w-100"></div>
    <Navsidebar></Navsidebar>
    <main className="main-content position-relative border-radius-lg ">
        <Navbarz LastPage="Product" CurrentPage="Product Detail"></Navbarz>
        <div className="container-fluid py-1 px-3">    
        <title>Product</title>  
        <link rel="icon" href={global.icon} />
        <div className="row">
        <div className="col-md-4">
            <div className="card">
            <img className="card-img" src={global.apiurl + "Data/" + product.Product_image} width="100%"/>
            </div>
        </div>
        <div className="col-md-8">
            <div className="card">
            <div className="card-header pb-0">
            <div className="row">
                <div className="col-6 d-flex align-items-center">
                  <h6 className="mb-0">Product Detail</h6>
                </div>
                <div className="col-6 text-end">
                  {product.bitApprove == true && currentUser == product.ethAddress && product.bitMintedStatus == false ? 
                  <MintButton product={product}/>
                  : null}
                  &nbsp;
                  {product.TokenID != null && product.bitMintedStatus == true && product.txtStatus != "Bought" && product.txtStatus != "Selling" 
                  && currentUser == product.ethAddress  ? 
                  <SellButton product={product}/>
                  : null}
                  &nbsp;
                  {product.TokenID != null && product.bitMintedStatus == true && product.txtStatus != "Bought"  
                  && currentUser == product.ethAddress? 
                  <TransferButton ProductData={product}/>
                  : null}
                  &nbsp;
                  {product.TokenID != null && product.bitMintedStatus == true && product.txtStatus == "Selling"  ? 
                  <BuyButton product={product} />
                  : null}
                  &nbsp;
                  {product.txtStatus == "Bought" && currentUser == product.ethAddress ? 
                  <TransferAfterBuyButton ProductData={product} />
                  : null}
                </div>
                </div>
            </div>
            <div className="card-body">
                <p className="text-uppercase text-sm">Product Name</p>
                <h1 className="text-uppercase">{product.Nama_Product}</h1>
                <br></br>
                <p className="text-uppercase text-sm">Current Price</p>
                {product.Harga ?
                <>                 
                <h1 className="text-uppercase">{product.Harga + " ETH"}</h1></>: <h1>Currently not for sale!</h1> }
                <br></br>
                <p className="text-uppercase text-sm">Current Owner</p>
                <Link href={{ pathname: '/Profile/[pid]', query: { pid: ProductethAddress },}}>
                    <a>
                    <h5>{ProductethAddress?.substring(0, 7) + "..." + ProductethAddress?.substring(ProductethAddress?.length - 7)}</h5>
                    </a>
                </Link>
            </div>
            </div>
        </div>
        <div className="col-md-12">
        <div className="card mt-4">
            <div className="card-header pb-0">
                <div className="d-flex align-items-center">
                <h5 className="mb-0">Item Activites</h5>
                </div>
            </div>
            <div className="card-body">
                <IC_Table ProductData={product}/>
            </div>
            </div>
        </div>
        </div>
    </div>
    </main>
    </body>
    </>
  );
};

export default ProductDetail;

export const getServerSideProps = requireAuthentication(context => {
    return {props: {}}
})
