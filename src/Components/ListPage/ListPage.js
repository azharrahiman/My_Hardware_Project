import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DisplayPage from "../DisplayHomePage/DisplayPage";
import { useParams } from "react-router-dom";
import Footer from "../HomePage/Footer";
import Swal from "sweetalert2";
import material from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import UpdateIcon from "@mui/icons-material/Update";
let filterCode = 0;

function ListPage() {
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
  let [isLogin, setIsLogin] = useState(getTokenDetails);

  let navigate = useNavigate();
  let params = useParams();

  let { item_code } = params;

  // console.log(item_code);
  // console.log(hw_id);
  let [filterList, setFilterList] = useState([]);
  let [sortList, setSortList] = useState([]);
  let [click, setClick] = useState(false);

  let filterOperation = async () => {
    let URL = "https://my-hardware-prj.herokuapp.com/api/filter/";
    setClick(false);
    // let filter = { itemCode: item_code };
    let filter = { itemCode: item_code };
    try {
      let { data } = await axios.post(URL, filter);
      if (data.status === true) {
        setFilterList([...data.result]);
      }
    } catch (error) {
      alert("server error");
      // console.log(error);
    }
  };

  let deleteData = async (id) => {
    await axios.delete("https://my-hardware-prj.herokuapp.com/api/" + id);
  };

  let deleteItem = async (id) => {
    try {
      Swal.fire({
        title: "Confirm Delete..?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Yes",
        denyButtonText: "No",
        customClass: {
          actions: "my-actions",
          cancelButton: "order-1 right-gap",
          confirmButton: "order-2",
          denyButton: "order-3",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Deleted.!", "", "success");
          deleteData(id);
          setTimeout(() => {
            window.location.reload("/");
          }, 1500);
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    } catch (error) {
      alert("server error");
      // console.log(error);
    }
  };

  let clickOperation = async (itemName) => {
    setClick(true);
    try {
      let { data } = await axios.get("https://my-hardware-prj.herokuapp.com/api/get-list");
      if (data.status === true) {
        setSortList(
          [...data.result].filter((ele) => {
            return itemName !== "all" ? ele.item_code === itemName : ele;
          })
        );

        // console.log(sortList);
      }
    } catch (error) {
      alert("server error");
      // console.log(error);
    }
  };

  let getDisplayPage = (id) => {
    navigate("/display/" + id);
  };
  let getUpdatePage = (id) => {
    navigate("/updatePage/" + id);
  };
  let goHome = () => {
    navigate("/");
  };
  useEffect(() => {
    // getData();
    filterOperation();
    // deleteItem();
  }, []);
  return (
    <>
      <div className="container-fluid d-flex flex-column mt-0 search_items">
        <section className="d-flex justify-content-center">
          <button
            type="button"
            class="btn  btn-outline-light p-2 m-4 fw-bold "
            onClick={goHome}
          >
            Home
          </button>
          <div class=" d-flex btn-group justify-content-center p-2 m-3">
            <button
              type="button"
              class="btn btn-success fw-bold "
              onClick={() => clickOperation("all")}
            >
              All
            </button>
            <button
              onClick={() => clickOperation(1)}
              type="button"
              class="btn btn-success fw-bold "
            >
              Desktops
            </button>
            <button
              onClick={() => clickOperation(2)}
              type="button"
              class="btn btn-success fw-bold "
            >
              Laptops
            </button>
            <button
              onClick={() => clickOperation(3)}
              type="button"
              class="btn btn-success fw-bold "
            >
              Printers
            </button>
            <button
              onClick={() => clickOperation(4)}
              type="button"
              class="btn btn-success fw-bold "
            >
              N/W Switches
            </button>
            <button
              onClick={() => clickOperation(5)}
              type="button"
              class="btn btn-success fw-bold "
            >
              TV
            </button>
            <button
              onClick={() => clickOperation(6)}
              type="button"
              class="btn btn-success fw-bold "
            >
              UPS
            </button>
            <button
              onClick={() => clickOperation(7)}
              type="button"
              class="btn btn-success fw-bold "
            >
              VC Systems
            </button>
          </div>
        </section>
        <section className="table_section">
          <div className="device">
            <table class="table table-bordered table-active">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Make</th>
                  <th>Model</th>
                  <th>Serial Number</th>
                  <th>Purchase Date</th>
                  <th>Installation Date</th>
                  <th>Rate</th>
                  <th>AMC Status</th>
                  <th>Location</th>
                  <th>User</th>
                  <th>Current State</th>
                  <th>Remarks</th>
                  <th>Action</th>
                </tr>

                {click
                  ? sortList.map((data, index) => {
                      return (
                        <tr key={index}>
                          <td>{data.item}</td>
                          <td>{data.make}</td>
                          <td>{data.model}</td>
                          <td>{data.serial_number}</td>
                          <td>{data.purchase_date}</td>
                          <td>{data.installation_date}</td>
                          <td>{data.rate}</td>
                          <td>{data.amc_status}</td>
                          <td>{data.location}</td>
                          <td>{data.user}</td>
                          <td>{data.current_state}</td>
                          <td>{data.remarks}</td>
                          <td className="d-flex">
                            <button
                              type="button"
                              class="btn  btn-outline-info"
                              onClick={() => getDisplayPage(data._id)}
                            >
                              <VisibilityIcon />
                            </button>
                            {isLogin ? (
                              <div className="d-flex">
                                <button
                                  type="button"
                                  class="btn ms-2 btn-outline-danger"
                                  onClick={() => deleteItem(data._id)}
                                >
                                  <DeleteIcon />
                                </button>
                                <button
                                  type="button"
                                  class="btn ms-2 btn-outline-warning"
                                  onClick={() => getUpdatePage(data._id)}
                                >
                                  <UpdateIcon />
                                </button>
                              </div>
                            ) : null}
                          </td>
                        </tr>
                      );
                    })
                  : filterList.map((data, index) => {
                      return (
                        <tr key={index}>
                          <td>{data.item}</td>
                          <td>{data.make}</td>
                          <td>{data.model}</td>
                          <td>{data.serial_number}</td>
                          <td>{data.purchase_date}</td>
                          <td>{data.installation_date}</td>
                          <td>{data.rate}</td>
                          <td>{data.amc_status}</td>
                          <td>{data.location}</td>
                          <td>{data.user}</td>
                          <td>{data.current_state}</td>
                          <td>{data.remarks}</td>
                          <td className="d-flex">
                            <button
                              type="button"
                              class="btn  btn-outline-info"
                              onClick={() => getDisplayPage(data._id)}
                            >
                              <VisibilityIcon />
                            </button>
                            {isLogin ? (
                              <div className="d-flex">
                                <button
                                  type="button"
                                  class="btn ms-2 btn-outline-danger"
                                  onClick={() => deleteItem(data._id)}
                                >
                                  <DeleteIcon />
                                </button>
                                <button
                                  type="button"
                                  class="btn ms-2 btn-outline-warning"
                                  onClick={() => getUpdatePage(data._id)}
                                >
                                  <UpdateIcon />
                                </button>
                              </div>
                            ) : null}
                          </td>
                        </tr>
                      );
                    })}

                {/* {sortList.map((data, index) => {
                return (
                  <tr key={index}>
                    <td>{data.item}</td>
                    <td>{data.make}</td>
                    <td>{data.model}</td>
                    <td>{data.serial_number}</td>
                    <td>{data.purchase_date}</td>
                    <td>{data.installation_date}</td>
                    <td>{data.rate}</td>
                    <td>{data.amc_status}</td>
                    <td>{data.location}</td>
                    <td>{data.user}</td>
                    <td>{data.current_state}</td>
                    <td>{data.remarks}</td>
                    <td>
                      <button
                        type="button"
                        class="btn  btn-primary"
                        onClick={() => getDisplayPage(data._id)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                );
              })} */}
              </thead>
            </table>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
export default ListPage;
