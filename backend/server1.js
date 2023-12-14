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

const adminSchema = new Schema({
    username : String,
    password : String,
})

const Admin = new mongoose.model("Admin", adminSchema);


const patientSchema = new Schema({
    name : String,
    contactNumber : String,
    gender : String
})

const Patient = new mongoose.model("Patient", patientSchema);


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
        type: String,
    },
    patient: {
        type: String,
    },
    start_time: {
        type: Number,
    },
    end_time: {
        type: Number,
    },
    is_emergency: {
        type: Boolean,
        default: false,
    },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);


// Doctor.insertMany([
//     {
//         "name": "John Smith",
//         "specialization": "Cardilogist",  
//         "availability": [9, 10, 11, 14, 15, 16]
//       },
//       {
//         "name": "Sarah Park", 
//         "specialization": "Cardilogist",
//         "availability": [10, 13, 15]
//       },
//       {
//         "name": "Mark Taylor",
//         "specialization": "Cardilogist",
//         "availability": [9, 12, 14, 16]
//       },
//       {
//         "name": "Jessica Moore",
//         "specialization": "Cardilogist",
//         "availability": [9, 11, 14, 17]    
//       },
//       {
//         "name": "David Kim",
//         "specialization": "Cardilogist",
//         "availability": [10, 13, 15, 17]
//       },
//       {  
//         "name": "Lisa Chen",
//         "specialization": "Cardilogist", 
//         "availability": [9, 15, 16, 17]
//       },
//       {
//         "name": "Mike Davis", 
//         "specialization": "Cardilogist",
//         "availability": [9, 10, 14, 16] 
//       },
//       {
//         "name": "Cindy Lopez",
//         "specialization": "Cardilogist",  
//         "availability": [10, 12, 13, 15]
//       },
//       {
//         "name": "Steve Martinez",
//         "specialization": "Cardilogist",
//         "availability": [11, 12, 14, 17]
//       }, 
//       {
//         "name": "Amy Patel",
//         "specialization": "Cardilogist", 
//         "availability": [11, 13, 17]
//       }
//     ]);

app.post('/patientDetails', async (req, res) => {
    try {
        // Extract patient details from the request
        const pName = req.body.patientName;
        const pNumber = req.body.patientNumber;
        const pGender = req.body.patientGender;
        const appTime = req.body.appointmentTime;
        console.log(pName);
        // Find a doctor based on specialization (you may need a more specific query)
        const doctor = await Doctor.findOne({ specialization: 'Cardilogist' });

        if (!doctor) {
            return res.status(404).json({ error: 'No available doctor found for the given specialization.' });
        }

        // Find the closest available time slot based on the specified appointment time
        const closestAvailableTime = findClosestAvailableTime(doctor.availability);

        if (!closestAvailableTime) {
            return res.status(400).json({ error: 'No available time slot for the specified appointment time.' });
        }

        // Create a new patient
        const newPatient = new Patient({
            name: pName,
            contactNumber: pNumber,
            gender: pGender,
        });

        // Save the patient to the database
        const savedPatient = await newPatient.save();

        // Create a new appointment using the closest available time slot
        console.log(doctor._id.toString())
        const newAppointment = new Appointment({
            doctor: doctor._id, // Use the doctor's ObjectId
            patient: savedPatient._id, // Use the patient's ObjectId
            start_time: closestAvailableTime,
            end_time: closestAvailableTime + 1, // Assuming 1 hour appointment duration
            is_emergency: false, // Adjust this based on your requirements
        });

        // Save the appointment to the database
        const savedAppointment = await newAppointment.save();

        res.status(201).json({
            message: 'Patient details and appointment created successfully.',
            appointment: savedAppointment,
        });
    } catch (error) {
        console.error('Error processing appointment:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

function findClosestAvailableTime(availability) {
    const t = availability.shift();
    return t;
}

app.listen(port, () => {
    console.log(`API is running at http://localhost:${port}`);
  });