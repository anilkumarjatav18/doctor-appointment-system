const express=require('express')
const router=express.Router()
const{ getDoctorInfoController,updateProfileController, getDoctorByIdController,updateStatusController,
doctorAppointmentController,getDoctorByIdControllerUpdate,
}=require("../controllers/doctorCtrl")
const authMiddleware =require("../middlewares/authMiddleware")


router.post('/getDoctorInfo',authMiddleware,getDoctorInfoController)
router.post('/updateProfile',authMiddleware,updateProfileController)
router.post("/getDoctorById", authMiddleware, getDoctorByIdController);

//post Update Profile
router.get('/doctor-appointment',authMiddleware,doctorAppointmentController);
router.post('/doctor-appointment-update',authMiddleware,getDoctorByIdControllerUpdate);
router.post("/update-status",authMiddleware,updateStatusController);


module.exports=router