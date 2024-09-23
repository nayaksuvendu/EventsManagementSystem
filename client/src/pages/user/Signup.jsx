import {  useState } from "react";
import {   useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import { signInWithGoogle } from '../../components/authfirebase/Firebase';
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { createAccount } from "../../Redux/Slice/AuthSlice";
import {toast} from 'react-hot-toast';

export default function Signupx() {

    const [credentials,setCredentials] = useState({
        username: "",
        email: "",
        phone: "",
        city: "",
        password: "",
      });
        
      const navigate = useNavigate();
      const dispatch = useDispatch();

  //   Handle Change Function
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };


  //   Handle Click Function
  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!credentials.email || !credentials.password || !credentials.username || !credentials.city || !credentials.phone ){
      toast.error("Please fill all details");
      return
  }

  //checking name field length
  if(credentials.username.length < 5){
     toast.error("Name should be atleast of 5 characters")
     return 
  }
  
  //Email validation
  if(!credentials.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)){
      toast.error("Invalid email id")
      return
  }

  //Password validation
  if(!credentials.password.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)){
      toast.error("Password should be 6 - 16 character long with atleast a number and special character")
      return

  }

  // dispatch formDta to AuthSlice through craeteAsyncThank/AsynccreateAccount action
    const res = dispatch(createAccount(credentials));
    res?.payload?.success ? navigate('login') :
      
   setCredentials({
      username: "",
      email: "",
      password: "",
      phone: "",
      city: ""
  })
}
  return (
    <div className="flex w-full flex-wrap bg-gray-800  min-h-[100vh]">
     <Navbar/>      
       <div className="flex w-full flex-col bg-gray-800 ">
       <div className = "my-auto bg-white border-none  p-6 rounded-3xl  mx-auto flex flex-col justify-center px-6  md:justify-start l lg:w-[28rem]">
          <p className="text-center text-3xl font-bold md:text-left md:leading-tight">Create your free account</p>
          <p className=" text-center font-medium md:text-left m-3">
            Already using NayakEvents?
            <a href="login" className="whitespace-nowrap font-semibold text-blue-700"> Login here</a>
          </p>
          <button onClick={signInWithGoogle} className="  flex items-center justify-center rounded-md border px-4 py-1 outline-none ring-gray-400 ring-offset-2 transition hover:border-transparent hover:bg-black hover:text-white focus:ring-2">
          <FcGoogle className=' w-9'/>  Get started with Google
          </button>
          <div className="relative  flex place-items-center ">
            <div className=" mt-2 translate-x-1/2 px-4 text-center text-sm text-gray-500">Or use email instead</div>
          </div>
          <form  autoFocus className="flex flex-col items-stretch pt-3 md:pt-8" onSubmit={handleSubmit}>
            <div className="flex flex-col ">
              <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="Fullname"
                  value={credentials.username}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex flex-col pt-4">
              <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="Email"
                  value={credentials.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex flex-col pt-4">
              <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-indigo-600">
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="Phone Number"
                  value={credentials.phone}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className=" flex flex-col pt-4">
              <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-indigo-600">
                <input
                  type="text"
                  id="city"
                  name="city"
                  className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="City "
                  value={credentials.city}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-2 flex flex-col pt-4">
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
            <div className="block">
              <input
                className="mr-2 h-5 w-5 appearance-none rounded border border-gray-300 bg-contain bg-no-repeat align-top text-black shadow checked:bg-blue-600 focus:border-indigo-600 focus:shadow"
                type="checkbox"
                id="remember-me"
                style={{
                  backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 20 20\'%3e%3cpath fill=\'none\' stroke=\'%23fff\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M6 10l3 3l6-6\'/%3e%3c/svg%3e")',
                }}
                defaultChecked
              />
              <label className="inline-block" htmlFor="remember-me">
                I agree to the <a className="underline" href="#">Terms and Conditions</a>
              </label>
            </div>
            <button
              type="submit"
              className="mt-4 ml-28 rounded-lg bg-indigo-600 px-4 py-2 text-center text-base font-semibold text-white shadow-md outline-none ring-blue-500 ring-offset-2 transition ease-in-out hover:bg-indigo-700 focus:ring-2 md:w-32"
            >
              Sign up
            </button>
            
          </form>
        </div>
      </div>
       </div>

  )
}
