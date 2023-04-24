import { createContext, useContext, useState } from "react";


export const ReceiverIdContext = createContext()

export const useReceiverId = () =>  useContext(ReceiverIdContext)

export default function ReceiverIdProvider({children}) {
    const [receiverId, setReceiverId] = useState(0)

    return(
        <ReceiverIdContext.Provider
            value={{receiverId, setReceiverId}}
        >
            {children}
        </ReceiverIdContext.Provider>
    )
}
