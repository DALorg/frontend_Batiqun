import React from "react";
// reactstrap components
import { Table } from "reactstrap";
import Link from "next/dist/client/link";
import { PayUser } from "../../../redux/actions/productActions";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import Cookies from 'js-cookie';
import Moralis from 'moralis';
import { useState } from "react";

const ProductActivityTable = ({ ProductData, loading, error }) => {

  const dispatch = useDispatch();

  const prod = ProductData.objData;

  const currentUser = Cookies.get("ethAddress");

  var myArray = ['0xcdB694534669134902702d0545E1Ad2213c1408d', '0x6Cb58a6F26e0128b9F716Ef1D7F8d6707377Df39'];    
  const randomElement = myArray[Math.floor(Math.random() * myArray.length)];

  let timerInterval;

  const Transfer = (param) =>{
    return async function (e){
    e.preventDefault();
    try {
      await Moralis.enableWeb3();
      Swal.fire({
        title: 'Loading, Please Wait!',
        html: 'I will close in <b></b> milliseconds.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading()
          const b = Swal.getHtmlContainer().querySelector('b')
          timerInterval = setInterval(() => {
            b.textContent = Swal.getTimerLeft()
          }, 100)
        },
        willClose: () => {
          clearInterval(timerInterval)
        }
      })

      const options = {
        type: "native",
        amount: Moralis.Units.ETH(String(param.Value)) ,
        receiver : param.ethAddress_To,
      };

      let result = await Moralis.transfer(options) ;
        console.log(result);
        dispatch(PayUser({
          Product_ActivityID: param.encProduct_ActivityID,
          ProductId: param.encProductId,
          ethAddress_To: param.ethAddress_To,
          ethAddress_From: currentUser,
          Tgl_Penjualan: "2021-09-23",
          Value: param.Value,
          TransactionHash: result.hash,
          bitComplete:true,
          bitSent: true
    },Cookies.get("UserData")))
    Swal.close();
    } catch (error){
      console.log(error)
    }
  }
}

    return (
      <>
          <Table className="table table-responsive p-0 align-items-center">
            <thead>
              <tr>
                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">No</th>
                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Address</th>
                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Value</th>
                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Status</th>
                <th className="text-secondary opacity-7"></th>
              </tr>
            </thead>
            <tbody>
                {loading
            ? "Loading..."
            : error
            ? error.message
            : prod.map((product,idx) => (
                    <tr key={product.encProductId}> 
                       <td className="align-middle text-center text-sm">
                          <p className="text-xs font-weight-bold mb-0">{idx + 1}</p>
                      </td>
                      <td className="align-middle text-center text-sm">
                      <Link href={{ pathname: '/Profile/[pid]', query: { pid: product.ethAddress_To },}}>
                        <a>
                          <h6 className="mb-0 text-sm">{product.ethAddress_To?.substring(0, 7) + "..." + product.ethAddress_To?.substring(product.ethAddress_To?.length - 7)}</h6>
                        </a>
                      </Link>
                      </td>
                      <td className="align-middle text-center text-sm">
                            <h6 className="mb-0 text-sm">{product.Value}</h6>
                      </td>
                      {product.bitSent ? 
                      <td className="align-middle text-center text-sm">
                        <span className="badge badge-sm bg-gradient-success">Sent</span>
                      </td>
                      :                       
                      <td className="align-middle text-center text-sm">
                        <span class="badge badge-sm bg-gradient-danger">Not Sented Yet</span>
                      </td>}
                      <td className="text-right">
                        <div className="dropdown">
                          <button className="btn btn-link text-secondary mb-0" aria-haspopup="true" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fa fa-ellipsis-v text-xs"></i>
                          </button>
                          <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                            {!product.bitSent
                                ? <a onClick={Transfer(product)} className="dropdown-item" href="#"><i class="fa-solid fa-thumbs-up"></i> &nbsp; Sent ETH</a>
                                : null
                            }
                          </div>
                        </div>
                      </td>
                    </tr>
                    ))} 
                  </tbody>
                </Table>
      </>
    );
  }
  
  export default ProductActivityTable;