import { useState } from 'react'; 
import { csrfFetch } from '../store/csrf'

export default function TestCompontent(props) {
    const [image, setImage] = useState(null);

    const handleSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();

        console.log('this is the image before fetching', image);

        if (image) formData.append('image', image);

        await csrfFetch('/api/listings/testing', {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        });
    };

    const updateFile = e => {
        const file = e.target.files[0];
        if(file) setImage(file);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" accept='image/jpeg,image/png' onChange={updateFile} />
            <button>Submit</button>
        </form>
    )
}