import { csrfFetch } from "./csrf";
import { GET_DMS } from "./directMessageThreads";

const GET_DIRECT_MESSAGES = 'dms/GET'
const CREATE_DIRECT_MESSAGES = 'dms/CREATE'
const EDIT_DIRECT_MESSAGES = 'dms/EDIT'
const DELETE_DIRECT_MESSAGES = 'dms/DELETE'

export const getDirectMessageAction = (messages) => ({
    type: GET_DIRECT_MESSAGES,
    messages
})

export const createDirectMessageAction = (message) => ({
    type: CREATE_DIRECT_MESSAGES,
    message
})

export const editDirectMessageAction = (message) => ({
    type: EDIT_DIRECT_MESSAGES,
    message
})

export const deleteDirectMessageAction = (messageId) => ({
    type: DELETE_DIRECT_MESSAGES,
    messageId
})

//not being used
export const getAllMessagesThunk = (threadId) => async (dispatch) => {
    const res = await csrfFetch(`/api/directMessageThreads/current`)

    if (res.ok) {
        const messages = await res.json()
        dispatch(getDirectMessageAction(messages))
        return messages
    }
}

export const getDirectMessageThunk = (threadId) => async (dispatch) => {
    const res = await csrfFetch(`/api/directMessageThreads/${threadId}`)

    if (res.ok) {
        const messages = await res.json()
        dispatch(getDirectMessageAction(messages))
        return messages
    }
}

//message and message wrapper set threaId to 0 to represent no thread selected, so we add
//empty object to represent it
const initialState = {0:{}}

export default function directMessages (state = initialState, action) {
    let newState = {}
    switch(action.type) {
        case GET_DIRECT_MESSAGES:
            //not being used now, we are using get_DMs below to load messages from a thread thunk
            newState = {}
            action.messages.forEach(message => {
                newState[message.id] = message
            })
            return newState

        case CREATE_DIRECT_MESSAGES:
            newState = {...state, [action.message.directMessageThreadId]: {...state[action.message.directMessageThreadId]}}
            newState[action.message.directMessageThreadId][action.message.id] = action.message
            return newState

        case EDIT_DIRECT_MESSAGES:
            newState = {...state, [action.message.directMessageThreadId]: {...state[action.message.directMessageThreadId]}}
            newState[action.message.directMessageThreadId][action.message.id] = action.message
            return newState

        case DELETE_DIRECT_MESSAGES:
            newState = {...state, [action.message.directMessageThreadId]: {...state[action.message.directMessageThreadId]}}
            delete newState[action.message.directMessageThreadId][action.message.id]
            return newState

            case GET_DMS:
                //organize dms by threads
                newState = {0:{}}
                action.threads.forEach((thread) => {
                    newState[thread.id] = {}
                    thread.DirectMessages.forEach(message => {
                        newState[thread.id][message.id] = message
                    })
                })
                return newState


        default:
            return state
    }


}
