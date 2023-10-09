// Code 3.6 ~ Code 3.12
const express = require('express');

const port = 3000;
const app = express();

app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');

app.get('/', (req, res) => res.render('index.pug'));

app.get('/page', (req, res) => {
  const { page, author } = req.query;
  res.render('board.pug', { page, author }); // http://localhost:3000/page?page=1&author=you 에서 확인 가능. 
});

app.get('/posts', (req, res) => {
  const { until } = req.query;
  const untilParsed = parseInt(until, 10);

  const posts = [];
  if(!isNaN(untilParsed)){
    for(let i=0; i<untilParsed; i++){
      posts.push(`Post ${i + 1}`);
    }
  }
  res.render('posts.pug', { posts }); // http://localhost:3000/posts?until=10 에서 확인 가능. 
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));