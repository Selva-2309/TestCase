import pool from "../../configuration/database.js";

const getProject = async ()=>{
    try {
        const response = await pool.query("select id, name from project");
        return {code:200, res:response.rows.length >= 1 ? response.rows : "No records found"};
    } catch (error) {
        console.error(error);
        return {code:400, res:{message:error.message}};
    }
}
const getProjectById = async (id)=>{
    try {
        const response = await pool.query("select id, name from project  where id=$1",[id]);
        return {code:200, res:response.rows.length >= 1 ? response.rows : "No records found"};
    } catch (error) {
        console.error(error);
        return {code:400, res:{message:error.message}};
    }
}

const createProject = async (name)=>{
    try {
        const response = await pool.query("insert into project (name) values($1) returning id",[name]);
        return {code:201, res:{success:true,id:response.rows[0].id, message:"Project created successfully"}}
    } catch (error) {
        console.error(error);
        return {code:400, res:{message:error.message}};
    }
}

const updateProject  = async (name,id) =>{
    try {
        const response = await pool.query("update project set name = $1 where id=$2 returning id",[name, id]);
        return {code:200, res:{success:true, id:response.rows[0].id, message:"Record updated successfully"}};
    } catch (error) {
        console.error(error);
        return {code:400, res:{message:error.message}}
    }
};

const deleteProject  = async (id) =>{
    try {
        const response = await pool.query("delete from project where id=$1 returning id",[id]);
        return {code:200, res:{success:true, id:response.rows[0].id, message:"Record deleted successfully"}};
    } catch (error) {
        console.error(error);
        return {code:400, res:{message:error.message}};
    }
};

export default {getProject,getProjectById,createProject, updateProject, deleteProject};