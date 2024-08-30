import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest,NextResponse } from 'next/server'
import { getDataFromToken } from '@/helpers/getDataFromToken'
connect()

export async function POST(request: NextRequest){
    try {
        
     const userId =   await  getDataFromToken(request)
     const user = await User.findOne({_id: userId}).select("-password").lean() // whereever we put - it is not selected 

     if (!user){
        return NextResponse.json({error: " user not found invalid token"}, {status:  400}) 
    }

    return NextResponse.json({
        message:"user found",
        data : user
    })
    } catch (error:any) {
        return NextResponse.json({error : error.message} , {status:500})
    }
}