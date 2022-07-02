import React from "react";
// reactstrap components
import { Table } from "reactstrap";
import Link from "next/dist/client/link";
import { RejectProduct, ApproveProduct, deleteProduct } from "../../../redux/actions/productActions";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

const ProductTable = ({ ProductData, loading, error }) => {
  const dispatch = useDispatch();

  const ApproveMint =  (Prodlist) => {
    return async function (e){
    e.preventDefault()
        dispatch(
          ApproveProduct(Prodlist.encProductId),
          Swal.fire({
            title: "Approved!",
            text: "Your product has been approved!",
            icon: "success",
            confirmButtonColor: '#9b6b43'
          }
          )
        )
      }
    }  

  const RejectMint =  (Prodlist) => {
    return async function (e){
    e.preventDefault();
        dispatch(
          RejectProduct(Prodlist.encProductId),
          Swal.fire({
            title: "Rejected!",
            text: "Your product has been Rejected!",
            icon: "success",
            confirmButtonColor: '#9b6b43'
          }
          )
        )
      }
  }

  const DeleteProduct =  (Prodlist) => {
    return async function (e){
    e.preventDefault();
        dispatch(
          deleteProduct(Prodlist.encProductId),
          Swal.fire(
            "Berhasil Menghapus!",
            "Product " +
              product.Nama_Product +
              " Berhasil di Hapus!",
            "success"
          )
        )
      }
  }

    return (
      <>
          <Table className="table table-responsive p-0 align-items-center">
            <thead>
              <tr>
                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">No</th>
                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Product Image</th>
                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Product Name</th>
                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Owner</th>
                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Status</th>
                <th className="text-secondary opacity-7"></th>
              </tr>
            </thead>
            <tbody>
                {loading
            ? "Loading..."
            : error
            ? error.message
            : ProductData.map((product,idx) => (
                    <tr key={product.encProductId}> 
                       <td className="align-middle text-center text-sm">
                          <p className="text-xs font-weight-bold mb-0">{idx + 1}</p>
                      </td>
                      <td className="align-middle text-center text-sm">
                        <a href={global.apiurl + "Data/" + product.Product_image} target="_blank" rel="noopener noreferrer">
                          <img className="avatar" src={global.apiurl + "Data/" + product.Product_image} width="10%" />
                        </a>
                      </td>
                      <td className="align-middle text-center text-sm">
                            <h6 className="mb-0 text-sm">{product.Nama_Product}</h6>
                      </td>
                      <td className="align-middle text-center text-sm">
                      <Link href={{ pathname: '/Profile/[pid]', query: { pid: product.ethAddress },}}>
                        <a>
                          <h6 className="mb-0 text-sm">{product.ethAddress?.substring(0, 7) + "..." + product.ethAddress?.substring(product.ethAddress?.length - 7)}</h6>
                        </a>
                      </Link>
                      </td>
                      {product.bitApprove ? 
                      <td className="align-middle text-center text-sm">
                        <span className="badge badge-sm bg-gradient-success">Approved</span>
                      </td>
                      : product.bitApprove == null ? 
                      <td className="align-middle text-center text-sm">
                        <span class="badge badge-sm bg-gradient-secondary">Not Approved Yet</span>
                      </td>
                      :                       
                      <td className="align-middle text-center text-sm">
                        <span class="badge badge-sm bg-gradient-danger">Declined</span>
                      </td>}
                      <td className="text-right">
                        <div className="dropdown">
                          <button className="btn btn-link text-secondary mb-0" aria-haspopup="true" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fa fa-ellipsis-v text-xs"></i>
                          </button>
                          <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                            <Link href={{ pathname: '/Product/[pid]', query: { pid: product.encProductId },}}>
                            <a className="dropdown-item"><i class="fa-solid fa-circle-info"></i>&nbsp;  Product Details</a>
                            </Link>
                            <Link href={{ pathname: '/Product/SaveProduct/[pid]', query: { pid: product.encProductId },}}>
                              <a className="dropdown-item"><i class="fa-solid fa-pen-to-square"></i>&nbsp;  Edit Products</a>
                            </Link>
                            {product.bitApprove == null
                                ? <a onClick={ApproveMint(product)} className="dropdown-item" href="#"><i class="fa-solid fa-thumbs-up"></i> &nbsp; Approve Product</a>
                                : null
                            }
                            {product.bitApprove == null
                                ? <a onClick={RejectMint(product)} className="dropdown-item" href="#"><i class="fa-solid fa-thumbs-down"></i> &nbsp; Reject Product</a>
                                : null
                            }
                            <a onClick={DeleteProduct(product)} className="dropdown-item" href="#"><i class="fa-solid fa-eraser"></i> &nbsp; Delete Product</a>
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
  
  export default ProductTable;