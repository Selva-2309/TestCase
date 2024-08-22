import resultQuery from "./resultQuery.js";
import bcrypt from 'bcrypt';
const getScreenshots = async (req,res)=>{
    try {
        const response = await resultQuery.getScreenshots();
        return res.status(response.code).json(response.res);
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:error.hint || "Internal server Error"});
    }
};
const getScreenshotsById = async (req,res)=>{
    try {
        const {id} = req.params;
        const response = await resultQuery.getScreenshotsById(id);
        return res.status(response.code).json(response.res);
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:error.hint || "Internal server Error"});
    }
};
const createScreenshots = async (req,res)=>{
    try {
        const {image, descriptionid} = req.body;
        console.log(req.body);

        if(Object.keys(req.body).length === 0){
            return res.status(400).json({message: "No mandatory details to create"});
        }
        
        const response = await resultQuery.createScreenshots(image, descriptionid);
        return res.status(response.code).json(response.res);
               
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:error.hint || "Internal server Error"});
    }
};
const updateScreenshots = async (req,res)=>{
    try {
        const {id} = req.params;
        const {image} = req.body;
        const result = await resultQuery.getScreenshotsById(id);
        if(result.res == "No records found"){
            return res.status(result.code).json(result.res);
        }else if(result.res.length == 1){
            const response = await resultQuery.updateScreenshots(image, id);
            return res.status(response.code).json(response.res);
            
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:error.hint || "Internal server Error"});
    }
};
const deleteScreenshots = async (req,res)=>{
    try {
        const {id} = req.params;
        const result = await resultQuery.getScreenshotsById(id);
        if(result.res == "No records found"){
            return res.status(result.code).json({message : result.res});
        }
        const response = await resultQuery.deleteScreenshots(id);
        return res.status(response.code).json(response.res);
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:error.hint || "Internal server Error"});
    }
};

export default {getScreenshots, getScreenshotsById, createScreenshots,updateScreenshots, deleteScreenshots};