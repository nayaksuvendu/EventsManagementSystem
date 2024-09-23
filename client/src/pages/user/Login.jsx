
import React, {  useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { Link,  useNavigate } from 'react-router-dom';
import { signInWithGoogle } from '../../components/authfirebase/Firebase';
import Navbar from '../../components/navbar/Navbar';
import { useDispatch } from 'react-redux';
import { login } from '../../Redux/Slice/AuthSlice';
import { toast } from 'react-hot-toast';

export default function Loginx() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle Change Function
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // Handle Submit Function
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!credentials.email || !credentials.password) {
      toast.error("Please fill all details");
      return;
    }
    // Email validation
    if (!credentials.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      toast.error("Invalid email id");
      return;
    }
    // Password validation
    if (!credentials.password.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)) {
      toast.error("Password should be 6 - 16 characters long with at least one number and special character");
      return;
    }

    // Dispatch login/asyncThunk action
     const res = await dispatch(login(credentials));  // Wait for response
     res?.payload?.success ? navigate(-1) :
     setCredentials({
      email: "",
      password: "",
     });
  };

  return (
    <div className="flex w-full flex-wrap bg-gray-800 min-h-[100vh]">
      <Navbar />
      <div className="flex w-full flex-col bg-gray-800">
        <div className="my-auto bg-white border-none p-6 rounded-3xl mx-auto flex flex-col justify-center px-6 pt-8 md:justify-start lg:w-[28rem]">
          <p className="text-center text-3xl font-bold md:text-left md:leading-tight mb-2">Feel Free To Login Here!</p>
          <p className='text-base font-extralight'>Please sign in to your account and start the adventure</p>
          <p className="mt-6 text-center font-medium md:text-left">
            If not created yet?
            <Link to="/signup" className="whitespace-nowrap font-semibold text-blue-700"> Create</Link>
          </p>
          <button onClick={signInWithGoogle} className="mt-8 flex items-center justify-center rounded-md border px-4 py-1 outline-none ring-gray-400 ring-offset-2 transition hover:border-transparent hover:bg-black hover:text-white focus:ring-2">
            <FcGoogle className='w-9' />  Get started with Google
          </button>
          <div className="relative mt-8 flex h-px place-items-center bg-gray-200">
            <div className="absolute left-1/2 h-6 -translate-x-1/2 bg-white px-4 text-center text-sm text-gray-500">Or use email instead</div>
          </div>
          <form className="flex flex-col items-stretch pt-3 md:pt-8" onSubmit={handleSubmit}>
            <div className="flex flex-col pt-4">
              <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="Enter Email"
                  value={credentials.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mb-4 flex flex-col pt-4">
              <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-indigo-600">
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="Password (minimum 8 characters)"
                  value={credentials.password}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300" />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="remember" className="text-gray-500">Remember me</label>
                </div>
              </div>
              <Link to='/forgetpassword' className="text-sm font-medium text-primary-600 hover:underline">Forgot password?</Link>
            </div>
            <button
              type="submit"
              className="mt-6 rounded-lg px-4 py-2 text-center text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-800 focus:ring-2"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
