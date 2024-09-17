import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';


export const signup = async (req,res)=>{
try{
    const {fullName,username,email,password }= req.body

    const emailRegex =/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(eamil)){
        return res.status(400).json({error:"Invalid email format"});
    }

    const exstingUser = await User.findOne({username});
    if(existingUser){
        return res.status(400).json({error:"username is already taken"}); 
    }
    const exstingEmail = await User.findOne({email});
    if(exstingEmail){
        return res.status(400).json({error:"email is already taken"}); 
    }
    
    //hash password
    const salt = await genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser =new User({
        fullName,
        username,
        email,
        password: hashedPassword
    })

    if(newUser){
        generateTokenAndSetCookie(newUser.id,res)
        await newUser.save();

        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.username,
            email: newUser.email,
            followers: newUser.followers,
            following: newUser.following,
            profileImg: newUser.profileImg,
            coverImg: newUser.coverImg,
        })
    } else{
        res.status(400).json({error: "Invalid user data"});
    }
}
catch(error){
    console.log("Error in signup controller", error.message);

    res.status(500).json({error: "Internal server Error"})
}
};

export const login = async (req,res)=>{
    res.json({
        data: "You hit the login endpoint",
    });
}

export const logout = async (req,res)=>{
    res.json({
        data: "You hit the logout endpoint",
    });
}