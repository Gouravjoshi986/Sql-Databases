import { Client } from "pg";
require('dotenv').config();

async function insertData(username:string,email:string,password:string){
    const client = new Client({
        connectionString:process.env.POSTGRES_STRING
    })
    try {
        await client.connect();
        const insertQuery = `INSERT INTO users (username,email,password) VALUES ($1,$2,$3);`
        const values = [username,email,password];
        const result = client.query(insertQuery,values);
        console.log("INSERTION SUCCESS:",result);
    } catch (err) {
        console.error("ERROR OCCURED DURING INSERTION :",err);
    } finally{
        client.end()
    }
}

insertData("Gourav","gourav@gmial.com","123456");