


export default function AddDeleteImages({imageArr, setImageArr}) {
    console.log("imageArr", imageArr)
    return (
        <div className="edit-image-inner-container">
            <div className="edit-image-2nd-inner-container">
                {imageArr.map((img, idx) => (
                    <div key={img+idx} className="edit-image-card-container">                 
                        <img src={img.url} className="edited-image" />               
                    </div>
                ))}
                <div className="edit-image-add-icon-container">
                    <span 
                        id="material-symbols-outlined"
                        className="material-symbols-outlined">
                        library_add
                    </span>
                </div>

            </div>
        </div>
    );
};