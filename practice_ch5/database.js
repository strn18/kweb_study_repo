const mysql = require('mysql2/promise');

// pool = connection pool
const pool = mysql.createPool({
  host: 'localhost',
  port: '3306',
  user: 'kwebuser',
  password: 'kwebpw',
  database: 'kwebdb1',
});

const runQuery = async sql => {
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.query(sql);
    return result; // result는 row들의 array 또는 undefined 형태이다. 
  } finally {
    conn.release();
  }
};

module.exports = { runQuery };
