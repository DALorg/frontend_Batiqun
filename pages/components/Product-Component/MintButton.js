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

    const {saveFile} = useMoralisFile()

      const ApproveMint =  (Prodlist) => {
        return async function (e){
        e.preventDefault()
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
            console.log(metadataFile._ipfs)
            await Moralis.enableWeb3()
            const contract = new web3.eth.Contract(contractABI, contractAddress);
            const response = await contract.methods.mint(metadataFile._ipfs).send({from: currentUser});
            console.log(response);
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
                  }, Cookies.get("UserData")),
                Swal.fire(
                  "Minted!",
                  "Your product has been Minted!",
                  "success"
                )
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
