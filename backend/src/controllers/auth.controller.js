
import { generateToken } from '../lib/utils.js'
import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';

export const signup = async (req, res) => {
  const { email, fullName, password } = req.body;
  
  try {
    if (!email || !fullName || !password) {
      return res.status(400).json({message: "all fields are required"})
    }
    
    if (password.length < 6) {
      return res.status(400).json({message: "password should be atleast 6 characters"})
    }
    
    const user = await User.findOne({email}) 
    if (user) {
      return res.status(400).json({message: "user already exists"})
    }
    
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)

    const newUser = new User({
      email,
      fullName,
      password: hashedPassword
    })

    if (newUser) {
      generateToken(newUser._id, res)
      await newUser.save()

      res.status(201).json({
        message: "user created successfully",
        _id: newUser._id,
        email: newUser.email,
        fullName: newUser.fullName,
        profilepic: newUser.profilepic
      })
    } else {
      res.status(400).json({message: "error creating user"})
    }
  } catch(error) {
    console.log("error in signup controller", error);
    res.status(500).json({message: "internal server error"})
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body
  
  try {
    const user = await User.findOne({email})
    if (!user) {
      return res.status(400).json({message: "invalid credentials"})
    }
    
    const isPasswordCorrect = await bcryptjs.compare(password, user.password)
    if (!isPasswordCorrect) {
      return res.status(400).json({message: "invalid credentials"})
    }
    
    generateToken(user._id, res)
    
    res.status(200).json({
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
      profilepic: user.profilepic
    })
    
  } catch(error) {
    console.log("error in login controller:", error);
    res.status(500).json({message: "internal server error"})
  }
}

export const logout = async (req, res) => {
  try {
    res.cookie('jwt', '', {
      maxAge: 0,
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production'
    })
    
    res.status(200).json({message: "logged out successfully"})
  } catch(error) {
    console.log("error in logout controller:", error);
    res.status(500).json({message: "internal server error"})
  }
}
