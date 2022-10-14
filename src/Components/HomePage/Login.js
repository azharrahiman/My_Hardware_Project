import axios from "axios";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SignUp from "./SignUp";

function Login() {
  let token;
  let getTokenDetails = () => {
    token = localStorage.getItem("auth-token");
    // console.log(token);
    if (token === null) {
      return false;
    } else {
      return true;
    }
  };

  // let newName;
  let logout = () => {
    localStorage.removeItem("auth-token");
    // alert
    setIsLogin(false);
    Swal.fire({
      title: "Logged Out",
      text: "Logged Out Successfully...!",
      icon: "success",
      confirmButtonText: "OK",
    });
    setTimeout(() => {
      window.location.assign("/");
    }, 1500);
  };

  let [isLogin, setIsLogin] = useState(getTokenDetails);
  // console.log(isLogin);

  let [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const Toast = Swal.mixin({
    toast: true,
    position: "top",
    iconColor: "#FFCC00",
    customClass: {
      popup: "colored-toast",
    },
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
  });

  let handleLogin = (event) => {
    let { name, value } = event.target;
    setLoginData((preValues) => {
      return { ...preValues, [name]: value };
    });
  };

  // let [loginName, setLoginName] = useState("");
  let loginSubmit = async (event) => {
    event.preventDefault();
    // console.log(loginData);
    if (loginData.username === "") {
      await Toast.fire({
        icon: "warning",
        title: "Enter username",
      });
    } else if (loginData.password === "") {
      await Toast.fire({
        icon: "warning",
        title: "Enter Password",
      });
    } else {
      // console.log(loginData);

      let { data } = await axios.post(
        "http://127.0.0.1:8080/api/login",
        loginData
      );
      // newName = data.name;

      if (data.status === true) {
        // console.log(data);
        localStorage.setItem("auth-token", data.name);
        // newName = data.name;
        // console.log(newName);

        // console.log(newName);

        Swal.fire({
          title: "success",
          text: `Welcome ${data.name}`,
          icon: "success",
          confirmButtonText: "OK",
        });
        setTimeout(() => {
          window.location.reload("/");
        }, 1500);
      } else if (data.status === false) {
        Swal.fire({
          title: "Error",
          text: "Username or Password Incorrect...!",
          icon: "error",
          confirmButtonText: "OK",
        });
        setLoginData({ username: "", password: "" });
      }
    }
  };

  return (
    <>
      <section className="m-0 p-3  body_section">
        {/* <!-- button section --> */}
        {isLogin ? (
          <div>
            <span className="fs-5 text-white me-3">Welcome, {token}</span>
            <button className="btn btn-outline-danger fw-bold" onClick={logout}>
              Log Out
            </button>
          </div>
        ) : (
          <div className="buttons">
            <button
              className="btn btn-outline-light fw-bold"
              data-bs-toggle="modal"
              data-bs-target="#signIn"
              onClick={() => setLoginData({ username: "", password: "" })}
            >
              Sign In
            </button>
            <button
              className="btn btn-outline-light fw-bold"
              data-bs-toggle="modal"
              data-bs-target="#signUp"
            >
              Sign Up
            </button>
          </div>
        )}
        {/* <!-- modal section --> */}
        {/* <!-- Sign In Modal --> */}
        <div
          className="modal fade"
          id="signIn"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          {/* <!-- Modal body --> */}
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-bold" id="exampleModalLabel">
                  Login
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label className="fw-bold mb-2">Username</label>
                  <input
                    type="Email"
                    className="form-control"
                    placeholder="Email"
                    name="username"
                    value={loginData.username}
                    onChange={handleLogin}
                  />
                  <label className="fw-bold my-2">Password</label>
                  <input
                    type="Password"
                    className="form-control"
                    placeholder="Password"
                    name="password"
                    value={loginData.password}
                    onChange={handleLogin}
                  />
                </div>
                <button
                  type="submit"
                  onClick={loginSubmit}
                  className="btn mt-4 btn-success"
                >
                  Login
                </button>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-light"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Sign Up Modal --> */}
        {/* <div
          className="modal fade"
          id="signUp"
          tabindex="-1"
          aria-labelledby="ModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-bold" id="ModalLabel">
                  Login
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <div className="modal-body">
                <div className="form-group">
                  <label for="Name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder=""
                    name="name"
                    onchange={handleSignUp}
                  />
                  <label for="Email"> Email Address</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder=""
                    name="email"
                    onchange={handleSignUp}
                  />
                  <label for="psw"> Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder=""
                    name="password"
                    onchange={handleSignUp}
                  />
                  <label for="Con psw"> Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder=""
                    name="confpass"
                    onchange={handleSignUp}
                  />
                </div>
                <button
                  type="submit"
                  onClick={signUpSubmit}
                  className="btn mt-4 btn-success"
                >
                  Create Account
                </button>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-light"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div> */}
        <SignUp />
      </section>
    </>
  );
}
export default Login;
