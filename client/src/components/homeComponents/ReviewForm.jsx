import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const ReviewForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState(1);
  const [reviewMessage, setReviewMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    try {
       await axios.post('feedback/submit', {
        name,
        email,
        rating,
        reviewMessage,
      });
      toast.success('Review submitted successfully!');
    } catch (error) {
      toast.error('Failed to submit review.');
    }
  };

  return (
    // <section className="w-full min-h-[100vh] flex flex-col  mx-auto mt-10 items-center  bg-transparent  ">
      <section className=" w-full justify-center text-center  items-center mx-auto flex flex-col text-white py-16 bg-gray-900 " id="feedback">
      <h2 className="text-5xl font-bold mb-5 text-center"><span className='text-primary'>Submit Your</span>Feedback</h2>
      <form onSubmit={handleSubmit} className=" bg-transparent shadow-sm rounded-lg min-w-lg  px-8 pt-6 pb-8 mb-4">
       <div className='flex gap-4 justify-between mb-4'>
        <div className="mb-4">

          <input
            className="shadow bg-transparent appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            value={name}
            placeholder='Name'
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">

          <input
            className="shadow bg-transparent appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <select
            className="shadow bg-transparent appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            required
            id='select'
          >
            <option value={1} className='text-black'>1 - Poor</option>
            <option value={2} className='text-black'>2 - Fair</option>
            <option value={3} className='text-black'>3 - Good</option>
            <option value={4} className='text-black'>4 - Very Good</option>
            <option value={5} className='text-black'>5 - Excellent</option>
          </select>
        </div>
        </div>
        <div className="mb-4">
          <textarea
            className="shadow bg-transparent  items-center h-32 appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
            value={reviewMessage}
            onChange={(e) => setReviewMessage(e.target.value)}
            required
            placeholder='Write Message'
            
          ></textarea>
        </div>

        <button
          className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Submit Feedback
        </button>

      </form>
    </section>
  );
};

export default ReviewForm;
