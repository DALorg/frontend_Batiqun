import react from "react";
import { useMoralis, useMoralisFile, useWeb3Transfer } from "react-moralis";
import { useDispatch } from "react-redux";
import { contractAddress } from '../../../contract';
import Moralis from 'moralis';
import Cookies from 'js-cookie';
import { BuyProduct } from "../../../redux/actions/productActions";
import Web3 from "web3";
import Swal from "sweetalert2";

const web3 = new Web3(Web3.givenProvider)

const BuyButton = ({ product }) => {

    const dispatch = useDispatch();
    const currentUser = Cookies.get("ethAddress");

    var myArray = ['0xcdB694534669134902702d0545E1Ad2213c1408d', '0x6Cb58a6F26e0128b9F716Ef1D7F8d6707377Df39'];    
    const randomElement = myArray[Math.floor(Math.random() * myArray.length)];

    let timerInterval;

    const Transfer = async (e) =>{
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
        fetch().then(function(result) {
          console.log(result);
          dispatch(BuyProduct({
            Product_ActivityID: "7Tk$K9N2nJIPW1BkBiCjpA__",
            ProductId: product.encProductId,
            ethAddress_To: product.ethAddress,
            ethAddress_From: currentUser,
            Tgl_Penjualan: "2021-09-23",
            Value: product.Harga,
            TransactionHash: result.hash,
            bitComplete:true,
            bitSent: true
      },Cookies.get("UserData")))
      Swal.fire({
        title: "Congratulations!",
        text: "Your have bought this Product!",
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
      type: "native",
      amount: String((product.Harga * 1000000000000000000) + 500000000000000),
      receiver: randomElement 
    })

  return (
    <a onClick={Transfer} className="btn bg-primary text-white mb-0"><i class="fa-solid fa-cart-shopping"></i>&nbsp;&nbsp;Buy Now!</a>
  );
};

export default BuyButton;
