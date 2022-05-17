import React, { useEffect, useState, setState } from "react";
import {requireAuthentication} from "../requireAuthentication"
import { useDispatch, useSelector } from "react-redux";
import {
  getById,
} from "../../redux/actions/productActions";
import Swal from "sweetalert2";
import { useRouter } from 'next/router'
import "../components/GlobalVariable"
import Navsidebar from "../components/Navsidebar";
import Navbarz from "../components/navbars";
import { Table } from "reactstrap";
import Link from "next/dist/client/link";


const ProductDetail = () => {
    const dispatch = useDispatch();
    const allProductsData = useSelector((state) => state.Products);
    const { loading, error, product } = allProductsData;

    const router = useRouter();
    const {pid}  = router.query;

    useEffect(() => {
        dispatch(getById(pid));
      }, []);

      const ProductTokenId = product.TokenID;

  return (
      <>
    <body className="g-sidenav-show   bg-gray-100">
    <div className="min-height-300 bg-primary position-absolute w-100"></div>
    <Navsidebar></Navsidebar>
    <main className="main-content position-relative border-radius-lg ">
        <Navbarz LastPage="Product" CurrentPage="Product Detail"></Navbarz>
        <div className="container-fluid py-1 px-3">    
        <title>Product</title>  
        <link rel="icon" href="/icon.png" />
        <div className="row">
        <div className="col-md-4">
            <div className="card">
            <img className="card-img" src={global.apiurl + "Data/" + product.Product_image} width="100%"/>
            </div>
        </div>
        <div className="col-md-8">
            <div className="card">
            <div className="card-header pb-0">
                <div className="d-flex align-items-center">
                <h5 className="mb-0">Product Details</h5>
                </div>
            </div>
            <div className="card-body">
                <p className="text-uppercase text-sm">Product Name</p>
                <h1 className="text-uppercase">{product.Nama_Product}</h1>
                <br></br>
                <p className="text-uppercase text-sm">Current Price</p>
                <h1 className="text-uppercase">{product.Harga + " ETH"}</h1>
                <br></br>
                <p className="text-uppercase text-sm">Current Owner</p>
                <Link href={{ pathname: '/Profile/[pid]', query: { pid: ProductTokenId },}}>
                    <a>
                    <h5>{ProductTokenId?.substring(0, 7) + "..." + ProductTokenId?.substring(ProductTokenId?.length - 7)}</h5>
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
            <Table className="table table-responsive p-0 align-items-center">
            <thead>
              <tr>
                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Event</th>
                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">From</th>
                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">To</th>
                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Date</th>
              </tr>
            </thead>
            <tbody>
            {product.Product_Activities?.map((pa,idx) => (
                <tr key={product.encProductId}> 
                    <td className="align-middle text-center text-sm">
                        <p className="text-xs font-weight-bold mb-0">{pa.txtStatus}</p>
                    </td>
                    <td className="align-middle text-center text-sm">
                    <Link href={{ pathname: '/Profile/[pid]', query: { pid: pa.TokenId_From },}}>
                    <a>
                    <p className="text-xs font-weight-bold mb-0">{pa.TokenId_From?.substring(0, 7) + "..." + pa.TokenId_From?.substring(pa.TokenId_From?.length - 7)}</p>
                    </a>
                    </Link>
                    </td>
                    <td className="align-middle text-center text-sm">
                    {pa.TokenId_To === pa.TokenId_From ? 
                    <p className="text-xs font-weight-bold mb-0">-</p>
                    :<Link href={{ pathname: '/Profile/[pid]', query: { pid: pa.TokenId_To },}}>
                    <a>
                    <p className="text-xs font-weight-bold mb-0">{pa.TokenId_To?.substring(0, 7) + "..." + pa.TokenId_To?.substring(pa.TokenId_To?.length - 7)}</p>
                    </a>
                    </Link>}
                    </td>
                    <td className="align-middle text-center text-sm">
                        <p className="text-xs font-weight-bold mb-0">{pa.Tgl_Penjualan}</p>
                    </td>
                </tr>
            ))}
                </tbody>
            </Table>
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
