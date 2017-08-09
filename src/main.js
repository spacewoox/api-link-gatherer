import express from 'express';
import { Client, pg } from 'pg';
const app = express();
const connectionString = 'X';
const client = new Client({
  connectionString: connectionString,
});

client.connect()
client.query(`CREATE TABLE IF NOT EXISTS files(
  filename text,
  quality text,
  filesize integer,
  created_at timestamp,
  magnet text,
  uptobox text,
  downloaded boolean,
  torrent_url text)`, (err, response) => {
  client.end();
});

app.get('/list', (req, res) => {
  client.connect()
  client.query('SELECT * from data', (err, response) => {
    console.log(response.rows[0].name);
    res.send(response.rows[0]);
    client.end();
  });
});

app.post('/import', (req, res) => {
  // start data collector here
});

app.post('/alldebrid', (req, res) => {
  // start go command here
});

app.listen(3000, () => {
  console.log(connectionString);
  console.log('dodo app listening on port 3000!')
});

