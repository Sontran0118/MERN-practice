import { useState, useEffect } from "react";
import WorkoutDetails from '../components/workoutDetails'; // Fix import
import WorkoutForm from "../components/workoutForm";
const Home = () => {
    const [workouts, setWorkouts] = useState(null);

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workouts');
            const json = await response.json();
            
            if (response.ok) {
                setWorkouts(json);
            }
        };
        fetchWorkouts();
    }, []);

    return (
        <div className="Home">
            <div className="workouts">
                {workouts && workouts.map((workout) => (
                    <WorkoutDetails key={workout._id} workout={workout} /> // Fix JSX tag
                ))}
            </div>

            <WorkoutForm/>
        </div>
    );
};

export default Home;
