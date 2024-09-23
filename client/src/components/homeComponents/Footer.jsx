import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => (
  <footer className="bg-neutral text-white pl-2 pt-6 pb-5 cursor-pointer bg-gray-950 bottom-0 mb-0">
    <div className="container mx-auto grid grid-cols-1  md:grid-cols-4 text-center ">
      <div>
        <h3 className="text-2xl mb-4 font-semibold text-blue-400 ">Branches</h3>
        <p className="hover:text-blue-400" >Bangalore</p>
        <p className="hover:text-blue-400" >Hyderabad</p>
        <p className="hover:text-blue-400" >Bhubaneswar</p>
      </div>
      <div>
        <h3 className="text-2xl mb-4 font-semibold text-blue-400 ">Quick Links</h3>
        <p className="hover:text-blue-400" >Home</p>
        <p className="hover:text-blue-400" >Services</p>
        <p className="hover:text-blue-400" >About</p>
      </div>
      <div >
        <h3 className=" text-2xl mb-4 font-semibold text-blue-400">Contact Info</h3>
        <p className="hover:text-blue-400" >Phone: +91-7892638380</p>
        <p className="hover:text-blue-400" >Email: nayak@gmail.com</p>
      </div>
      <div  >
        <h3 className="text-2xl mb-4 font-semibold text-blue-400 ">Follow Us</h3>
        <div className="flex  gap-4 ml-28  ">
          <FaFacebookF className="hover:text-blue-400" />
          <FaTwitter className="hover:text-blue-400" />
          <FaInstagram className="hover:text-blue-400" />
          <FaLinkedinIn className="hover:text-blue-400" />
        </div>
      </div>
    </div>
    <div className="text-center mt-8 text-base font-semibold">
      Created by <span className="text-primary">Suvendu</span> | All rights reserved
    </div>
  </footer>
);

export default Footer;
