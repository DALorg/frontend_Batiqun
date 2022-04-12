import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  deleteProduct,
  editProduct,
  addProduct,
} from "../redux/actions/productActions";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPen,
  faWindowClose,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Modal, ModalBody, ModalFooter, Button } from 'reactstrap';
import ProductDetail from "react-modal";
import EditProduct from "react-modal";
import Swal from "sweetalert2";

(Modal, ProductDetail, EditProduct).setAppElement();

const Products = () => {
  const dispatch = useDispatch();
  const allProductsData = useSelector((state) => state.Products);
  const { loading, error, products } = allProductsData;

  // MODAL
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [descModalIsOpen, setdescModalIsOpen] = useState(false);
  const [editModalIsOpen, seteditModalIsOpen] = useState(false);

  // LOAD DATA
  useEffect(() => {
    dispatch(getProducts());
  }, []);

  // SEARCH TITLE
  const [inputSearch, setInputSearch] = useState("");

  // HANDLE CHANGE
  const handleChange = (e) => {
    let data = { ...userInput };
    data[e.target.name] = e.target.value;
    setUserInput(data);
  };

  const handleChangeEdit = (e) => {
    let data = { ...userEdit };
    data[e.target.name] = e.target.value;
    setUserEdit(data);
  };

  const handleChangeSearch = (e) => {
    e.preventDefault();
    setInputSearch(e.target.value);
  };

  // ADD PRODUCT
  const [userInput, setUserInput] = useState({
    ProductId: "7Tk$K9N2nJIPW1BkBiCjpA__",
    Nama_Product: "",
    TokenID: "",
    Product_image: "11.png",
    intFavorites: 0,
    bitApprove: null,
    Harga: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      (userInput.Nama_Product === "",
      userInput.TokenID === "",
      userInput.Harga === "")
    ) {
      return false;
    }

    dispatch(
      addProduct({
        ProductId: userInput.ProductId,
        Nama_Product: userInput.Nama_Product,
        TokenID: userInput.TokenID,
        Product_image: userInput.Product_image,
        intFavorites: userInput.intFavorites,
        bitApprove: userInput.bitApprove,
        Harga: userInput.Harga,
      })
    );
    Swal.fire(
      "Berhasil Tambah Produk!",
      "Product " + userInput.Nama_Product + " Berhasil di Tambah!",
      "success"
    );

    setUserInput({
      ProductId: "7Tk$K9N2nJIPW1BkBiCjpA__",
      Nama_Product: userInput.Nama_Product,
      TokenID: "",
      Product_image: "11.png",
      intFavorites: 0,
      bitApprove: null,
      Harga: "",
    });
  };

  // EDIT AND UPDATE PRODUCT
  const [userEdit, setUserEdit] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
    category: "",
  });

  const handleEdit = (product) => {
    setUserEdit({
      id: product.encProductId,
      title: product.Nama_Product,
      price: product.price,
      description: product.description,
      image: product.image,
      category: product.category,
    });
    console.log("Product = " + product.encProductId);
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    dispatch(
      editProduct({
        id: userEdit.id,
        title: userEdit.title,
        price: userEdit.price,
        description: userEdit.description,
        image: userEdit.image,
        category: userEdit.category,
      })
    );
    Swal.fire(
      "Berhasil Update Produk!",
      "Product " + userEdit.title + " Berhasil di Update!",
      "success"
    );

    setUserEdit({
      title: "",
      price: "",
      description: "",
      image: "",
      category: "",
    });
  };

  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-12">
          <div className="card mb-4">
            <div className="card-header pb-0">
              <div className="row">
                <div className="col-6 d-flex align-items-center">
                  <h6 className="mb-0">Payment Method</h6>
                </div>
                <div className="col-6 text-end">
                  <a className="btn bg-gradient-dark mb-0"onClick={() => setModalIsOpen(true)}><i className="fas fa-plus"></i>&nbsp;&nbsp;Add New Card</a>
                </div>
              </div>
            </div>
      
      {/* MODAL PRODUCT DETAIL BILA LIST PRODUCT DI KLIK AKAN MUNCUL DETAIL PRODUCT */}
      <ProductDetail
        isOpen={descModalIsOpen}
        ariaHideApp={false}
        style={{
          content: {
            top: "50px",
            left: "250px",
            right: "40px",
            bottom: "40px",
          },
        }}
      >
        <button
          onClick={() => setdescModalIsOpen(false)}
          style={{ float: "right" }}
          className="button-ud"
        >
          <FontAwesomeIcon
            icon={faWindowClose}
            size="2x"
            style={{ color: "red" }}
          />
        </button>
        <section className="product-detail">
          <div className="left-column">
            <Image
              src={userEdit.image}
              alt="A image of product"
              width={400}
              height={450}
            />
          </div>

          <div className="right-column">
            <div className="product-description">
              <span>{userEdit.category}</span>
              <h1 style={{ textAlign: "justify" }}>{userEdit.title}</h1>
              <p style={{ textAlign: "justify" }}>{userEdit.description}</p>
            </div>
          </div>
        </section>
      </ProductDetail>

      {/* MODAL EDIT PRODUCT */}
      <EditProduct
        isOpen={editModalIsOpen}
        ariaHideApp={false}
        style={{
          content: {
            top: "50px",
            left: "250px",
            right: "40px",
            bottom: "40px",
          },
        }}
      >
        <button
          onClick={() => seteditModalIsOpen(false)}
          style={{ float: "right" }}
          className="button-ud"
        >
          <FontAwesomeIcon
            icon={faWindowClose}
            size="2x"
            style={{ color: "red" }}
          />
        </button>
        <div>
          <section className="content-product">
            <section className="add-product">
              <h1> Edit Product</h1>
              <div className="form-container">
                <form id="form" className="form">
                  <div className="page">
                    <div className="form__group field">
                      <input
                        type="input"
                        className="form__field"
                        placeholder="Title"
                        name="id"
                        value={userEdit.id}
                        disabled
                      />
                      <label className="form__label">product id</label>
                    </div>
                    <div className="form__group field">
                      <input
                        type="input"
                        className="form__field"
                        placeholder="Title"
                        name="title"
                        onChange={handleChangeEdit}
                        value={userEdit.title}
                      />
                      <label className="form__label">Title</label>
                    </div>
                    <div className="form__group field">
                      <input
                        type="input"
                        className="form__field"
                        placeholder="Price"
                        name="price"
                        onChange={handleChangeEdit}
                        value={userEdit.price}
                      />
                      <label className="form__label">Price</label>
                    </div>
                    <div className="form__group field">
                      <input
                        type="input"
                        className="form__field"
                        placeholder="Description"
                        name="description"
                        onChange={handleChangeEdit}
                        value={userEdit.description}
                      />
                      <label className="form__label">Description</label>
                    </div>
                    <div className="form__group field">
                      <input
                        type="input"
                        className="form__field"
                        placeholder="Image"
                        name="image"
                        onChange={handleChangeEdit}
                        value={userEdit.image}
                      />
                      <label className="form__label">Image</label>
                    </div>
                    <div className="form__group field">
                      <input
                        type="input"
                        className="form__field"
                        placeholder="Category"
                        name="category"
                        onChange={handleChangeEdit}
                        value={userEdit.category}
                      />
                      <label className="form__label">Category</label>
                    </div>
                  </div>

                  <div className="button">
                    <button
                      className="bn54"
                      type="button"
                      onClick={handleUpdate}
                    >
                      <span className="bn54span">Update</span>
                    </button>
                  </div>
                </form>
              </div>
            </section>
          </section>
        </div>
      </EditProduct>

      <div className="Modal">
        {/* MODAL TAMBAH PRODUCT */}
        <Modal toggle={() => setModalIsOpen(!modalIsOpen)} isOpen={modalIsOpen}>
        <div className=" modal-header">
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
        </div>
        <ModalBody>
        <div class="row">
        <div class="col-md-12">
              <p class="text-uppercase text-sm">User Information</p>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="example-text-input" class="form-control-label">Nama Product</label>
                    <input
                        type="input"
                        className="form-control"
                        placeholder="Nama Product"
                        name="Nama_Product"
                        onChange={handleChange}
                        value={userInput.Nama_Product}
                      />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="example-text-input" class="form-control-label">TokenID</label>
                    <input
                        type="input"
                        className="form-control"
                        placeholder="TokenID"
                        name="TokenID"
                        onChange={handleChange}
                        value={userInput.TokenID}
                      />
                  </div>
                </div>
              </div>
              <hr class="horizontal dark"/>
              <p class="text-uppercase text-sm">Contact Information</p>
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <label for="example-text-input" class="form-control-label">Price</label>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Price"
                        name="Harga"
                        onChange={handleChange}
                        value={userInput.Harga}
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
          <Button onClick={handleSubmit} color="primary" type="button">
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
                      <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Product Name</th>
                      <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Function</th>
                      <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Status</th>
                      <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Employed</th>
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
                    <tr>
                       <td className="align-middle text-center text-sm">
                          <p className="text-xs font-weight-bold mb-0">{idx + 1}</p>
                      </td>
                      <td className="align-middle text-center text-sm">
                            <h6 className="mb-0 text-sm">{product.Nama_Product}</h6>
                      </td>
                      <td className="align-middle text-center text-sm">
                          <span className="text-secondary text-xs font-weight-bold">23/04/18</span>
                      </td>
                      <td className="align-middle text-center text-sm">
                        <span className="badge badge-sm bg-gradient-success">Online</span>
                      </td>
                      <td className="align-middle text-center">
                        <span className="text-secondary text-xs font-weight-bold">23/04/18</span>
                      </td>
                      <td className="align-middle">
                        {/* DETAIL PRODUCT */}
                        <a
                          onClick={() =>
                            setdescModalIsOpen(true) & handleEdit(product)
                          }
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
                            seteditModalIsOpen(true) & handleEdit(product)
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
