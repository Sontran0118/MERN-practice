import {useState} from "react"
import { useWorkoutContext } from "../hooks/useWorkoutContext"

const WorkoutForm = ()=>{

    const {dispatch} = useWorkoutContext()
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmtyFields ] = useState([])

    const handleSubmit = async (e)=>{
        e.preventDefault()

        const workout = {title,load,reps}


        const response = await fetch('/api/workouts',{
            method: 'POST',
            body: JSON.stringify(workout),
            headers:{
                'Content-Type' : 'application/json'
            }
        })

        const json = await response.json()


        if(!response.ok){
            

            setError(json.error)

            setEmtyFields(json.emptyFields)

        }

        if(response.ok){
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            setEmtyFields('')
            console.log('new workout loaded',json)
            dispatch({type: 'CREATE_WORKOUT', payload: json})
        }
        

    }
 

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>
                Add a new workout
            </h3>

            <label>
             Excercise Title: 
            </label>
            <input 
            type ="Text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className={emptyFields.includes('title')?'error': ''}
            >
           
            </input>

            <label>
             Load in kg: 
            </label>
            <input 
            type ="Number"
            onChange={(e) => setLoad(e.target.value)}
            value={load}
            className={emptyFields.includes('load')?'error': ''}
            >
            </input>



            <label>
             Reps: 
            </label>
            <input 
            type ="Number"
            onChange={(e) => setReps(e.target.value)}
            value={reps}
            className={emptyFields.includes('reps')?'error': ''}
        
            >
            </input>

            <button>Add workout</button>
            {error && <div className="error">
                {error}</div>}

        </form>

    )




}

export default WorkoutForm;