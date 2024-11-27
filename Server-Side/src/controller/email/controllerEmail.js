import transporter from "../../configuration/configEmail.js";

const sendEmail = (req, res)=>{
    try {
        const {to, subject, text} = req.body;
        console.log(req.body)
        if(!to || !subject || !text){
            return res.status(400).json({message:'Mandatory fields are missing.'})
        }
        const emailOption = {
            to:to,
            subject:subject,
            text:text
        };

        transporter.sendMail(emailOption, (err, info)=>{
            if(err){
                console.error(err);
                return res.status(400).json({message:err});
            }else{
                return res.status(200).json({message:`email sent successfully to ${to}`});
            }
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: error.hint ? error.hint : "Internal Server Error"});
    }
}

export default sendEmail;