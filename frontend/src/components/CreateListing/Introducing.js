import { NavLink } from 'react-router-dom';
import './createListing.css';


export default function Introducing() {
    return (
        <div className='form-container'>
            <section className='video-section-container'>
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
                    <source src="https://a0.muscache.com/v/8b/04/8b0456c7-13f8-54bc-889a-7cf549f144a3/8b0456c713f854bc889a7cf549f144a3_4000k_1.mp4" type="video/mp4" />
                </video>
            </section>
            <section className='title-form-container'>
                <div className="title-content-introduction">
                    <div className='exit-button-introduction'>
                        <div className='exit-button-wrapper'>
                            <NavLink 
                            style={{ textDecoration: 'none', color: 'white', fontSize: '12px'}}
                            to='/'
                            >
                                Exit
                            </NavLink>
                        </div>
                    </div>
                    <div className='word-section-introduction'>
                        <div className='word-section-1-container'>
                            <h1 className='word-section-1'>Become a Host in 10</h1>
                            <h1 className='word-section-1'>easy steps</h1>
                        </div>
                        <div className='word-section-2'>Join us. We'll help you every step of the way.
                        </div>
                    </div>
                </div>
                <div className="button-container" id="introduction-button-container">
                    <div className='nextpage-button-wrapper'>
                        <NavLink
                        style={{ 
                            textDecoration: 'none',
                            color: 'white',
                            cursor:'pointer'
                        }}
                        to='/createListing/create-address'
                        >Let's go!</NavLink>
                    </div>
                </div>
            </section>
        </div>
    )
}
