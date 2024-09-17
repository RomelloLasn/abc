import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const createTodo = async (req, res) => {
    try {
        const { title, description } = req.body
        const userId = req.user.id
        const todo = await prisma.todo.create({
            data: { title, description, userId }
        })
        res.status(201).json(todo)
    } catch (error) {
        res.status(500).json({ message: 'Error creating todo' })
    }
}

export const getTodos = async (req, res) => {
    try {
        const userId = req.user.id
        const todos = await prisma.todo.findMany({
            where: { userId }
        })
        res.json(todos)
    } catch (error) {
        res.status(500).json({ message: 'Error fetching todos' })
    }
}

export const updateTodo = async (req, res) => {
    try {
        const { id } = req.params
        const { title, description, completed } = req.body
        const userId = req.user.id
        const todo = await prisma.todo.updateMany({
            where: { id: Number(id), userId },
            data: { title, description, completed }
        })
        if (todo.count === 0) {
            return res.status(404).json({ message: 'Todo not found or not authorized' })
        }
        res.json({ message: 'Todo updated successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Error updating todo' })
    }
}

export const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params
        const userId = req.user.id
        const todo = await prisma.todo.deleteMany({
            where: { id: Number(id), userId }
        })
        if (todo.count === 0) {
            return res.status(404).json({ message: 'Todo not found or not authorized' })
        }
        res.json({ message: 'Todo deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Error deleting todo' })
    }
}

export const getTodoById = async (req, res) => {
    try {
        const { id } = req.params
        const userId = req.user.id
        const todo = await prisma.todo.findFirst({
            where: { 
                id: Number(id),
                userId: userId
            }
        })
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found or not authorized' })
        }
        res.json(todo)
    } catch (error) {
        res.status(500).json({ message: 'Error fetching todo' })
    }
}