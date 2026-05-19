const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('.'));

app.get('/api/items', (req, res) => {
  res.json([
    { id: 1, name: 'DevOps Pipeline', status: 'Running' },
    { id: 2, name: 'Kubernetes Pods', status: 'Active' },
    { id: 3, name: 'Monitoring', status: 'Online' }
  ]);
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

app.listen(PORT, () => {
  console.log('Frontend running on port ' + PORT);
});
