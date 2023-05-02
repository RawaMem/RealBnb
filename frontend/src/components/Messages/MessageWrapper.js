import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Messages from ".";
import { getDMThreadsThunk } from "../../store/directMessageThreads";
import { Redirect } from "react-router-dom";



export default function MessageWrapper({socket}) {
    console.log('RERENDER WRAPPER=========')
    const dispatch = useDispatch();

    const messageThreadsObj = useSelector((state) => state.dmThreads);
    const sessionUser = useSelector((state) => state.session.user);

    const messageThreadsArr = Object.values(messageThreadsObj);
    // console.log('messageThreadsArr==========', messageThreadsArr)

    useEffect(() => {
        dispatch(getDMThreadsThunk())
    }, [dispatch])

    useEffect(() => {
        console.log('this is socket in useEffect OF JOINING ROOMS', socket)
        messageThreadsArr.forEach((thread) => {
            const threadAndUser = {threadId: thread.id, userId: sessionUser.id}
            console.log('this is join room map, thsi is threadAndUser', threadAndUser)
            socket.emit('joinThreadRoom', threadAndUser)
            console.log('after socket join emit in useEffect')
        })

        return () => {
            messageThreadsArr.forEach((thread) => {
            const threadAndUser = {threadId: thread.id, userId: sessionUser.id}
                socket.emit('leaveThreadRoom', threadAndUser)
            })
        }
    },[socket, messageThreadsArr])


    return (
        <>
            <Messages socket={socket} messageThreadsObj={messageThreadsObj} messageThreadsArr={messageThreadsArr}/>
        </>
    )
}

// const [threadId, setThreadId] = useState(0)
    // if (!sessionUser) return (<Redirect to='/'/>)
    // return () => {
        // setThreadId(0);
        // };
