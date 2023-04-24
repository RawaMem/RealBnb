import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createDirectMessageAction,
  deleteDirectMessageAction,
  editDirectMessageAction,
  getDirectMessageThunk,
} from "../../store/directMessages";
import { useReceiverId } from "../../context/ReceiverId";
import { getDMThreadsThunk } from "../../store/directMessageThreads";

export default function Messages({ socket }) {
  const { receiverId, setReceiverId } = useReceiverId();
  const dispatch = useDispatch();
  console.log('this is the current receiverID', receiverId)

  const [content, setContent] = useState("");
  const [threadId, setThreadId] = useState(0)

  const messageThreadsObj = useSelector((state) => state.dmThreads);
  const directMessagesObj = useSelector((state) => state.directMessages);

  console.log('this is directMessagesObj ', directMessagesObj)
  console.log('this is messageThreadsObj ', messageThreadsObj)
  const sessionUser = useSelector((state) => state.session.user);

  const messageThreadsArr = Object.values(messageThreadsObj);
  const directMessagesArr = Object.values(directMessagesObj);


  useEffect(() => {
    socket.on("messageReceived", (message) => {
        console.log('socket in use effect running, this is message', message)
      dispatch(createDirectMessageAction(message));
    });
    socket.on("messageEditted", (message) => {
      dispatch(editDirectMessageAction(message));
    });
    socket.on("messageDeleted", (messageId) => {
      dispatch(deleteDirectMessageAction(messageId));
    });

    console.log('useEffect running, here is threadId', threadId)

    if (threadId !== 0) {
        console.log('if threadID not 0 running', threadId)
      dispatch(getDirectMessageThunk(threadId));
    }

    return () => {
      setThreadId(0);
    };
  }, [dispatch, socket, threadId]);

  useEffect(() => {
    dispatch(getDMThreadsThunk())
  }, [dispatch])

  const handleCreateMessage = (e) => {
    e.preventDefault();
    console.log('handle create message running')
    // const receiverId =
    //   messageThreadsObj[threadId].hostId === sessionUser.id
    //     ? messageThreadsObj[threadId].guestId
    //     : messageThreadsObj[threadId].hostId;
    const newMessage = {
      content,
      senderId: sessionUser.id,
      receiverId,
      read: false,
      directMessageThreadId: threadId,
    };

    console.log('this is newMessage in handle create message', newMessage)
    socket.emit("sendMessage", newMessage);
    console.log('after socket.emit')
    setContent("");
  };

  const handleSelectThread = (e) => {
    e.preventDefault()
    console.log('here is the thread info in select thread, ', e.target.value)
    setThreadId(e.target.dataset.threadid)
    setReceiverId(messageThreadsObj[e.target.dataset.threadid].hostId === sessionUser.id ?
                    messageThreadsObj[e.target.dataset.threadid].guestId :
                    messageThreadsObj[e.target.dataset.threadid].hostId
                    )
  }

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
            >{thread.id}</div>
          ))}
        </div>

        <div className="direct-message-container">
          <div className="test">this is message container</div>

          {directMessagesArr.map((message) => (
            <div className="direct-message">{message.content}</div>
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
