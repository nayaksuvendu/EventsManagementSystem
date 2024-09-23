import "./newHall.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { hallInputs } from "../../components/stracture/forminputStr.js";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const NewHall = () => {
  const [files, setFiles] = useState([]);  // Changed to an array to handle multiple files
  const [info, setInfo] = useState({});
  const [slots, setSlots] = useState([]);

  // Fetch available slots
  const { data, loading, error } = useFetch("/slots");

  // Handle form field changes
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // Handle slot selection
  const handleSelect = (e) => {
    const value = Array.from(e.target.selectedOptions, (option) => option.value);
    setSlots(value);
  };

  // Handle form submission
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      // Check if files are uploaded before processing
      const uploadedImages = files.length > 0 ? await Promise.all(
        Array.from(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");

          const uploadRes = await axios.post(
            "https://res.cloudinary.com/de6c4esfd/image/upload",
            data
          );
          const { url } = uploadRes.data;
          return url;
        })
      ) : [];

      const newHall = {
        ...info,
        slots,
        photos: uploadedImages,
      };

      await axios.post("/halls", newHall);
      alert("Hall added successfully!");
    } catch (err) {
      console.error("Error adding new hall:", err);
      alert("There was an error adding the hall. Please try again.");
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1 className="title">Add New Hall</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                files.length > 0
                  ? URL.createObjectURL(files[0]) // Only display the first selected image
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file" className=" shadow-lg h-full justify-center bg-slate-200 rounded-lg font-bold text-teal-600">
                  Upload Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>

              {hallInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                  />
                </div>
              ))}

              <div className="formInput">
                <label htmlFor="type">Type</label>
                <select id="type" onChange={handleChange}>
                  <option value="Ac">Ac</option>
                  <option value="Non-Ac">Non-Ac</option>
                  <option value="Ac,Non-Ac">Ac & Non-Ac</option>
                </select>
              </div>

              <div className="flex-col flex h-16 cursor-pointer">
                <label htmlFor="slots">Slots</label>
                <select id="slots" multiple onChange={handleSelect}>
                  {loading
                    ? "Loading..."
                    : error
                    ? "Something went wrong..."
                    : data &&
                      data.map((slot) => (
                        <option key={slot._id} value={slot._id}>
                          {slot.title}
                        </option>
                      ))}
                </select>
              </div>

              <button onClick={handleClick}>Add</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewHall;
