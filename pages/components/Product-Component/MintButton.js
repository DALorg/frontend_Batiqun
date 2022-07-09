import react from "react";
import { useMoralisFile } from "react-moralis";
import { useDispatch } from "react-redux";
import { contractABI, contractAddress } from '../../../contract';
import Moralis from 'moralis';
import Cookies from 'js-cookie';
import { mintProduct } from "../../../redux/actions/productActions";
import Web3 from "web3";
import Swal from "sweetalert2";

const web3 = new Web3(Web3.givenProvider)

const MintButton = ({ product }) => {

    const dispatch = useDispatch();
    const currentUser = Cookies.get("ethAddress");

    const {saveFile} = useMoralisFile();
    let timerInterval;

      const ApproveMint =  (Prodlist) => {
        return async function (e){
        e.preventDefault()
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

          let metadata = {
            name: Prodlist.Nama_Product,
            description : Prodlist.Description,
            image: global.apiurl + "Data/" + Prodlist.Product_image
          }
          await saveFile(`metadata ${Prodlist.Nama_Product}`, {
            base64: btoa(JSON.stringify(metadata))
          }, {
            saveIPFS: true,
            onSuccess: async (metadataFile) => {
              await Moralis.enableWeb3()
              const contract = new web3.eth.Contract(contractABI, contractAddress);
              try{
              const response = await contract.methods.mint(metadataFile._ipfs).send({from: currentUser});
              const TokenId = response.events.Transfer.returnValues.tokenId;
              const TransactionHash = response.events.Transfer.transactionHash;
              dispatch(
                  mintProduct(
                  {
                    TokenID: TokenId,
                    Product_ActivityID: "7Tk$K9N2nJIPW1BkBiCjpA__",
                    ProductId: Prodlist.encProductId,
                    ethAddress_To: Prodlist.ethAddress,
                    ethAddress_From: currentUser,
                    Tgl_Penjualan: "2021-09-23",
                    Value: Prodlist.Harga,
                    TransactionHash: TransactionHash,
                    bitComplete:true,
                    bitSent: true
                    }, Cookies.get("UserData"))
                )
                
                Swal.fire({
                  title: "Minted!",
                  text: "Your product has been Minted!",
                  icon: "success",
                  confirmButtonColor: '#9b6b43'
                }
              )
            }catch(error){
              Swal.fire({
                title: "Oops...",
                text: "Something went wrong!",
                icon: "error",
                confirmButtonColor: '#9b6b43'
              }
            )
            }
            },
            onError:async (error) => {
              console.log(error);
              Swal.fire({
                title: "Oops...",
                text: "Something went wrong!",
                icon: "error",
                confirmButtonColor: '#9b6b43'
              }
              )
            }
          })
        }
      }

  return (
    <a onClick={ApproveMint(product)} className="btn bg-primary text-white mb-0"><i class="fa-solid fa-baby"></i>&nbsp;&nbsp;Mint Product</a> 
  );
};

export default MintButton;
