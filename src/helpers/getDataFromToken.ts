import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken'
export const getDataFromToken=(request: NextRequest)=>{
    try {
        const token = request.cookies.get("token")?.value || ""

        const decodedToken:any =  jwt.verify(token , process.env.TOKEN_SECRET!)

        return decodedToken.id  // here we dont use _id because this value is not taken from db this is taken from login const tokenData={
          // id: user._id,
        //     username: user.username,
        //     email: user.email
        // }
    } catch (error:any) {
        throw new Error(error.message)
    }
}