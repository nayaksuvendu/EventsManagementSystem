import React, {  useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getRazorPayId, bookingTicket, verifyUserPayment } from '../../Redux/Slice/RazorpaySlice.js';
import {BiRupee} from 'react-icons/bi'


export default  function CheckoutPage() {
  
  const {user} = useSelector((state)=>state?.auth);
  const{state}=useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const razorpayKey = useSelector((state)=>state?.razorpay?.razorpayKey);
  const subscription_id = useSelector((state)=>state?.razorpay?.subscription_id);
  
  console.log(razorpayKey,subscription_id)
  // const userData = useSelector((state)=>state?.auth?.data);

  const paymentDetails = {
    razorpay_payment_id : "",
    razorpay_subscription_id : "",
    razorpay_signature : ""
  }

async function handleSubscription(e){  
  e.preventDefault();

  if(!razorpayKey || !subscription_id){
    toast.error("Something wrong");
    return;
  }
  const options ={ // providing details to razorpay Payment Page
    key : razorpayKey,
    subscription_id : subscription_id,
    name : "Nayak Events",
    description : "Subcription",
    currency: "INR",
    amount:"1",
    theme :{
      color: '#F37254'
    },
    prefill: {
      email: user.email,
      name: user.username
    },
    handler: async function(response){
      paymentDetails.razorpay_payment_id = response.razorpay_payment_id;
      paymentDetails.razorpay_signature = response.razorpay_signature;
      paymentDetails.razorpay_subscription_id = response.razorpay_subscription_id;
      toast.success("payment successfully");
       const res = await dispatch(verifyUserPayment(paymentDetails));

       res?.payload?.success ? navigate('/payment/success',{state:{...state}}) : navigate('/payment/fail');

    }

  }
  const paymentObject = new window.Razorpay(options) ;
   paymentObject.open(); // open payment window
}

async function load(){
   dispatch(getRazorPayId());
   dispatch(bookingTicket());
}

useEffect(()=>{load()},[])

    
  return (
    <div className='w-full min-h-[100vh] relative bg-slate-800'>
    {/* <Mavbar/> */}
      <form 
      onSubmit={handleSubscription}
      className=' min-h-[90vh] flex items-center justify-center text-white'
      >
        <div className='w-80 h-[26rem] bg-white flex flex-col justify-center shadow-[0_0_10px_black] rounded-lg relative'>
          <h1
          className=' bg-blue-500 absolute top-0 w-full text-center py-4 text-2xl font-bold rounded-tl-lg rounded-tr-lg'
          >Confirm Your Payment</h1>
          <div className=' px-4 space-x-5 text-center mt-5'>
            <p className=' text-blue-500 font-bold'>
            You're almost there! Please review your order and complete the payment to confirm your spot at 
              <span className=' text-green-600 font-bold text-2xl'>
                <br />
                 {state?.hname}
              </span>{" "}
             <p>Click 'Pay Now' to finalize your purchase and receive your event ticket.</p> 
            </p>
            <p className='flex items-center justify-center gap-1 text-2xl font-bold text-blue-500'>              
              <BiRupee/><span className=' text-green-600'>{state.hprice}</span> + GST
            </p>
            <div className=' text-neutral-800  mb-0 font-medium'>
              <p>100% refund on cancellation</p>
              <p>* Terms and conditions applied *</p>
            </div>
            <button
            type='submit'
            className='bg-blue-500 hover:bg-blue-600 transition-all ease-in-out duration-300 absolute bottom-0 w-full 
             text-xl font-bold rounded-bl-lg rounded-br-lg py-2 right-0 '
            >
              Pay now
            </button>

          </div>
        </div>

      </form>

    </div>
  )
}
