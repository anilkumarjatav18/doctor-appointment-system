const mongoose =require("mongoose")
const doctorSchema =new mongoose.Schema({
    userId:{
        type:String,

    },
    firstName:{
        type:String,
        required:[true,'first name is required']
    },
    lastName:{
        type:String,
        required:[true,'last name is required']
    },
    phone:{
        type:String,
        required:[true,'phone number is required']
    },
    email:{
        type:String,
        required:[true,'email is required']
    },
    website:{
        type:String
    },
    address:{
        type:String,
        required:[true,'address is required']
    },
    specialization:{
        type:String,
        required:[true,"Specialization is required"]
    },
    experience:{
        type:String,
        required:[true,"experience is required"]
    },
    feesPerCunsaltation:{
        type:String,
        required:[true,"Fees is required"]
    },
    status:{
        type:String,
        default:"pending"
    },
    timings:{
         type:Object,
         required:[true,'Work Timing is required']
    }

},{timestamps:true})
const doctorModel=mongoose.model("doctors",doctorSchema)
module.exports=doctorModel