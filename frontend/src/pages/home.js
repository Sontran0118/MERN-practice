import { useEffect } from 'react';
import WorkoutDetails from '../components/workoutDetails'; // Fix import
import WorkoutForm from "../components/workoutForm";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useState } from 'react';
const Home = () => {
    const [showUpdateForm, setShowUpdateForm] = useState(false); // Define state
    const {workouts, dispatch} = useWorkoutContext();

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workouts');
            const json = await response.json();
            
            if (response.ok) {
                dispatch({type: 'SET_WORKOUTS', payload: json})
            }
        };
        fetchWorkouts();
    }, []);

    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout) => (
                    <WorkoutDetails key={workout._id}
                     workout={workout} 
                     showUpdateForm={showUpdateForm}
                     setShowUpdateForm={setShowUpdateForm}
                     /> // Fix JSX tag
                ))}
            </div>

            <WorkoutForm showUpdateForm ={showUpdateForm}
                         setShowUpdateForm={setShowUpdateForm}/>
        </div>
    );
};

export default Home;
