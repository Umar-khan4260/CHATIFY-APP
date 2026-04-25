import { resendClient,sender } from "../lib/resend.js";
import { createWelcomeEmailTemplate } from "./emailTemplates.js";

export const sendWelcomeEmail = async (email,name,clientURI)=>{
    const{data,error} = await resendClient.emails.send({
        from: `${sender.name} <${sender.email}>`,
        to: email,
        subject: "Welcome to Chatify!",
        html: createWelcomeEmailTemplate(name,clientURI)   
    });

    if(error){
        console.error(`Error sending welcome email: ${error.message}`);
    }   
    console.log(`Welcome email sent to ${email}: ${data.id}`);      

}