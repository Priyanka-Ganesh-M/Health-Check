import {updateUser, deleteUser, singleUser, allUsers} from './userController.js';
import express from 'express';
import {authenticate, restrict} from './verifyToken.js'
import ex from './models.js';
const router = express.Router();

// router.get('/:id' ,authenticate,restrict(['Patient']), singleUser);
// router.get('/', allUsers);
// router.put('/:id', authenticate,restrict(['Patient']),updateUser);
// router.delete('/:id', authenticate,restrict(['Patient']),deleteUser);



router.post('/book',authenticate, async (req, res) => {
    try {
        // Extract patient details from the request
        const formDetails = req.body;
        console.log(formDetails)
        const userId = await ex.models.Patient.findOne({username : req.user.username});
        
        const app = new  ex.models.Appointment({
            doctor : formDetails.doc,
            patient : userId._id,
            time : formDetails.appointmentTime,
            date : formDetails.appointmentDay
        })

        app.save();

        // Find a doctor based on specialization (you may need a more specific query)
        
        
    } catch (error) {
        console.error('Error processing appointment:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


export default router;