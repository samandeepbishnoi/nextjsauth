import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest,NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
connect()

export async function POST(request: NextRequest){
    try {
       
        const reqBody= await request.json()

        const { email , password} = reqBody;

        //validation
        console.log(reqBody);

        const user = await User.findOne({email})
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 400 });
        }
        if (!user.isVerified) {
            return NextResponse.json({ error: "Email not verified" }, { status: 400 });
        }
        
        console.log("user exists and verified");

       const validPassword= await bcryptjs.compare(password,user.password)

       if (!validPassword){
        return NextResponse.json({error: "Password is invalid"}, {status:  400}) 
        }

        const tokenData={
            id: user._id,
            username: user.username,
            email: user.email
        }
        const tokenSecret = process.env.TOKEN_SECRET || 'default_secret_key'; 
        const token =jwt.sign(tokenData, tokenSecret ,{expiresIn: '1d'})
        // here we could have used ! which  ensures that token secret is always given if  not that is our fault 
        // const token =jwt.sign(tokenData, process.env.TOKEN_SECRET! ,{expiresIn: '1d'})


                // response is var whose type is NextResponse so we can use cookies
        const response = NextResponse.json({
            message: "Logged in success",
            success: true

        })
        
        response.cookies.set("token" , token , {httpOnly:true})

        return response

    } catch (error:any) {
        return NextResponse.json({error : error.message} , {status:500})
    }
}