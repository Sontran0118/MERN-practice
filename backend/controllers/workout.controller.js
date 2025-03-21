const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')


//get all workouts

const getWorkouts = async(req,res) =>{
    const workouts = await Workout.find({}).sort({createdAt:-1})
    res.status(200).json(workouts)
}


//get a single workout
const getWorkout = async(req,res) =>{
    const {id} = req.params

    //check whether this id is valid in MongoDb database
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error: 'no such workout'})
    }
    const workout = await Workout.findById(id)
    if(workout){
    res.status(200).json(workout)
    }else{
    return res.status(404).json({error: 'No such workout exist'})
    }

}


//create a new workout
const createWorkout = async (req, res)=>{
    const {title, load, reps} = req.body
    //add doc to db
    try {
        const workout = await Workout.create({title,load,reps})
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

//delelte a workout
const deleteWorkout = async (req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error: 'no such workout'})
    }
    const workout = await Workout.findOneAndDelete(id)
    //add doc to db
    if(workout){
        res.status(200).json({ workout: workout, message: ' has been deleted'})
    }else{
        return res.status(404).json({error: 'No such workout exist'})
    }


    
}

//update a workout
const updateWorkout = async (req,res)=>{
   const {id} = req.params

   if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404),json({error: 'no such workout exists'})
   }
   
   const workout = await Workout.findOneAndUpdate({_id : id},{
    ...req.body
   })

   if(!workout){
    res.status(404),json({error: 'no such workout exists'})
   } else{
    const newWorkout = await Workout.findById(id)
    res.status(200).json({ title: workout.title, message: 'New content after being updated', newworkout: newWorkout})
   }


}

module.exports ={
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
}