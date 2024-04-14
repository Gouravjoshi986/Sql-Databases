import { Client } from "pg";
require('dotenv').config();

async function insertUserAndAddress(username: string, 
    email: string, 
    password: string, 
    city: string, 
    country: string, 
    street: string, 
    pincode: string){
    const client = new Client({
        connectionString:process.env.POSTGRES_STRING
    });
    try {
        await client.connect();
        
        await client.query('BEGIN');
        const insertUserText = `
            INSERT INTO users (username, email, password)
            VALUES ($1, $2, $3)
            RETURNING id;
        `;

        const userResponse = await client.query(insertUserText,[username,email,password]);
        const userId = userResponse.rows[0].id;

        const insertAddressText = `
            INSERT INTO addresses (user_id, city, country, street, pincode)
            VALUES ($1, $2, $3, $4, $5);
        `;

        await client.query(insertAddressText,[userId, city, country, street, pincode]);
        await client.query('COMMIT');

        console.log('User and address inserted successfully');
    }catch(err){
        await client.query('ROLLBACK'); 
        console.error('Error during transaction, rolled back.', err);
        throw err;
    } finally{
        await client.end();
    }
}