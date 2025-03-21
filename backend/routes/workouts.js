const express = require('express')

const router = express.Router()


//GEt all workouts
router.get('/', (req,res) => {
    res.json({msg: 'Get all work outs'})
})

//GEt a single workout
router.get('/:id', (req,res) =>{
    res.json({msg: 'Get a single workout'})
})


//Post new workout
router.post('/', (req,res)=> {
    res.json({msg:'Post a new workout'})
})

//Delete a workout
router.delete('/:id', (req,res) =>{
    res.json({msg: 'delete a workout'})
})

//update a workout
router.patch('/:id', (req,res) =>{
    res.json({msg: 'Update a workout'})
})




module.exports = router