import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'

dotenv.config()

const prisma = new PrismaClient()

export const register = async (req, res) => {
    try {
        const { username, password } = req.body
        const existingUser = await prisma.user.findUnique({ where: { username } })
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        
        await prisma.user.create({
            data: { username, password: hashedPassword }
        })
        res.status(201).json({ message: 'User registered successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Error registering user' })
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await prisma.user.findUnique({ where: { username } })
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' })
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' })
        res.json({ token })
    } catch (error) {
        res.status(500).json({ message: 'Error logging in' })
    }
}