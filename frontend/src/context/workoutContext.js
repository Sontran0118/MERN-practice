import { createContext, useReducer } from "react";

export const WorkoutContext = createContext()
export const workoutReducer = (state,action) =>{
  switch(action.type){
    case 'SET_WORKOUTS':
        return {
            workouts: action.payload
        }

    case 'CREATE_WORKOUT':
        return{
            workouts: [action.payload,...state.workouts]
        }
    case 'DELETE_WORKOUT':
            console.log({message: "Reducer received DELETE_WORKOUT", payload_id: action.payload._id} );
            return{
                workouts: state.workouts.filter((w)=>w._id !== action.payload._id)
            }

    case 'UPDATE_WORKOUT':
        console.log({message: "Reducer received DELETE_WORKOUT", payload_id: action.payload._id} );
            return{
                ...state,
                workouts: state.workouts.map((w)=>w._id === action.payload._id ? action.payload : w)
            }        
    default:
        return state    
  }
}


export const WorkoutContextProvider =( {children}) =>{

    const [state,dispatch] = useReducer(workoutReducer,{
        workouts: null
    })

    //dispatch({type: 'SET_WORKOUTS', payload: [{},{}]})

    return(
        <WorkoutContext.Provider value={{...state,dispatch}}>
            {children}
        </WorkoutContext.Provider>
    )
}