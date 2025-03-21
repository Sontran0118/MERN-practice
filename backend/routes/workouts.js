const express = require('express')
const router = express.Router()
const Workout = require('../models/workoutModel')
const { 
   createWorkout,
   getWorkouts,
   getWorkout,
   deleteWorkout,
   updateWorkout
} = require('../controllers/workout.controller')

//GEt all workouts
router.get('/',getWorkouts)
//GEt a single workout
router.get('/:id', getWorkout)
//Post new workout
router.post('/', createWorkout)
//Delete a workout
router.delete('/:id',deleteWorkout)
//update a workout
router.patch('/:id', updateWorkout)

module.exports = router