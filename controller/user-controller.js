import User from "../model/User.js";


export const addUser = async (req,res)=>{
    try{
        let exist = await User.findOne({uid:req.body.uid})
        if(exist){
            res.status(200).json({msg:"user exist already"})
            return;
        }
        const newUser = new User(req.body);
        await newUser.save();
        console.log(req.body);
        return res.status(200).json(newUser);
    }catch(error){
        return response.status(500).json(error.message);
    }
}

export const getUsers = async (req,res) =>{
    try{
        const users = await User.find({});
        return res.status(200).json(users);
    }catch(error){
        return res.status(500).json(error.message);
    }
}