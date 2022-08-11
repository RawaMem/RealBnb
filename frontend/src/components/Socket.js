import { useState, useEffect } from 'react';

export default function Socket({ socket }) {
    const [message, setMessage] = useState('');

    useEffect(() => {
        socket.on('testing', data => {
            setMessage(data)
        });
    }, [socket])

    const handleSubmit = e => {
        e.preventDefault();
        socket.emit('message', message);
        setMessage('');
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type='text' value={message} onChange={e => setMessage(e.target.value)} />
                <button>Send it!</button>
            </form>
            <h2>{message}</h2>
        </>
    )
}