import { createContext, useState } from "react";

export const ShowUpdateFormContext = createContext();


export const ShowUpdateFormProvider = ({ children }) => {
    const [showUpdateForm, setShowUpdateForm] = useState(false);

    return (
        <ShowUpdateFormContext.Provider value={{ showUpdateForm, setShowUpdateForm }}>
            {children}
        </ShowUpdateFormContext.Provider>
    )
}