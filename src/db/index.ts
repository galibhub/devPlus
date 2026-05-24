import { Pool } from "pg";
import config from "../config";


//database setup
export const pool = new Pool({
    connectionString: config.connection_string,

});


export const initDB = async () => {

  try {

    // users table

    await pool.query(`
      CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,

        name VARCHAR(100) NOT NULL,

        email VARCHAR(100)
        UNIQUE NOT NULL,

        password TEXT NOT NULL,

        role VARCHAR(20)
        DEFAULT 'contributor',

        created_at TIMESTAMP
        DEFAULT NOW(),

        updated_at TIMESTAMP
        DEFAULT NOW()
      )
    `);

    // issues table

    await pool.query(`
      CREATE TABLE IF NOT EXISTS issues(
        id SERIAL PRIMARY KEY,

        title VARCHAR(150)
        NOT NULL,

        description TEXT
        NOT NULL,

        type VARCHAR(30)
        NOT NULL,

        status VARCHAR(30)
        DEFAULT 'open',

        reporter_id INT
        NOT NULL,

        created_at TIMESTAMP
        DEFAULT NOW(),

        updated_at TIMESTAMP
        DEFAULT NOW()
      )
    `);

    console.log(
      "Database connected successfully!",
    );

  } catch (error) {

    console.log(error);

  }
};