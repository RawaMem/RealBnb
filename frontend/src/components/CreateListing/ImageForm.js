import { useState } from "react";
import { NavLink } from "react-router-dom"
import {useDropzone} from 'react-dropzone';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useListing } from "../../context/ListingContext"
import './createListing.css';


export default function ImageForm(props) {
    const {imgUrl, setImgUrl,multiImages, setMultiImages, imageDescription, setImageDescription} = useListing();
    const [dragZone, setDragZone] = useState(false);
    const [droppedFile, setDroppedFile] = useState([])
    console.log('this is imgUrl', imgUrl);
    console.log('this is multiImages', multiImages);
    console.log('this is droppedFiles', droppedFile);

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
      
        return result;
    };

    const handleDeleteImage = url => {
        const urlIdx = imgUrl.indexOf(url);
        const newState = [...imgUrl];
        newState.splice(urlIdx, 1);
        setImgUrl(newState);

        const dropFile = droppedFile.find(file => file.preview === url )
        console.log('droppedFile', dropFile);
        const fileIdx = droppedFile.indexOf(dropFile);
        const newDroppedFile = [...droppedFile];
        newDroppedFile.splice(fileIdx, 1);
        setDroppedFile(newDroppedFile)

        const removeFromMultiImageIdx = multiImages.indexOf(dropFile);
        console.log('removeFromMultiImageIdx',removeFromMultiImageIdx)
        const copyMultiImages = [...multiImages];
        copyMultiImages.splice(removeFromMultiImageIdx, 1);
        setMultiImages(copyMultiImages);
    };

    const onDragEnd = result => {
        const { source, destination } = result;
        // dropped outside the list
        if (!destination) {
            return;
        };
        const items = reorder(imgUrl, source.index, destination.index);
        // console.log('this is source.index', source.droppableId)
        // console.log('this is destination', destination.droppableId)
        setImgUrl(items);
    };


    const {
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
            setDroppedFile([...droppedFiles]);         
            setMultiImages([...multiImages, ...droppedFiles]);
            const droppedFileUrl = droppedFiles.map(file => file.preview);
            setImgUrl([...imgUrl, ...droppedFileUrl]);
            setDragZone(false);
        }
    });

      //for multiple file upload
    const updateFiles = e => {
        console.log('entered................')
        const files = e.target.files;
        console.log('files', files);

        setMultiImages([...multiImages, files]);
        const fr = new FileReader();
        // e.target.files structure: {0: File, length: 1}
        if(e.target?.files[0] instanceof Blob) {
            fr.readAsDataURL(e.target?.files[0]);
            fr.addEventListener('load', () => {
                const url = fr.result;                
                setImgUrl([...imgUrl, url])
                
            });
        }
    };

    const buttonEvent = e => {
        const fileElem = document.getElementById("fileElem");
        fileElem.click();
    };

    function pictureZone() {
        return (
            <div className="image-form-image-section-container-images">
                <DragDropContext onDragEnd={onDragEnd}>
                    {imgUrl.length>0 && imgUrl.map((url, idx) => (
                        <Droppable droppableId={idx.toString()} key={idx}>
                            {(provided, snapshot)=>(
                                <span
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className="dropable-zone"
                                >
                                    <Draggable
                                        draggableId={idx.toString()}
                                        index={idx}
                                    >
                                        {(provided) => (
                                                <div className="image-section-layout" 
                                                 ref={provided.innerRef}
                                                 {...provided.draggableProps}
                                                 {...provided.dragHandleProps}
                                                >
                                                    <span 
                                                    className="delete-image"
                                                    onClick={()=>handleDeleteImage(url)}
                                                    >
                                                        x
                                                    </span>
                                                    <img key={idx} 
                                                        src={url} className="preview-images" style={{height: '200px', width:'200px', borderRadius:'5px',
                                                        cursor: 'move',
                                                        zIndex: '9'
                                                    }}
                                                        draggable='true'
                                                    /> 
                                                </div>    
                                        )}
                                    </Draggable>
                                    {provided.placeholder}
                                </span>
                            )}           
                        </Droppable>
                        ))}
                </DragDropContext>
            </div>
        )
    }



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

                <section 
                className="grid-right-container-image-form"   
                onDragEnter={e => {
                    setDragZone(true)
                    e.stopPropagation()
                    e.preventDefault()
                }}
                >
                    <div 
                    className="image-form-image-section-container"
                    >
                        {dragZone && ( <div 
                        id="image-drop-zone"
                        {...getRootProps({ className: 'dropzone' })} 
                        onDragOver={e => {
                            e.stopPropagation()
                            e.preventDefault()
                        }}
                        onDragLeave={e => {
                            e.stopPropagation()
                            e.preventDefault()
                            setDragZone(false);
                        }}
                        >Drop Files Here</div> ) }
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
                        {pictureZone()}
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