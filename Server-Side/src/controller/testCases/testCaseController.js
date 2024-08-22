import testCasesQuery from "./testCasesQuery.js";
import validateDetails from "./validateController.js";
import bcrypt from 'bcrypt';
const getTestCases = async (req,res)=>{
    try {
        const response = await testCasesQuery.getTestCases();
        return res.status(response.code).json(response.res);
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:error.hint || "Internal server Error"});
    }
};
const getTestCasesById = async (req,res)=>{
    try {
        const {id} = req.params;
        const response = await testCasesQuery.getTestCasesById(id);
        return res.status(response.code).json(response.res);
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:error.hint || "Internal server Error"});
    }
};
const createTestCases = async (req,res)=>{
    try {
        const {description, assignee, status} = req.body;
        console.log(req.body);

        if(Object.keys(req.body).length === 0){
            return res.status(400).json({message: "No mandatory details to create"});
        }
        
        const response = await testCasesQuery.createTestCases(description, assignee, status);
        return res.status(response.code).json(response.res);
               
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:error.hint || "Internal server Error"});
    }
};
const updateTestCases = async (req,res)=>{
    try {
        const {id} = req.params;
        const result = await testCasesQuery.getTestCasesById(id);
        if(result.res == "No records found"){
            return res.status(result.code).json(result.res);
        }else if(result.res.length == 1){
            const update =[];
            const value =[];
            let index =1;
            const validateTestCases = await validateDetails(update, value, index, req.body,id, res);
             // If validateDetails sends a response, terminate the function
             if (!validateTestCases) {
                return; // Prevent further code execution
            }
            const response = await testCasesQuery.updateTestCases(update, value, validateTestCases);
            return res.status(response.code).json(response.res);
            
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:error.hint || "Internal server Error"});
    }
};
const deleteTestCases = async (req,res)=>{
    try {
        const {id} = req.params;
        const result = await testCasesQuery.getTestCasesById(id);
        if(result.res == "No records found"){
            return res.status(result.code).json({message : result.res});
        }
        const response = await testCasesQuery.deleteTestCases(id);
        return res.status(response.code).json(response.res);
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:error.hint || "Internal server Error"});
    }
};

export default {getTestCases, getTestCasesById, createTestCases,updateTestCases, deleteTestCases};