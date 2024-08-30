import mongoose from "mongoose";

const userSchema  = new mongoose.Schema({
    username: {
        type: String,
        required: [true , "Please provide an username"],
        unique: true
    },

    email: {
        type: String,
        required: [true , "Please provide an email"],
        unique: true
    },
    password: {
        type: String,
        required: [true , "Please provide a password"],
        
    },
    isVerified: {
        type: Boolean,
        default: false
        
    },
    isAdmin: {
        type: Boolean,
        default: false
        
    },

    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date 

    


})

// in express we used 
// const User = mongoose.model("users" , userSchema);
// export default User;
//  but in nextjs(edge time framework) we do not know whether the connection is already created or not with db so we use

const User = mongoose.models.users || mongoose.model("users" , userSchema);
export default User;
