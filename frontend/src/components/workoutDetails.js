const WorkoutDetails = ({workout})=>{
    return (
        <div className="workout_details">
            <p><strong>Excercise: </strong>{workout.title}</p>
            <p><strong>Load (kg): </strong>{workout.load}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p><strong>Date: </strong>{new Date(workout.createdAt).toLocaleDateString()}</p>
        </div>
    );
    
}    
    
export default WorkoutDetails;
    