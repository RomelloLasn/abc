import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getTodos = async (req, res) => {
  try {
    const todos = await prisma.todo.findMany();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching todos' });
  }
};

export const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;

    // Validation logic
    if (!title || title.trim() === '') {
      return res.status(400).json({ error: 'Title is required' });
    }

    const newTodo = await prisma.todo.create({
      data: { title, description },
    });
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ message: 'Error creating todo' });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const updatedTodo = await prisma.todo.update({
      where: { id: Number(id) },
      data: { title, description },
    });
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: 'Error updating todo' });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.todo.delete({
      where: { id: Number(id) },
    });
    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting todo' });
  }
};