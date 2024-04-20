import express from 'express';
import {updateDoctor, deleteDoctor, singleDoctor, allDoctors} from './doctorController.js';
import {authenticate, restrict} from './verifyToken.js'
import ex from './models.js';
const router = express.Router();

// router.put('/:id', authenticate,restrict(['Doctor']),updateDoctor);
// router.get('/:specialisation', singleDoctor);
router.get('/specDoctors',allDoctors);
// router.delete('/:id', authenticate,restrict(['Doctor']),deleteDoctor);
router.put('/updateAvail', authenticate, async (req,res)=>{
    try{
        await ex.models.Doctor.findOne({username : req.user.username}).then((user)=>{
            console.log(user);
            const ad = req.body.day;
            const ah = req.body.hours;
            const new_avail = {
                avail_day : ad,
                avail_hours : ah
            }
            let u = user.availability.filter((obj)=>obj.avail_day == ad);
            if(u.length == 0)
            {
            console.log(new_avail);
            user.availability.push(new_avail);
            }

            else
            {
            console.log(u);
            u.avail_hours = ah;
            }

            
            let apps = user.appointments;
            if(apps == undefined)
            user.appointments = [];

            else
            user.appointments = apps;
            
            user.save();
        });
        res.send({message : "auth"});
    }
    catch(e)
    {
        console.log(e);
        res.send({message : "error"});
    }
})

router.get('/appointments',authenticate, async (req,res)=>{
    try{
    await ex.models.Doctor.findOne({username : req.user.username}).then(async (user)=>{
        const appointments = await ex.models.Appointment.find({doctor : user._id});
        console.log(appointments)
        res.send({appointments : appointments});
    }); 
    }
    catch(e)
    {
        console.log(e);
    }
});

export default router;