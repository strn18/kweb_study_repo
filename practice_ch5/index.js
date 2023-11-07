const { runQuery } = require('./database');

const getScoreStats = async () => {
  const sql = 'SELECT course, Count(*) AS cnt, Avg(final) AS avg, ' +
    'Stddev(final) AS stddev FROM scores GROUP BY course';
  const results = await runQuery(sql);
  return results;
};

const getScoreByIdName = async (id, name) => {
  const sql = `SELECT * FROM scores WHERE id = ${id} AND student = '${name}'`;
  const results = await runQuery(sql);
  return results[0];
};

const createScore = async (name, course, midterm, final) => {
  const sql = 'INSERT INTO scores ' +
    `VALUES (DEFAULT, '${name}', '${course}', ${midterm}, ${final})`;
  const result = await runQuery(sql);
  return result;
};

(async () => {
  const stats = await getScoreStats();
  stats.forEach(stat => {
    const { course, cnt, avg, stddev } = stat;
    console.log(`${course} (${cnt} people): Average ${avg}, Std.Dev. ${stddev}`);
  });

  const scoreData = await getScoreByIdName(2, 'Joe');
  const { course, final } = scoreData;
  console.log(`Course: ${course} / Final score: ${final}`);
  
  console.dir(await getScoreByIdName(9, 'Barack')); // 원래는 id = 9, student = Barack 인 row가 없는 상태. undefined가 출력됨. 
  const newScore = await createScore('Barack', 'Operating Systems', 83, 62); // 이거 실행하면 새로 생김. 한 번 더 하면 id = 10으로 또 생김. 
  console.dir(await getScoreByIdName(9, 'Barack')); // 이제는 생겼으므로 해당 row가 출력된다. 
  console.dir(await getScoreByIdName(newScore.insertId, 'Barack'));
})();

// 이상은 sql injection에 취약한 코드. 보완한 코드가 교재에 있음. 