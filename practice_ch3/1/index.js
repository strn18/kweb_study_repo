// express.js를 사용하였다. kweb_study_repo/index.js 보다 훨씬 간결하다.

const express = require('express');
const router = require('./router');

const app = express();
const port = 3000;

//app.get('/', (req, res) => res.send('Jeongmin Moon!'));
app.use(router);
// app.use('/path', router); 이렇게 하면 세부 path 설정 가능

app.listen(port, () => console.log(`Server listening on port ${port}!`));
