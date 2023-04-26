import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createDirectMessageAction,
  deleteDirectMessageAction,
  editDirectMessageAction,
  getDirectMessageThunk,
} from "../../store/directMessages";
import { useReceiverId } from "../../context/ReceiverId";
import { getDMThreadsThunk } from "../../store/directMessageThreads";

export default function Messages({ socket, threadId, setThreadId, messageThreadsArr, messageThreadsObj }) {
    const dispatch = useDispatch();

    const { receiverId, setReceiverId } = useReceiverId();
    // console.log('this is the current receiverID', receiverId)

    const socketRef = useRef(socket)
    const [content, setContent] = useState("");
    // const [threadId, setThreadId] = useState(0)
    const [messageIdToEdit, setMessageIdToEdit] = useState(0)

    // const messageThreadsObj = useSelector((state) => state.dmThreads);
    const directMessagesObj = useSelector((state) => state.directMessages);
    const sessionUser = useSelector((state) => state.session.user);

    //   console.log('this is directMessagesObj ', directMessagesObj)
    //   console.log('this is messageThreadsObj ', messageThreadsObj)

    // const messageThreadsArr = Object.values(messageThreadsObj);
    const directMessagesArr = Object.values(directMessagesObj);

    //consider moving joining threads and rooms in a context component so then its not related to threads
    //if not works take out rooms and do it with userIds potentially
    useEffect(() => {
        console.log('this is socketRef.current in useEffect OF JOINING ROOMS', socketRef.current)
        messageThreadsArr.forEach((thread) => {
            const threadAndUser = {threadId: thread.id, userId: sessionUser.id}
            console.log('this is join room map, thsi is threadAndUser', threadAndUser)
            socketRef.current.emit('joinThreadRoom', threadAndUser)
            console.log('after socket join emit in useEffect')
        })

        return () => {
            messageThreadsArr.forEach((thread) => {
            const threadAndUser = {threadId: thread.id, userId: sessionUser.id}
                socketRef.current.emit('leaveThreadRoom', threadAndUser)
            })
        }

    },[socketRef.current, messageThreadsArr])


    useEffect(() => {
        console.log("this is socketRef.current in useEffect ", socketRef.current);

        const messageReceivedHandler = (message) => {
          console.log("message recieved socketRef.current in use effect running before dispatch, this is message", message);
          dispatch(createDirectMessageAction(message));
        };

        const messageEdittedHandler = (message) => {
          dispatch(editDirectMessageAction(message));
        };

        const messageDeletedHandler = (messageId) => {
          console.log("delete received, this is messageId", messageId);
          dispatch(deleteDirectMessageAction(messageId));
        };

        socketRef.current.on("messageReceived", messageReceivedHandler);
        socketRef.current.on("messageEditted", messageEdittedHandler);
        socketRef.current.on("messageDeleted", messageDeletedHandler);

        return () => {
            console.log('SOCKET OFF RUNNING IN USE EFFECT RETURN')
          socketRef.current.off("messageReceived", messageReceivedHandler);
          socketRef.current.off("messageEditted", messageEdittedHandler);
          socketRef.current.off("messageDeleted", messageDeletedHandler);
        };
      }, [dispatch, socketRef.current]);


    useEffect(() => {
        console.log("useEffect running, here is threadId", threadId);

        if (threadId !== 0) {
          console.log("if threadID not 0 running", threadId);
          dispatch(getDirectMessageThunk(threadId));
        }
      }, [dispatch, threadId]);


    // useEffect(() => {
    //     dispatch(getDMThreadsThunk())

    //     return () => {
    //     setThreadId(0);
    //     };
    // }, [dispatch])

    const handleCreateMessage = (e) => {
        e.preventDefault();
        console.log('handle create message running')

        const newMessage = {
        content,
        senderId: sessionUser.id,
        receiverId,
        read: false,
        directMessageThreadId: threadId,
        };

        if (messageIdToEdit !== 0) {
            newMessage.id = messageIdToEdit
            console.log('messageToEdit !== 0 running, this is messageIdToEdit ', messageIdToEdit, 'this is newmessage ', newMessage)
            socketRef.current.emit('editMessage', newMessage)
        } else {
            console.log('this is newMessage in handle create message', newMessage)
            socketRef.current.emit("sendMessage", newMessage);
            console.log('after socketRef.current.emit')
        }
        setMessageIdToEdit(0)
        setContent("");
    };

    const handleSelectThread = (e) => {
        e.preventDefault()
        console.log('here is the thread info in select thread, ', e.target.dataset.threadid)
        if (threadId !== 0) {
            setThreadId(0)
        } else {
            setThreadId(e.target.dataset.threadid)
        }
        setReceiverId(messageThreadsObj[e.target.dataset.threadid].hostId === sessionUser.id ?
                        messageThreadsObj[e.target.dataset.threadid].guestId :
                        messageThreadsObj[e.target.dataset.threadid].hostId
                        )
    }

    const handleDeleteMessage = (e) => {
        console.log('handle delete clicked, this is messageId ', e.target.dataset.messageid, threadId)
        // e.preventDefault()
        socketRef.current.emit('deleteMessage', {messageId: e.target.dataset.messageid, threadId})
    }

    const handleEditMessage = (message, e) => {
        setMessageIdToEdit(e.target.dataset.messageid)
        setContent(message.content)
    }
    console.log('this is socketRef.current in before return ', socketRef.current)

    return (
        <>
        <div className="messages-page-container">
            <div className="message-thread-container">
            <div className="test">this is thread container</div>
            {messageThreadsArr.map((thread) => (
                <div
                className="thread-tile"
                data-threadid={thread.id}
                onClick={handleSelectThread}
                key={`threadid-${thread.id}`}
                >{thread.id}</div>
            ))}
            </div>

            <div className="direct-message-container">
            <div className="test">this is message container</div>
                {console.log('this is threadId in JSX', threadId)}
            {threadId !== 0 && directMessagesArr.map((message) => (
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
            ))}
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
        </>
    );
}
