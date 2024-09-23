import "./navbar.scss";
import {logout} from '../../redux/Slice/AuthSlice'
import { useDispatch } from "react-redux";
const Navbar = () => {
  
  const dispatch = useDispatch();

  const handleClick=e=>{
    e.preventDefault();
    dispatch(logout());   
   }
   
  return (
    <div className=" flex justify-end relative bg-[#0a6071] bg-cover  border-non w-full ">
      <div className=" relative m-2">
        <button onClick={handleClick} 
        className="btn-primary hover:bg-slate-200 transition-all ease-in-out hover:text-red-700 rounded-lg font-medium border-2 bg-red-600 p-3 text-white">
          Logout
        </button>       
        </div>
      </div> 
   
  );
};

export default Navbar;
