import Navbar from "../../components/navbar/Navbar.jsx";
import Searchbar from "../../components/searchbar/Searchbar.jsx";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import SearchItem from "../../components/searchItemcard/SearchIitemCard.jsx";
import useFetch from "../../hooks/useFetch.js";

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state?.destination || "");
   const [event, setEvent] = useState(location.state?.event || "");
 
  const {data,loading,error,reFetch} =  useFetch(`/halls?city=${destination}&type=${event}`)
   console.log(data)
  const handleClick = () => {
    if (destination && event) {
      reFetch(); // Only re-fetch when both fields are filled
    }
  };
  

  return (
    <div className="relative w-full min-h-[100vh] bg-gray-900 overflow-hidden flex flex-col">
      <Navbar />
      <Searchbar type="list" />
      <div className=" ">
        <div className="listWrapper w-full gap-5 grid grid-cols-2 absolute left-9 top-24">

         <div className="listSearch flex-1 bg-orange-400 p-3 rounded-md border-4  w-80 max-h-fit  ">
            <div className=" isItem flex flex-col mb-3">
              <label className="text-white font-bold text-base ">Enter City</label>
              <input 
              placeholder="City name"
              className="h-8 p-2"
              value={destination} 
              onChange={(e)=>setDestination(e.target.value)} 
              type="text" 
              />
            </div>
            <div className="lsItem flex flex-col mb-3">
              <label className="text-white font-bold text-base">Event Type</label>
              <input 
              className="h-8 p-2"
              placeholder="Event Type"
              value={event}
              onChange={(e)=>setEvent(e.target.value)}
              type="text" 
              />
            </div>            
            <button className="p-2 bg-orange-500 border-2 rounded-lg text-white hover:bg-orange-400 hover:text-white" onClick={handleClick}>Search</button>
        </div>

        <div className="listResult flex-3 text-bold absolute  right-0 mr-12 flex flex-col">
        {loading ? (
              <p className="text-white">Loading...</p>
            ) :error ? (
              <p className="text-white">Something went wrong. Please try again.</p>
            ) :(
              <>
              {data.length > 0 ? (
                  data.map((item) => <SearchItem item={item} key={item._id} />)
                ) : (
                  <p className="text-white">No results found for "{destination}" and "{event}".</p>
                )}
              </>
            )}
            
        </div>

        </div>
        
      </div>
      
    </div>
  );
};

export default List;