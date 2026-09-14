const express = require('express');
const path = require('path');
const prisma = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'ok' });
  } catch (err) {
    res.status(503).json({ status: 'error', error: err.message });
  }
});

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({ orderBy: { id: 'desc' } });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/tasks', async (req, res) => {
  const title = (req.body.title || '').trim();
  if (!title) {
    return res.status(400).json({ error: 'Titulo e obrigatorio.' });
  }
  if (title.length > 255) {
    return res.status(400).json({ error: 'Titulo deve ter no maximo 255 caracteres.' });
  }
  try {
    const task = await prisma.task.create({ data: { title } });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

function parseId(value) {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
}

app.patch('/tasks/:id', async (req, res) => {
  const id = parseId(req.params.id);
  if (id === null) {
    return res.status(400).json({ error: 'ID invalido.' });
  }
  try {
    const current = await prisma.task.findUnique({ where: { id } });
    if (!current) {
      return res.status(404).json({ error: 'Tarefa nao encontrada.' });
    }
    const task = await prisma.task.update({
      where: { id },
      data: { done: !current.done },
    });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/tasks/:id', async (req, res) => {
  const id = parseId(req.params.id);
  if (id === null) {
    return res.status(400).json({ error: 'ID invalido.' });
  }
  try {
    const deleted = await prisma.task.deleteMany({ where: { id } });
    if (deleted.count === 0) {
      return res.status(404).json({ error: 'Tarefa nao encontrada.' });
    }
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Aplicacao rodando na porta ${PORT}`);
});