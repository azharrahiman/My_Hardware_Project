import { useState } from "react";

function ImageUpload() {
  const [image, setImage] = useState("");

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

  const handleImageUpload = (event) => {
    // console.log(event.target.files);
    setImage(event.target.files[0]);
    console.log(image);
  };

  let handleUploadSubmit = (event) => {
    let { name, value } = event.target;
    setInputData((preValues) => {
      return { ...preValues, [name]: value };
    });
  };

  return (
    <>
      <div className="col-3 m-2">
        <label className="form-input" for="">
          Upload Image
        </label>
        <input
          type="file"
          name="image"
          onChange={handleImageUpload}
          className="form-control"
        />
      </div>
    </>
  );
}
export default ImageUpload;
