import React from 'react';
import { FaEnvelope, FaPhotoVideo, FaMusic, FaCar, FaMapMarkerAlt, FaBirthdayCake } from 'react-icons/fa';

const Services = () => {
  const services = [
    { icon: <FaEnvelope />, title: 'Invitation Card Design' },
    { icon: <FaPhotoVideo />, title: 'Photos and Videos' },
    { icon: <FaMusic />, title: 'Entertainment' },
    { icon: <FaCar />, title: 'Event Vehicles' },
    { icon: <FaMapMarkerAlt />, title: 'Venue Selection' },
    { icon: <FaBirthdayCake />, title: 'Food Catering' },
  ];

  return (
    <section id="services" className=" bg-transparent text-base-content mb-4 mt-5">
      <h1 className="text-center text-5xl text-white font-bold mb-12">
        Our <span className="text-primary">Services</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-10 ">
        {services.map((service, index) => (
          <div key={index} className="card  bg-slate-200 shadow-xl">
            <div className="card-body items-center text-center">
              <div className="text-primary text-6xl mb-4">{service.icon}</div>
              <h3 className="card-title text-xl font-bold">{service.title}</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
