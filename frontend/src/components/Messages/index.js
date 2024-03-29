import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createDirectMessageAction,
  deleteDirectMessageAction,
  editDirectMessageAction,
  getDirectMessageThunk,
} from "../../store/directMessages";
import { useReceiverId } from "../../context/ReceiverId";


export default function Messages({ socket, messageThreadsArr, messageThreadsObj }) {
    //!! we don't want other thread data visible to this comp
    //!! SRP and SOLIDify
    const dispatch = useDispatch();

    const { threadIdFromListing } = useReceiverId();

    const [content, setContent] = useState("");
    const [threadId, setThreadId] = useState(0)
    const [firstRender, setFirstRender] = useState(true)
    const [messageIdToEdit, setMessageIdToEdit] = useState(0)
    const [receiverId, setReceiverId] = useState(0)

    const directMessagesObj = useSelector((state) => state.directMessages[threadId]);
    const sessionUser = useSelector((state) => state.session.user);

    const directMessagesArr = Object.values(directMessagesObj);

    useEffect(() => {
        // console.log("this is socket in useEffect ", socket);

        const messageReceivedSocketHandler = (message) => {
            dispatch(createDirectMessageAction(message));
        };

        const messageEdittedSocketHandler = (message) => {
            dispatch(editDirectMessageAction(message));
        };

        const messageDeletedSocketHandler = (messageId) => {
            // console.log("delete received, this is messageId", messageId);
            dispatch(deleteDirectMessageAction(messageId));
        };

        socket.on("messageReceived", messageReceivedSocketHandler);
        socket.on("messageEditted", messageEdittedSocketHandler);
        socket.on("messageDeleted", messageDeletedSocketHandler);

        return () => {
            // console.log('SOCKET OFF RUNNING IN USE EFFECT RETURN')
            socket.off("messageReceived", messageReceivedSocketHandler);
            socket.off("messageEditted", messageEdittedSocketHandler);
            socket.off("messageDeleted", messageDeletedSocketHandler);
        };
      }, [dispatch, socket]);



    const handleSelectThread = (e) => {
        console.log()
    e.preventDefault()
    // // console.log('here is the thread info in select thread, ', e.target.dataset.threadid)
    setFirstRender(false)
    if (threadId === e.target.dataset.threadid) {
        setThreadId(0)
    } else {
        setThreadId(e.target.dataset.threadid)
    }
    setReceiverId(messageThreadsObj[e.target.dataset.threadid].hostId === sessionUser.id ?
                    messageThreadsObj[e.target.dataset.threadid].guestId :
                    messageThreadsObj[e.target.dataset.threadid].hostId
                    )
    }


    const handleCreateMessage = (e) => {
        e.preventDefault();
        // // console.log('handle create message running')

        const newMessage = {
        content,
        senderId: sessionUser.id,
        receiverId,
        read: false,
        directMessageThreadId: threadId,
        socketRoom: messageThreadsObj[threadId].socketRoom
        };

        if (messageIdToEdit !== 0) {
            newMessage.id = messageIdToEdit
            // // console.log('messageToEdit !== 0 running, this is messageIdToEdit ', messageIdToEdit, 'this is newmessage ', newMessage)
            socket.emit('editMessage', newMessage)
        } else {
            // // console.log('this is newMessage in handle create message', newMessage)
            socket.emit("sendMessage", newMessage);
            // // console.log('after socket.emit')
        }
        setMessageIdToEdit(0)
        setContent("");
    };


    const handleDeleteMessage = (e) => {
        // // console.log('handle delete clicked, this is messageId ', e.target.dataset.messageid, threadId)
        socket.emit('deleteMessage', {messageId: e.target.dataset.messageid, threadId})
    }

    const handleEditMessage = (message, e) => {
        setMessageIdToEdit(e.target.dataset.messageid)
        setContent(message.content)
    }
    // // console.log('this is socket in before return ', socket)

    return (
        <div>
        <div className="messages-page-container">
            <div className="message-thread-container">
            <div className="test">this is thread container</div>
            {messageThreadsArr.map((thread) => (
                <div
                className="thread-tile"
                data-threadid={thread.id}
                onClick={handleSelectThread}
                key={`threadid-${thread.id}`}
                // !! todo: might want user info eager loaded from db
                // !! for nice thread ux
                >{thread.id}</div>
            ))}
            </div>

            <div className="direct-message-container">
            <div className="test">this is message container</div>
            {
                firstRender && threadIdFromListing !== 0 ?
                    threadId !== 0 && directMessagesArr.map((message) => (
                        <div key={`messagediv-${message.id}`}>
                        <div key={`messageid-${message.id}`} className="direct-message">{message.content}</div>
                        {sessionUser.id === message.senderId &&
                        <button
                        data-messageid={message.id}
                        onClick={(e) => handleEditMessage(message, e)}
                        className="dm-edit-button"
                        key={`editbutton-${message.id}`}>edit</button>}
                        {sessionUser.id === message.senderId &&
                        <button
                        data-messageid={message.id}
                        onClick={handleDeleteMessage}
                        className="dm-delete-button"
                        key={`deletebtn-${message.id}`}>delete</button>}
                        </div>
                    )) :
                        threadId !== 0 && directMessagesArr.map((message) => (
                        <div key={`messagediv-${message.id}`}>
                        <div key={`messageid-${message.id}`} className="direct-message">{message.content}</div>
                        {sessionUser.id === message.senderId &&
                        <button
                        data-messageid={message.id}
                        onClick={(e) => handleEditMessage(message, e)}
                        className="dm-edit-button"
                        key={`editbutton-${message.id}`}>edit</button>}
                        {sessionUser.id === message.senderId &&
                        <button
                        data-messageid={message.id}
                        onClick={handleDeleteMessage}
                        className="dm-delete-button"
                        key={`deletebtn-${message.id}`}>delete</button>}
                        </div>
                    ))

            }
            </div>

            <div className="create-message-form-container">
            <form className="create-message-form" onSubmit={handleCreateMessage}>
                <label htmlFor="messageTextArea" className="textarea-label"></label>
                <textarea
                name="messageTextArea"
                cols="30"
                rows="10"
                className="message-tesxtarea"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <button type='Submit' className="create-message-submit-btn">Send</button>
            </form>
            </div>
        </div>
        </div>
    );
}


// import { getDMThreadsThunk } from "../../store/directMessageThreads";
// import { useParams } from "react-router-dom";
// const {threadId} = useParams()
    // // console.log('this is the current receiverID', receiverId)
    // const socketRef = useRef(socket)
    // const messageThreadsObj = useSelector((state) => state.dmThreads);
    //   // console.log('this is directMessagesObj ', directMessagesObj)
    //   // console.log('this is messageThreadsObj ', messageThreadsObj)

    // const messageThreadsArr = Object.values(messageThreadsObj);

    //consider moving joining threads and rooms in a context component so then its not related to threads
    //if not works take out rooms and do it with userIds potentially
    // useEffect(() => {
    //     // console.log('this is socket in useEffect OF JOINING ROOMS', socket)
    //     messageThreadsArr.forEach((thread) => {
    //         const threadAndUser = {threadId: thread.id, userId: sessionUser.id}
    //         // console.log('this is join room map, thsi is threadAndUser', threadAndUser)
    //         socket.emit('joinThreadRoom', threadAndUser)
    //         // console.log('after socket join emit in useEffect')
    //     })

    //     return () => {
    //         messageThreadsArr.forEach((thread) => {
    //         const threadAndUser = {threadId: thread.id, userId: sessionUser.id}
    //             socket.emit('leaveThreadRoom', threadAndUser)
    //         })
    //     }

    // },[socket, messageThreadsArr])

    // useEffect(() => {
    //     // console.log("useEffect running, here is threadId", threadId);

    //     if (threadId !== 0) {
    //       // console.log("if threadID not 0 running", threadId);
    //       dispatch(getDirectMessageThunk(threadId));
    //     }
    //   }, [dispatch, threadId]);


    // useEffect(() => {
    //     dispatch(getDMThreadsThunk())

    //     return () => {
    //     setThreadId(0);
    //     };
    // }, [dispatch])

    // e.preventDefault()
