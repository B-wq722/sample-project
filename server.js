const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

let items = [
  { id: 1, name: 'Sample item', category: 'General', quantity: 10, price: 9.99 }
];
let nextId = 2;

app.get('/api/items', (req, res) => {
  res.json(items);
});

app.post('/api/items', (req, res) => {
  const { name, category, quantity, price } = req.body;
  if (!name || !category || typeof quantity !== 'number' || typeof price !== 'number') {
    return res.status(400).json({ error: 'Invalid item data' });
  }

  const item = { id: nextId++, name, category, quantity, price };
  items.push(item);
  res.status(201).json(item);
});

app.put('/api/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id, 10);
  const { name, category, quantity, price } = req.body;
  const item = items.find((i) => i.id === itemId);

  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }

  item.name = name || item.name;
  item.category = category || item.category;
  item.quantity = typeof quantity === 'number' ? quantity : item.quantity;
  item.price = typeof price === 'number' ? price : item.price;

  res.json(item);
});

app.delete('/api/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id, 10);
  const index = items.findIndex((i) => i.id === itemId);

  if (index === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }

  items.splice(index, 1);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Inventory server running at http://localhost:${port}`);
});
