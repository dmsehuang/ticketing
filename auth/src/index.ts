import express from 'express';
import { json } from 'body-parser';

const app = express();
app.use(json());

app.get('/api/users/:userid', (req, res) => {
  res.send(`Hello ${req.params.userid}! I am very excited to see you!`);
});

app.listen(3000, () => {
  console.log('Auth server listening on port 3000!!');
});
