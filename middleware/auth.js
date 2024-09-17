import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const authenticateToken = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
    
        if (!token) {
          return res.status(401).json({ message: 'Authentication required' });
        }
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    
        if (!user) {
          return res.status(401).json({ message: 'User not found' });
        }
    
        req.user = user;
        next();
      } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
      }
}