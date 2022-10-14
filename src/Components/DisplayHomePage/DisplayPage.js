import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function DisplayPage() {
  let params = useParams();
  let { hw_id } = params;
  let navigate = useNavigate();

  // console.log(hw_id);
  let goBack = () => {
    navigate("/list/1");
  };

  let [displayList, setDisplayList] = useState([]);
  let getDisplayList = async () => {
    try {
      let { data } = await axios.get("http://127.0.0.1:8080/api/get/" + hw_id);

      if (data.status === true) {
        setDisplayList([...data.result]);
      } else {
        setDisplayList([]);
      }
    } catch (error) {
      alert("server side error");
    }
  };

  let list = { ...displayList[0] };
  // console.log(list);

  useEffect(() => {
    getDisplayList();
  }, []);
  return (
    <>
      <div className="cont ">
        <div className="topic m-5">
          <h2>{list.item}</h2>
        </div>

        {/* <div className="image mb-2">
          <img
            src="/images/uploadImages/myHP.png"
            alt="..."
            className="img-thumbnail"
            width="250"
            height="250"
          />
        </div> */}
        {/* {displayList.map(() => {
            return ( */}
        <div className="d-flex ">
          <div className="content">
            <p className="item_name">Make </p>
            <p className="item_des">{list.make}</p>
          </div>
          <div className="content">
            <p className="item_name">Model </p>
            <p className="item_des">{list.model}</p>
          </div>
          <div className="content">
            <p className="item_name">Serial Number </p>
            <p className="item_des">{list.serial_number}</p>
          </div>
        </div>
        <div className="d-flex ">
          <div className="content">
            <p className="item_name">Purchase Date </p>
            <p className="item_des">{list.purchase_date}</p>
          </div>
          <div className="content">
            <p className="item_name">Installation Date </p>
            <p className="item_des">{list.installation_date}</p>
          </div>
          <div className="content">
            <p className="item_name">AMC Status </p>
            <p className="item_des">{list.amc_status}</p>
          </div>
        </div>
        <div className="d-flex ">
          <div className="content">
            <p className="item_name">Rate </p>
            <p className="item_des">{list.rate}</p>
          </div>
          <div className="content">
            <p className="item_name">Location </p>
            <p className="item_des">{list.location}</p>
          </div>
          <div className="content">
            <p className="item_name">User </p>
            <p className="item_des">{list.user}</p>
          </div>
        </div>
        <div className="d-flex ">
          <div className="content">
            <p className="item_name">Current State </p>
            <p className="item_des">{list.current_state}</p>
          </div>
          <div className="content">
            <p className="item_name">Remarks </p>
            <p className="item_des">{list.remarks}</p>
          </div>
        </div>

        {/* );
          })} */}

        <div className="button">
          <button
            type="button"
            className="btn btn-primary btn-lg"
            onClick={goBack}
          >
            Close
          </button>
        </div>
        <div className="footer"></div>
      </div>
    </>
  );
}
export default DisplayPage;
