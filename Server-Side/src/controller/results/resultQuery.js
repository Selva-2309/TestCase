import pool from "../../configuration/database.js";

const getScreenshots = async ()=>{
    try {
        const response = await pool.query("select id, image, descriptionid from Screenshots");
        return {code:200, res:response.rows.length >= 1 ? response.rows : "No records found"};
    } catch (error) {
        console.error(error);
        return {code:400, res:{success:false, message: error.message}};
    }
};

const getScreenshotsById = async (id)=>{
    try {
        const response= await pool.query("select id, image, descriptionid from Screenshots where Id = $1",[id]);
        return {code:200, res:response.rows.length >= 1 ? response.rows : "No records found"}
    } catch (error) {
        console.error(error);
        return {code:400, res:{success:false, message:error.message}}
    }
};


const createScreenshots = async (image, descriptionid)=>{
    try {
        const response = await pool.query("insert into Screenshots(image, descriptionid) values ($1,$2) returning id",[image, descriptionid]);
        return {code:201, res:{success:true, id:response.rows[0].id, message:"Screenshots created successfully"}};
    } catch (error) {
        console.error(error);
        return {code:400, res:{success:false, message:error.message}}
    }
};

const updateScreenshots = async (image, id)=>{
    try {
        const response  = await pool.query(`update Screenshots set image = $1 where Id = $2 returning id`,[image, id]);
        return {code:200, res:{success:true, id:response.rows[0].id, message:"Record updated successfully"}};
    } catch (error) {
        console.error(error);
        return {code:400, res:{success:false, message:error.message}}
    }
};

const deleteScreenshots = async (id)=>{
    try {
        const response = await pool.query("delete from Screenshots where Id =$1",[id]);
        return {code:200, res:{success:true, message: "Record delete successfully..."}};
    } catch (error) {
        console.error(error);
        return {code:400, res:{success:false, message:error.message}}
    }
};

export default {getScreenshots, getScreenshotsById, createScreenshots, updateScreenshots, deleteScreenshots};