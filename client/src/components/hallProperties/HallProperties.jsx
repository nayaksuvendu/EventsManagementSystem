import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import {  useState } from "react";
import { DateRange } from "react-date-range";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { setDates } from "../../Redux/Slice/SearchSlice";
import { useDispatch } from "react-redux";

const FeaturedProperties = () => {

  const dispatch = useDispatch();
  const { data, loading, error } = useFetch("/halls?featured=true&limit=4");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleClick = () => {
    dispatch(setDates(dates));
  };

  return (
    <div className="w-full text-white flex justify-center items-center">
      {loading ? (
        "Loading..."
      ) : error ? (
        <div className="text-white font-bold">Error in loading data</div>
      ) : (
        <div className="flex justify-between gap-4">
          {data.map((item) => (
            <div
              className="flex-1 flex flex-col gap-2 transition-transform duration-300 ease-in-out hover:scale-105"
              key={item._id}
            >
              <Link to={`/fhalls/${item._id}`}>
                <img
                  src={item.photos[0]}
                  alt="img"
                  className="w-full h-[250px] object-cover border-2 rounded-lg shadow-lg cursor-pointer"
                  onClick={handleClick}
                />
              </Link>
              <span className="text-white font-bold uppercase">{item.name}</span>
              <span className="text-white text-sm uppercase">{item.city}</span>
              <span className="text-white capitalize"> {item.title}</span>
              <span className="text-green-500 font-semibold">Starting from Rs. {item.affordableprice}</span>

              <div className="text-green-500 flex items-center">
                <FontAwesomeIcon icon={faCalendar} className="mr-2" />
                <span onClick={() => setOpenDate(!openDate)} className="cursor-pointer">
                  {`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}
                </span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDate([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className="absolute z-10 mt-2"
                    minDate={new Date()}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedProperties;
