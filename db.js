import postgres from "postgres";

const connectionString = process.env.DATABASE_URL;
const sql = postgres(connectionString);
const testConnection = async () => {
  try {
    console.log("Testing connection...");
    const result = await sql`SELECT NOW()`;
    console.log("Connection successful, current time:", result);
  } catch (error) {
    console.error("Connection failed:", error);
  }
};

testConnection();
export default sql;
