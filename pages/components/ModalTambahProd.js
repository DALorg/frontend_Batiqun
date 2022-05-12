import { Modal, ModalBody, ModalFooter, Button } from 'reactstrap';
import React, { useState } from "react";
const AddProdModal = ({modalIsOpen}) => {

    const handleChangeEdit = (e) => {
        let data = { ...userEdit };
        data[e.target.name] = e.target.value;
        setUserEdit(data);
      };

    const handleFile = (e) =>{
        let data = { ...userEdit };
        let file = e.target.files[0];
        data[e.target.name] = file;
    
        setUserEdit(data);
      };

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
    <div className="Modal">
    {/* MODAL TAMBAH PRODUCT */}
    <Modal className="bd-example-modal-lg" toggle={() => setModalIsOpen(!modalIsOpen)} isOpen={modalIsOpen}>
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
    </div>)

};

export default AddProdModal;