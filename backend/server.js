require('dotenv').config()

const express = require('express')
const workoutRoutes = require('./routes/workouts')
const mongoose = require('mongoose')


//express app
const app = express()

//midleware
app.use(express.json())
app.use((req,res,next) =>{
    console.log(req.path, req.method)
    next()
})
//routes
app.use('/api/workouts',workoutRoutes)

//connect to DB
mongoose.connect(process.env.MONGO_URI)
  .then(()=>{console.log("Connect to database sucessfully")})
  .catch((error)=>{
    console.log(error)
  })

//listen to the for request 
app.listen(process.env.PORT,()=>{
    console.log("listening on port 4000!!")
})
