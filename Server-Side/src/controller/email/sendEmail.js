import transporter from "../../configuration/configEmail.js";
const sendEmailContent = (req,res)=>{
    const {to, subject, text}= req;
    console.log(req)
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
            return res.status(200).json({message:`email sent successfully to your email account.`});
        }
    })
};

export default sendEmailContent;