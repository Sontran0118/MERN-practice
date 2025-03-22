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

    let emptyFields =[]
    if(!title){
        emptyFields.push('title')
    }
    if(!load){
        emptyFields.push('load')
    }
    if(!reps){
        emptyFields.push('reps')
    }

    if(emptyFields.length > 0){
        return res.status(400).json({error: 'Please fill in all fields',emptyFields})
    }

    //add doc to db
    try {
        const workout = await Workout.create({title,load,reps})
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

//delete a workout
const deleteWorkout = async (req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error: 'no such workout'})
    }
    const workout = await Workout.findByIdAndDelete(id)
    //add doc to db
    if(workout){
        console.log({workout_id: workout._id, title: workout.title, message: 'this data has been deleted' })
        res.status(200).json(workout)
    }else{
        return res.status(404).json({error: 'No such workout exist'})
    }


    
}

//update a workout
const updateWorkout = async (req,res)=>{
    

    //input error handling
    const {title, load, reps} = req.body
    let emptyFields =[]
    if(!title){
        emptyFields.push('title')
    }
    if(!load){
        emptyFields.push('load')
    }
    if(!reps){
        emptyFields.push('reps')
    }

    if(emptyFields.length > 0){
        return res.status(400).json({error: 'Please fill in all fields',emptyFields})
    }



   const {id} = req.params

   if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404),json({error: 'no such workout exists'})
   }
   
   const workout = await Workout.findOneAndUpdate({_id : id},
    {...req.body}, {new: true})

   if(!workout){
    res.status(404),json({error: 'no such workout exists'})
   } else{
    const newWorkout = await Workout.findById(id)
    res.status(200).json(newWorkout)
   }


}

module.exports ={
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
}