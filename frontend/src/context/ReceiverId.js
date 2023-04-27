import { createContext, useContext, useState } from "react";


export const ReceiverIdContext = createContext()

export const useReceiverId = () =>  useContext(ReceiverIdContext)

export default function ReceiverIdProvider({children}) {
    const [threadIdFromListing, setThreadIdFromListing] = useState(0)

    return(
        <ReceiverIdContext.Provider
            value={{threadIdFromListing, setThreadIdFromListing}}
        >
            {children}
        </ReceiverIdContext.Provider>
    )
}
