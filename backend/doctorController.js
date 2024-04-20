import ex from './models.js';

export const updateDoctor = async(req, res)=>{
    console.log('updating')
    const id = req.params.id;
    try{
        const updateUser = await ex.models.Doctor.findByIdAndUpdate(id, {$set : req.body}, {new : true});
        res.send('Doctor update');
    }
    catch(e)
    {
        res.send("Doctor update pending");
    }
}


export const deleteDoctor = async(req, res)=>{
    const id = req.params.id;
    try{
        await ex.models.Doctor.findByIdAndDelete(id);
        res.send('Doctor deleted');
    }
    catch(e)
    {
        res.send("Doctor delete pending");
    }
}



export const singleDoctor = async(req, res)=>{
    const id = req.params.id;
    try{
        const singleUser = await ex.models.Doctor.findById(id);
        res.send('Doctor found');
    }
    catch(e)
    {
        res.send("Doctor not found");
    }
}



export const allDoctors = async(req,res)=>{
    const query = req.query.specialization;
    console.log(query);

    try{
        if(query)
    {
        await ex.models.Doctor.find({specialization : query}).select("-password").then((doctors)=>{
            console.log(doctors)
            res.send({data : doctors});
        });
    }
    else
    {
        await ex.models.Doctor.find({}).select('-password').then((doctors)=>{
            res.send({message : "All Doctors", data : doctors});
        })
    }}
    catch(e)
    {
        console.log(e);
        res.send('Could not find a doctor');
    }
}