import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2";

const Profiles = () => {
    const dispatch = useDispatch();
    const allProfileData = useSelector((state) => state.Profile);
    const { loading, error, profile } = allProfileData;

    //HANDLE CHANGE 
    const handleChange = (e) => {
        let data = { ...userInput };
        data[e.target.name] = e.target.value;
        setUserInput(data);
    };

    //INPUT DATA
    const [userInput, setUserInput] = useState({
        picture:"",
        username:"",
        email:"",
        bio:"",
        token:"",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            (userInput.picture === "",
            userInput.username === "",
            userInput.email === "",
            userInput.username === "",
            userInput.bio === "",
            userInput.token === "")
            ) {
                return false;
            }
            dispatch(
                addUsers({
                    picture: userInput.picture,
                    username: userInput.username,
                    email: userInput.email,
                    bio: userInput.bio,
                    token: userInput.token,
                })
            );
            Swal.fire(
                "Profile Berhasil Disimpan",
                "success"
            );

            setUserInput({
                picture:"",
                username:"",
                email:"",
                bio:"",
                token:"",
            });
        };

        return (
            <section className="content-product">
            <section className="add-product">
              <h1> Profile Setting </h1>
              <div className="form-container">
                <form id="form" className="form">
                  <div className="page">
                    <div className="form__group field">
                      <input
                        type="input"
                        className="form__field"
                        placeholder="enter username"
                        name="username"
                        onChange={handleChange}
                        value={userInput.username}
                      />
                      <label className="form__label">username</label>
                    </div>
                    <div className="form__group field">
                      <input
                        type="input"
                        className="form__field"
                        placeholder="enter email"
                        name="email"
                        onChange={handleChange}
                        value={userInput.email}
                      />
                      <label className="form__label">Email Address</label>
                    </div>
                    <div className="form__group field">
                      <textarea maxLength="100"
                        type="input"
                        className="form__field"
                        placeholder="Tell your description!"
                        name="bio"
                        onChange={handleChange}
                        value={userInput.bio}
                      />
                      <label className="form__label">bio</label>
                    </div>
                    <div className="form__group field">
                      <input
                        type="input"
                        className="form__field"
                        placeholder="token"
                        name="token"
                        onChange={handleChange}
                        value={userInput.lastname}
                      />
                      <label className="form__label">token</label>
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
          
        )
    }