export function VideoPlayer( {src} ) {
    return (
        <video 
            autoPlay 
            controls
            muted 
            preload='auto' 
            controlsList="play nodownload noplaybackrate"
            disablePictureInPicture
            playsInline
            crossOrigin="anonymous"
            style = {{ width:'100%', height: "100%", objectFit:"cover"}}
        >
            <source src={src} type="video/mp4" />
        </video>
    )
};