import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ImageUplaod from "./ImageUpload";

function EntryPage() {
  let getTokenDetails = () => {
    let token = localStorage.getItem("auth-token");
    if (token === null) {
      return false;
    } else {
      return true;
    }
  };
  let [isLogin, setIsLogin] = useState(getTokenDetails);

  let [inputData, setInputData] = useState({
    item_code: "",
    item: "",
    image: "",
    make: "",
    model: "",
    serial_number: "",
    purchase_date: "",
    installation_date: "",
    rate: "",
    amc_status: "",
    location: "",
    user: "",
    current_state: "",
    remarks: "",
  });
  let makeBlank = () => {
    setInputData({
      item_code: "",
      item: "",
      image: "",
      make: "",
      model: "",
      serial_number: "",
      purchase_date: "",
      installation_date: "",
      rate: "",
      amc_status: "",
      location: "",
      user: "",
      current_state: "",
      remarks: "",
    });
  };

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

  async function handleChange(event) {
    let { name, value } = event.target;

    if (name === "item" && value === "Desktop") {
      setInputData((preValues) => {
        return { ...preValues, item_code: "1" };
      });
    } else if (name === "item" && value === "Laptop") {
      setInputData((preValues) => {
        return { ...preValues, item_code: "2" };
      });
    } else if (name === "item" && value === "Printer") {
      setInputData((preValues) => {
        return { ...preValues, item_code: "3" };
      });
    } else if (name === "item" && value === "Switch") {
      setInputData((preValues) => {
        return { ...preValues, item_code: "4" };
      });
    } else if (name === "item" && value === "TV") {
      setInputData((preValues) => {
        return { ...preValues, item_code: "5" };
      });
    } else if (name === "item" && value === "UPS") {
      setInputData((preValues) => {
        return { ...preValues, item_code: "6" };
      });
    } else if (name === "item" && value === "VC") {
      setInputData((preValues) => {
        return { ...preValues, item_code: "7" };
      });
    }
    setInputData((preValues) => {
      return { ...preValues, [name]: value };
    });
  }

  let buttonSubmit = async (event) => {
    event.preventDefault();

    if (inputData.item === "") {
      await Toast.fire({
        icon: "warning",
        title: "Select Item",
      });
    } else if (inputData.make === "") {
      await Toast.fire({
        icon: "warning",
        title: "Enter Make",
      });
    } else if (inputData.model === "") {
      await Toast.fire({
        icon: "warning",
        title: "Enter Model",
      });
    } else if (inputData.serial_number === "") {
      await Toast.fire({
        icon: "warning",
        title: "Enter Serial Number",
      });
    } else if (inputData.purchase_date === "") {
      await Toast.fire({
        icon: "warning",
        title: "Enter Purchase Date",
      });
    } else if (inputData.location === "") {
      await Toast.fire({
        icon: "warning",
        title: "Select Location",
      });
    } else {
      let { data } = await axios.post(
        "https://my-hardware-prj.herokuapp.com/api/hardware-entry",
        inputData
      );
      // console.log(data);
      if (data.status === true) {
        Swal.fire({
          title: "Success",
          text: "Added to list",
          icon: "success",
          confirmButtonText: "OK",
        });
        makeBlank();
      } else {
        Swal.fire({
          title: "Error",
          text: "Serial Number Exists",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
      // console.log(inputData);
    }
  };

  let navigate = useNavigate();
  let goHome = () => {
    navigate("/");
  };
  return (
    <>
      <div className="entry_page">
        {isLogin ? (
          <form className="row entry_section ">
            {/* <!-- header --> */}

            <div className="col-4 d-flex mt-3 justify-content-center">
              <h1>Hardware Details</h1>
            </div>
            <span>
              <button
                className="btn btn-outline-light btn_entry_home"
                onClick={goHome}
              >
                Home
              </button>
            </span>
            {/* <!-- item  --> */}
            <div className="d-flex justify-content-center">
              <div className="col-3 m-2">
                <label className="form-label" for="item_name">
                  {" "}
                  Item <span>*</span>
                </label>
                <select
                  type="text"
                  className="form-select"
                  for="item_name"
                  onChange={handleChange}
                  name="item"
                  value={inputData.item}
                  placeholder="Enter device type"
                >
                  <option className="fw-bold selected "></option>
                  <option className="fw-bold  ">Desktop</option>
                  <option className="fw-bold  ">Laptop</option>
                  <option className="fw-bold  ">Printer</option>
                  <option className="fw-bold  ">Switch</option>
                  <option className="fw-bold  ">TV</option>
                  <option className="fw-bold  ">UPS</option>
                  <option className="fw-bold  ">VC</option>
                </select>
              </div>
              {/* <!-- make  --> */}
              <div className="col-3 m-2">
                <label className="form-label" for="make_model">
                  Make <span>*</span>
                </label>
                <input
                  for="make_model"
                  type="text"
                  name="make"
                  value={inputData.make}
                  onChange={handleChange}
                  className="form-control top"
                  placeholder="Enter Make and Model"
                />
              </div>
              {/* <!--  model --> */}
              <div className="col-3 m-2">
                <label className="form-label" for="make_model">
                  Model <span>*</span>
                </label>
                <input
                  for="make_model"
                  type="text"
                  value={inputData.model}
                  onChange={handleChange}
                  name="model"
                  className="form-control top"
                  placeholder="Enter Make and Model"
                />
              </div>
            </div>
            <div className="d-flex justify-content-center">
              {/* <!-- serial number --> */}
              <div className="col-3 m-2">
                <label className="form-label" for="Serial_number">
                  Serial Number <span>*</span>
                </label>
                <input
                  for="Serial_number"
                  type="text"
                  onChange={handleChange}
                  name="serial_number"
                  value={inputData.serial_number}
                  className="form-control"
                  placeholder="Enter Serial Number"
                />
              </div>
              {/* <!-- purchase date --> */}
              <div className="col-3 m-2">
                <label for="Purchase_date">
                  Purchase Date <span>*</span>
                </label>
                <input
                  for="Purchase_date"
                  name="purchase_date"
                  value={inputData.purchase_date}
                  onChange={handleChange}
                  type="date"
                  className="form-control form_color"
                  placeholder="Enter Purchase Date"
                />
              </div>
              {/* <!-- installation date --> */}
              <div className="col-3 m-2">
                <label className="form-input" for="installation_date">
                  Installation Date
                </label>
                <input
                  type="date"
                  name="installation_date"
                  value={inputData.installation_date}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter Installation date"
                />
              </div>
            </div>
            <div className="d-flex justify-content-center">
              {/* <!-- Rate --> */}
              <div className="col-3 m-2">
                <label className="form-input" for="rate">
                  Rate
                </label>
                <input
                  type="number"
                  name="rate"
                  value={inputData.rate}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter Rate"
                />
              </div>
              {/* <!-- amc status --> */}
              <div className="col-3 m-2">
                <label className="form-input" for="amc_status">
                  AMC Status
                </label>
                <select
                  type="text"
                  name="amc_status"
                  value={inputData.amc_status}
                  onChange={handleChange}
                  className="form-select"
                  placeholder="Enter AMC Status"
                >
                  <option className="fw-bold selected "></option>
                  <option className="fw-bold">In AMC</option>
                  <option className="fw-bold">Not in AMC</option>
                  <option className="fw-bold">NA</option>
                </select>
              </div>
              {/* <!-- location --> */}
              <div className="col-3 m-2">
                <label className="form-input" for="">
                  Location <span>*</span>
                </label>
                <select
                  type="text"
                  name="location"
                  value={inputData.location}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter Location"
                >
                  <option className="fw-bold selected "></option>
                  <option className="fw-bold">Kavaratti</option>
                  <option className="fw-bold">Kochi</option>
                  <option className="fw-bold">Minicoy</option>
                </select>
              </div>
            </div>
            <div className="d-flex justify-content-center">
              {/* <!-- user --> */}
              <div className="col-3 m-2">
                <label className="form-input" for="">
                  User
                </label>
                <input
                  type="text"
                  name="user"
                  value={inputData.user}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter user of hardware"
                />
              </div>
              {/* <!-- state --> */}
              <div className="col-3 m-2">
                <label className="form-input" for="">
                  Current State
                </label>
                <select
                  type="text"
                  name="current_state"
                  value={inputData.current_state}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter Current State"
                >
                  <option className="fw-bold selected "></option>
                  <option className="fw-bold">Working</option>
                  <option className="fw-bold">Not Working</option>
                  <option className="fw-bold">Damaged</option>
                </select>
              </div>
              {/* <!-- remarks --> */}
              <div className="col-3 m-2">
                <label className="form-input" for="">
                  {" "}
                  Remarks
                </label>
                <input
                  type="text"
                  name="remarks"
                  value={inputData.remarks}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter Remarks"
                />
              </div>
            </div>
            {/* <div className="d-flex justify-content-center">
              <div className="col-3 m-2">
                <label className="form-input" for="">
                  Upload Image
                </label>
                <input
                  type="file"
                  name="image"
                  value={inputData.image}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
            </div> */}

            {/* <!-- submit button --> */}
            <div className="col-4 d-flex justify-content-center m-4">
              <button onClick={buttonSubmit} className="btn btn-success w-50">
                Submit
              </button>
            </div>
          </form>
        ) : null}
      </div>
    </>
  );
}
export default EntryPage;
