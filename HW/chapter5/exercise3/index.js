const express = require('express');
const { runQuery } = require('./database');

const app = express();
const port = 3000;

app.get('/fare', async(req, res) => {
  try {
    const { uid } = req.query;

    const sql = 'SELECT Round(Sum(types.fare_rate * trains.distance / 1000)) AS total_fare FROM tickets ' + 
      'INNER JOIN trains ON tickets.train = trains.id ' + 
      'INNER JOIN types ON trains.type = types.id ' + 
      `WHERE tickets.user = ${ uid };`;
    
    const { total_fare } = (await runQuery(sql))[0];

    return res.send(`Total fare: ${total_fare}`);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.get('/train/status', async(req, res) => {
  try {
    const { tid } = req.query;

    const sql = 'SELECT types.max_seats - Count(*) AS remain FROM tickets ' + 
      `INNER JOIN trains ON tickets.train = trains.id AND trains.id = ${ tid } ` + 
      'INNER JOIN types ON trains.type = types.id';

    const { remain } = (await runQuery(sql))[0];

    if (remain > 0) return res.send(`Train ${ tid }: not sold out`);
    else return res.send(`Train ${ tid }: sold out`);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));
