import Navbar from "../../components/navbar/Navbar.jsx";
import "./home.css";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone} from "@fortawesome/free-solid-svg-icons";
import Searchbar from "../../components/searchbar/Searchbar.jsx";
import HallLocations from "../../components/hallLocations/HallLocation.jsx"
import Eventlist from "../../components/events/EventList.jsx"
import HallProperties from "../../components/hallProperties/HallProperties.jsx"
import Gallery from "../../components/homeComponents/Gallery.jsx";
import Services from "../../components/homeComponents/Service.jsx";
import Reviews from "../../components/homeComponents/Review.jsx";
import About from "../../components/homeComponents/About.jsx";
import Footer from "../../components/homeComponents/Footer.jsx";
import Homeslide from "../../components/homeComponents/Homeslide.jsx";
import Contactus from "../../components/homeComponents/Contactus.jsx";
import ReviewForm from "../../components/homeComponents/ReviewForm.jsx";


const Home = () => {
   
    const [openModal, setOpenModal] = useState(false);

    const handleClick = (e) => {
         e.preventDefault(); // Prevent redirect
          setOpenModal(true);      
      };


    return(

          <div className="flex flex-col bg-gray-900 relative w-full min-h-[100vh] overflow-hidden">            
          <div className=" mt-0 top-[-20px] relative">
          <Navbar/>
          <div className="relative">
            <Homeslide/>
            <Searchbar/>     
            <br></br>
            <h1 className="text-5xl mt-32 text-center text-white font-bold mb-16">Browse Our<span className="text-primary">Events</span></h1>
            <Eventlist/>
            <br></br>
            <h1 className="text-5xl mt-32 text-center text-white font-bold mb-16 ">Popular <span className=" text-primary">Halls</span></h1>
            <HallProperties/>
            <br></br>
            <Gallery/>
            <h1 className="text-5xl mt-32 text-center text-white font-bold mb-16">Featured <span className="text-primary">Locations</span></h1>
            <HallLocations/>
            <br></br>
            <Reviews/>
            <Services/>     
            <About/>
            <ReviewForm/>
            <br></br>
            {/* Trigger for opening the mail list modal */}
            <a href="/contact" onClick={handleClick} className="float">
            <FontAwesomeIcon icon={faPhone} className="my-float"/>
            </a>  
            {/* Modal opening logic */}   
            <div>{openModal && <Contactus setOpen={setOpenModal}/>}</div>   
            </div>
          </div>  
          <Footer/>             
        </div>
        
    )
}

export default Home
