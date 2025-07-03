const express =require("express")
const colors=require("colors")
const morgan =require("morgan")
const dotenv =require("dotenv")
const cors=require("cors")

const connectDB = require("./config/db")

//rest object
const app=express()
dotenv.config()
connectDB()
app.use(cors())


//middlewares
app.use(express.json());
app.use(morgan('dev'))

//routes
// app.get('/',(req,res)=>{
//         res.status(200).send({
//             message:"server is runnig"
//         });
// })
//main routes of the user
app.use('/api/v1/user',require("./routes/userRoutes.js"))
app.use("/api/v1/admin",require('./routes/adminRoute.js'))
app.use("/api/v1/doctor",require("./routes/doctorRoute.js"))

const port=process.env.PORT || 8080
app.listen(port,()=>{
    console.log(`server is running on Port ${port}`)
})