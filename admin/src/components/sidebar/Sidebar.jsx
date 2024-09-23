import "./sidebar.scss";
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import FeedbackIcon from '@mui/icons-material/Feedback';
import Dashboard from '@mui/icons-material/Dashboard';
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PhoneIcon from "@mui/icons-material/Phone";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import { Link } from "react-router-dom";


const Sidebar = () => {

  return (
    <div className="sidebar">
      <div className="top top-0 justify-center items">
        <Link to="/users" style={{ textDecoration: "none" }}>
          <span className="logo">NayakEvent ADMIN</span>
        </Link>
      </div>
      <hr />
      <div className="center gap-4 mt-4 ">
        <ul>
        <Link to="/" style={{ textDecoration: "none" }}>
            <li >
              <Dashboard className="icon" />
              <span className=" text-lg font-bold">Dashboard</span>
            </li>
          </Link>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li >
              <PersonOutlineIcon className="icon" />
              <span className=" text-lg font-bold">Users</span>
            </li>
          </Link>
          <Link to="/halls" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Halls</span>
            </li>
          </Link>
          <Link to="/slots" style={{ textDecoration: "none" }}>
          <li>
            <CreditCardIcon className="icon" />
            <span>Slots</span>
          </li>
          </Link>
          <Link to="/contact" style={{ textDecoration: "none" }}>
          <li>
            <PhoneIcon className="icon" />
            <span>Contacts</span>
          </li>
          </Link>  
          <Link to="/feedback" style={{ textDecoration: "none" }}>
          <li>
            <FeedbackIcon className="icon" />
            <span>Feedback</span>
          </li>
          </Link>  
          <Link to="/ticketconfirm" style={{ textDecoration: "none" }}>
          <li>
            <ConfirmationNumberIcon className="icon" />
            <span>Booked Ticket</span>
          </li>
          </Link>         
        </ul>
      </div>
      
    </div>
  );
};

export default Sidebar;
