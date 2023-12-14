import express from 'express';
import bodyParser from "body-parser";
import cors from 'cors';
import mongoose from 'mongoose';
// import multer from 'multer';
// import passport from 'passport';
// import passportLocalMongoose from "passport-local-mongoose";
// import session from 'express-session';
// import 'mongoose-encryption';
import dotenv from 'dotenv';

const Schema = mongoose.Schema;
const app = express();
const port = 4000;
dotenv.config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/files',express.static('files'));


const corsOptions = {
    origin: '*',
    credentials : true,
    optionSuccessStatus : 200
}

app.use(cors(corsOptions));

// app.use(session({
//     secret: process.env.SECRET,
//     resave: false,
//     saveUninitialized: true,
//   }));

//   app.use(passport.initialize());
//   app.use(passport.session());


mongoose.connect("mongodb://127.0.0.1:27017/healthSyncDB", {UseNewUrlParser : true}).then(function(){
      console.log("connected")}).catch(function(err){
      console.log(err);
});


const userSchema = new Schema({
    username : String,
    password : String,
})

const User = new mongoose.model("User", userSchema);

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    specialization: {
        type: String,
        required: true,
    },
    availability: {
        type: [Number], // Array of time slots (e.g., [9, 10, 11, 14, 15, 16])
        default: [],
    },
});


const Doctor = new mongoose.model("Doctor", doctorSchema);

const appointmentSchema = new mongoose.Schema({
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true,
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true,
    },
    start_time: {
        type: Date,
        required: true,
    },
    end_time: {
        type: Date,
        required: true,
    },
    is_emergency: {
        type: Boolean,
        default: false,
    },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);




app.post('/patientDetails',(req,res)=>{
    
    const pName = req.body.patientName;
    const pNumber = req.body.patientGender;
    const pGender = req.body.patientGender;
    const appTime = req.body.appointmentTime;
    console.log(appTime);
    // const newPost = new mySchemas.JobPost({
    // company : comp,
    // position : pos,
    // location : loc,
    // skillSet : skillSet
    // });
    // newPost.save()
    // .then(async newP => {
    //     const postId = newP._id;

    //     try {
    //         const employer = await Employer.findById(empId);
    //         console.log(employer);

    //         employer.jobPostId.push(postId);
    //         console.log(employer.jobPostId);

    //         // Save the updated employer with the new post ID
    //         await employer.save();

    //         console.log('Post ID added to Employer successfully');
    //     } catch (error) {
    //         console.error('Error updating employer:', error);
    //     }
    // })
    // .catch(error => {
    //     console.error('Error saving the new post:', error);
    // });
     
    
    res.json({message : "posted the data"});
});

app.listen(port, () => {
    console.log(`API is running at http://localhost:${port}`);
  });