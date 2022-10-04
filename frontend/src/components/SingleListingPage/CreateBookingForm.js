import { useState } from "react"

export default function CreateBookingForm({ userId, listingId,  }) {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleSubmit = e => {
        e.preventDefault();


    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="start-date">Start Date:</label>
            <input type="date" name="start-date" onChange={e => setStartDate(e.target.value)} value={startDate} />
            <label htmlFor="end-date">End Date:</label>
            <input type="date" name="end-date" onChange={e => setEndDate(e.target.value)} value={endDate} />
            <button type="submit">Book</button>
        </form>
    )
}

// 10/15/2022 start 
// 10/20/2022 end