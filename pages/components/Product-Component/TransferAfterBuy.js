import react from "react";
import { useMoralis, useMoralisFile, useWeb3Transfer } from "react-moralis";
import { useDispatch } from "react-redux";
import { contractAddress } from '../../../contract';
import Moralis from 'moralis';
import Cookies from 'js-cookie';
import { TransferAfterBuy } from "../../../redux/actions/productActions";
import Swal from "sweetalert2";

const TransferAfterBuyButton = ({ ProductData }) => {

    const dispatch = useDispatch();
    let timerInterval;

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
          dispatch(TransferAfterBuy({
              Product_ActivityID2: ProductData.Product_Activities[0].encProduct_ActivityID,
              Product_ActivityID: "7Tk$K9N2nJIPW1BkBiCjpA__",
              ProductId: ProductData.encProductId,
              ethAddress_To: ProductData.Product_Activities[0].ethAddress_From,
              ethAddress_From: Cookies.get("ethAddress"),
              Tgl_Penjualan: "2021-09-23",
              Value: ProductData.Harga,
              TransactionHash: result.hash,
              bitComplete:true,
              bitSent: false
          },Cookies.get("UserData")
          ))
          Swal.fire(
            "Transfered!",
            "Your product has been Transfered!",
            "success"
          )
      }).catch((e) =>         
        Swal.fire(
          "Oops...",
          "Something went wrong!",
          "error"
      ));
        } catch (error){
          console.log(error)
        }
      }

    const {fetch, error, isFetching} = useWeb3Transfer({
        type: "erc721",
        receiver: ProductData.Product_Activities[0].ethAddress_From,
        contractAddress : contractAddress,
        tokenId: ProductData.TokenID
    })

    console.log(error);

  return (
    <a onClick={TransferAsset} className="btn bg-primary text-white mb-0"><i className="fas fa-plus"></i>&nbsp;&nbsp;Complete Transaction!</a>
  );
};

export default TransferAfterBuyButton;
