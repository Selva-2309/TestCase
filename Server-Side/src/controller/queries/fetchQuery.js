import pool from "../../configuration/database.js";

const fetchQuery = async (query)=>{
    try {
        const response = await pool.query(`${query}`);
        return {code:200, res:{record:response.rows}};
    } catch (error) {
        console.error(error);
        return {code:400, res:{message:error.message}};
    }
}

export default fetchQuery;