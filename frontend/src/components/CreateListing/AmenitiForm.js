import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import './createListing.css';
import { icons } from "../../ui/icons";
import AmenitiCard from "./AmentitiCard";

export function resetAmenity(localStorageKey) {
    const listOfItemsInStr = localStorage.getItem(localStorageKey);
    if(listOfItemsInStr) {
        const convertToArr = listOfItemsInStr.split(',');
        const listFromLocalStorage = convertToArr.filter(item => item.length);
        return listFromLocalStorage
    } else {
        return []
    };
};

export default function AmenitiForm() {


    const [amenityArr, setAmenityArr] = useState(resetAmenity('amenityArr'));

    useEffect(() => {  
        localStorage.setItem('amenityArr', amenityArr);
    },[amenityArr.length]);


    const handleOnClick = (amenity) => {
        if(amenityArr.includes(amenity)) {
            const amenitiIdx = amenityArr.indexOf(amenity);
            return setAmenityArr(prevArr => {
                prevArr.splice(amenitiIdx, 1);
                return [...prevArr]
            });
        } else {
            return setAmenityArr(prevArr => [...prevArr, amenity])
        }
    };

    return (
        <div className="form-container">
            <section className="ameniti-left-section">
                <span className='word-section-1'>Let guests know what your place has to offer</span>
            </section>
            <section className="right-section-container">
                <div className='ameniti-content-container'>
                    <div className='grid-right-inner-container-top-amentityForm-inner-block'>
                        <h2>Do you have any standout amenities?</h2>
                        <div className="amentityForm-inner-block-amentiti" style={{display:'flex', flexWrap:'wrap', rowGap:'2rem', columnGap:'2rem', margin:'15px'}}>
                            <span onClick={() => handleOnClick('pool')}><AmenitiCard icon={icons['pool']} amenity={'Pool'}  /></span>
                            <span onClick={() => handleOnClick('hot tub')}><AmenitiCard icon={icons['hot tub']} amenity={'Hot tub'} /></span>
                            <span onClick={() => handleOnClick('patio')}><AmenitiCard icon={icons['patio']} amenity={'Patio'} /></span>
                            <span onClick={() => handleOnClick('BBQ grill')}><AmenitiCard icon={icons['BBQ grill']} amenity={'BBQ grill'}  /></span>
                            <span onClick={() => handleOnClick('fire pit')}><AmenitiCard icon={icons['fire pit']} amenity={'Fire pit'}  /></span>
                            <span onClick={() => handleOnClick('indoor fire')}><AmenitiCard icon={icons['indoor fire']} amenity={'Indoor fireplace'}  /></span>
                            <span onClick={() => handleOnClick('exercise equipment')}><AmenitiCard icon={icons['exercise equipment']} amenity={'Exercise equipment'}  /></span>
                        </div>
                    </div>
                    <div className='grid-right-inner-container-top-amentityForm-inner-block'>
                        <h2>What about these guest favorites?</h2>
                        <div className="amentityForm-inner-block-amentiti" style={{display:'flex', flexWrap:'wrap', rowGap:'2rem', columnGap:'2rem', margin:'15px'}}>                        
                            <span onClick={() => handleOnClick('wifi')}><AmenitiCard icon={icons['wifi']} amenity={'Wifi'}  /></span>
                            <span onClick={() => handleOnClick('tv')}><AmenitiCard icon={icons['tv']} amenity={'TV'}  /></span>
                            <span onClick={() => handleOnClick('kitchen')}><AmenitiCard icon={icons['kitchen']} amenity={'Kitchen'}  /></span>
                            <span onClick={() => handleOnClick('washer')}><AmenitiCard icon={icons['washer']} amenity={'Washer'}  /></span>
                            <span onClick={() => handleOnClick('free parking on premises')}><AmenitiCard icon={icons['free parking on premises']} amenity={'Free parkiing on premises'}  /></span>
                            <span onClick={() => handleOnClick('paid parking on premises')}><AmenitiCard icon={icons['paid parking on premises']} amenity={'Paid parking on premises'}  /></span>
                            <span onClick={() => handleOnClick('air conditioning')}><AmenitiCard icon={icons['air conditioning']} amenity={'Air conditioning'}  /></span>
                            <span onClick={() => handleOnClick('outdoor shower')}><AmenitiCard icon={icons['outdoor shower']} amenity={'Outdoor shower'}  /></span>
                        
                        </div>
                    </div>

                    <div className='grid-right-inner-container-top-amentityForm-inner-block'>
                        <h2>Have any of these safety items?</h2>
                        <div className="amentityForm-inner-block-amentiti" style={{display:'flex', flexWrap:'wrap', rowGap:'2rem', columnGap:'2rem', margin:'15px'}}>
                            <span onClick={() => handleOnClick('smoke alarm')}><AmenitiCard icon={icons['smoke alarm']} amenity={'Smoke alarm'}  /></span>
                            <span onClick={() => handleOnClick('first aid kit')}><AmenitiCard icon={icons['first aid kit']} amenity={'First aid kit'}  /></span>
                            <span onClick={() => handleOnClick('fire extinguisher')}><AmenitiCard icon={icons['fire extinguisher']} amenity={'Fire extinguisher'}  /></span>                       
                        </div>
                    </div>
                </div>
                
                <div className='button-layout'>
                    <div className="button-container-div">
                   
                        <NavLink
                            style={{color:'rgb(34,34,34)', fontWeight:'600', fontSize:'18px'}}
                            to='/createListing-bedGuestForm'
                            >
                                Back
                        </NavLink>
            
                        <NavLink
                            className={amenityArr.length ? "edit-photo-modal-save-button" : "edit-photo-modal-save-button-disabled"}
                            style={{textDecoration:'none'}}
                            to='/createListing-categoryForm'
                            >
                                <div>Next</div>
                        </NavLink>
                    </div>
                </div>
            </section>
        </div>
    )
};