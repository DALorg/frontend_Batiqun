import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUsers, getUsers, addUsers } from "../redux/actions/userActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPen,
  faWindowClose,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/Users.module.scss";
import DetailUser from "react-modal";
import Swal from "sweetalert2";
import AddUser from "react-modal";

(AddUser, DetailUser).setAppElement();

const Users = () => {
  const dispatch = useDispatch();
  const allUsersData = useSelector((state) => state.Users);
  const { loading, error, users } = allUsersData;

  // MODAL
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [detailUserOpen, setDetailUserOpen] = useState(false);
  const [editModalIsOpen, seteditModalIsOpen] = useState(false);

  // LOAD DATA
  useEffect(() => {
    dispatch(getUsers());
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

  // ADD USER
  const [userInput, setUserInput] = useState({
    email: "",
    username: "",
    password: "",
    name: { firstname: "", lastname: "" },
    address: { city: "", street: "", number: "", zipcode: "" },
    phone: "",
  });

  // EDIT AND UPDATE USER
  const [userEdit, setUserEdit] = useState({
    id: "",
    email: "",
    username: "",
    fullname: "",
    phone: "",
    address: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      (userInput.email === "",
      userInput.username === "",
      userInput.password === "",
      userInput.name.firstname === "",
      userInput.name.lastname === "",
      userInput.address.city === "",
      userInput.address.street === "",
      userInput.address.number === "",
      userInput.address.zipcode === "",
      userInput.phone === "")
    ) {
      return false;
    }

    dispatch(
      addUsers({
        email: userInput.email,
        username: userInput.username,
        password: userInput.password,
        firstname: userInput.name.firstname,
        lastname: userInput.name.lastname,
        city: userInput.address.city,
        street: userInput.address.street,
        number: userInput.address.number,
        zipcode: userInput.address.zipcode,
        phone: userInput.phone,
      })
    );
    Swal.fire(
      "Berhasil Tambah User!",
      "Username " + userInput.username + " Berhasil di Tambah!",
      "success"
    );

    setUserInput({
      email: "",
      username: "",
      password: "",
      name: { firstname: "", lastname: "" },
      address: { city: "", street: "", number: "", zipcode: "" },
      phone: "",
    });
  };

  const handleEdit = (user) => {
    setUserEdit({
      id: user.id,
      email: user.email,
      username: user.username,
      fullname: user.name.firstname + " " + user.name.lastname,
      phone: user.phone,
      address:
        user.address.street +
        ", No. " +
        user.address.number +
        ", " +
        user.address.city +
        ", " +
        user.address.zipcode,
    });
    console.log("User = " + user.id);
  };

  return (
    <section className="article">
      <title>Users</title>
      <h1
        style={{
          lineHeight: "0px",
          marginTop: "80px",
          fontFamily: "Quando",
        }}
      >
        List User
      </h1>

      {/* Modal */}
      <div className="Modal">
        {/* MODAL TAMBAH USER */}
        <AddUser
          isOpen={addUserOpen}
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
            onClick={() => setAddUserOpen(false)}
            style={{ float: "right" }}
            className="button-ud"
          >
            <FontAwesomeIcon
              icon={faWindowClose}
              size="2x"
              style={{ color: "red" }}
            />
          </button>
          <section className="content-product">
            <section className="add-product">
              <h1> New User </h1>
              <div className="form-container">
                <form id="form" className="form">
                  <div className="page">
                    <div className="form__group field">
                      <input
                        type="input"
                        className="form__field"
                        placeholder="Email"
                        name="email"
                        onChange={handleChange}
                        value={userInput.email}
                      />
                      <label className="form__label">Email</label>
                    </div>
                    <div className="form__group field">
                      <input
                        type="input"
                        className="form__field"
                        placeholder="Username"
                        name="username"
                        onChange={handleChange}
                        value={userInput.username}
                      />
                      <label className="form__label">Username</label>
                    </div>
                    <div className="form__group field">
                      <input
                        type="password"
                        className="form__field"
                        placeholder="Password"
                        name="password"
                        onChange={handleChange}
                        value={userInput.password}
                      />
                      <label className="form__label">Password</label>
                    </div>
                    <div className="form__group field">
                      <input
                        type="input"
                        className="form__field"
                        placeholder="Firstname"
                        name="firstname"
                        onChange={handleChange}
                        value={userInput.firstname}
                      />
                      <label className="form__label">Firstname</label>
                    </div>
                    <div className="form__group field">
                      <input
                        type="input"
                        className="form__field"
                        placeholder="Lastname"
                        name="lastname"
                        onChange={handleChange}
                        value={userInput.lastname}
                      />
                      <label className="form__label">Lastname</label>
                    </div>
                    <div className="form__group field">
                      <input
                        type="input"
                        className="form__field"
                        placeholder="Street"
                        name="street"
                        onChange={handleChange}
                        value={userInput.street}
                      />
                      <label className="form__label">Street</label>
                    </div>
                    <div className="form__group field">
                      <input
                        type="input"
                        className="form__field"
                        placeholder="City"
                        name="city"
                        onChange={handleChange}
                        value={userInput.city}
                      />
                      <label className="form__label">City</label>
                    </div>
                    <div className="form__group field">
                      <input
                        type="input"
                        className="form__field"
                        placeholder="Number"
                        name="number"
                        onChange={handleChange}
                        value={userInput.number}
                      />
                      <label className="form__label">Zipcode</label>
                    </div>
                    <div className="form__group field">
                      <input
                        type="number"
                        className="form__field"
                        placeholder="Phone"
                        name="phone"
                        onChange={handleChange}
                        value={userInput.phone}
                      />
                      <label className="form__label">Phone</label>
                    </div>
                  </div>

                  <div className="button">
                    <button
                      className="bn54"
                      type="button"
                      onClick={handleSubmit}
                    >
                      <span className="bn54span">Submit</span>
                    </button>
                  </div>
                </form>
              </div>
            </section>
          </section>
          <br />
        </AddUser>
      </div>

      <DetailUser
        isOpen={detailUserOpen}
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
          onClick={() => setDetailUserOpen(false)}
          style={{ float: "right" }}
          className="button-ud"
        >
          <FontAwesomeIcon
            icon={faWindowClose}
            size="2x"
            style={{ color: "red" }}
          />
        </button>
        <section style={{ fontSize: "24px" }}>
          <table>
            <tr>
              <td>id </td>
              <td> : </td>
              <td>{userEdit.id}</td>
            </tr>
            <tr>
              <td>email </td>
              <td> : </td>
              <td>{userEdit.email}</td>
            </tr>
            <tr>
              <td>username </td>
              <td> : </td>
              <td>{userEdit.username}</td>
            </tr>
            <tr>
              <td>fullname </td>
              <td>: </td>
              <td>{userEdit.fullname}</td>
            </tr>
            <tr>
              <td>phone </td>
              <td> : </td>
              <td>{userEdit.phone}</td>
            </tr>
            <tr>
              <td>address </td>
              <td> : </td>
              <td>{userEdit.address}</td>
            </tr>
          </table>
        </section>
      </DetailUser>

      <div className="Header">
        <button onClick={() => setAddUserOpen(true)} className="bn54">
          Create User
        </button>

        {/* SEACRH PRODUCT BY TITLE */}
        <div className="search">
          <form id="animated">
            {" "}
            <input
              name={inputSearch}
              type="text"
              placeholder="Search User Here..."
              onChange={handleChangeSearch}
              value={inputSearch}
              className="input-search"
            />
          </form>
        </div>
      </div>
      <div>
        <div className={styles.list}>
          <div className="id">
            <p>No.</p>
          </div>

          <div className={styles.leftcolumn}>
            <p>Name</p>
          </div>

          <div className={styles.rightcolumn}>
            <p>Username</p>
          </div>

          <div className={styles.actioncolumn}>
            <p>Action</p>
          </div>
        </div>
        <hr />
        {loading
          ? "Loading..."
          : error
          ? error.message
          : users
              .filter((user) => {
                if (inputSearch === "") {
                  return user;
                } else if (
                  user.name.firstname
                    .toLowerCase()
                    .includes(inputSearch.toLocaleLowerCase())
                ) {
                  return user;
                } else if (
                  user.name.lastname
                    .toLowerCase()
                    .includes(inputSearch.toLocaleLowerCase())
                ) {
                  return user;
                } else if (
                  user.email
                    .toLowerCase()
                    .includes(inputSearch.toLocaleLowerCase())
                ) {
                  return user;
                } else if (
                  user.username
                    .toLowerCase()
                    .includes(inputSearch.toLocaleLowerCase())
                ) {
                  return user;
                }
              })
              .map((user) => (
                // .map((u) => (
                <div key={user.id}>
                  <div className={styles.list}>
                    <div className="id">
                      <p>{user.id}</p>
                    </div>

                    <div className={styles.leftcolumn}>
                      <p>
                        {user.name.firstname} {user.name.lastname}
                      </p>
                    </div>

                    <div className={styles.rightcolumn}>
                      <p>{user.username}</p>
                    </div>

                    <div className={styles.actioncolumn}>
                      {/* DETAIL USER */}
                      <button
                        onClick={() =>
                          setDetailUserOpen(true) & handleEdit(user)
                        }
                        className="button-ud"
                      >
                        <FontAwesomeIcon
                          icon={faInfoCircle}
                          size="1x"
                          style={{ color: "green" }}
                        />
                      </button>

                      {/* EDIT PRODUCT */}
                      <button
                        onClick={() =>
                          seteditModalIsOpen(true) & handleEdit(user)
                        }
                        className="button-ud"
                      >
                        <FontAwesomeIcon
                          icon={faPen}
                          size="1x"
                          style={{ color: "blue" }}
                        />
                      </button>

                      {/* DELETE PRODUCT */}
                      <button
                        onClick={() =>
                          dispatch(
                            deleteUsers(user.id),
                            Swal.fire(
                              "Berhasil Menghapus!",
                              "User " + user.username + " Berhasil di Hapus!",
                              "success"
                            )
                          )
                        }
                        className="button-ud"
                      >
                        <FontAwesomeIcon
                          icon={faTrash}
                          size="1x"
                          style={{ color: "red" }}
                        />
                      </button>
                    </div>
                  </div>
                  <hr />
                </div>
              ))}
      </div>
    </section>
  );
};

export default Users;
