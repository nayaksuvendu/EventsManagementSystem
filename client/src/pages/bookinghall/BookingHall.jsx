import Navbar from "../../components/navbar/Navbar.jsx";
import Searchbar from "../../components/searchbar/Searchbar.jsx";
import {  useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch.js";
import { useLocation, useNavigate } from "react-router-dom";
import Ticket from "../../components/ticketcard/Ticketing.jsx";
import { format } from "date-fns";
import { useSelector } from "react-redux";


const ListFeatured =  () => {

    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const [slideNumber,setSlideNumber]= useState(0);
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const { data} = useFetch(`/halls/find/${id}`);
    
    const {user}=useSelector((state) => state?.auth)
    const {dates}=useSelector((state) => state?.search)
 
    const navigate = useNavigate();
    const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

    function dayDifference(date1, date2) {
      const timeDiff = Math.abs(date2.getTime() - date1.getTime());
      const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
      return diffDays;
    }

    var days = dayDifference(dates[0].endDate, dates[0].startDate);
    if(days===0){
        days=days+1
    }
    
    const handleOpen = (i) => {
        setSlideNumber(i);
        setOpen(true);
    };

    const handleMove = (direction) => {
        let newSlideNumber;
        if (direction === "l") {
        newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
        } else {
        newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
        }

        setSlideNumber(newSlideNumber)
    };

    const handleClick = async (e) => {
        e.preventDefault();
        if (user) {
         await setOpenModal(true);
        } else {
          navigate("/login");

        }
      };

    return (
        <div className=" flexw flex-col w-full min-h-screen bg-gray-900 ">
        <Navbar />
        <div className="flex flex-col w-full  bg-gray-900">
        <Searchbar type="list" />  
        <div className="flex flex-col items-center mt-6">
            {open && (
            <div className=" sticky top-0 left-0 w-[100vw] h-[100vh] bg-black z-[999] flex items-center">
                <FontAwesomeIcon
                icon={faCircleXmark}
                className=" absolute top-5 right-5 cursor-pointer text-3xl text-gray-200"
                onClick={() => setOpen(false)}
                />
                <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="m-5 cursor-pointer text-5xl text-gray-200"
                onClick={() => handleMove("l")}
                />
                <div className=" w-full h-full flex justify-center items-center ">
                <img src={data.photos[slideNumber]} 
                alt="img" 
                className=" w-[80%] h-[80vh]" />
                </div>
                <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="m-5 cursor-pointer text-5xl text-gray-200"
                onClick={() => handleMove("r")}
                />
            </div>
            )}

         <div className="w-full max-w-[1024px] absolute grid  grid-cols-2 gap-6 top-36 justify-center items-center">
          <div className=" bg-orange-200 relative p-6 top-0 gap-2  justify-center items-center border-2 rounded-lg">  
            <button onClick={handleClick} className="absolute top-3 right-0 border-none p-2  bg-amber-500 hover:bg-amber-400 text-white font-bold cursor-pointer">Reserve or Book Now!</button>
            
            <h1 className="text-black uppercase font-bold">{data.name}</h1>
            <div className="text-xs flex items-center gap-3">
                <FontAwesomeIcon icon={faLocationDot} />
                <span>{data.address}</span>
            </div>
            <span className="font-medium text-black">
                Distance from city : {data.distance}
            </span>
            <br></br>
            <span className=" text-green-600 font-semibold">
                Event Hall Price: {data.affordableprice}
            </span>
            <div className="flex flex-wrap justify-between">
                {data.photos?.map((photo, i) => (
                <div className=" w-[33%]" key={i}>
                    <img
                    onClick={() => handleOpen(i)}
                    src={photo}
                    alt=""
                    className="w-full object-cover cursor-pointer border-2 shadow-lg"
                    />
                </div>
                ))}
             </div>
             <div className=" flex-[3]">
                <h1 className=" text-black text-xl font-medium first-letter:capitalize">{data.title}</h1>
                <p className=" mt-5 font-bold text-left text-neutral-700 first-letter:uppercase">
                    {data.desc}
                </p>
              </div>
           </div> 
            <div className=" relative  left-28  ">
                <div className=" flex-1 bg-teal-300 p-4 flex flex-col gap-5  shadow-lg text-wrap  border-2 rounded-md object-cover justify-center items-center flex-wrap ">
                <h1 className=" uppercase font-bold bg-teal-500 text-2xl text-white ">Description</h1>
                <span className=" font-bold text-violet-700">
                    Nice and Luxurious Hall With Decorations and Food Catering Available
                </span>
                <span className=" font-medium text-indigo-600">Selected Dates: {format(dates[0].startDate,"MM/dd/yyyy")} to {format(dates[0].endDate,"MM/dd/yyyy")}</span>

                <h2>
                    <b className=" text-green-700 font-bold">Rs.{days*data.affordableprice}</b> <span className=" text-indigo-600 font-bold ">({days} Days)</span> 
                </h2>
                <button onClick={handleClick} className=" btn-outline-lightborder-none p-3 bg-sky-600 text-white font-bold cursor-pointer rounded-md hover:bg-sky-700 ">Reserve or Book Now!</button>
                </div>
            </div>
            </div>
                      
        {openModal && <Ticket key={id} setOpen={setOpenModal} hallId={id} hname={data?.name} hprice={data?.affordableprice}/>}
        </div>
         </div>      
        </div>
    );
};

export default ListFeatured;

