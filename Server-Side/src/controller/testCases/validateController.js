const validateDetails = async (update, value, index, request,id, res)=>{
    try {
        const {description, assignee, status,issueid} = request;
        if(description != null && description != undefined){
            update.push(`description =$${index++}`);
            value.push(description);
        }
        if(assignee != null && assignee != undefined){
            update.push(` assignee = $${index++}`);
            value.push(assignee);
        }
        if(status != null && status != undefined){
            update.push(` status = $${index++}`);
            value.push(status);
        }
        if(issueid != null && issueid != undefined){
            update.push(` issueid = $${index++}`);
            value.push(issueid);
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