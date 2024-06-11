import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  user: "postgres",
  host: "monorail.proxy.rlwy.net",
  database: "railway",
  password: "BPRpSgUqNPSwDpjkBGOkSBYAWxyIILEy",
  port: 57783,
});

export const getRanking = async (): Promise<any> => {
  try {
    const result = await pool.query(
      'SELECT COUNT(id) AS total_count FROM "ProfileDatabase" WHERE "totalScore" > 130;',
    );
    return result;
  } catch (error) {
    console.error("Error executing query", error);
    throw error;
  }
};

// import { Pool } from 'pg';

// const pool: Pool = new Pool({
//   user: 'my_user',
//   host: 'localhost',
//   database: 'my_database',
//   password: 'root',
//   port: 5432,
// });

// import { Pool } from 'pg';

// const pool = new Pool({
//   user: 'my_user',
//   host: 'localhost',
//   database: 'my_database',
//   password: 'root',
//   port: 5432,
// });

// export default pool;

// const Pool = require('pg').Pool
// const pool = new Pool({
//   user: "my_user",
//   host: "localhost",
//   database: "my_database",
//   password: "root",
//   port: 5432,
// });
