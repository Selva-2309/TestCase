const validateDetails = async (update, value, index, request,id, res)=>{
    try {
        const {description, assignee, status,issueid,project, details, lastedit} = request;
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
        if(project != null && project != undefined){
            update.push(` project = $${index++}`);
            value.push(project);
        }
        if(details != null && details != undefined){
            update.push(` details = $${index++}`);
            value.push(details);
        }
        if(lastedit != null && lastedit != undefined){
            update.push(` lastedit = $${index++}`);
            value.push(lastedit);
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