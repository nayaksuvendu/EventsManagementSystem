import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";
import {  useNavigate } from "react-router-dom";

  const Contactus = ({setOpen}) => {

  const navigate=useNavigate()
  const [credentials, setCredentials] = useState({
    
    email: "",
    ph: "",
    message:"",
    
  });
  const handleChange = (e) => {

    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  
const handleClick = async (e) => {
  e.preventDefault()
  try{
     await axios.put(
      "/contact/create",
      credentials
    );   
  }catch(err){
    alert("Error submitting form:", err);
  }
  navigate("/")
};
const handleClose=()=>{
  if (setOpen) setOpen(false);
  navigate("/")
}

  
  return (
    <div className="reserve">           
            <div className="rContainer flex flex-col text-center mb-4 rounded-lg text-blue-500">
                <FontAwesomeIcon icon={faCircleXmark} className="rClose" onClick={handleClose}/>
                <span className="font-bold">Contact Us</span>
               <form onSubmit={handleClick} className=" flex flex-col gap-2 mt-3 ">
                     <input className="tp border-2 border-blue-500" type="email"placeholder="Enter Your Email.." required id="email"
                       value={credentials.email} onChange={handleChange} />
                     <input className="border-2 border-blue-500"  type='tel'placeholder="Enter Your Ph.No." required id="ph"
                       value={credentials.ph} onChange={handleChange} />
                     <textarea className="border-2 border-blue-500 pt-1" placeholder="Any message" required id="message"
                       value={credentials.message} onChange={handleChange} />
                     <button className="rButton hover:bg-blue-600 transition-all ease-in-out" type='submit'>Send</button>      
                </form>               
            </div>
        </div>
  )
}

export default Contactus;

