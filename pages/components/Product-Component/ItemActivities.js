import React from "react";
// reactstrap components
import { Table } from "reactstrap";
import Link from "next/dist/client/link";
import { RejectProduct, ApproveProduct, deleteProduct } from "../../../redux/actions/productActions";
import { useDispatch } from "react-redux";
import moment from "moment";

const IC_Table = ({ ProductData }) => {
  const dispatch = useDispatch();

    return (
      <>
            <Table className="table table-responsive p-0 align-items-center">
            <thead>
              <tr>
                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Event</th>
                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">From</th>
                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">To</th>
                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Date</th>
                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Block Explorer</th>
              </tr>
            </thead>
            <tbody>
            {ProductData.Product_Activities?.map((pa,idx) => (
                <tr key={ProductData.encProductId}> 
                    <td className="align-middle text-center text-sm">
                        <p className="text-xs font-weight-bold mb-0">{pa.txtStatus}</p>
                    </td>
                    <td className="align-middle text-center text-sm">
                    <Link href={{ pathname: '/Profile/[pid]', query: { pid: pa.ethAddress_From },}}>
                    <a>
                    <p className="text-xs font-weight-bold mb-0">{pa.ethAddress_From?.substring(0, 7) + "..." + pa.ethAddress_From?.substring(pa.ethAddress_From?.length - 7)}</p>
                    </a>
                    </Link>
                    </td>
                    <td className="align-middle text-center text-sm">
                    {pa.ethAddress_To === pa.ethAddress_From ? 
                    <p className="text-xs font-weight-bold mb-0">You</p>
                    :<Link href={{ pathname: '/Profile/[pid]', query: { pid: pa.ethAddress_To },}}>
                    <a>
                    <p className="text-xs font-weight-bold mb-0">{pa.ethAddress_To?.substring(0, 7) + "..." + pa.ethAddress_To?.substring(pa.ethAddress_To?.length - 7)}</p>
                    </a>
                    </Link>}
                    </td>
                    <td className="align-middle text-center text-sm">
                        <p className="text-xs font-weight-bold mb-0">{moment(pa.Tgl_Penjualan).format('MMMM, D Y')}</p>
                    </td>
                    <td className="align-middle text-center text-sm">
                    {pa.TransactionHash === null ? 
                    <p className="text-xs font-weight-bold mb-0">-</p>
                      :<Link href={"https://rinkeby.etherscan.io/tx/" + pa.TransactionHash}>
                      <a>
                      <p className="text-xs font-weight-bold mb-0">View On Block Explorer</p>
                      </a>
                      </Link>
                    }
                    </td>
                </tr>
            ))}
                </tbody>
            </Table>
      </>
    );
  }
  
  export default IC_Table;