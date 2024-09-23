import app from './app.js';
import dotenv from 'dotenv' ;
import dbCon from './config/dbConfig.js';

dotenv.config();

const port = process.env.PORT  
app.listen(port,async()=>{
    await dbCon();
    console.log(`server placed on ${port} successfully`)
})