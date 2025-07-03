const express=require('express')
const { loginController, registerController, authController,applyDoctorController,getAllNotificationController
    ,bookeAppointmnetController,deleteAllNotificationController,getAllDocotrsController,
    bookingAvailabilityController,
    userAppointmentsController,
    userAppointmentsCancleController,
    updateAppointmentController,
 } = require('../controllers/userCtrl')
const authMiddleware =require('../middlewares/authMiddleware')
const router=express.Router()
router.post('/login',loginController)
router.post('/register',registerController)

router.post('/getUserData',authMiddleware,authController)
//Apply Doctor
router.post('/applydoctor',authMiddleware,applyDoctorController)
// Notification Doctor || method Post
router.post('/get-all-notification',authMiddleware,getAllNotificationController)
// Notification Doctor || method Post
router.post('/delete-all-notification',authMiddleware,deleteAllNotificationController)

//
router.get("/getAllDoctors", authMiddleware, getAllDocotrsController);
router.post("/book-appointment", authMiddleware, bookeAppointmnetController);
router.post(
    "/booking-availbility",
    authMiddleware,
    bookingAvailabilityController
  );
  //aappoint ment list
  router.get("/user-appointments", authMiddleware, userAppointmentsController);
  router.post("/cancel-appointment",authMiddleware,userAppointmentsCancleController);
  router.post("/updateAppointment",authMiddleware,updateAppointmentController);
// router.delete("/user-delete-appointment/:id",authMiddleware,userDeleteController)

module.exports=router