import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/Slice/AuthSlice';
 
 function Login() {

    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
      });    
    const dispatch = useDispatch();
    const navigate = useNavigate();
       
      //   Handle Change Function
      const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
      };
          
      //   Handle Submit Function
      const handleSubmit = async (e) => {
         e.preventDefault();
         const response = await dispatch(loginUser(credentials));

         response?.payload?.success ? navigate('/') :
         setCredentials({
          email: "",
          password: ""
         })
         
      };
    return (
     <div className="flex w-full flex-wrap bg-gray-800  min-h-[100vh]">     
      <div className="flex w-full flex-col bg-gray-800 ">
      
      <div className = "my-auto bg-white border-none p-6  items-center rounded-3xl text-center mx-auto flex flex-col justify-center px-6 pt-8 md:justify-start lg:w-[28rem]">
        <p className="text-center text-indigo-600 text-3xl font-bold md:text-left md:leading-tight ">Admin Login</p>

        <form  autoFocus className="flex flex-col items-stretch pt-3 md:pt-8" onSubmit={handleSubmit} >
          <div className="flex flex-col pt-4">
            <div className="relative flex overflow-hidden border-indigo-600 rounded-md border-2 transition focus-within:border-blue-600">
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full flex-shrink appearance-none border-black bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-600 focus:outline-none"
                placeholder="Enter Email"
                onChange={handleChange}
                value={credentials.email}
              />
            </div>
          </div>
          <div className="mb-4 flex flex-col pt-4">
            <div className="relative flex overflow-hidden rounded-md border-indigo-600 border-2 transition focus-within:border-indigo-600">
              <input
                type="password"
                id="password"
                name="password"
                required
                className="w-full flex-shrink  appearance-none box-border  py-2 px-4 text-base text-black placeholder-gray-600 focus:outline-none"
                placeholder="Password (minimum 8 characters)"
                onChange={handleChange}
                value={credentials.password}
              />
            </div>
          </div>
          <div className="flex ml-44 justify-between">
           <Link to='/forgetpassword' className="text-sm text-blue-700 font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</Link>
           </div>          
          <button
            type="submit"
            className="mt-6  ml-12 rounded-lg  px-4 py-2 text-center text-base items-center font-semibold text-white border-purple-600 shadow-md outline-none ring-blue-500 ring-offset-2 transition ease-in-out bg-indigo-600 hover:bg-indigo-800 focus:ring-2 md:w-32 justify-center"
          >
            Login
          </button>
        </form>
      </div>
    </div>
    </div>
    )
  }

  export default Login