import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from "react-redux";
// import {
//   getProducts,
//   deleteProduct,
//   saveProduct,
// } from "../../redux/actions/productActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPen,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Modal, ModalBody, ModalFooter, Button } from 'reactstrap';
import Swal from "sweetalert2";
import axios from "axios";
// import "../components/GlobalVariable"

const Products = () => {
  const dispatch = useDispatch();
  const allProductsData = useSelector((state) => state.Products);
  const { loading, error, products } = allProductsData;

  // MODAL
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [descModalIsOpen, setdescModalIsOpen] = useState(false);

  // LOAD DATA
//   useEffect(() => {
//     dispatch(getProducts());
//   }, []);

  // SEARCH TITLE
  const [inputSearch, setInputSearch] = useState("");

  const handleChangeEdit = (e) => {
    let data = { ...userEdit };
    data[e.target.name] = e.target.value;
    setUserEdit(data);
  };

  const handleChangeSearch = (e) => {
    e.preventDefault();
    setInputSearch(e.target.value);
  };

  const handleFile = (e) =>{
    let data = { ...userEdit };
    let file = e.target.files[0];
    data[e.target.name] = file;

    setUserEdit(data);
  };

  const router = useRouter()

  // EDIT AND CREATE PRODUCT
  const [userEdit, setUserEdit] = useState({
    ProductId: "",
    Nama_Product: "",
    TokenID: "",
    Product_image: "",
    intFavorites: "",
    bitApprove: "",
    Harga: "",
    file: "",
  });

  const handleEdit = (product) => {
    debugger;
    if(product != null){
    setUserEdit({
        ProductId: product.encProductId,
        Nama_Product: product.Nama_Product,
        TokenID: product.TokenID,
        Product_image: product.Product_image,
        intFavorites: product.intFavorites,
        bitApprove: product.bitApprove,
        Harga: product.Harga,
    })}else{
      setUserEdit({
        ProductId: "7Tk$K9N2nJIPW1BkBiCjpA__",
        Nama_Product: "",
        TokenID: "",
        Product_image: "11.png",
        intFavorites: 0,
        bitApprove: null,
        Harga: "",
    })
    };
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    //UPLOAD IMAGE
    let file = userEdit.file;

    let formData = new FormData();

    formData.append('image', file);

    axios({
      url: global.apiurl + 'api/user/uploadfile',
      method: 'POST',
      data: formData  
    }).then((res)=>{
      console.log(res.data.objData);
          //SELESAI UPLOAD IMAGE
      dispatch(
        saveProduct({
          ProductId: userEdit.ProductId,
          Nama_Product: userEdit.Nama_Product,
          TokenID: userEdit.TokenID,
          Product_image: res.data.objData,
          intFavorites: userEdit.intFavorites,
          bitApprove: userEdit.bitApprove,
          Harga: userEdit.Harga,
        })
      );
      Swal.fire(
        "Berhasil Update Produk!",
        "Product " + userEdit.Nama_Product + " Berhasil di Update!",
        "success"
      );
    })


    setUserEdit({
      ProductId: "",
      Nama_Product: "",
      TokenID: "",
      Product_image: "",
      intFavorites: "",
      bitApprove: "",
      Harga: "",
    });
  };

  return (

    <div className="container-fluid py-4">
        <title>History</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/icon.png" />

       
        <div className="card mb-4">
            <div className="card-header pb-0">
              <div className="row">
                <div className="col-6 d-flex">
                  <h6 className="mb-0">Search</h6>
                </div>
              </div>
            </div>
        </div>
   
      <div className="row">
        <div className="col-12">
          <div className="card mb-4">
            <div className="card-header pb-0">
              <div className="row">
                <div className="col-6 d-flex align-items-center">
                  <h6 className="mb-0">Sales History</h6>
                </div>
              </div>
            </div>

      <div className="Modal">
        {/* MODAL TAMBAH PRODUCT */}
        <Modal className="bd-example-modal-lg" toggle={() => setModalIsOpen(!modalIsOpen)} isOpen={modalIsOpen}>
        {/* <div className=" modal-header">
          <h5 className=" modal-title" id="exampleModalLabel">
            New Product
          </h5>
          <a
            aria-label="Close"
            className=" close"
            type="button"
            onClick={() => setModalIsOpen(!modalIsOpen)}
          >
            <span aria-hidden={true}>×</span>
          </a>
        </div> */}
        <ModalBody>
        <div className="row">
        <div className="col-md-12">
              <p className="text-uppercase text-sm">User Information</p>
              <div className="row">
              <div className="col-md-6">
                  <div className="form-group">
                    <label for="example-text-input" className="form-control-label">Id</label>
                    <input
                              type="input"
                              className="form-control"
                              placeholder="Title"
                              name="id"
                              value={userEdit.ProductId}
                              disabled
                            />
                    </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label for="example-text-input" className="form-control-label">Files</label>
                    <input
                              type="file"
                              className="form-control"
                              name="file"
                              onChange={handleFile}
                            />
                    </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label for="example-text-input" className="form-control-label">Nama Product</label>
                    <input
                        type="input"
                        className="form-control"
                        placeholder="Nama Product"
                        name="Nama_Product"
                        onChange={handleChangeEdit}
                        value={userEdit.Nama_Product}
                      />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label for="example-text-input" className="form-control-label">TokenID</label>
                    <input
                        type="input"
                        className="form-control"
                        placeholder="TokenID"
                        name="TokenID"
                        onChange={handleChangeEdit}
                        value={userEdit.TokenID}
                      />
                  </div>
                </div>
              </div>
              <hr className="horizontal dark"/>
              <p className="text-uppercase text-sm">Contact Information</p>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label for="example-text-input" className="form-control-label">Price</label>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Price"
                        name="Harga"
                        onChange={handleChangeEdit}
                        value={userEdit.Harga}
                      />
                  </div>
                </div>
              </div>
        </div>
      </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="secondary"
            type="button"
            onClick={() => setModalIsOpen(!modalIsOpen)}
          >
            Close
          </Button>
          <Button onClick={handleUpdate} color="primary" type="button">
            Save changes
          </Button>
        </ModalFooter>
      </Modal>
      </div>
      <div className="card-body px-0 pt-0 pb-2">
              <div className="table-responsive p-0">
                <table className="table align-items-center mb-0">
                  <thead>
                    <tr>
                      <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">No</th>
                      <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Date Sales</th>
                      <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Product Name</th>
                      <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Price</th>
                      <th className="text-secondary opacity-7"></th>
                    </tr>
                  </thead>
                  <tbody>
                  {loading
            ? "Loading..."
            : error
            ? error.message
            : products
                .filter((product) => {
                  if (inputSearch === "") {
                    return product;
                  } else if (
                    product.Nama_Product
                      .toLowerCase()
                      .includes(inputSearch.toLowerCase())
                  ) {
                    return product;
                  }
                })
                .map((product,idx) => (
                    <tr key={product.encProductId}> 
                       <td className="align-middle text-center text-sm">
                          <p className="text-xs font-weight-bold mb-0">{idx + 1}</p>
                      </td>
                      <td className="align-middle text-center text-sm">
                          <img className="avatar" src={global.apiurl + "Data/" + product.Product_image} width="10%" />
                      </td>
                      <td className="align-middle text-center text-sm">
                            <h6 className="mb-0 text-sm">{product.Nama_Product}</h6>
                      </td>
                      <td className="align-middle text-center text-sm">
                        <span className="badge badge-sm bg-gradient-success">Online</span>
                      </td>
                      <td className="align-middle">
                        {/* DETAIL PRODUCT */}
                        <a
                          onClick={() => {
                            router.push({
                              pathname: './Product/[pid]',
                              query: { pid: product.encProductId },
                            })
                          }}
                          className="button-ud"
                        >
                          <FontAwesomeIcon
                            icon={faInfoCircle}
                            size="1x"
                            style={{ color: "green" }}
                          />
                        </a>

                        {/* EDIT PRODUCT */}
                        <a
                          onClick={() =>
                            setModalIsOpen(true) & handleEdit(product)
                          }
                          className="button-ud"
                        >
                          <FontAwesomeIcon
                            icon={faPen}
                            size="1x"
                            style={{ color: "blue" }}
                          />
                        </a>

                        {/* DELETE PRODUCT */}
                        <a onClick={() =>
                            dispatch(
                              deleteProduct(product.encProductId),
                              Swal.fire(
                                "Berhasil Menghapus!",
                                "Product " +
                                  product.Nama_Product +
                                  " Berhasil di Hapus!",
                                "success"
                              )
                            )
                          }
                        >
                          <FontAwesomeIcon
                            icon={faTrash}
                            size="1x"
                            style={{ color: "red" }}
                          />
                        </a>
                      </td>
                    </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
         
  );
};

export default Products;
