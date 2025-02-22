import { Pool } from "pg";

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Test the connection
db.connect((err) => {
  if (err) {
    console.error("Database connection error:", err.stack);
  } else {
    console.log("Successfully connected to database");
  }
});

export default db;
