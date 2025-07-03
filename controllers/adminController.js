const doctorModel=require("../models/doctorModel")
const userModel=require("../models/userModels")
 const  getAllUserController=async(req,res)=>{
try {
    const users=await userModel.find({})
    res.status(200).send({
          success:true,
          message:"Users Data",
          data:users,
    })
    
} catch (error) {
    console.log(error);
    res.status(500).send({
        success:false,
        message:"Failed to fetch the user",
        error
    })
}
}
const getAllDoctorsController=async(req,res)=>{
try {
    const doctors=await doctorModel.find({})
    res.status(200).send({
          success:true,
          message:"Doctor Data",
          data:doctors,
    });
    
} catch (error) {
    console.log(error);
    res.status(500).send({
        success:false,
        message:"Failed to fetch the doctor",
        error,
    });
}

}
const changeAccountStatus=async(req,res)=>{
   try {
    const { doctorId, status } = req.body;
    const doctor = await doctorModel.findByIdAndUpdate(
        doctorId,
        { status },
    );
    if(!doctor){
        console.log("doctor not found")
    }
    
    const user = await userModel.findOne({_id: doctor.userId});
    const notification=user.notification
    notification.push({
        type:'doctor-account-request-updated',
        mesaage:`Your Doctor account Request Has ${status}`,
        onClickPath:'/notification'

    })
    user.isDoctor=status=== "approved" ? true : false
    await user.save()
    res.status(201).send({
        success:true,
        message:"Account status is updated",
        data:doctor,
    })
   } catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:"Error in the Account status",
        error,
    })
   }
}

module.exports ={
    getAllUserController,
    getAllDoctorsController,
    changeAccountStatus
};