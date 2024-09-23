import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css';
import home1 from '../../assets/home1.jpg';
import home2 from '../../assets/home2.jpg';
import home3 from '../../assets/home3.jpg';
import home4 from '../../assets/home4.jpg';
import home5 from '../../assets/home5.jpg';


const Home = () => {
 
  return (
    <section className="home bg-neutral-content flex items-center justify-center shadow-md relative " id="home">

      <div className="w-screen  mx-auto text-center shadow-md relative ">
    
         <div className="mt-0 flex  h-[500px] mb-0 bg-transparent shadow-md border-b-2  ">
         
          <Swiper 
          spaceBetween={30}
          slidesPerView={1}
          loop
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination]}
          className="mySwiper flex  mb-0 shadow-2xl justify-center items-center"
          > 
            <SwiperSlide><img src={home1} alt="Home Slide 1" className=" shadow-lg w-full h-screen " /></SwiperSlide>
            <SwiperSlide><img src={home2} alt="Home Slide 2" className="  shadow-lg w-full h-screen  " /></SwiperSlide>
            <SwiperSlide><img src={home3} alt="Home Slide 3" className=" shadow-lg w-full h-screen  " /></SwiperSlide>
            <SwiperSlide><img src={home4} alt="Home Slide 3" className=" shadow-lg w-full h-screen" /></SwiperSlide>
            <SwiperSlide><img src={home5} alt="Home Slide 3" className=" shadow-lg  w-full h-screen"/></SwiperSlide>
          </Swiper>
          
        </div> 
        </div>
      
    </section>
  );
};

export default Home;

