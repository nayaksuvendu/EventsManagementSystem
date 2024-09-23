import {  faCalendar, faCalendarDay, faLocation, faPerson  } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {format } from "date-fns"
import {  useState } from "react"
import { DateRange } from "react-date-range"
import "./Searchbar.css"
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { useNavigate } from "react-router-dom"
import {newSearch} from '../../Redux/Slice/SearchSlice'
import { useDispatch } from "react-redux"

const Header = ({type}) =>{
    const dispatch = useDispatch();
    const [destination, setDestination] = useState("");
    const [event,setEvent]=useState("");
    const [openDate,setOpenDate]= useState(false)
    const [dates,setDates]= useState([      
        {
            startDate:new Date(),
            endDate: new Date(),
            key:'selection',
        }
        
    ]);

    
    const [openOptions,setOpenOptions]=useState(false);
    const [options,setOptions]=useState({
        capacity:1,
    });

    const navigate =  useNavigate();

    const handleOption = (name,operation) =>{
        setOptions(prev=> {return{
            ...prev,[name]:operation === "i" ? options[name] +50 : options[name]-50
        }})
    };

    const handleSearch=()=>{
        if(!event || !destination){
            alert("Event and Destination cannot be empty")
            navigate("/")
        }
        else{
            dispatch(newSearch( {destination, event, dates, options} ))
            navigate("/halls",{state:{destination, event, dates, options}}) ;
        }
       
    }
    

    return(
        <div className="header">
            <div className={type === "list" ? "headerContainer listMode" : "headerContainer"}> 

                { type !== "list" &&
                <>
                <br/>
                <div className="headerSearch">
                   
                <div className="headerSearchItem ">
                      <label htmlFor="choice" ><FontAwesomeIcon icon={faLocation} className="headerIcon"/></label>
                       <select id="choice" value={destination} onChange={(e) => setDestination(e.target.value)}>
                       <option value="choice"> select location</option>
                       <option value="Hyderabad" > Hyderabad</option>
                       <option value="vijayawada">Vijayawada</option>
                      </select>
                    </div>
                <div className="headerSearchItem ">
                      <label htmlFor="choice" ><FontAwesomeIcon icon={faCalendarDay} className="headerIcon"/></label>
                       <select id="choice" value={event} onChange={(e) => setEvent(e.target.value)} >
                       <option value="choice"> categories </option>
                       <option value="Ac"> Ac </option>
                       <option value="Non-Ac">Non-Ac </option>
                       <option value="AC,Non-Ac">Ac & Non-Ac </option>
                      </select>
                    </div>
                    
                    <div className="headerSearchItem">
                        <FontAwesomeIcon icon={faCalendar} className="headerIcon"/>
                        <span onClick={()=> setOpenDate(!openDate)} className="headerSearchText  "
                        > {`From ${format(dates[0].startDate, "dd/MM/yyyy")} To ${format(dates[0].endDate, "dd/MM/yyyy")}`} </span>
                        { openDate && (
                        <DateRange
                          editableDateInputs={true}
                          onChange={(item)=> setDates([item.selection])}
                          moveRangeOnFirstSelection={false}
                          ranges={dates}
                          className="date"
                          minDate={new Date()}
                        />
                        )}                    
                    </div>
                    
                    <div className="headerSearchItem">
                        <FontAwesomeIcon icon={faPerson} className="headerIcon  "/>
                        <span onClick={()=> setOpenOptions(!openOptions)} className="headerSearchText">{options.capacity} {options.capacity > 1 ? "people" : "person"}</span>
                        {openOptions && <div className="options">
                            <div className= "optionItem">
                            <span className="optionText">Count</span>
                            <div className="optionCounter">
                                <button 
                                disabled={options.capacity<=1}
                                className="optionCounterButton"
                                value={options.capacity} 
                                onChange={(e) =>setOptions(e.target.value)}
                                onClick={()=> handleOption("capacity","d")}>-</button> 
                                <span className="optionCounterNumber">{options.capacity}</span>
                                <button className="optionCounterButton" 
                                value={options.capacity} 
                                onChange={(e) =>setOptions(e.target.value)}
                                onClick={()=> handleOption("capacity","i")}>+</button>
                            </div>
                            </div>
                        </div>
                        }
                    </div>
                    <div className="headerSearchItem">
                        <button className=" btn-outline-light ml-4 w-24 bg-blue-500 p-2 border-2 text-white rounded-xl hover:bg-blue-700" onClick={handleSearch}>Search</button>
                    </div>    
                </div> </>
                 } 
            </div>
       </div>
    )
    }

export default Header
