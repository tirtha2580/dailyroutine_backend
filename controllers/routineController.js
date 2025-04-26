// routineController.js

import Routine from '../models/Routine.js'; // adjust path as needed

// Create Routine
export const createRoutine = async(req, res) => {
    try {
        const { title, description, time } = req.body;
        const newRoutine = new Routine({
            userId: req.user.id,
            title,
            description,
            time,
        });
        const savedRoutine = await newRoutine.save();
        res.status(201).json(savedRoutine);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all routines for the authenticated user
export const getUserRoutines = async(req, res) => {
    try {
        const routines = await Routine.find({ userId: req.user.id });
        res.json(routines);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a specific routine by ID
export const getRoutineById = async(req, res) => {
    try {
        const routine = await Routine.findById(req.params.id);
        if (!routine) {
            return res.status(404).json({ message: 'Routine not found' });
        }
        res.json(routine);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update routine
export const updateRoutine = async(req, res) => {
    try {
        const routine = await Routine.findById(req.params.id);
        if (!routine) return res.status(404).json({ message: 'Routine not found' });

        if (routine.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        const updatedRoutine = await Routine.findByIdAndUpdate(
            req.params.id,
            req.body, { new: true }
        );
        res.json(updatedRoutine);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete routine
export const deleteRoutine = async(req, res) => {
    try {
        const routine = await Routine.findById(req.params.id);
        if (!routine) return res.status(404).json({ message: 'Routine not found' });

        if (routine.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        await routine.deleteOne();
        res.json({ message: 'Routine deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};