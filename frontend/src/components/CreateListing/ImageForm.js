import { useState } from "react";
import { NavLink } from "react-router-dom"
import {useDropzone} from 'react-dropzone';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useListing } from "../../context/ListingContext"
import './createListing.css';


export default function ImageForm(props) {
    const {imgUrl, setImgUrl,multiImages, setMultiImages, imageDescription, setImageDescription} = useListing();
    const [errors, setErrors] = useState({imageUpload:''})

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
      
        return result;
    };

    const onDragEnd = result => {
        const { source, destination } = result;
        // dropped outside the list
        if (!destination) {
            return;
        };
        const items = reorder(imgUrl, source.index, destination.index);
        console.log('this is items', items)
        setImgUrl([...items]);
    };

    const {
        fileRejections,
        getRootProps,
        getInputProps
      } = useDropzone({
        accept: {
          'image/*': []
        },
        onDrop: acceptedFiles => {
            const droppedFiles = acceptedFiles.map(file => Object.assign(file, {
              preview: URL.createObjectURL(file)
            }));
            setMultiImages([...multiImages, ...droppedFiles]);
            const droppedFileUrl = droppedFiles.map(file => file.preview);
            setImgUrl( [...imgUrl, ...droppedFileUrl] );
        }
    });


    const fileRejectionItems = fileRejections.map(({ errors }) => (
          <ul>
            {errors.map(e => (
              <li key={e.code}>{e.message}</li>
            ))}
          </ul>       
      ));



      //for multiple file upload
    const updateFiles = e => {
        const files = e.target.files;
        setMultiImages([...multiImages, files]);
        const fr = new FileReader();
        // e.target.files structure: {0: File, length: 1}
        if(e.target?.files[0] instanceof Blob) {
            fr.readAsDataURL(e.target?.files[0]);
            fr.addEventListener('load', () => {
                const url = fr.result;
                if(imgUrl.indexOf(url) === -1) {
                    setImgUrl([...imgUrl, url])
                } else {
                    setErrors(prev => ({...prev, imageUpload:'photo already exists, please select another one.'}))
                };
            });
        }
    };

    const buttonEvent = e => {
        const fileSelect = document.getElementById("fileSelect");
        const fileElem = document.getElementById("fileElem");
        fileElem.click();
    };



    return (
        <>
            <div className="image-form-container">
                <section className="video-section">
                    <video 
                        autoPlay 
                        controls
                        muted 
                        preload='auto' 
                        controlsList="play nodownload noplaybackrate"
                        disablePictureInPicture
                        playsInline
                        crossOrigin="anonymous"
                        style = {{ width:'100%', height: 'auto'}}
                    >
                        <source src="https://a0.muscache.com/v/d6/12/d6120feb-75fc-52dd-b5bb-5755913fb756/d6120feb75fc52ddb5bb5755913fb756_4000k_1.mp4" type="video/mp4" />
                    </video>
                </section>

                <section className="grid-right-container-image-form">
                    <div className="image-form-image-section-container">
                        <div className="image-form-image-section-container-upper">
                            <div>
                                <h3>Ta-da! How does this look?</h3>
                                <span>Drag to reorder</span>
                            </div>
                            <div>
                                <input type="file" multiple  {...getInputProps()} onChange={updateFiles} style={{display:'none'}} id="fileElem" />

                                <div id="fileSelect" onClick={buttonEvent} >
                                    <span class="material-symbols-outlined">
                                        file_upload
                                    </span>
                                    <span class="upload-button">Upload</span>
                                </div>
                            </div>
                        </div>

                        <div className="image-form-image-section-container-images" style={{overflow:'scroll'}}  {...getRootProps({ className: 'dropzone' })} >
                            <DragDropContext onDragEnd={onDragEnd}>
                                {imgUrl.length && imgUrl.map((url, idx) => (
                                    <Droppable key={idx} droppableId={`${idx}`}>
                                        {(provided, snapshot)=>(
                                            <div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            >
                                                <Draggable
                                                    key={idx}
                                                    draggableId={idx.toString()}
                                                    index={idx}
                                                >
                                                    {(provided, snapshot) => (
                                                        <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        >
                                                            <img key={idx} src={url} className="preview-images" style={{height: '200px', width:'180px' }}/>
                                                        </div>
                                                    )}
                                                </Draggable>
                                                {provided.placeholder}
                                            </div>
                                        )}           
                                    </Droppable>
                                ))}
                            </DragDropContext>
                        </div>
                    </div>
                    <div className='button-layout'>
                        <NavLink
                            style={{ textDecoration:'none', color: 'black', fontSize: '20px',cursor:'pointer'}}
                            to='/createListing-amenitiForm'
                            >
                                Back
                        </NavLink>
                        <div>
                            <NavLink
                                style={{ 
                                    textDecoration:'none',
                                    color: 'white',
                                    cursor:'pointer',
                                    width:'100px',
                                    height:'50px',
                                    background:'black',
                                    display:'flex',
                                    justifyContent:'center',
                                    alignItems:'center',
                                    borderRadius:'15px',
                                    cursor:'pointer'
                                }}
                                to='/createListing/images'
                                >
                                    Next
                                </NavLink>
                            </div> 
                    </div>
                </section>

            </div>
        </>
    )
};