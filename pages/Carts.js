import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCarts } from "../redux/actions/cartActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPen,
  faWindowClose,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/Users.module.scss";

const Carts = () => {
  const dispatch = useDispatch();
  const allCarts = useSelector((state) => state.Carts);
  const { loading, error, carts } = allCarts;

  // LOAD DATA
  useEffect(() => {
    dispatch(getCarts());
  }, []);

  return (
    <div>
      <section className="article">
        <title>Carts</title>
        <h1 style={{ lineHeight: "0px", marginTop: "80px" }}>List Cart</h1>
        <div>
          {loading
            ? "Loading..."
            : error
            ? error.message
            : carts.map((cart) => (
                <div>
                  <div className={styles.list} key={cart.id}>
                    <div className="id">
                      <span>{cart.id}</span>
                    </div>

                    <div
                      className={styles.leftcolumn}
                      style={{ lineHeight: "0px" }}
                    >
                      <span style={{ textAlign: "justify" }}>
                        <p>test</p>
                        <p>test</p>
                        <p>test</p>
                      </span>
                    </div>

                    <div className={styles.rightcolumn}>
                      <span>test</span>
                    </div>

                    <div className={styles.actioncolumn}>
                      {/* DETAIL PRODUCT */}
                      <button
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
                      </button>

                      {/* EDIT PRODUCT */}
                      <button
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
                      </button>

                      {/* DELETE PRODUCT */}
                      <button
                        onClick={() =>
                          dispatch(
                            deleteProduct(product.id),
                            Swal.fire(
                              "Berhasil Menghapus!",
                              "Product " +
                                product.title +
                                " Berhasil di Hapus!",
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
    </div>
  );
};

export default Carts;
