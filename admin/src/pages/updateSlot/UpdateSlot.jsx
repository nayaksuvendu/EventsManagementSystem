import "./updateSlot.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import { roomInputs } from "../../components/stracture/forminputStr";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useLocation } from "react-router-dom";

const UpdateSlot = () => {
  const [info, setInfo] = useState({});
  const [slots, setSlots] = useState("");
  const [hallId, setHallId] = useState("");  // State to store selected hall ID
  const { data, loading, error } = useFetch("/halls");

  const { state } = useLocation();
  const id = state; // Assuming state is passed with the correct id

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const slotNumbers = slots.split(",").map((slot) => ({ number: slot.trim() }));
    try {
      await axios.put(`/slots/${id}`, { ...info, slotNumbers, hallId });
      alert("Slot updated successfully!"); // Display a success message
    } catch (err) {
      console.error("Error updating slot:", err); // Proper error logging
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1 className="title">Update Slot</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {roomInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                  />
                </div>
              ))}

              <div className="flex flex-col">
                <label>Slots</label>
                <textarea
                  onChange={(e) => setSlots(e.target.value)}
                  placeholder="Give comma between slots (ex: morning, afternoon...)"
                />
              </div>

              <div className="formInput">
                <label>Choose a Hall</label>
                <select id="hallId" onChange={(e) => setHallId(e.target.value)}> {/* Set selected hall */}
                  {loading
                    ? "Loading...."
                    : error
                    ? "Something went wrong..."
                    : data &&
                      data.map((hall) => (
                        <option key={hall._id} value={hall._id}>
                          {hall.name}
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

export default UpdateSlot;

