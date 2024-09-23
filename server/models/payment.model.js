import mongoose from 'mongoose';

const PaymentSchema=new mongoose.Schema({
    RozerPay_paymentId:{
        type:String,
        required:true
    },
    RzpSubscription_id:{
          type:String,
          required:true
    },
    RozerPay_signature:{
        type:String,
        required:true
    }
},{timestamps:true}
);
export default mongoose.model('payment',PaymentSchema);