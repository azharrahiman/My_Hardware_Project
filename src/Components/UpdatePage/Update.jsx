import Footer from "../HomePage/Footer";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
function Update() {
  let params = useParams();
  let { hw_id } = params;
  // console.log(hw_id);
  let [dispList, setDispList] = useState([]);

  let [inData, setInData] = useState({
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
  // let data;
  let getDispList = async () => {
    try {
      let { data } = await axios.get("https://my-hardware-prj.herokuapp.com/api/get/" + hw_id);
      if (data.status === true) {
        setDispList([...data.result]);
      } else {
        setDispList([]);
      }
    } catch (error) {
      alert("GetList server side error");
    }
  };
  let list = { ...dispList[0] };

  // console.log(list);

  useEffect(() => {
    getDispList();
  }, []);

  // console.log(displayList[0].item);
  // setList(displayList);
  // console.log(list);
  // console.log(displayList.item);

  let getTokenDetails = () => {
    let token = localStorage.getItem("auth-token");
    if (token === null) {
      return false;
    } else {
      return true;
    }
  };
  let [isLogin, setIsLogin] = useState(getTokenDetails);

  let makeBlank = () => {
    setInData({
      item_code: " ",
      item: " ",
      image: " ",
      make: " ",
      model: " ",
      serial_number: " ",
      purchase_date: " ",
      installation_date: " ",
      rate: " ",
      amc_status: " ",
      location: " ",
      user: " ",
      current_state: " ",
      remarks: " ",
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

  async function hndleChange(event) {
    let { name, value } = event.target;

    if (name === "item" && value === "Desktop") {
      setInData((preValues) => {
        return { ...preValues, item_code: "1" };
      });
    } else if (name === "item" && value === "Laptop") {
      setInData((preValues) => {
        return { ...preValues, item_code: "2" };
      });
    } else if (name === "item" && value === "Printer") {
      setInData((preValues) => {
        return { ...preValues, item_code: "3" };
      });
    } else if (name === "item" && value === "Switch") {
      setInData((preValues) => {
        return { ...preValues, item_code: "4" };
      });
    } else if (name === "item" && value === "TV") {
      setInData((preValues) => {
        return { ...preValues, item_code: "5" };
      });
    } else if (name === "item" && value === "UPS") {
      setInData((preValues) => {
        return { ...preValues, item_code: "6" };
      });
    } else if (name === "item" && value === "VC") {
      setInData((preValues) => {
        return { ...preValues, item_code: "7" };
      });
    }
    setInData((preValues) => {
      return { ...preValues, [name]: value };
    });
  }

  // let setitems = () => {
  //   if (inData.item || list.item === "Desktop") {
  //     setInData((preValues) => {
  //       return { ...preValues, item_code: "1" };
  //     });
  //     console.log(inData.item);
  //     console.log(inData.item_code);
  //     console.log(inData);
  //   } else if (inData.item === "Laptop") {
  //     setInData((preValues) => {
  //       return { ...preValues, item_code: "2" };
  //     });
  //   } else if (inData.item === "Printer") {
  //     setInData((preValues) => {
  //       return { ...preValues, item_code: "3" };
  //     });
  //   } else if (inData.item === "Switch") {
  //     setInData((preValues) => {
  //       return { ...preValues, item_code: "4" };
  //     });
  //   } else if (inData.item === "TV") {
  //     setInData((preValues) => {
  //       return { ...preValues, item_code: "5" };
  //     });
  //   } else if (inData.item === "UPS") {
  //     setInData((preValues) => {
  //       return { ...preValues, item_code: "6" };
  //     });
  //   } else if (inData.item === "VC") {
  //     setInData((preValues) => {
  //       return { ...preValues, item_code: "7" };
  //     });
  //   }
  // };

  let btnSubmit = async (event) => {
    event.preventDefault();

    if (inData.item_code === "") {
      await Toast.fire({
        icon: "warning",
        title: "Select Item",
      });
    } else {
      // setitems();

      // console.log(inData);
      let { data } = await axios.put(
        "https://my-hardware-prj.herokuapp.com/api/hardware-update/" + hw_id,
        inData
      );
      // console.log(data);
      if (data.status === true) {
        Swal.fire({
          title: "Success",
          text: "Details Updated",
          icon: "success",
          confirmButtonText: "OK",
        });
        makeBlank();
        setTimeout(() => {
          window.location.assign("/list/1");
        }, 1500);
      } else {
        Swal.fire({
          title: "Error",
          text: "Serial Number Exists",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
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

            <div className="col-6 d-flex mt-3 justify-content-center">
              <h1>Update Hardware Details</h1>
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
                  name="item"
                  value={inData.item}
                  onChange={hndleChange}
                  // placeholder="Enter device type"
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
                  value={inData.make ? inData.make : (inData.make = list.make)}
                  onChange={hndleChange}
                  // onChange={handleChange}
                  // onChange={handleChange}
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
                  value={
                    inData.model ? inData.model : (inData.model = list.model)
                  }
                  onChange={hndleChange}
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
                  value={
                    inData.serial_number
                      ? inData.serial_number
                      : (inData.serial_number = list.serial_number)
                  }
                  onChange={hndleChange}
                  name="serial_number"
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
                  value={
                    inData.purchase_date
                      ? inData.purchase_date
                      : (inData.purchase_date = list.purchase_date)
                  }
                  onChange={hndleChange}
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
                  value={
                    inData.installation_date
                      ? inData.installation_date
                      : (inData.installation_date = list.installation_date)
                  }
                  onChange={hndleChange}
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
                  value={inData.rate ? inData.rate : (inData.rate = list.rate)}
                  onChange={hndleChange}
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
                  value={
                    inData.amc_status
                      ? inData.amc_status
                      : (inData.amc_status = list.amc_status)
                  }
                  onChange={hndleChange}
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
                  value={
                    inData.location
                      ? inData.location
                      : (inData.location = list.location)
                  }
                  onChange={hndleChange}
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
                  value={inData.user ? inData.user : (inData.user = list.user)}
                  onChange={hndleChange}
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
                  value={
                    inData.current_state
                      ? inData.current_state
                      : (inData.current_state = list.current_state)
                  }
                  onChange={hndleChange}
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
                  value={
                    inData.remarks
                      ? inData.remarks
                      : (inData.remarks = list.remarks)
                  }
                  onChange={hndleChange}
                  className="form-control"
                  placeholder="Enter Remarks"
                />
              </div>
            </div>

            {/* <!-- submit button --> */}
            <div className="col-4 d-flex justify-content-center m-4">
              <button onClick={btnSubmit} className="btn btn-success w-50">
                Submit
              </button>
            </div>
          </form>
        ) : null}
      </div>
      <Footer />
    </>
  );
}
export default Update;
