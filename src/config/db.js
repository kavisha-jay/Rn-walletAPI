// config/db.js
import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set in environment variables');
}

export default async function initDB() {
  try {
    await sql`CREATE TABLE IF NOT EXISTS transactions (
      id SERIAL PRIMARY KEY,
      user_id VARCHAR(255) NOT NULL,
      title VARCHAR(255) NOT NULL,
      amount DECIMAL(10,2) NOT NULL,
      category VARCHAR(255) NOT NULL,
      create_at DATE NOT NULL DEFAULT CURRENT_DATE
    )`;

    console.log("Database initialized successfully");
  } catch (error) {
    console.error("Error initializing DB:", error);
    process.exit(1);
  }
}

const sql = neon(process.env.DATABASE_URL);
export { sql };