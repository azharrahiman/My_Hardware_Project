import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
function SignUp() {
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
  let [signUp, setSignUp] = useState({
    name: "",
    username: "",
    mobile: "",
    password: "",
    // authcode: "",
  });

  //authcode create another usestate
  let [authCode, setAuthCode] = useState({
    code: "",
  });

  let handleAuth = (event) => {
    let { name, value } = event.target;
    setAuthCode(() => {
      return { [name]: value };
    });
  };

  let handleSignUp = (event) => {
    let { name, value } = event.target;
    // console.log(name, value);
    setSignUp((preValues) => {
      return { ...preValues, [name]: value };
    });
  };

  let [confPass, setConfPass] = useState({
    pass: "",
  });

  let handleConfPass = (event) => {
    let { name, value } = event.target;
    // console.log(name, value);
    setConfPass(() => {
      return { [name]: value };
    });
  };

  let makeBlank = () => {
    setSignUp({
      name: "",
      username: "",
      mobile: "",
      password: "",
    });
    setConfPass({
      pass: "",
    });
    setAuthCode({
      code: "",
    });
  };

  let signUpSubmit = async () => {
    // console.log(confPass.pass);
    // console.log(signUp.password);
    if (signUp.name === "") {
      await Toast.fire({
        icon: "warning",
        title: "Enter your name",
      });
    } else if (signUp.username === "") {
      await Toast.fire({
        icon: "warning",
        title: "Enter username",
      });
    } else if (signUp.mobile === "") {
      await Toast.fire({
        icon: "warning",
        title: "Check Mobile Number",
      });
    } else if (signUp.password === "") {
      await Toast.fire({
        icon: "warning",
        title: "Enter Password",
      });
    } else if (signUp.password !== confPass.pass) {
      await Toast.fire({
        icon: "warning",
        title: "Password Mismatch",
      });
    } else if (confPass.pass === "") {
      await Toast.fire({
        icon: "warning",
        title: "Enter Confirm Password",
      });
    } else if (signUp.authcode === "") {
      await Toast.fire({
        icon: "warning",
        title: "Enter Authorization Code",
      });
    } else {
      if (authCode.code === "et") {
        // console.log(signUp);
        let { data } = await axios.post(
          "https://my-hardware-prj.herokuapp.com/api/signup",
          signUp
        );
        // console.log(data);
        // console.log(data.message);
        // console.log(data.status);
        if (data.status === true) {
          // console.log("success signup working");
          // console.log(data);
          makeBlank();
          Swal.fire({
            title: "Account Created",
            text: "Account Created Successfully..!!",
            icon: "success",
            confirmButtonText: "OK",
          });
          setTimeout(() => {
            window.location.reload("/");
          }, 2000);
        } else if (data.message === "user") {
          await Toast.fire({
            icon: "error",
            title: "Username already exists",
          });
        } else {
          await Toast.fire({
            icon: "error",
            title: "Mobile Number already exists",
          });
        }
      } else {
        await Toast.fire({
          icon: "error",
          title: "Wrong Authorization Code Contact Administrator",
        });
      }
    }
  };

  return (
    <>
      {/* <!-- Sign Up Modal --> */}
      <div
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
                  value={signUp.name}
                  onChange={handleSignUp}
                />
                <label for="email"> Preferred Username</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  name="username"
                  value={signUp.username}
                  onChange={handleSignUp}
                />
                <label for="mobile"> Mobile No</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder=""
                  name="mobile"
                  value={signUp.mobile}
                  onChange={handleSignUp}
                />
                <label for="psw"> Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder=""
                  name="password"
                  value={signUp.password}
                  onChange={handleSignUp}
                />
                <label for="psw">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder=""
                  name="pass"
                  value={confPass.pass}
                  onChange={handleConfPass}
                />
                <label for="psw"> Authorization Code</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder=""
                  name="code"
                  value={authCode.code}
                  onChange={handleAuth}
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
                onClick={makeBlank}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default SignUp;
