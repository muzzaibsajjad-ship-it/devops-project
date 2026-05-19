const express = require('express');
const app = express();
app.use(express.json());

const PORT = 5000;

// Sample data
let items = [
  { id: 1, name: 'DevOps Project', status: 'Running' },
  { id: 2, name: 'Kubernetes Cluster', status: 'Active' }
];

app.get('/', (req, res) => {
  res.json({ message: 'Backend API Running', version: '1.0' });
});

app.get('/api/items', (req, res) => {
  res.json(items);
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', uptime: process.uptime() });
});

app.listen(PORT, () => {
  console.log('Backend running on port ' + PORT);
});
