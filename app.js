import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Solución para __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Leer y parsear el archivo db.json
const dbPath = path.join(__dirname, 'db.json'); // Ajusta la ruta si es necesario
let data;

try {
  const fileContent = fs.readFileSync(dbPath, 'utf-8');
  data = JSON.parse(fileContent);
  console.log('Contenido de data:', data);
} catch (error) {
  console.error('Error al leer el archivo db.json:', error);
  data = { users: [] }; // Valor por defecto si ocurre un error
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/users', (req, res) => {
  res.status(200).json(data.users);
});

app.get('/users/:id', (req, res) => {
  const user = data.users.find(u => u.id === parseInt(req.params.id, 10));
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

const PORT = 3000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`API is running on port ${PORT}`));
}

export default app;