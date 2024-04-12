import { Client } from "pg";
require('dotenv').config();

async function insertData(){
    const client = new Client({
        connectionString:process.env.POSTGRES_STRING
    })

    try {
        await client.connect();
        const res = await client.query(`
            INSERT INTO users (username,email,password)
            VALUES ('Gourav','gourav@gmail.com','123456');
        `)
         console.log("INSERTION SUCCESS:",res);
    } catch (err) {
        console.error('Error during the insertion:', err);
    } finally{
        await client.end();
    }
}
insertData();