import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Messages from ".";
import { getDMThreadsThunk } from "../../store/directMessageThreads";



export default function MessageWrapper({socket}) {
    const dispatch = useDispatch();
    const [threadId, setThreadId] = useState(0)


    const messageThreadsObj = useSelector((state) => state.dmThreads);

    const messageThreadsArr = Object.values(messageThreadsObj);

    useEffect(() => {
        dispatch(getDMThreadsThunk())

        return () => {
        setThreadId(0);
        };
    }, [dispatch])



    return (
        <>
            <Messages socket={socket} messageThreadsObj={messageThreadsObj} threadId={threadId} setThreadId={setThreadId} messageThreadsArr={messageThreadsArr}/>
        </>
    )
}
