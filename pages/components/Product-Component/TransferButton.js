import react from "react";
import { useMoralis, useMoralisFile, useWeb3Transfer } from "react-moralis";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { contractAddress } from '../../../contract';
import Moralis from 'moralis';
import Cookies from 'js-cookie';
import { TransferProduct } from "../../../redux/actions/productActions";
import Swal from "sweetalert2";

const TransferButton = ({ ProductData }) => {

    const dispatch = useDispatch();
    let timerInterval;

    const [value, setValue] = useState()

    const handleChangeEdit = (e) => {
      setValue(e.target.value);
    };

    const TransferAsset = async () =>{
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
        await fetch().then(function(result){   
        console.log(result);        
        dispatch(TransferProduct({
            Product_ActivityID: "7Tk$K9N2nJIPW1BkBiCjpA__",
            ProductId: ProductData.encProductId,
            ethAddress_To: value,
            ethAddress_From: Cookies.get("ethAddress"),
            Tgl_Penjualan: "2021-09-23",
            Value: ProductData.Harga,
            TransactionHash: result.hash,
            bitComplete:true,
            bitSent: true
        },Cookies.get("UserData")
        ))
        Swal.fire({
          title: "Transfered!",
          text: "Your product has been Transfered!",
          icon: "success",
          confirmButtonColor: '#9b6b43'
        }
      )
    }).catch((e) =>         
    Swal.fire({
      title: "Oops...",
      text: "Something went wrong!",
      icon: "error",
      confirmButtonColor: '#9b6b43'
    }
  ));
      } catch (error){
        console.log(error)
      }
    }

    const {fetch, isFetching} = useWeb3Transfer({
        type: "erc721",
        receiver: value,
        contractAddress : contractAddress,
        tokenId: ProductData.TokenID
    })

  return (
    <>
    <a className="btn bg-primary text-white mb-0" data-bs-toggle="modal" data-bs-target="#modal-trf"><i class="fa-solid fa-gifts"></i>&nbsp;&nbsp;Transfer Products!</a>
    <div className="modal fade" id="modal-trf" tabindex="-1" role="dialog" aria-labelledby="modal-form" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered modal-md" role="document">
      <div className="modal-content">
        <div className="modal-body p-0">
          <div className="card card-plain">
            <div className="card-header pb-0 text-center">
              <h3 className="font-weight-bolder text-info text-gradient">Transfer Product</h3>
              <p className="mb-0">To who you want to Transfer this Product to</p>
            </div>
            <div className="card-body text-left">
              <form role="form">
              <label>Address</label>  
                <div className="input-group mb-3">
                    <input type="text" value={value} onChange={handleChangeEdit} className="form-control" placeholder="Address"/>
                </div>
                <div className="text-center">
                  <button onClick={TransferAsset} type="button" className="btn btn-round bg-primary text-white btn-lg w-100 mt-4 mb-0">Transfer Now!</button>
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

export default TransferButton;
