const express = require("express");
const dotenv = require("dotenv").config();
const connectDb = require("./config/dbConnection")
const multer = require("multer");
const path = require("path");

const app = express();
const port = process.env.PORT||5000;

connectDb();

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        return cb(null,"./uploads");
    },
    filename:function(req,file,cb){
        return cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = multer({storage:storage});

const multiUpload = upload.fields([{name :"profileImage"},{name:"resume"}])
app.use("/uploads",express.static(path.join(__dirname,"uploads")));
app.use(express.json());

app.use("/api/users",multiUpload,require("./Routes/UserRoutes"))

app.listen(port,()=>{
    console.log(`Server running at port ${port}`)
})