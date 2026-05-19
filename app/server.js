const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('<h1>DevOps Project - BSE-8B</h1><p>CI/CD Pipeline Working!</p>');
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

app.listen(PORT, () => {
  console.log('App running on port ' + PORT);
});
