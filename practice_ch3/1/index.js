// express.js를 사용하였다. kweb_study_repo/index.js 보다 훨씬 간결하다.

// ---Code 3.1---
// const express = require('express');
// const app = express();
// const port = 3000;

// app.get('/', (req, res) => res.send('Jeongmin Moon!')); // 파라미터의 '/'는 기본 path를 의미한다. 

// app.listen(port, () => console.log(`Server listening on port ${port}!`));

// ---Code 3.2---
// const express = require('express');
// const app = express();
// const port = 3000;

// app.use((req, res, next) => {
//   const randomNumber = Math.floor(Math.random() * 10);
//   console.log(`Random Number: ${randomNumber}`);
//   if (randomNumber % 3) return next();
//   else return res.sendStatus(403);
// });

// app.use((req, res, next) => {
//   const { method, path } = req;
//   console.log(`${method} ${path}`);
//   return next();
// });

// app.get('/', (req, res) => res.send('GET /')); // res.status, res.send와 같은 형태로 사용 가능. 

// app.post('/', (req, res) => res.send('POST /'));

// app.listen(port, () => console.log(`Server listening on port ${port}!`));

// ---Code 3.4---
const express = require('express');
const router = require('./router');
const port = 3000;

const app = express();

app.use(router);
// app.use('/path', router); 이렇게 하면 세부 path 설정 가능

app.listen(port, () => console.log(`Server listening on port ${port}!`));
