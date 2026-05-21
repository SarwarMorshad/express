import { Pool } from "pg";
import config from "../config";

// pool
export const pool = new Pool({
  connectionString: config.connection_String,
});

export const initDB = async () => {
  try {
    await pool.query(`
  CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    age INT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  )
`);

    await pool.query(`
  CREATE TABLE IF NOT EXISTS profiles(
    id SERIAL PRIMARY KEY,
    user_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    bio TEXT,
    address TEXT,
    phone VARCHAR(20),
    gender VARCHAR(10),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
)
  `);

    console.log("Database Connection Successful");
  } catch (error) {
    console.log(error);
  }
};
