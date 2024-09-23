import "./newSlot.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import { roomInputs } from "../../components/stracture/forminputStr";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const NewSlot = () => {
  const [info, setInfo] = useState({});
  const [hallId, setHallId] = useState(undefined);
  const [slots, setSlots] = useState("");

  // Fetch available halls
  const { data, loading, error } = useFetch("/halls");

  // Handle form field changes
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // Handle form submission
  const handleClick = async (e) => {
    e.preventDefault();

    if (!hallId) {
      alert("Please select a hall.");
      return;
    }

    const slotNumbers = slots
      .split(",")
      .map((slot) => slot.trim()) // Trim whitespace around each slot
      .filter((slot) => slot)      // Filter out empty values
      .map((slot) => ({ number: slot }));

    try {
      await axios.post(`/slots/${hallId}`, { ...info, slotNumbers });
      alert("Slots added successfully!");
    } catch (err) {
      console.error("Error adding slots:", err);
      alert("There was an error adding the slots. Please try again.");
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1 className="title">Add New Slots</h1>
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
              <div className="formInput">
                <label htmlFor="desc">Type</label>
                <select id="desc" onChange={handleChange}>
                  <option value="Ac">Ac</option>
                  <option value="Non-Ac">Non-Ac</option>
                  <option value="Ac,Non-Ac">Ac & Non-Ac</option>
                </select>
              </div>

              <div className="flex flex-col ">
                <label>Slots</label>
                <textarea
                 className="border-2 text-sky-500"
                  onChange={(e) => setSlots(e.target.value)}
                  placeholder="Provide slots separated by commas (e.g., morning, afternoon)"
                />
              </div>

              <div className="flex flex-col">
                <label>Choose a Hall</label>
                <select id="hallId" onChange={(e) => setHallId(e.target.value)}>
                  {loading
                    ? "Loading..."
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

              <button onClick={handleClick}>Add</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewSlot;
