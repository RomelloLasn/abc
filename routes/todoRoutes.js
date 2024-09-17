import express from 'express'
import { createTodo, getTodos, updateTodo, deleteTodo, getTodoById } from '../controllers/todoController.js'
import { authenticateToken } from '../middleware/auth.js'

const router = express.Router()

router.use(authenticateToken)

router.post('/', createTodo)
router.get('/', getTodos)
router.get('/:id', getTodoById) 
router.put('/:id', updateTodo)
router.delete('/:id', deleteTodo)

export default router