import axios from "axios";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function Search() {
  let [allList, setAllList] = useState([]);

  let getTokenDetails = () => {
    let token = localStorage.getItem("auth-token");
    if (token === null) {
      return false;
    } else {
      return true;
    }
  };
  let [isLogin, setIsLogin] = useState(getTokenDetails);
  let navigate = useNavigate();
  let getListPage = (item) => {
    navigate("/list/" + item);
  };
  let gotoAddHwPage = () => {
    navigate("/entryPage");
  };
  let getListData = async () => {
    try {
      let dataFromDb = await axios.get("https://my-hardware-prj.herokuapp.com/api/get-list");
      let data = dataFromDb.data;
      if (data.status === true) {
        setAllList([...data.result]); //recreate array
      } else {
        setAllList([]);
      }
    } catch (error) {
      alert("server side error");
    }
  };
  let desktop = 0,
    laptop = 0,
    printer = 0,
    sw = 0,
    tv = 0,
    ups = 0,
    vc = 0;
  let countList = [...allList].map((ele) => {
    let newItem = ele.item.toString().toLowerCase();
    if (newItem === "desktop") ++desktop;
    if (newItem === "laptop") ++laptop;
    if (newItem === "printer") ++printer;
    if (newItem === "switch") ++sw;
    if (newItem === "tv") ++tv;
    if (newItem === "ups") ++ups;
    if (newItem === "vc") ++vc;
    // return ele.item_code
    // console.log(ele.item);
  });

  // console.log(countList);
  // console.log(desktop);
  // console.log(laptop);
  // console.log(desktop);
  useEffect(() => {
    getListData();
  }, []);
  // console.log(...allList);
  return (
    <>
      <section className="search_items_1">
        <div className="d-flex justify-content-center align-items-center">
          <header className="search_header">
            <h1>Search Hardwares</h1>
          </header>
          {isLogin ? (
            <button
              className="btn btn-success add_hardware_btn"
              onClick={gotoAddHwPage}
            >
              Add Hardware Details
            </button>
          ) : null}
        </div>
        <div className="search_images">
          {/* <!-- search section images --> */}

          <div className="d-flex flex-column align-items-center">
            <label htmlFor="" className="fw-bolder label_heading">
              Desktops
            </label>
            {/* {console.log("/public/images/" + eachList.image)} */}
            <img
              onClick={() => getListPage("1")}
              src="/images/computer.png"
              alt=""
            />
            <p className="fw-bold">Available : {desktop}</p>
          </div>

          <div className="d-flex flex-column align-items-center">
            <label htmlFor="" className="fw-bolder label_heading">
              Laptops
            </label>
            <img
              onClick={() => getListPage("2")}
              src="/images/laptop.png"
              alt=""
            />
            <p className="fw-bold">Available : {laptop}</p>
          </div>
          <div className="d-flex flex-column align-items-center">
            <label htmlFor="" className="fw-bolder label_heading">
              Printers
            </label>
            <img
              onClick={() => getListPage("3")}
              src="/images/printer.png"
              alt=""
            />
            <p className="fw-bold">Available : {printer}</p>
          </div>

          <div className="d-flex flex-column align-items-center">
            <label htmlFor="" className="fw-bolder label_heading">
              N/W Switches
            </label>
            <img
              onClick={() => getListPage("4")}
              src="/images/switch.png"
              alt=""
            />
            <p className="fw-bold">Available : {sw}</p>
          </div>
          <div className="d-flex flex-column align-items-center">
            <label htmlFor="" className="fw-bolder label_heading">
              TV
            </label>
            <img onClick={() => getListPage("5")} src="/images/tv.png" alt="" />
            <p className="fw-bold">Available : {tv}</p>
          </div>
          <div className="d-flex flex-column align-items-center">
            <label htmlFor="" className="fw-bolder label_heading">
              UPS
            </label>
            <img
              onClick={() => getListPage("6")}
              src="/images/ups.png"
              alt=""
            />
            <p className="fw-bold">Available : {ups}</p>
          </div>
          <div className="d-flex flex-column align-items-center">
            <label htmlFor="" className="fw-bolder label_heading">
              VC Systems
            </label>
            <img onClick={() => getListPage("7")} src="/images/vc.png" alt="" />
            <p className="fw-bold">Available : {vc}</p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
export default Search;
