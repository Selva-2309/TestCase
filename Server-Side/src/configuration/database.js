import pg from 'pg';
import 'dotenv/config';

const { Pool } = pg;

let pool;

try {
     pool = new Pool({
        user: process.env.USER  || "",
        password: process.env.PASSWORD || "",
        database: process.env.DATABASE || "",
        host: process.env.HOSTNAME || "",
        port: process.env.DBPORT || ""
    });
} catch (error) {
    console.error(error)
}

export default pool;