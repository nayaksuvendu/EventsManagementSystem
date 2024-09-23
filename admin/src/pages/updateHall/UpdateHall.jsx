import "./updateHall.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { hallInputs } from "../../components/stracture/forminputStr";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useLocation } from "react-router-dom";

const UpdateHall = () => {
  const [files, setFiles] = useState([]);
  const [info, setInfo] = useState({});
  const [slots, setSlots] = useState([]);

  const { state } = useLocation();
  const id = state; // Assuming state is the hall ID passed during navigation

  const { data, loading, error } = useFetch("/slots");

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSelect = (e) => {
    const value = Array.from(e.target.selectedOptions, (option) => option.value);
    setSlots(value);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/de6c4esfd/image/upload", // Fixed URL and method
            data
          );
          const { url } = uploadRes.data;
          return url;
        })
      );

      const updateHall = {
        ...info,
        slots,
        photos: list,
      };

      await axios.put(`/halls/${id}`, updateHall);
    } catch (err) {
      console.error("Error updating hall:", err); // Proper error handling
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1 className="title">Update Hall</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                files.length > 0
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label
                  htmlFor="file"
                  className=" shadow-lg h-full justify-center bg-slate-200 rounded-lg font-bold text-teal-600"
                >
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
                <label>Slots</label>
                <select id="slots" multiple onChange={handleSelect}>
                  {loading
                    ? "loading"
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
              <button onClick={handleClick}>Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateHall;


