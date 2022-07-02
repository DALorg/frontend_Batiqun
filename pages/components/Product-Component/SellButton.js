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

const web3 = new Web3(Web3.givenProvider)

const SellButton = ({ product }) => {

    const dispatch = useDispatch();
    const currentUser = Cookies.get("ethAddress");

    const [price, setPrice] = useState()

    const handleChangeEdit = (e) => {
        setPrice(e.target.value);
      };

    const ApproveMint =  (Prodlist) => {
    return async function (e){
    e.preventDefault()
        dispatch(
            SellProduct (
            {
                Harga: price,
                Product_ActivityID: "7Tk$K9N2nJIPW1BkBiCjpA__",
                ProductId: Prodlist.encProductId,
                ethAddress_To: Prodlist.ethAddress,
                ethAddress_From: currentUser,
                Tgl_Penjualan: "2021-09-23",
                Value: price,
                TransactionHash: null,
                bitComplete:true,
                bitSent: true
                }, Cookies.get("UserData")),
            Swal.fire({
              title: "Selling!",
              text: "Your product has been Listed!",
              icon: "success",
              confirmButtonColor: '#9b6b43'
            }
            )
            )
        }
    }
        
      

  return (
    <>
    <a className="btn bg-primary text-white mb-0" data-bs-toggle="modal" data-bs-target="#modal-form"><i className="fa-solid fa-sack-dollar"></i>&nbsp;&nbsp;Sell Product</a> 
    <div className="modal fade" id="modal-form" tabindex="-1" role="dialog" aria-labelledby="modal-form" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-md" role="document">
        <div className="modal-content">
          <div className="modal-body p-0">
            <div className="card card-plain">
              <div className="card-header pb-0 text-center">
                <h3 className="font-weight-bolder text-info text-gradient">Sell Product</h3>
                <p className="mb-0">Please set how much you want to Sell this Product for</p>
              </div>
              <div className="card-body text-left">
                <form role="form">
                  <label>Price</label>
                  <div className="input-group mb-3">
                  <div className="row">
                    <div className="col-lg-3">
                    <div class="input-group mb-4">   
                        <span class="input-group-text"><i class="fa-brands fa-ethereum"></i></span>
                        <input type="email" className="form-control" value={"ETH"} aria-label="Email" aria-describedby="email-addon" disabled/>
                    </div>
                    </div>
                    <div className="col-lg-9">   
                        <input type="text" value={price} onChange={handleChangeEdit} className="form-control" placeholder="Price"/>
                    </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <button onClick={ApproveMint(product)} type="button" className="btn btn-round bg-primary text-white btn-lg w-100 mt-4 mb-0">Sell Now!</button>
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

export default SellButton;
