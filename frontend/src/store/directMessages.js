import { csrfFetch } from "./csrf";

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

export const getDirectMessageThunk = (threadId) => async (dispatch) => {
    const res = await csrfFetch(`/api/directMessageThreads/${threadId}`)

    if (res.ok) {
        const messages = await res.json()
        dispatch(getDirectMessageAction(messages))
        return messages
    }
}


const initialState = {}

export default function directMessages (state = initialState, action) {
    let newState = {}
    switch(action.type) {
        case GET_DIRECT_MESSAGES:
            newState = {}
            action.messages.forEach(message => {
                newState[message.id] = message
            })
            return newState

        case CREATE_DIRECT_MESSAGES:
            newState = {...state}
            newState[action.message.id] = action.message
            return newState

        case EDIT_DIRECT_MESSAGES:
            newState = {...state}
            newState[action.message.id] = action.message
            return newState

        case DELETE_DIRECT_MESSAGES:
            newState = {...state}
            delete newState[action.messageId]
            return newState

        default:
            return newState
    }


}
