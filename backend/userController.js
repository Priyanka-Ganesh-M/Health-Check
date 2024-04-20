import ex from './models.js';

export const updateUser = async(req, res)=>{
    const id = req.params.id;
    try{
        const updateUser = await ex.models.Patient.findByIdAndUpdate(id, {$set : req.body}, {new : true});
        res.send('Patient update');
    }
    catch(e)
    {
        res.send("Patient update pending");
    }
}


export const deleteUser = async(req, res)=>{
    const id = req.params.id;
    try{
        await ex.models.Patient.findByIdAndDelete(id);
        res.send('Patient deleted');
    }
    catch(e)
    {
        res.send("Patient delete pending");
    }
}



export const singleUser = async(req, res)=>{
    const id = req.params.id;
    try{
        const singleUser = await ex.models.Patient.findById(id);
        res.json({message : 'Patient found'});
    }
    catch(e)
    {
        res.json({message : "Patient not found"});
    }
}


export const allUsers = async(req, res)=>{
    try{
        const singleUser = await ex.models.Patient.find({}).select('-password');
        res.send(singleUser);
    }
    catch(e)
    {
        res.send("Patients not found");
    }
}