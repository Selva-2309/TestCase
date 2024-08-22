import usersQuery from "./usersQuery.js";
import validateDetails from "./validateController.js";
import bcrypt from 'bcrypt';
const getUsers = async (req,res)=>{
    try {
        const response = await usersQuery.getUsers();
        return res.status(response.code).json(response.res);
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:error.hint || "Internal server Error"});
    }
};
const getUsersById = async (req,res)=>{
    try {
        const {id} = req.params;
        const response = await usersQuery.getUsersById(id);
        return res.status(response.code).json(response.res);
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:error.hint || "Internal server Error"});
    }
};
const createUser = async (req,res)=>{
    try {
        const {Name, Email, Password, cpassword} = req.body;
        console.log(req.body);

        if(Object.keys(req.body).length === 0){
            return res.status(400).json({message: "No mandatory details to create"});
        }

        const result = await usersQuery.getUsersByEmail(Email);

        if(result.res == "No records found"){
            if(Password === cpassword){
                if(Password){
                    const pass = await bcrypt.hash(Password,10);
                }
                
                const response = await usersQuery.createUser(Name, Email, Password? pass : Password);
                return res.status(response.code).json(response.res);
            }else{
                return res.status(400).json({message: "Password doesn't match"});
            }
        }else{
            return res.status(400).json({message: "Account is already exists, please try with new one."})
        }
        
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:error.hint || "Internal server Error"});
    }
};
const updateUser = async (req,res)=>{
    try {
        const {id} = req.params;
        const result = await usersQuery.getUsersById(id);
        if(result.res == "No records found"){
            return res.status(result.code).json(result.res);
        }else if(result.res.length == 1){
            const update =[];
            const value =[];
            let index =1;
            const validateUsers = await validateDetails(update, value, index, req.body,id, res);
             // If validateDetails sends a response, terminate the function
             if (!validateUsers) {
                return; // Prevent further code execution
            }
            const response = await usersQuery.updateUser(update, value, validateUsers);
            return res.status(response.code).json(response.res);
            
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:error.hint || "Internal server Error"});
    }
};
const deleteUser = async (req,res)=>{
    try {
        const {id} = req.params;
        const result = await usersQuery.getUsersById(id);
        if(result.res == "No records found"){
            return res.status(result.code).json({message : result.res});
        }
        const response = await usersQuery.deleteUser(id);
        return res.status(response.code).json(response.res);
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:error.hint || "Internal server Error"});
    }
};

export default {getUsers, getUsersById, createUser,updateUser, deleteUser};