const express=require("express")
const {
    getAllUserController,
    getAllDoctorsController,
    changeAccountStatus
}=require("../controllers/adminController");
const authMiddleware=require("../middlewares/authMiddleware")
const router=express.Router();

router.get("/getAllUsers",authMiddleware,getAllUserController)

router.get("/getAllDocors",authMiddleware,getAllDoctorsController)

// change the account status
router.post("/changeAccountStatus",authMiddleware,changeAccountStatus)
module.exports=router