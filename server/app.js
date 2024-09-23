import express from "express"
import dotenv from "dotenv"
import authRoute from "./routes/auth.router.js"
import hallsRoute from "./routes/halls.router.js"
import slotsRoute from "./routes/slots.router.js"
import usersRoute from "./routes/users.router.js"
import contactRoute from "./routes/contact.router.js"
import bookedTicketRoute from "./routes/bookedTicket.routers.js"
import paymentRoute from './routes/payment.router.js'
import feedBack from './routes/feedback.route.js'
import admin from './routes/admin.router.js'
import cookieParser from "cookie-parser"
import cors from "cors"
import morgan from "morgan"
import errorMidleware from "./midleware/error.midleware.js"

const app=express()
dotenv.config()
 
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(morgan('dev'))
app.use(express.urlencoded({extended:true})); // parsing encoded url

app.use("/api/auth",authRoute);
app.use("/api/halls",hallsRoute);
app.use("/api/slots",slotsRoute);
app.use("/api/users",usersRoute);
app.use("/api/contact",contactRoute);
app.use("/api/ticketconfirm",bookedTicketRoute);
app.use("/api/payment",paymentRoute);
app.use("/api/feedback",feedBack);
app.use("/api/admin",admin);

app.all('*',function(_req,res){ // "*" mean the router that not mentioned 
    res.status(404).send("404 erroe!! page not found")
})

app.use(errorMidleware);

export default app;

