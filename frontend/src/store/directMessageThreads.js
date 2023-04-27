import { csrfFetch } from "./csrf";

const GET_DM_THREADS = "dmThreads/GET_dmThreads";
const CREATE_DM_THREAD = "dmThreads/CREATE_dmThreads";
const DELETE_DM_THREAD = "dmThreads/DELETE_dmThreads";
export const GET_DMS = 'dms/GET_DMS'

const getDMThreadsAction = (dmThreads) => ({
    type: GET_DM_THREADS,
    dmThreads
})
const createDMThreadsAction = (thread) => ({
    type: CREATE_DM_THREAD,
    thread
})
const deleteDMThreadsAction = (threadId) => ({
    type: DELETE_DM_THREAD,
    threadId
})

export const getDMs = threads => ({
    type: GET_DMS,
    threads
})



export const getDMThreadsThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/directMessageThreads')

    if (response.ok) {
        const directMessageThreads = await response.json()
        dispatch(getDMs(directMessageThreads))
        dispatch(getDMThreadsAction(directMessageThreads))
    }
}

export const createDMThreadsThunk = (hostAndGuestIds) => async (dispatch) => {
    const response = await csrfFetch('/api/directMessageThreads', {
        method: 'POST',
        body: JSON.stringify(hostAndGuestIds)
    });

    if (response.ok) {
        const newThread = await response.json()
        dispatch(createDMThreadsAction(newThread))
        return newThread
    }
}

export const deleteDMThreadsThunk = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/directMessageThreads/${id}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        const deleteResponse = await response.json()
        if (deleteResponse.message === 'Successfully deleted') {
            dispatch(deleteDMThreadsAction(id))
        }
    }
}



const initialState = {}

export default function dmThreads(state = initialState, action) {
    let newState
    switch (action.type) {
        case GET_DM_THREADS:
            newState = {}
            action.dmThreads.forEach(thread => {
                newState[thread.id] = thread

            })
            return newState

        case CREATE_DM_THREAD:
            newState = {...state}
            newState[action.thread.id] = action.thread
            return newState

        case DELETE_DM_THREAD:
            newState = {...state}
            delete newState[action.threadId]
            return newState

        default:
            return state
    }

}
