import { useState, useEffect } from 'react';

export default function Socket({ socket }) {
    const [message, setMessage] = useState('');

    useEffect(() => {
        socket.on('testing', data => {
            console.log('here is the data! => ', data);
            setMessage(data)
        });
        console.log("useEffect ran with socket")
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