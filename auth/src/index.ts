import express from 'express';
import { json } from 'body-parser';

const app = express();
app.use(json());

app.get('/api/users/:userid', (req, res) => {
  res.send(`Welcome ${req.params.userid}!`);
});

app.listen(3000, () => {
  console.log('Auth server listening on port 3000!!!');
});
