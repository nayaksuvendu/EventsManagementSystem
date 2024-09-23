
import aboutus from '../../assets/about.jpg'
const About = () => {


  return (
    <section className="about justify-between items-center text-white py-16 bg-gray-900 " id="about">
      <h1 className="text-5xl text-center font-bold mb-16"><span className="text-primary ">About</span> Us</h1>
      <div className="container mx-auto flex flex-wrap items-center">
        <div className="w-full md:w-1/2 p-6">
          <img src={aboutus} alt="About Us" className="rounded-lg shadow-lg border-4 border-gray-500" />
        </div>
        <div className="w-full md:w-1/2 p-6">
          <h3 className="text-4xl mb-4 font-bold">Your Occasion Deserves Our Careful Planning</h3>
          <p className="text-lg mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, deserunt!</p>
          <p className="text-lg">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, voluptatum!</p>
          <button  className="btn btn-primary btn-lg mt-6 hover:text-white">Reach Us</button>
        </div>
      </div>
    </section>
  );
};

export default About;
