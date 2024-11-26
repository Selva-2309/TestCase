
import project from '../projects/queryProject.js';

const getProject = async(req, res)=>{
    try {
        const response = await project.getProject();
        return res.status(response.code).json(response.res);
    } catch (error) {
        console.error(error);
        return res.status(500).json({message : error.hint? error.hint : "Internal Server Error"});
    }
}

const createProject = async (req,res)=>{
    try {
        const {name} = req.body;
        if(Object.keys(req.body).length === 0){
            return res.status(400).json({message: "No mandatory details to create"});
        }
        const response =await project.createProject(name);
        return res.status(response.code).json(response.res);
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:error.hint ? error.hint :"Internal Server Error"});
    }
};

const updateProject = async(req, res)=>{
    try {
        const {id} = req.params;
        const {name} = req.body;
        if(Object.keys(req.body).length === 0){
            return res.status(400).json({message: "No mandatory details to create"});
        }

        const response = await project.updateProject(name,id);
        return res.status(response.code).json(response.res);
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:error.hint ? error.hint : "Internal Server Error"});
    }
}

const deleteProject = async (req, res)=>{
    try {
        const {id} = req.params;
        const result = await project.getProjectById(id);
        if(result.res == "No records found"){
            return res.status(result.code).json({message : result.res});
        }
        const response = await project.deleteProject(id);
        return res.status(response.code).json(response.res);
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: error.hint ? error.hint : "Internal Server Error"});
    }
}

export default {getProject,createProject,updateProject,deleteProject};