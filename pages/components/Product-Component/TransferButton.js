import react from "react";
import { useMoralis, useMoralisFile, useWeb3Transfer } from "react-moralis";
import { useDispatch } from "react-redux";
import { contractAddress } from '../../../contract';
import Moralis from 'moralis';
import Cookies from 'js-cookie';
import { TransferProduct } from "../../../redux/actions/productActions";
import Swal from "sweetalert2";

const TransferButton = ({ ProductData }) => {

    const dispatch = useDispatch();

    const TransferAsset = async () =>{
        try {
          await Moralis.enableWeb3();
          fetch().then(function(result) {   
          console.log(result);        
         dispatch(TransferProduct({
            Product_ActivityID: "7Tk$K9N2nJIPW1BkBiCjpA__",
            ProductId: ProductData.encProductId,
            ethAddress_To: ProductData.Product_Activities[0].ethAddress_From,
            ethAddress_From: Cookies.get("ethAddress"),
            Tgl_Penjualan: "2021-09-23"
        },Cookies.get("UserData")
        ))},function(error) {
          // Common error handling
          Swal.fire(
            "Oops...",
            "Something went wrong!",
            "error"
          )
      })
        } catch (error){
          console.log(error)
        }
      }

    const {fetch, isFetching} = useWeb3Transfer({
        type: "erc721",
        receiver: ProductData.Product_Activities[0].ethAddress_From,
        contractAddress : contractAddress,
        tokenId: ProductData.TokenID
    })

  return (
    <a onClick={TransferAsset} className="btn bg-primary text-white mb-0"><i class="fa-solid fa-gifts"></i>&nbsp;&nbsp;Transfer Products!</a>
  );
};

export default TransferButton;
