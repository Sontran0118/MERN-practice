import { useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import {  useShowUpdateFormContext} from "../hooks/showUpdateFormContext";
import { Link } from "react-router-dom";

const UpdateForm = ({ workout }) => {

    const {setShowUpdateForm } = useShowUpdateFormContext()



    const handleClose = () => {
        setShowUpdateForm(false); // Close the form
    }


    const { dispatch } = useWorkoutContext();

    const [title, setTitle] = useState(workout.title);
    const [load, setLoad] = useState(workout.load);
    const [reps, setReps] = useState(workout.reps);
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedWorkout = { title, load, reps };
        console.log('Updated Workout Data:', updatedWorkout);

        const response = await fetch('/api/workouts/' + workout._id, {
            method: 'PATCH',
            body: JSON.stringify(updatedWorkout),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json();
        console.log('Server Response:', json);

        if (!response.ok) {
            setEmptyFields(json.emptyFields)
            setError(json.error);
        }

        if (response.ok) {
            setError(null);
            console.log('Workout updated:', json);
            dispatch({ type: 'UPDATE_WORKOUT', payload: json });
            handleClose();
        }

    }
    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>
            
                Update Workout
             
            </h3>

            <label>Exercise Title:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className= {emptyFields.includes('title') ? 'error':''}
            />

            <label>Load in kg:</label>
            <input
                type="number"
                onChange={(e) => setLoad(e.target.value)}
                value={load}
                className= {emptyFields.includes('load') ? 'error':''}
            />

            <label>Reps:</label>
            <input
                type="number"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
                className= {emptyFields.includes('reps') ? 'error':''}
            />

            <button>Update Workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default UpdateForm;