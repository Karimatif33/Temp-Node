const { pool, connect } = require("../db/dbConnect");
const AsyncHandler = require("express-async-handler");
const fetch = require("node-fetch").default;
const { createSchemaAndTable } = require("../model/AcadYearDataSchema");
require("dotenv").config();
exports.fetshingAcadYearData = AsyncHandler(async (req, res) => {
  const apiUrl =
    `${process.env.HORUS_API_DOMAIN}/WSNJ/HUEAcadYear?index=AcadYearData`;

  try {
    // Call the function to create schema and table before fetching data
    await createSchemaAndTable();
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch data from API. Status: ${response.status}`
      );
    }
    const apiData = await response.json();
    // console.log(apiData)
    const acadyeardata = apiData.acadyeardata;
    // Connect to the database
    const client = await connect();
    const SchemaAndTable = "AcadYearData.acadyeardata";

    try {
      for (const item of acadyeardata) {
        const IDValue = item.ID;
        const nameValue = item.Name;
        const ActiveValue = item.Active;

        // Insert data into the database (replace 'Levels' with your actual table name)
        const insertQuery = `
        INSERT INTO ${SchemaAndTable} (ID, Name, Active) 
        VALUES ($1, $2, $3)
        ON CONFLICT (ID) DO UPDATE
        SET 
            Name = $2,
            Active = $3
      `;

        await client.query(insertQuery, [IDValue, nameValue, ActiveValue]);
        console.log("Data inserted into the database successfully");
      }

      // Select all data from the 'levels' table
      const selectQuery = "SELECT * FROM AcadYearData.acadyeardata";
      const result = await client.query(selectQuery);

      // Return the retrieved data as JSON
      res.json(result.rows);
      return { status: "success" };
    } catch (error) {
      console.error(`Error fetching data from ${apiUrl}:`, error.message);
      return { status: "fail", error: `Error fetching data from ${apiUrl}` };
    }
  } finally {
    if (client) {
      client.release();
      console.log("fetshingAcadYearData Client released");
    }
  }
});
