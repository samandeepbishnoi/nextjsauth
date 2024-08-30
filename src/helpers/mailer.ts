import User from '@/models/userModel';
import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs'

export const sendEmail = async({email , emailType , userId}:any)=>{
    try {
      
        const hashedToken = await bcryptjs.hash(userId.toString() , 10)

        if(emailType==='VERIFY'){
          await User.findByIdAndUpdate(userId , 
            {$set: {verifyToken: hashedToken ,verifyTokenExpiry: Date.now()+360000 }  })
        }
        else if (emailType==='RESET' ){
          await User.findByIdAndUpdate(userId , 
            {$set:{forgotPasswordToken: hashedToken ,forgotPasswordTokenExpiry: Date.now()+360000 } } )
        } 
        

        


        var transport = nodemailer.createTransport({
          host: "sandbox.smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: "10a3d79823b2fe", // these two should not be here they should be in env variable
            pass: "dda09b42b8043e" //
          }
        });

          const mailOptions={
            from: 'samandeepbishnoi@gmail.com', 
            to: email, 
            subject: emailType==='VERIFY' ?'Verify your Email': 'Reset your Password', 
            
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}"> here</a> to ${emailType==='VERIFY' ?'Verify your Email': 'Reset your Password'}<br>or paste below link in your browser.<br>
            ${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`

          }

         const mailResponse = await transport.sendMail(mailOptions);
         return mailResponse

          

    } catch (error:any) {
        throw new Error(error.message);
    }
}