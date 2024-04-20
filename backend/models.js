import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const patientSchema = new Schema({
    username : String,
    password : String,
    contactNumber : String
});


const Patient = new mongoose.model("Patient", patientSchema);


const doctorSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password : String,
    specialization: String,
    availability:[Object],
    appointments :{type: [mongoose.Types.ObjectId], default : []}
});

const Doctor = new mongoose.model("Doctor", doctorSchema);

const appointmentSchema = new mongoose.Schema({
    doctor: {
        type : mongoose.Types.ObjectId, ref: "Doctor"
    },
    patient: {
        type : mongoose.Types.ObjectId, ref: "Patient"
    },
    time: {
        type: Number,
    },
    date : {
        type : String,
    }
});

const Appointment = new mongoose.model("Appointment", appointmentSchema);


const ex = {
    'models' : {
        'Patient' : Patient,
        'Doctor' : Doctor,
        'Appointment' : Appointment
    } ,
    'schemas' : {
        'patient' : patientSchema,
        'doctor' : doctorSchema,
        'appointment' : appointmentSchema
    }
};

export default ex;
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
