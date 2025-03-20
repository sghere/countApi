import dotenv from "dotenv";
dotenv.config();
// Import express module
import express from "express";

import sql from "./db";
const app = express();

app.use(express.json());
// Initialize a count variable
let count = 0;

// Define a route to get the current count
app.get("/:key/count", async (req, res) => {
  const { key } = req.params;
  try {
    // Check if the key exists in the counter table
    const result = await sql`SELECT count FROM counter WHERE key = ${key}`;

    if (result.length > 0) {
      // If the key exists, increment the count by 1
      const newCount = result[0].count + 1;
      await sql`UPDATE counter SET count = ${newCount} WHERE key = ${key}`;
      return res.json({ key, count: newCount });
    } else {
      // If the key doesn't exist, create a new entry with count = 1
      const insertResult =
        await sql`INSERT INTO counter (key, count) VALUES (${key}, 1) RETURNING count`;
      return res.json({ key, count: insertResult[0].count });
    }
  } catch (err) {
    console.error("Error processing count:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/:key/reset", async (req, res) => {
  const { key } = req.params;

  try {
    // Check if the key exists in the counter table
    const result = await sql`SELECT count FROM counter WHERE key = ${key}`;

    if (result.length > 0) {
      // If the key exists, reset the count to 0
      await sql`UPDATE counter SET count = 0 WHERE key = ${key}`;
      return res.json({ key, count: 0 });
    } else {
      // If the key doesn't exist, create a new entry with count = 0
      const insertResult =
        await sql`INSERT INTO counter (key, count) VALUES (${key}, 0) RETURNING count`;
      return res.json({ key, count: insertResult[0].count });
    }
  } catch (err) {
    console.error("Error resetting count:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
