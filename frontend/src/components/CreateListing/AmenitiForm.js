import { NavLink } from "react-router-dom";
import { useListing } from "../../context/ListingContext"
import './createListing.css';

export default function AmenitiForm() {
    const {amenityArr, setAmenityArr} = useListing();

    return (
        <div className="ameniti-form-container">
            <section className="grid-left-container">
            <span className='word-section-1'>Let guests know what your place has to offer</span>
            </section>
            <section className="grid-right-container-amenityForm">
            <div className='grid-right-inner-container-top-amentityForm'>

            </div>
            <div className='button-layout'>
                <NavLink
                    style={{ textDecoration:'none', color: 'black', fontSize: '20px',cursor:'pointer'}}
                    to='/createListing-bedGuestForm'
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
                        to='/'
                        >
                            Next
                        </NavLink>
                    </div> 
            </div>



            </section>

            

        </div>
    )
};