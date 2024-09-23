import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.set('strictQuery',false);
 const dbCon=async ()=>{
      await mongoose.connect(process.env.MONGO_CONN)
            .then((conn)=>{console.log(`connected to Mongodb on ${conn.connection.host}`)})
            .catch((err)=>{
                console.log(err)
                process.exit(4);
            })
}

export default dbCon;




