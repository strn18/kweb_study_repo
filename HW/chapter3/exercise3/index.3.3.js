const express = require('express');

const app = express();
const port = 3000;

app.get('/factorial', (req, res) => {
  const { number } = req.query;
  
  return res.redirect(`/factorial/${number}`);
});

app.get('/factorial/:number', (req, res) => {
  const { number } = req.params;
  const numberParsed = parseInt(number, 10);

  let result = 1;

  for (let i = 1; i <= number; i++) result *= i;

  return res.send(`${result}`);
})

app.listen(port, () => console.log(`Server listening on port ${port}!`));
