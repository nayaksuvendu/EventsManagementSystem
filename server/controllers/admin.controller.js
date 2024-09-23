import USER from '../models/User.model.js';

 export const userStats = async(req,res,next)=>{
    try{
    const totalUser = await USER.countDocuments();
     
    const totalBookingUser = await USER.find({'booking.status':'active'}).count();
  
    res.status(200).json({
        success: true,
        message: 'All registered users count',
        totalUser,
        totalBookingUser,
      });

    }
    catch(error){
        res.status(400).json({
            success: false,
            message: error.message
          });

    }
}

