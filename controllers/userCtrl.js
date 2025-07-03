const userModel = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const doctorModel=require("../models/doctorModel.js")
const appointmentModel=require("../models/appointmentModel.js")
const moment=require('moment')

//register callback
const registerController = async (req, res) => {
  try {
    const exisitingUser = await userModel.findOne({ email: req.body.email });
    if (exisitingUser) {
      return res
        .status(200)
        .send({ message: "User Already Exist", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new userModel(req.body);
    console.log(newUser);
    await newUser.save();
    res.status(201).send({ message: "Register Sucessfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Register Controller ${error.message}`,
    });
  }
};

// login callback
const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "user not found", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Invlid EMail or Password", success: false });
    }
    const token =jwt.sign({id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).send({ message: "Login Success", success: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Error in Login CTRL ${error.message}` });
  }
};
const authController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.userId });
    // we trying to get the user details to hide this detail we used this  password as admin
    user.password = undefined;
    if (!user) {
      return res.status(200).send({
        message: "user not found",
        success: false,
      });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "auth error",
      success: false,
      error,
    });
  }
};
const applyDoctorController=async(req,res)=>{
  try {
    const newDoctor=await doctorModel({...req.body,status:"pending"})
    await newDoctor.save();
    const adminUser=await userModel.findOne({isAdmin:true})
    const notification=adminUser.notification
    notification.push({
      type:"apply-doctor-request",
      message:`${newDoctor.firstName} ${newDoctor.lastName} has applied for a doctor account`,
      data:{
        doctorId:newDoctor._id,
        name:newDoctor.firstName +" "+newDoctor.lastName,
        onclickPath:'/admin/doctors'
      },
    })
    await userModel.findByIdAndUpdate(adminUser._id,{notification})
    res.status(201).send({
      success:true,
      message:'Doctor applied successfully'
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success:false,
      error,
      message:"Error while Applying For Doctor"
    })
  }


}
const getAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    // to get the user Notification and seen the notification
    const seennotification = user.seenotification;
    const notifcation = user.notification;
    // To push all the  the notification in the seen varible
    seennotification.push(...notifcation);
    user.notification = []; // all the notification is empty
    user.seenotification = notifcation;
    const updatedUser = await user.save(); // update the existig user
    res.status(200).send({
      success: true,
      message: "all notification marked as read",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error in notification",
      success: false,
      error,
    });
  }
};
//Delete Notification
const deleteAllNotificationController=async(req,res)=>{
     try {
      const user=await userModel.findOne({_id:req.body.userId})
      user.notification=[];
      user.seenotification=[];
      const updatedUser=await user.save()
      updatedUser.password=undefined
      res.status(200).send({
        success:true,
        message:"Notification deleted Successfully",
        data:updatedUser
      })
       
     } catch (error) {
      console.log(error);
      res.status(500).send({
        success:false,
        message:"some  error",
        error
      })
     }
}
const getAllDocotrsController = async (req, res) => {
  try {
    const doctors = await doctorModel.find({ status: "approved" });
    res.status(200).send({
      success: true,
      message: "Docots Lists Fetched Successfully",
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Errro WHile Fetching DOcotr",
    });
  }
};


const bookeAppointmnetController = async (req, res) => {
  try {
    console.log(req.body);
     req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
     req.body.time = moment(req.body.time, "HH:mm")
     console.log(req.body.time);
    req.body.status = "pending";
    if(req.body.doctorInfo.userId===req.body.userInfo._id){
       return res.status(200).send({
        success: false,
        message: "You cannot book an appointment with yourself.",
      });
    }else{
                const newAppointment = new appointmentModel(req.body);
    await newAppointment.save();
    const user = await userModel.findOne({ _id: req.body.doctorInfo.userId });
    user.notification.push({
      type: "New-appointment-request",
      message: `A nEw Appointment Request from ${req.body.userInfo.name}`,
      onCLickPath: "/user/appointments",
    });
    await user.save();
    res.status(200).send({
      success: true,
      message: "Appointment Book succesfully",
    });
    }
    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While Booking Appointment",
    });
  }
};

const bookingAvailabilityController = async (req, res) => {
  try {
    const date = moment(req.body.date, "DD-MM-YY").toISOString();
    const fromTime = moment(req.body.time, "HH:mm")
      .subtract(1, "hours")
      .toISOString();
    const toTime = moment(req.body.time, "HH:mm").add(1, "hours").toISOString();
    const doctorId = req.body.doctorId;
    const appointments = await appointmentModel.find({
      doctorId,
      date,
      time: {
        $gte: fromTime,
        $lte: toTime,
      },
    });
    if (appointments.length > 0) {
      return res.status(200).send({
        message: "Appointments not Availibale at this time",
        success: true,
      });
    } else {
      return res.status(200).send({
        success: true,
        message: "Appointments available",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In Booking",
    });
  }
};
const userAppointmentsController = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({
      userId: req.body.userId,
    });
    res.status(200).send({
      success: true,
      message: "Users Appointments Fetch SUccessfully",
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In User Appointments",
    });
  }
};
const userAppointmentsCancleController=async(req,res)=>{
  try { 
    const {appointmentId, status}= req.body
    const appointment=await appointmentModel.findByIdAndUpdate(appointmentId,{status});
    const user=await userModel.findOne({_id:appointment.doctorInfo.userId});
    console.log(user);
    const notifcation=user.notification
          notifcation.push({
          type: "status updated",
           message: `Appointment has Been  ${status} By ${user.name}`,
           onCLickPath: "/doctor/appointments",
    });
    await user.save();
    console.log("hello \n" + appointment);
    if(!appointment){
      return res.status(404).json({success:false,message:"AppointMent Not Found"});
      
    }
    if(appointment.status === 'pending'){
      
      return res.status(200).json({success:true,message:" appointment is cancelled"})
    }
    
  } catch (error) {
    console.log("cancel Error",error);
    return res.status(500).json({success:false,message:"Server error"});
  }
}
const updateAppointmentController=async(req,res)=>{
  try {
    const appointment=await appointmentModel.findById(req.body.appointmentId);
    console.log(appointment);
    
  } catch (error) {
    
  }
}



module.exports = { 
      loginController, 
      registerController ,
      authController,
      applyDoctorController,getAllNotificationController,
     deleteAllNotificationController,bookeAppointmnetController,
     getAllDocotrsController,
     bookingAvailabilityController,
     userAppointmentsController,
     userAppointmentsCancleController,
     updateAppointmentController,
    };