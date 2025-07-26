import { generateToken } from '../lib/utils.js'
import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
export const signup = async (req, res) =>{
  const { email, fullName, password } = req.body;
try{
      if (password.length < 6){
        return res.status(400).json({message: "password should be atleast 6 characters"})
      }
       const user = await User.findOne({email}) 
      if(user){
        return res.status(400).json({message: "user already exists"})
      }
        const salt = await bcryptjs.genSalt(10)
const hashedPassword = await bcryptjs.hash(password, salt)

  const newUser = new User({
    email,
    fullName,
    password: hashedPassword
  })

  if(newUser){
     generateToken(newUser._id, res)

await newUser.save()

res.status(201).json({
  message: "user created successfully",
  _id: newUser._id,
  email: newUser.email,
  fullName: newUser.fullName,
  profilepic: newUser.profilepic
})
    
  }else{
    res.status(400).json({message: "error creating user"})
  }
    }
    catch(error){
        console.log("error in signup controller", error);
      res.status(500).json({message: "internal server error"})
    }
}


  


export const login  = async (req, res) => {
      res.send("login route");
  };

export const logout = async (req, res) =>{
    res.send("logout route");
}