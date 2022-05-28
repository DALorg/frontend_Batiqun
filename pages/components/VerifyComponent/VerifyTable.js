import React from "react";
// reactstrap components
import { Table } from "reactstrap";
import Link from "next/dist/client/link";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import Cookies from 'js-cookie';
import { VerifAdmin } from "../../../redux/actions/verifyAction";
import "../GlobalVariable";

const VerifyTable = ({ ProductData, loading, error }) => {

  const dispatch = useDispatch();

  const prod = ProductData.objData;

  const currentUser = Cookies.get("ethAddress");

  const Transfer = (param) =>{
    return async function (e){
    e.preventDefault();
    try {
      await dispatch(VerifAdmin( param.ethAddress ,Cookies.get("UserData")));

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
                      <Link href={{ pathname: '/Profile/[pid]', query: { pid: product.ethAddress },}}>
                        <a>
                          <h6 className="mb-0 text-sm">{product.ethAddress?.substring(0, 7) + "..." + product.ethAddress?.substring(product.ethAddress?.length - 7)}</h6>
                        </a>
                      </Link>
                      </td>
                      <td className="align-middle text-center text-sm">
                            <h6 className="mb-0 text-sm">{product.NIK}</h6>
                      </td>
                      {product.txtRoleName == global.admin ||  product.txtRoleName == global.superadmin ? 
                      <td className="align-middle text-center text-sm">
                        <span className="badge badge-sm bg-gradient-success">Already an Admin</span>
                      </td>
                      :                       
                      <td className="align-middle text-center text-sm">
                        <span class="badge badge-sm bg-gradient-danger">Not Admin</span>
                      </td>}
                      <td className="text-right">
                        <div className="dropdown">
                          <button className="btn btn-link text-secondary mb-0" aria-haspopup="true" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fa fa-ellipsis-v text-xs"></i>
                          </button>
                          <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                            {product.txtRoleName != global.admin 
                                ? <a onClick={Transfer(product)} className="dropdown-item" href="#"><i class="fa-solid fa-thumbs-up"></i> &nbsp; Verify Admin</a>
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
  
  export default VerifyTable;