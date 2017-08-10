import express from 'express';
import { Client, pg } from 'pg';
import DataCollector from 'link-gatherer';

const app = express();
const connectionString = process.env.DATABASE_URL || 'postgresql://localhost:5432/';
const client = new Client({
  connectionString: connectionString,
});

client.connect();
client.query(`CREATE TABLE IF NOT EXISTS movies(
  id text,
  title text,
  year text,
  rating integer,
  imdb text,
  actors text,
  writers text,
  directors text,
  trailer text,
  description text,
  poster_med text,
  poster_big text,
  popularity text,
  primary key (id))`, (err, response) => {
  });

  client.query(`CREATE TABLE IF NOT EXISTS files(
    id text,
    filename text,
    quality text,
    filesize integer,
    created_at timestamp,
    magnet text,
    uptobox text,
    downloaded boolean,
    torrent_url text,
    primary key (id))`, (err, response) => {
      if (!err) {
        console.log('client end');
        client.end();
      }
});

app.get('/list', (req, res) => {
  client.connect();
  client.query('SELECT * from files', (err, response) => {
    console.log(response.rows[0].name);
    res.send(response.rows[0]);
    console.log(dataCollectorInstance);
    client.end();
  });
});

app.post('/import', (req, res) => {
  // start data collector here
  const dataCollectorInstance = new DataCollector();
  dataCollectorInstance.paginate((current) => {
    pg.connect(connectionString, function(err, client, done) {
      current['MovieList'].forEach((item) => {
        console.log(item.title + ' : ' + item.id);
        client.query(`INSERT INTO movies VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`
          [item.id, item.title, item.year, item.rating,
          item.imdb, item.actors, item.writers, item.directors,
          item.trailer, item.description, item.poster_med,
          item.poster_big, item.popularity], (err, response) => {
          if (err) {
            console.log('an error occured');
            console.log(err);
          }
          console.log('new line');
        });
      });
    });
  }, 4);
  res.send('lok;lol');
});

app.post('/alldebrid', (req, res) => {
  // start go command here
});

app.listen(3000, () => {
  console.log(connectionString);
  console.log('dodo app listening on port 3000!')
});

