import pool from "../../configuration/database.js";

const getUsers = async ()=>{
    try {
        const response = await pool.query("select Id, name, email, picture from Users");
        return {code:200, res:response.rows.length >= 1 ? response.rows : "No records found"};
    } catch (error) {
        console.error(error);
        return {code:400, res:{success:false, message: error.message}};
    }
};

const getUsersById = async (id)=>{
    try {
        const response= await pool.query("select Id, Name, Email,picture from Users where Id = $1",[id]);
        return {code:200, res:response.rows.length >= 1 ? response.rows : "No records found"}
    } catch (error) {
        console.error(error);
        return {code:400, res:{success:false, message:error.message}}
    }
};


const getUsersByEmail = async (email) => {
    try {
        const response = await pool.query("select Id from Users where Email = $1",[email]);
        return {code:200, res: response.rows.length >=1 ? response.rows : "No records found"};
    } catch (error) {
        console.error(error);
        return {code:400, res:{success:false, message:error.message}};
    }
};
const createUser = async (Name, Email, password, picture)=>{
    try {
        const response = await pool.query("insert into Users(Name, Email, Password, picture) values ($1,$2,$3,$4) returning id",[Name,Email, password, picture]);
        return {code:201, res:{success:true, id:response.rows[0].id, message:"User created successfully"}};
    } catch (error) {
        console.error(error);
        return {code:400, res:{success:false, message:error.message}}
    }
};

const updateUser = async (update, value, index)=>{
    try {
        const response  = await pool.query(`update Users set ${update.join(",")} where Id = $${index}::uuid returning id`,value);
        return {code:200, res:{success:true, id:response.rows[0].id, message:"Record updated successfully"}};
    } catch (error) {
        console.error(error);
        return {code:400, res:{success:false, message:error.message}}
    }
};

const deleteUser = async (id)=>{
    try {
        const response = await pool.query("delete from users where Id =$1",[id]);
        return {code:200, res:{success:true, message: "Record delete successfully..."}};
    } catch (error) {
        console.error(error);
        return {code:400, res:{success:false, message:error.message}}
    }
};

export default {getUsers, getUsersById, getUsersByEmail, createUser, updateUser, deleteUser};