import express from 'express';
import {
    createRoutine,
    getUserRoutines,
    getRoutineById,
    updateRoutine,
    deleteRoutine,
} from '../controllers/routineController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/add', authMiddleware, createRoutine);
router.get('/', authMiddleware, getUserRoutines);
router.get('/:id', authMiddleware, getRoutineById); // important!
router.put('/update/:id', authMiddleware, updateRoutine);
router.delete('/delete/:id', authMiddleware, deleteRoutine);

export default router;