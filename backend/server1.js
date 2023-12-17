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
    date : {
        type : Date,
    }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);


// Doctor.insertMany([
//     {
//         "name": "John Smith",
//         "specialization": "Cardiologist",  
//         "availability": [9, 10, 11, 14, 15, 16]
//       },
//       {
//         "name": "Sarah Park", 
//         "specialization": "Radiologist",
//         "availability": [10, 13, 15]
//       },
//       {
//         "name": "Mark Taylor",
//         "specialization": "Pediatrician",
//         "availability": [9, 12, 14, 16]
//       },
//       {
//         "name": "Jessica Moore",
//         "specialization": "Cardiologist",
//         "availability": [9, 11, 14, 17]    
//       },
//       {
//         "name": "David Kim",
//         "specialization": "Physiologist",
//         "availability": [10, 13, 15, 17]
//       },
//       {  
//         "name": "Lisa Chen",
//         "specialization": "Radiologist", 
//         "availability": [9, 15, 16, 17]
//       },
//       {
//         "name": "Mike Davis", 
//         "specialization": "Cardiologist",
//         "availability": [9, 10, 14, 16] 
//       },
//       {
//         "name": "Cindy Lopez",
//         "specialization": "Pediatrician",  
//         "availability": [10, 12, 13, 15]
//       },
//       {
//         "name": "Steve Martinez",
//         "specialization": "Cardiologist",
//         "availability": [11, 12, 14, 17]
//       }, 
//       {
//         "name": "Amy Patel",
//         "specialization": "Pediatrician", 
//         "availability": [11, 13, 17]
//       }
//     ]);

app.post('/patientDetails', async (req, res) => {
    try {
        // Extract patient details from the request
        const pName = req.body.patientName;
        const pNumber = req.body.patientNumber;
        const pGender = req.body.patientGender;
        const appTime = req.body.appointmentDate;
        const time = new Date(appTime).getHours();
        const date = new Date(appTime).getDate();
        const spec = req.body.spec;
        // Find a doctor based on specialization (you may need a more specific query)
        const doctor = await Doctor.findOne({ specialization: spec });
        console.log(doctor)
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
            date : date,
        });

        // Save the appointment to the database
       newAppointment.save();
        function findClosestAvailableTime(availability) {
            
            // Convert targetTime and timeArray elements to minutes for easier comparison
            const targetTime = time;
            const closestTimeIndex = availability.reduce((closestIndex, current, currentIndex, array) => {
                const closestDiff = Math.abs(array[closestIndex] - targetTime);
                const currentDiff = Math.abs(current - targetTime);
        
                return currentDiff < closestDiff ? currentIndex : closestIndex;
            }, 0);
        
            // Get the closest time
            const closestTime = availability[closestTimeIndex];
        
            // Remove the closest time from the array
            availability.splice(closestTimeIndex, 1);
        
            return closestTime;
        }
        
    } catch (error) {
        console.error('Error processing appointment:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.get('/appointments',async (req,res)=>{
    let response = [];
    const appointments = await Appointment.find({});
    for (const appointment of appointments) {
        const doc = await Doctor.findById(appointment.doctor);
        const result = {
            start_time: appointment.start_time,
            doctor: doc.name,
            date : appointment.date,
        };
        response.push(result);
    }
    
    res.json(response);
});

app.listen(port, () => {
    console.log(`API is running at http://localhost:${port}`);
  });