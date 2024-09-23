import React from 'react';
import gallery1 from '../../assets/gallery1.jpg';
import gallery2 from '../../assets/gallery2.jpg'; 
import gallery3 from '../../assets/gallery3.jpg';
import gallery4 from '../../assets/gallery4.jpg';
import gallery5 from '../../assets/gallery5.jpg';
import gallery6 from '../../assets/gallery6.jpg';
const Gallery = () => {
  const images = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6];

  return (
    <section id="gallery" className="bg-gyay-900 mt-5 text-base-content py-20 shadow-lg">
      <h1 className="text-5xl text-center mb-12 font-bold text-white">Our <span className="text-primary">Gallery</span></h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-10">
        {images.map((image, index) => (
          <div key={index} className="card shadow-xl border-4">
            <figure>
              <img src={image} alt={`Gallery ${index}`} className="rounded-lg"/>
            </figure>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
