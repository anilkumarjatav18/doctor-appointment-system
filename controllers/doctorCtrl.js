const appointmentModel = require("../models/appointmentModel");
const doctorModel=require("../models/doctorModel");
const userModel = require("../models/userModels");
const getDoctorInfoController=async(req,res)=>{
    try {
      const doctor=await doctorModel.findOne({userId:req.body.userId})
      console.log(doctor)
      res.status(200).send({
        success:true,
        message:"doctor data fetch success",
        data:doctor,
      })
    } catch (error) {
    console.log(error);
    res.status(500).send({
    success:false,
    message:"some  error",
    error
  })
    }
};
const updateProfileController=async(req,res)=>{
  try {
    const doctor=await doctorModel.findOneAndUpdate({userId:req.body.userId},req.body)
    res.status(201).send({
        success:true,
        message:"Doctor  Profile Update Successfully",
        data:doctor
    })
    
  } catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:'doctor profile update issue',
        error
    })
  }
}
const getDoctorByIdController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ _id: req.body.doctorId });
    console.log(doctor);
    res.status(200).send({
      success: true,
      message: "Sigle Doc Info Fetched",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Erro in Single docot info",
    });
  }
};

const doctorAppointmentController=async(req,res)=>{
  try {
     const doctor = await doctorModel.findOne({ userId: req.body.userId });
    const appointments = await appointmentModel.find({
      doctorId: doctor.userId,
    });
    
    res.status(200).send({
      success:true,
      message:"Doctor Appointment fetch 1 Successfully",
      data:appointments
    })
  
    
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      error,
      message:"Error In doc Appointment"
    })
  }

}
const getDoctorByIdControllerUpdate=async(req,res)=>{
 try {
    const doctor = await appointmentModel.findOne({ _id: req.body.doctorId });
    res.status(200).send({
      success: true,
      message: "Sigle Doc Info Fetched",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Erro in Single docot info",
    });
  }
}
const updateStatusController=async(req,res)=>{
        try {
          const {appointmentId, status}= req.body
          const appointment=await appointmentModel.findByIdAndUpdate(appointmentId,{status})
          const user = await userModel.findOne({_id: appointment.userId});
          const notifcation=user.notification
          notifcation.push({
          type: "status updated",
           message: `Your Appointment has Been Updated ${status}`,
           onCLickPath: "/doctor/appointments",
    });
    res.status(200).send({
      success:true,
      message:"appointment Status Updated"
    })
    await user.save();
        } catch (error) {
          console.log(error)
          res.status(500).send({
            success:false,
            error,
            message:"Error in Update Status"
          })
        }
}
module.exports= {
    getDoctorInfoController,
    updateProfileController,
    getDoctorByIdController,
    doctorAppointmentController,
    updateStatusController,
    getDoctorByIdControllerUpdate,
}
