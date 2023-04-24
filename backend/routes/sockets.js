const {DirectMessage, User, DirectMessageThread} = require("../db/models")


const createDirectMessage = async (message) => {
    const {directMessageThreadId, receiverId, senderId} = message
    console.log('here is info message in create direct message, ', directMessageThreadId, receiverId, senderId)
    if (directMessageThreadId === 0) {
        console.log('if threadId 0 running')
        const newThread = await DirectMessageThread.findCreateFind({
            where: {hostId: receiverId, guestId: senderId},
            defaults: {hostId: receiverId, guestId: senderId}
        })

        console.log('here is newThread, ', newThread, newThread.id)
        message.directMessageThreadId = newThread[0].id
        console.log('here is message after adding thread Id, ', message)


    }
    const newDirectMessage = await DirectMessage.create(message)
    return newDirectMessage
}

const editDirectMessage = async (message) => {
    const {id, content} = message
    const directMessageToEdit = await DirectMessage.findByPk(id)
    await directMessageToEdit.update({content})
    return directMessageToEdit
}

const deleteDirectMessage = async (id) => {
    const directMessageToDelete = await DirectMessage.findByPk(id)
    await directMessageToDelete.destroy()
    return {message: 'Successfully deleted'}
}

const editDirectMessageToRead = async (id) => {
    const readDirectMessage = await DirectMessage.findByPk(id)
    await readDirectMessage.update({read: true})
    return readDirectMessage
}

const editOnlineStatusToFalse = async (id) => {
    const offlineUser = await User.findByPk(id)
    await offlineUser.update({online: false})
    return offlineUser
}

const editOnlineStatusToTrue = async (id) => {
    const onlineUser = await User.findByPk(id)
    await onlineUser.update({online: true})
    return onlineUser
}

module.exports = {
createDirectMessage,
editDirectMessage,
deleteDirectMessage,
editDirectMessageToRead,
editOnlineStatusToFalse,
editOnlineStatusToTrue
}
