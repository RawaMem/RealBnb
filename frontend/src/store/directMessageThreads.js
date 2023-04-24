import { csrfFetch } from "./csrf";

const GET_DM_THREADS = "dmThreads/GET_dmThreads";

const getDMThreadsAction = (dmThreads) => ({
    type: GET_DM_THREADS,
    dmThreads
})


export const getDMThreadsThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/directMessageThreads')

    if (response.ok) {
        const directMessageThreads = await response.json()
        dispatch(getDMThreadsAction(directMessageThreads))
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

        default:
            return state
    }

}
