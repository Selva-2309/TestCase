import pool from "../../configuration/database.js";

const getTestCases = async ()=>{
    try {
        const response = await pool.query("select id, description, assignee, status from TestCases");
        return {code:200, res:response.rows.length >= 1 ? response.rows : "No records found"};
    } catch (error) {
        console.error(error);
        return {code:400, res:{success:false, message: error.message}};
    }
};

const getTestCasesById = async (id)=>{
    try {
        const response= await pool.query("select id, description, assignee, status from TestCases where Id = $1",[id]);
        return {code:200, res:response.rows.length >= 1 ? response.rows : "No records found"}
    } catch (error) {
        console.error(error);
        return {code:400, res:{success:false, message:error.message}}
    }
};


const createTestCases = async (description, assignee, status)=>{
    try {
        const response = await pool.query("insert into TestCases(description, assignee, status) values ($1,$2,$3) returning id",[description, assignee, status]);
        return {code:201, res:{success:true, id:response.rows[0].id, message:"TestCases created successfully"}};
    } catch (error) {
        console.error(error);
        return {code:400, res:{success:false, message:error.message}}
    }
};

const updateTestCases = async (update, value, index)=>{
    try {
        const response  = await pool.query(`update TestCases set ${update.join(",")} where Id = $${index} returning id`,value);
        return {code:200, res:{success:true, id:response.rows[0].id, message:"Record updated successfully"}};
    } catch (error) {
        console.error(error);
        return {code:400, res:{success:false, message:error.message}}
    }
};

const deleteTestCases = async (id)=>{
    try {
        const response = await pool.query("delete from TestCases where Id =$1",[id]);
        return {code:200, res:{success:true, message: "Record delete successfully..."}};
    } catch (error) {
        console.error(error);
        return {code:400, res:{success:false, message:error.message}}
    }
};

export default {getTestCases, getTestCasesById, createTestCases, updateTestCases, deleteTestCases};