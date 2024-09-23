import USER from '../models/User.model.js'
import payment from '../models/payment.model.js'
import crypto from 'crypto'
import Razorpay from 'razorpay'
import { sendEmail } from '../utils/sendEmail.js'
import { createError } from '../utils/error.js'



// Razorpay instance create with config
const razorpay = new Razorpay({
   key_id : process.env.RAZORPAY_KEY_ID,
   key_secret : process.env.RAZORPAY_SECRET,
 });

 export const bookingTicket = async (req,res,next)=>{
   try{    
      console.log(req.user); 
      const id = req.user.id;
      const userInfo = await USER.findById(id);

       if(!userInfo){
         return next( createError('Unauthorized,please login',400))
     }

     // Creating a subscription using razorpay that we imported from the server
     const getSubscription = await razorpay.subscriptions.create({
       plan_id : process.env.RAZORPAY_PLAN_ID, // The unique plan ID
       customer_notify: 1, //  1 means custom notification and 0 means not notify
       total_count : 12, // 12 means it will charge every month for a 1-year sub.
       quantity :1,
       addons : [
         {
             item : {
                 name: "GST charges",
                 amount: 300,
                 currency: "INR"
             }
         }
     ],
     notes: {
      key1: "value3",
      key2: "value2"
    }
    });
      console.log(JSON.stringify(userInfo))
     // Adding the ID and the status to the user account
     userInfo.booking.id = getSubscription.id;
     userInfo.booking.status = getSubscription.status;
     
     await userInfo.save();

     res.status(200).json({
      success:true,
      message :'payment successfully',
      subscription_id : getSubscription.id,
     })
   }
   catch(e){
      return next( createError(e.message,400));
   }
}


export const verifySubscription = async(req,res,next)=>{
   try{
   const id = req.user.id;
   const{RozerPay_paymentId,RzpSubscription_id,RozerPay_signature}=req.body;
   const userInfo = await USER.findById(id);
   console.log(userInfo);
   if(!userInfo){
     return next( createError('Unauthorized,please login',400))
 }
   const subscribtionId = userInfo.booking.id;

  // "Generating a signature" with SHA256 for verification purposes
  // Here the subscriptionId should be the one which we saved in the DB
  // razorpay_payment_id is from the frontend and there should be a '|' character between this and subscriptionId
  // At the end convert it to Hex value
   const generatedSigneture=crypto.createHmac('sha256',process.env.RAZORPAY_SECRET)
   .update(`${RozerPay_paymentId}|${subscribtionId}`)
   .digest('hex');

// Check if generated signature and signature received from the frontend is the same or not   
if(generatedSigneture!==RozerPay_signature){
   return next( createError('Payment not verified, please try again.', 400));
}
 // If they match create payment and store it in the PaymentDB
 const PAYMENT = await payment.create({
   RozerPay_paymentId,
   RzpSubscription_id,
   RozerPay_signature
});
  await PAYMENT.save()
// Update the user subscription status to active (This will be created before this)
userInfo.booking.status='active';

await userInfo.save();

//Send confm. email to client
const subject = 'Booking done';
const textMessage = `<p>Dear ${userInfo.username},</p> <br/>
<p> Congratulations! We are excited to inform you that your booking for the event hall has been successfully confirmed.
        Thank you for choosing our venue to host your special event. We are committed to making your occasion unforgettable 
        and will work closely with you to ensure everything runs smoothly.</p>`

await sendEmail(userInfo.email,subject,textMessage);

res.status(200).json({
   success: true,
   message: 'Booking done successfully',
   userInfo
 })
}
 catch(e){
   return next( createError(e.message,400));
}
}

//GET RZP_ID
 export const getRazorpayApiKey= async (_req,res,next)=>{
   try {
      const razorpay_Key = process.env.RAZORPAY_KEY_ID ;
      res.status(200).json({
         success:true,
         message:'Razerpay API key',
         razorpayKey: razorpay_Key
      })    
   } catch (e) {
      return next(createError(e.message,400)); 
   }
 
}

// GET PAYMENTS
 export const allPayments = async(req,res,next)=>{
   try {
      //count-> no. of record required and skip->no of skips
      const{count,skip} = req.query;
      // Find all subscriptions from razorpay
      const paymentRecord = await razorpay.subscriptions.all({
       count: count || 10, // If count is sent then use that else default to 10
       skip: skip ? skip :0 //If skip is sent then use that else default to 0
      }) 
    const monthNames = [ 'January','February','March','April','May','June',
    'July','August','September','October','November','December',]  
    const finalMonth = {
      January: 0,
      February: 0,
      March: 0,
      April: 0,
      May: 0,
      June: 0,
      July: 0,
      August: 0,
      September: 0,
      October: 0,
      November: 0,
      December: 0,
    };
    const monthWisePayment = await paymentRecord.items.map((pay)=>{
       // We are using payment.start_at which is in unique time, 
       //so we are converting it to Human readable format using Date()
      const monthsInNumbers = new Date(pay.start_at * 1000);
      return monthNames[monthsInNumbers.getMonth()];
    })

   await monthWisePayment.map((month) => {
      Object.keys(finalMonth).forEach((objMonth) => {
        if (month === objMonth) {
          finalMonth[month] += 1;
        }
      });
    });

    const monthlySalesRecord = [];

    Object.keys(finalMonth).forEach((monthName) => {
      monthlySalesRecord.push(finalMonth[monthName]);
    });
    
    res.status(200).json({
      success: true,
      message: 'Successfully loaded all payments',
      paymentRecord,
      finalMonth,
      monthlySalesRecord,
    });
   } catch (error) {
      return next( createError(error.message,400))
   }
}

