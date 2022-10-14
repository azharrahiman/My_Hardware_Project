import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function EntryPage() {
  const { register, handleSubmit, errors } = useForm();
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

  function handleChange(event) {
    let { name, value } = event.target;
    // console.log(name);
    // console.log(value);
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
    } else if (name === "item" && value === "N/W Switch") {
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
    let empty = Object.entries(inputData).map((ele) => ele[1] === "");
    if (empty === true) {
      console.log("empty array");
    }
    console.log(...empty);

    // let { data } = await axios.post(
    //   "http://localhost/api/hardware-entry",
    //   inputData
    // );
    // console.log(data);
    // if (data.status === true) {
    //   console.log("done");
    // }
    // console.log(inputData);
  };

  let navigate = useNavigate();
  let goHome = () => {
    navigate("/");
  };
  return (
    <>
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
        <div className="col-4">
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
            placeholder="Enter device type"
          >
            <option className="fw-bold selected ">----Select Item---</option>
            <option className="fw-bold  ">Desktop</option>
            <option className="fw-bold  ">Laptop</option>
            <option className="fw-bold  ">Printer</option>
            <option className="fw-bold  ">N/W Switch</option>
            <option className="fw-bold  ">TV</option>
            <option className="fw-bold  ">UPS</option>
            <option className="fw-bold  ">VC</option>
          </select>
        </div>
        {/* <!-- make  --> */}
        <div className="col-4">
          <label className="form-label" for="make_model">
            Make <span>*</span>
          </label>
          <input
            for="make_model"
            type="text"
            name="make"
            onChange={handleChange}
            className="form-control top"
            placeholder="Enter Make and Model"
          />
        </div>
        {/* <!--  model --> */}
        <div className="col-4">
          <label className="form-label" for="make_model">
            Model <span>*</span>
          </label>
          <input
            for="make_model"
            type="text"
            onChange={handleChange}
            name="model"
            className="form-control top"
            placeholder="Enter Make and Model"
          />
        </div>
        {/* <!-- serial number --> */}
        <div className="col-4">
          <label className="form-label" for="Serial_number">
            Serial Number <span>*</span>
          </label>
          <input
            for="Serial_number"
            type="text"
            onChange={handleChange}
            name="serial_number"
            className="form-control"
            placeholder="Enter Serial Number"
          />
        </div>
        {/* <!-- purchase date --> */}
        <div className="col-4">
          <label for="Purchase_date">
            Purchase Date <span>*</span>
          </label>
          <input
            for="Purchase_date"
            name="purchase_date"
            onChange={handleChange}
            type="date"
            className="form-control form_color"
            placeholder="Enter Purchase Date"
          />
        </div>
        {/* <!-- installation date --> */}
        <div className="col-4">
          <label className="form-input" for="installation_date">
            Installation Date
          </label>
          <input
            type="date"
            name="installation_date"
            onChange={handleChange}
            className="form-control"
            placeholder="Enter Installation date"
          />
        </div>
        {/* <!-- Rate --> */}
        <div className="col-4">
          <label className="form-input" for="rate">
            Rate
          </label>
          <input
            type="number"
            name="rate"
            onChange={handleChange}
            className="form-control"
            placeholder="Enter Rate"
          />
        </div>
        {/* <!-- amc status --> */}
        <div className="col-4">
          <label className="form-input" for="amc_status">
            AMC Status
          </label>
          <select
            type="text"
            name="amc_status"
            onChange={handleChange}
            className="form-select"
            placeholder="Enter AMC Status"
          >
            <option className="fw-bold">In AMC</option>
            <option className="fw-bold">Not in AMC</option>
            <option className="fw-bold">NA</option>
          </select>
        </div>
        {/* <!-- location --> */}
        <div className="col-4">
          <label className="form-input" for="">
            Location
          </label>
          <select
            type="text"
            name="location"
            onChange={handleChange}
            className="form-control"
            placeholder="Enter Location"
          >
            <option className="fw-bold">Kavaratti</option>
            <option className="fw-bold">Kochi</option>
            <option className="fw-bold">Minicoy</option>
          </select>
        </div>
        {/* <!-- user --> */}
        <div className="col-4">
          <label className="form-input" for="">
            User
          </label>
          <input
            type="text"
            name="user"
            onChange={handleChange}
            className="form-control"
            placeholder="Enter user of hardware"
          />
        </div>
        {/* <!-- state --> */}
        <div className="col-4">
          <label className="form-input" for="">
            Current State
          </label>
          <select
            type="text"
            name="current_state"
            onChange={handleChange}
            className="form-control"
            placeholder="Enter Current State"
          >
            <option className="fw-bold">Working</option>
            <option className="fw-bold">Not Working</option>
            <option className="fw-bold">Damaged</option>
          </select>
        </div>
        {/* <!-- remarks --> */}
        <div className="col-4">
          <label className="form-input" for="">
            {" "}
            Remarks
          </label>
          <input
            type="text"
            name="remarks"
            onChange={handleChange}
            className="form-control"
            placeholder="Enter Remarks"
          />
        </div>
        {/* <!-- submit button --> */}
        <div className="col-4 d-flex justify-content-center m-4">
          <button onClick={buttonSubmit} className="btn btn-success w-50">
            Submit
          </button>
        </div>
      </form>
    </>
  );
}
export default EntryPage;
