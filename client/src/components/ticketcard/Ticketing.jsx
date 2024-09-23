import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import "./Ticketing.css";
import useFetch from "../../hooks/useFetch.js";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const Reserve = ({ setOpen, hallId, hname, hprice }) => {
  const [selectedSlots, setSelectedSlots] = useState([]);
  const[list,setList] = useState([]);
  const { data, loading, error } = useFetch(`/halls/slot/${hallId}`);
  const { dates } = useSelector((state) => state?.search);

  // Handle session storage and list initialization
    useEffect(() => {
      if (data) {
        sessionStorage.setItem("alldata", JSON.stringify(data));
        setList(data);  // Set list directly from fetched data
      } else {
        const sessionData = JSON.parse(sessionStorage.getItem("alldata") || "[]");
        setList(sessionData);
      }
    }, [data]);

  const navigate = useNavigate();

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());
    const dates = [];
    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return dates;
  };

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (slotNumber) => {
    const isFound = slotNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );
    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedSlots(
      checked ? [...selectedSlots, value] : selectedSlots.filter((item) => item !== value)
    );
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await Promise.all(
        selectedSlots.map((slotId) => {
          return  axios.put(`/slots/availabilty/${slotId}`, {
            dates: alldates,
          });
        })
      );
      setOpen(false);
      navigate("/payment/checkout", {
        state: { hallId, hname, hprice, selectedSlots, dates },
      });
    } catch (err) {
      toast.error("Error during reservation");
    }
  };

  if (loading) return <div className="absolute text-white font-semibold">Loading...</div>;
  if (error) return <div className="absolute text-white font-semibold">Error loading slots</div>;

  return (
    <div className="reserve">
      <div className="rContainer rounded-lg">
        <FontAwesomeIcon icon={faCircleXmark} className="rClose" onClick={() => setOpen(false)} />
        <span>Select your slot:</span>
        {loading ? (
          "Loading..."
        ) : error ? (
          "Error in loading"
        ) : list?.length === 0 ? (
          <div>No slots available</div>
        ) : (
          list.map((item) => (
            <div className="rItem" key={item._id}>
              <div className="rItemInfo">
                <div className="rTitle">{item.title}</div>
                <div className="rDesc">{item.desc}</div>
                <div className="rMax font-medium text-sm">
                  Capacity: <b className="text-green-500">{item.maxPeople}</b>
                </div>
                <div className="rPrice">
                  Price: <b className="text-green-500">{item.price}</b>
                </div>
              </div>
              <div className="rSelectRooms">
                {item.slotNumbers.map((slotNumber) => (
                  <div className="slot" key={slotNumber._id}>
                    <label>{slotNumber.number}</label>
                    {!isAvailable(slotNumber) ? (
                      "booked"
                    ) : (
                      <input
                        type="checkbox"
                        value={slotNumber._id}
                        onChange={handleSelect}
                        className="text-green-600"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
        <button onClick={handleClick} className="rButton">
          Book Now!!
        </button>
      </div>
    </div>
  );
};

export default Reserve;

