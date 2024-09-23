import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css';
import img1 from '../../assets/img1.jpg'
import img2 from '../../assets/img2.jpg'
import img3 from '../../assets/img3.jpg'
import img4 from '../../assets/img4.jpg'

const Reviews = () => (
  <section className=" bg-transparent text-white py-16 relative w-full mt-5 " id="review">
    <h1 className="text-5xl text-center font-bold mb-16 ">Client's <span className="text-primary">Reviews</span></h1>
    <Swiper 
    spaceBetween={30}
    slidesPerView={3}
    loop
    autoplay={{
      delay: 2500,
      disableOnInteraction: false,

    }}
    pagination={{
      clickable: true,
    }}
    modules={[Autoplay, Pagination]}
    className=" relative   "
    >
      <SwiperSlide>
        <div className="card card-bordered shadow-lg p-8 text-white bg-gray-800 border-2 border-blue-500 flex gap-2 flex-col justify-center items-center">
          <img src={img1} className=' w-20 h-20 rounded-full border-2 border-gray-400 '/>
          <p className="mb-4">Lorem ipsum dolor sit amet consectetur.</p>
          <h3 className="text-2xl font-bold">John Doe</h3>
          <span className="text-primary">Happy Customer</span>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="card card-bordered text-white shadow-lg p-8 bg-gray-800 border-2 border-blue-500 flex gap-2 flex-col justify-center items-center">
          <img src={img2} className=' w-20 h-20 rounded-full border-2 border-gray-400'/>
          <p className="mb-4">Lorem ipsum dolor sit amet consectetur.</p>
          <h3 className="text-2xl font-bold">John Doe</h3>
          <span className="text-primary">Happy Customer</span>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="card card-bordered text-white shadow-lg p-8 bg-gray-800 border-2 border-blue-500 flex gap-2 flex-col justify-center items-center">
          <img src={img3} className='w-20 h-20 rounded-full border-2 border-gray-400'/>
          <p className="mb-4">Lorem ipsum dolor sit amet consectetur.</p>
          <h3 className="text-2xl font-bold">John Doe</h3>
          <span className="text-primary">Happy Customer</span>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="card card-bordered text-white shadow-lg p-8 bg-gray-800 border-2 border-blue-500 flex gap-2 flex-col justify-center items-center">
          <img src={img4} className=' w-20 h-20 rounded-full border-2 border-gray-400'/>
          <p className="mb-4">Lorem ipsum dolor sit amet consectetur.</p>
          <h3 className="text-2xl font-bold">John Doe</h3>
          <span className="text-blue-500">Happy Customer</span>
        </div>
      </SwiperSlide>
    </Swiper>
  </section>
);

export default Reviews;
