import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import { forgetPassword } from '../../redux/Slice/AuthSlice';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
export default function Forgetpsw() {
 
    const [credentials, setCredentials] = useState({email:""});
    const dispatch = useDispatch();

    const handleChange = (e) => {
      setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };
   
    //   Handle Click Function
    const handleSubmit = async (e) => {
      e.preventDefault()
      if(!credentials.email){
        toast.error("All fields are mandatory");
        return;
    }
    if (!credentials.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        toast.error("Invalid email id");
        return;
      }

      dispatch(forgetPassword(credentials)) ;    
      setCredentials({email:""});    
    };

  return (
    <div className="flex w-full flex-wrap bg-gray-800  min-h-[100vh]">
      <Navbar/>      
     <div className="flex w-full flex-col bg-gray-800">
      <div className=' min-h-screen flex items-center justify-center  grid-cols-1'>
       <form 
       onSubmit={handleSubmit}
        className='  bg-white text-black font-medium flex flex-col justify-center gap-8 rounded-lg p-4 w-96 h-[28rem] shadow-[0_0_10px_black] '
       >
      <h1 className=' text-center text-2xl font-bold mt-10 text-black h-10'>Forget Password !</h1>
     <p>
        Enter your register email, we will send you a verification link on
        your register email from which you can reset your password
      </p>
      <div className=' flex flex-col gap-1'>
        <input 
        type="email" 
        name='email'
        id='email'
        required
        placeholder='Enter your registered email'
        className=' bg-transparent px-2 py-1 border'
        value={credentials.email}
        onChange={handleChange}
        />
     </div>

    <button
    className="w-full text-white bg-blue-600 py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
    type='submit'> 
    Send Link
    </button>
    <p className='text-center' >
     Already have an account ?{' '}
     <Link to={'/login'} className='link text-accent cursor-pointer'>
     login
     </Link>
    </p>
  </form>
    </div> 
 </div>
 </div>
  )
}
