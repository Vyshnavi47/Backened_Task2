const express = require("express");
const router= express.Router();
const {getAllUsers,createUser,getSpecificUser,updateUser,deleteUser} = require("../controllers/userController")
router.route("/").get(getAllUsers).post(createUser)

router.route("/:id").get(getSpecificUser).put(updateUser).delete(deleteUser)

module.exports = router;

