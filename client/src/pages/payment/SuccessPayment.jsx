import React, {useEffect } from 'react'
import {AiFillCheckCircle} from 'react-icons/ai'
import { Link, useLocation } from 'react-router-dom'
import jsPDFInvoiceTemplate from "jspdf-invoice-template";
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function SuccessPayment() {

  const {user} = useSelector((state)=>state?.auth)
  const {state} = useLocation();
  const Ticketdata = { bid : state.hallId,
                       hname : state.hname, 
                       sdate : state.dates[0].startDate, 
                       edate : state.dates[0].endDate
                      }

   // PDF invoice generation
   var props = {
     returnJsPDFDocObject: true,
     fileName: "Invoice_NayakEvents",
     orientationLandscape: false,
        compress: true,
        stamp: {
          inAllPages: true,
          src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/qr_code.jpg",
          type: 'JPG',
          width: 20,
          height: 20,
        },
        business: {
          name: "Nayak Events",
          address: "Bhubanesware, Odisha",
          phone: "7894701178",
          email: "contact_ne@support.com",
        },
        contact: {
          label: "Invoice issued for:",
          name: user.username,
          address: user.city,
          phone: user.phone,
          email: user.email,
        },
        invoice: {
          label: "Invoice #:",
          num: 19,
          header: [
            { title: "#", style: { width: 10 } },
            { title: "Hall Id", style: { width: 50 } },
            { title: "Hall Name", style: { width: 50 } },
            { title: "Booking Id", style: { width: 50 } },
            { title: "Status" }
          ],
          table: [
            [
              1,
              state.hallId,
              state.hname,
              state.selectedSlots.join(','),
              "Confirmed"
            ]
          ],
          additionalRows: [
            { col1: 'PRICE:', col2: `Rs.${state.hprice}`, col3: 'HALL', style: { fontSize: 10 } },
            { col1: 'GST:', col2: `Rs.${0.18 * state.hprice}`, col3: '18%', style: { fontSize: 10 } },
            { col1: 'TOTAL PAID:', col2: `Rs.${1.18 * state.hprice}`, col3: 'Online', style: { fontSize: 14 } }
          ],
          invDescLabel: "Invoice Note",
          invDesc: "This Invoice should be presented at the Hall Office for Confirmation.",
        },
        footer: {
          text: "The invoice is a computer genereted bill and is valid without the signature and stamp.",
        },
        pageEnable: true,
        pageLabel: "Page ",
      };
   async function printTicket(){
        jsPDFInvoiceTemplate(props);
        axios.post('/ticketconfirm/create',Ticketdata);
    }

   useEffect(()=>{printTicket()},[]);

  return (
      <div className='min-h-[100vh] bg-gray-800 flex items-center justify-center text-white'>
        {/* <Navbar/> */}
        <div className='w-80 h-[26rem] flex flex-col justify-center items-center
                        shadow-[0_0_10px_black] rounded-lg relative '>
          <h1 className='bg-green-500 absolute text-center top-0 w-full py-4 text-2xl font-bold rounded-tl-lg rounded-tr-lg'>
            Payment Successfull
          </h1>
          <div className=' text-center space-y-1 mt-11 '>
            <h2 className='text-lg font-semibold'>Thank you for your payment! Your registration for <span className='text-green-400'>{state?.hname}</span> has been successfully completed</h2>
            <p className=' '>*You will receive a confirmation email shortly with your ticket and event details. We can't wait to see you there!" <span className=' text-2xl'>🥳</span></p>
          </div>
          <AiFillCheckCircle className='text-green-500 text-8xl '/>
        

        <Link to='/' 
        className='w-full py-2 text-xl font-semibold text-center rounded-br-lg rounded-bl-lg
         bg-green-500 hover:bg-green-600 transition-all ease-in-out duration-300 absolute bottom-0'>
        <button>Go to home</button>
        </Link>

        </div>

      </div>

  )
}
