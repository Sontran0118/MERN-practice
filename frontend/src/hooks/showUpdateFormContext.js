import { ShowUpdateFormContext} from "../context/showUpdateFormContext";
import { useContext } from "react";
export const useShowUpdateFormContext = () =>{
    const context = useContext(ShowUpdateFormContext)
    if(!context){
        throw Error('useWorkoutContext must be used inside an WorkoutContextProvider')
    }
    return context
}