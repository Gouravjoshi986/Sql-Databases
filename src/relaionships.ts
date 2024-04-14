import { Client } from 'pg'
require('dotenv').config();

const client = new Client({
    connectionString:process.env.POSTGRES_STRING
})

async function createUsersTable(){
    await client.connect()
    const queryString = `
    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
    `;
    const result = await client.query(queryString);
    console.log(result);
}
createUsersTable();
async function createAddressTable(){
    await client.connect();
    const queryString = `CREATE TABLE address (
        id SERIAL PRIMARY KEY
        user_id INTEGER NOT NULL
        state VARCHAR(100) NOT NULL
        city VARCHAR(100) NOT NULL
        street VARCHAR(100) NOT NULL
        pincode VARCHAR(20)
        FOREIGN KEY(user_id) REFRENCES users(id) ON DELETE CASCADE
    )`;
    const result = await client.query(queryString);
    console.log(result);
}
createAddressTable();
// On delete cascade just means that on deleting primary key the address table's user_id row will also vanish 



