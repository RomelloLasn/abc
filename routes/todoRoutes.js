import express from 'express'
import { createTodo, getTodos, updateTodo, deleteTodo, getTodoById } from '../controllers/todoController.js'
import { authenticateToken } from '../middleware/auth.js'
import logger from '../utils/logger.js'

const router = express.Router()

router.use(authenticateToken)

/**
 * @swagger
 * /api/todos:
 *   post:
 *     summary: Create a new todo
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Todo created successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Error creating todo
 */
router.post('/', (req, res, next) => {
  logger.info(`Creating new todo for user: ${req.user.id}`);
  createTodo(req, res, next);
})

/**
 * @swagger
 * /api/todos:
 *   get:
 *     summary: Get all todos for the authenticated user
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of todos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   completed:
 *                     type: boolean
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Error fetching todos
 */
router.get('/', (req, res, next) => {
  logger.info(`Fetching todos for user: ${req.user.id}`);
  getTodos(req, res, next);
})

/**
 * @swagger
 * /api/todos/{id}:
 *   get:
 *     summary: Get a specific todo by ID
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Todo details
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Todo not found
 *       500:
 *         description: Error fetching todo
 */
router.get('/:id', (req, res, next) => {
  logger.info(`Fetching todo ${req.params.id} for user: ${req.user.id}`);
  getTodoById(req, res, next);
})

/**
 * @swagger
 * /api/todos/{id}:
 *   put:
 *     summary: Update a todo
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               completed:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Todo updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Todo not found or not authorized
 *       500:
 *         description: Error updating todo
 */
router.put('/:id', (req, res, next) => {
  logger.info(`Updating todo ${req.params.id} for user: ${req.user.id}`);
  updateTodo(req, res, next);
})

/**
 * @swagger
 * /api/todos/{id}:
 *   delete:
 *     summary: Delete a todo
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Todo deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Todo not found or not authorized
 *       500:
 *         description: Error deleting todo
 */
router.delete('/:id', (req, res, next) => {
  logger.info(`Deleting todo ${req.params.id} for user: ${req.user.id}`);
  deleteTodo(req, res, next);
})

export default router