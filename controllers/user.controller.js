const {  createCandidateService } = require("../services/candidate.service");
const userService  = require("../services/user.service");
const { generateToken } = require("../utils/token");
  
exports.signupUser = async (req, res, next) => {
    try {
        const newUser = await userService.createUserService(req.body);
      
      if(newUser.role === "candidate"){
        const user = req.body
        await createCandidateService({
          name: `${user.firstName} ${user.lastName}` ,
          user:{
            id: newUser._id
          }
        })
      }
        res.status(200).json({success: true, data: newUser})
      } catch (error) {
        res.status(400).json({success: false, error: error.message})
      }
}

exports.loginUser = async (req, res, next) => {
    try {
        const {email, password} = req.body
        if(!email || !password ){
            return res.status(400).json({success: false, error: "Email & Password is not valid!"})
        }
        const user = await userService.findUserService({email});
    
        const {password:userPassword , ...data} = user.toObject()
        
        if(!user){
            return res.status(400).json({success: false, error: "No User Found"})
        }

        const isPasswordValid = user.comparePassword(password, user.password);

        if(!isPasswordValid){
            return res.status(400).json({success: false, error: "Password is wrong"})
        }

        const token = generateToken(data)

        res.status(200).json({success: true, result: data,token})
      } catch (error) {
        res.status(400).json({success: false, error: error.message})
      }
}

exports.getAuth = async (req, res) => {
    try {
        const {email} = req.user
         const data = await userService.findUserService({email});
        const { password, ...user } = data.toObject()

      res.status(200).json({success: true, result: user})
    } catch (error) {
        res.status(400).json({success: false, error: error.message})
    }
  };