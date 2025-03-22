
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import {  useShowUpdateFormContext} from "../hooks/showUpdateFormContext";
import  UpdateForm  from "./updateForm"; // Ensure the path is correct


const WorkoutDetails = ({ workout}) => {

    const{showUpdateForm,setShowUpdateForm} = useShowUpdateFormContext();

    const { dispatch } = useWorkoutContext();
    

    const handleClickDelete = async () => {
        const response = await fetch('/api/workouts/' + workout._id, {
            method: 'DELETE'
        });

        const json = await response.json();
        console.log({ workout_id: json._id });

        if (response.ok) {
            dispatch({ type: 'DELETE_WORKOUT', payload: json });
        } else {
            console.log('Error with deleting workout');
        }
    };

    const handleClickUpdate = () => {
        setShowUpdateForm(true); // Show the UpdateForm
    };

    return (
        <div className="workout_details">
            <p className="workout_details_heading"><strong>Exercise: </strong>{workout.title}</p>
            <p><strong>Load (kg): </strong>{workout.load}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p><strong>Date: </strong>{new Date(workout.createdAt).toLocaleDateString()}</p>
            <button onClick={handleClickDelete}>Delete</button>
            <button onClick={handleClickUpdate}>Update</button>

            {/* Conditionally render the UpdateForm */}
            {showUpdateForm && <UpdateForm workout={workout} />}
        </div>
    );
};

export default WorkoutDetails;