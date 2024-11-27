const validateDetails = async (update, value, index, request,id, res)=>{
    try {
        const {Name, Email, Password, picture,firstname, lastname} = request;
        if(Name != null && Name != undefined){
            update.push(`Name =$${index++}`);
            value.push(Name);
        }
        if(Email != null && Email != undefined){
            update.push(` Email = $${index++}`);
            value.push(Email);
        }
        if(Password != null && Password != undefined){
            update.push(` Password = $${index++}`);
            value.push(Password);
        }
        if(Password != null && Password != undefined){
            update.push(` Password = $${index++}`);
            value.push(Password);
        }if(picture != null && picture != undefined){
            update.push(` picture = $${index++}`);
            value.push(picture);
        }if(firstname != null && firstname != undefined){
            update.push(` firstname = $${index++}`);
            value.push(firstname);
        }
        if(lastname != null && lastname != undefined){
            update.push(` lastname = $${index++}`);
            value.push(lastname);
        }
        if(update.length == 0){
            res.status(400).json({message:"No records to update, Please give fields and details to update."});
            return null;
        }else{
            value.push(id);
            return index++;
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({message:error.message});
        return null;
    }
}

export default validateDetails;