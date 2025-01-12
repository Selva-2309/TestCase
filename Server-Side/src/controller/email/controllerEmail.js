import transporter from "../../configuration/configEmail.js";
import sendEmailContent from "./sendEmail.js";

const sendEmail = (req, res)=>{
    try {
        
        console.log(req.body)
        sendEmailContent(req.body, res);
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: error.hint ? error.hint : "Internal Server Error"});
    }
}

export default sendEmail;