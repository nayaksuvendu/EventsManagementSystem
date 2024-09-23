import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom';
import {ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title,Tooltip} from 'chart.js';
import {Bar,Pie} from 'react-chartjs-2';
import {FaUsers} from "react-icons/fa";
import { FcSalesPerformance } from "react-icons/fc";
import { GiMoneyStack } from "react-icons/gi";
import { getStatsData } from '../../redux/Slice/AdminSlice.js';
import { getPaymentRecord } from '../../redux/Slice/RazorpaySlice.js';
import Navbar from '../navbar/Navbar.jsx';

export default function AdminDashboard() {

    const dispatch = useDispatch();
 
    ChartJS.register(ArcElement, BarElement, CategoryScale, Legend, LinearScale, Title, Tooltip)

    const {totalUser,totalBookingUser} = useSelector((state)=>state.admin);
    const {allPayments,monthlySalesRecord} = useSelector((state)=>state.razorpay);


    const userData = {
        labels:['Registered User','Enrolled User'],
        fontColor:'white',
        datasets:[
            {
                label:"User Details",
                data:[totalUser,totalBookingUser],
                backgroundColor:["yellow","green"],
                borderWidth: 1,
                borderColor: ["yellow","green"]
            }
        ]
    };

    const salesData = {
        labels : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        fontColor : "black",
        datasets:[{
            label : 'Sales / Month',
            data: monthlySalesRecord,
            backgroundColor:['red'],
            borderColor:['white'],
            borderWidth:2

        }]
    };


    // const myCourses = useSelector((state) => state?.course?.courseData);

    // async function onCourseDelete(id){
    //     if(window.confirm('Are you sure you want to delete the course ? ')){
    //         const res =  dispatch(deleteCourses(id));
    //         if(res?.payload?.success){
    //              dispatch(getallCourses)
    //         }
    //     }
    // };
    
        async function fetchData(){
         await dispatch(getStatsData());
         await dispatch(getPaymentRecord());
        }

    useEffect(()=>{fetchData()},[]);


  return (
       <div className='flex flex-col mx-auto flex-wrap gap-10 text-black min-h-[100vh] w-full bg-slate-100 overflow-y-clip '>
        <Navbar/>
        <h1 className='text-center text-5xl font-bold shadow-lg pb-4 text-cyan-700'>
            Admin Dashboard
        </h1>
        <div className='grid grid-cols-2 gap-5 mx-auto'>

            <div className='flex flex-col gap-5 p-5 shadow-lg rounded-md'>
                <div className='w-80 h-80'>
                    <Pie data={userData}/>
                </div>
                <div className=' grid grid-cols-2 gap-5 '>
                    <div className='flex items-center justify-between p-5 gap-5 rounded-md shadow-md'>
                        <div className='flex flex-col items-center'>
                            <p className=' font-semibold'>Registered Users</p>
                            <h3 className='text-4xl font-bold'>{totalUser}</h3>
                        </div>
                        <FaUsers className=' text-yellow-500 text-5xl'/>
                    </div>
                    <div className='flex items-center justify-between p-5 gap-5 rounded-md shadow-md'>
                        <div className='flex flex-col items-center'>
                            <p className=' font-semibold'>Booking Users</p>
                            <h3 className='text-4xl font-bold'>{totalBookingUser}</h3>
                        </div>
                        <FaUsers className=' text-green-600 text-5xl'/>
                    </div>
                </div>
            </div>
            
            <div className='flex flex-col gap-5 p-5 shadow-lg rounded-md'>
                <div className='w-full h-80 relative'>
                    <Bar className='absolute bottom-0 h-80 w-full' data={salesData} />
                </div>
                <div className=' grid grid-cols-2 gap-5 mx-auto'>
                    <div className='flex items-center justify-between p-5 gap-5 rounded-md shadow-md'>
                        <div className='flex flex-col items-center'>
                            <p className=' font-semibold'>Ticket Count</p>
                            <h3 className='text-4xl font-bold'>{allPayments?.count}</h3>
                        </div>
                        <FcSalesPerformance className=' text-yellow-500 text-5xl'/>
                    </div>
                    <div className='flex items-center justify-between p-5 gap-5 rounded-md shadow-md '>
                        <div className='flex flex-col items-center'>
                            <p className=' font-semibold'>Total Revenue</p>
                            <h3 className='text-4xl font-bold'>{allPayments?.count*499}</h3>
                        </div>
                        <GiMoneyStack className=' text-yellow-500 text-5xl'/>
                    </div>
                </div>
            </div>

        </div>

    </div> 

  )
}


