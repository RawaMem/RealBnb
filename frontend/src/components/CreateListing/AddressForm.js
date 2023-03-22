import './createListing.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getToken } from '../../store/maps';
import { useListing } from '../../context/ListingContext';
import { MapBox } from '../Maps/Mapbox';


export default function AddressForm() {
    const { address, setAddress, inputVal, setInputVal, city, setCity, state, setState, zipCode, setZipCode,setLongitude, setLatitude, latitude, longitude } = useListing();

    const dispatch = useDispatch();

    const [optionalAdd, setOptionalAdd] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [coordinates, setCoordinates] = useState([]);


    const token = useSelector((state) => state.maps?.token);

    useEffect(() => {
        if(!token) dispatch(getToken());
    }, [dispatch]);

    useEffect(() => {
        setInputVal(localStorage.getItem('addressInputVal').length ? localStorage.getItem('addressInputVal') : '');
        setCity(localStorage.getItem('city').length ? localStorage.getItem('city') : '');
        setState(localStorage.getItem('state'));
        setZipCode(localStorage.getItem('zipCode'));
        const lng = localStorage.getItem('lng');
        const lat = localStorage.getItem('lat');
        setCoordinates([+lng, +lat])
    },[])

    useEffect(() => {
        localStorage.setItem('addressInputVal', inputVal);
        localStorage.setItem('city', city);
        localStorage.setItem('state', state);
        localStorage.setItem('zipCode', zipCode);
        localStorage.setItem('lat', latitude);
        localStorage.setItem('lng', longitude)
    },[address,city, state, zipCode, latitude, longitude])
    

    
    const containerStyle = {
        width: '90%',
        height: '95%',
      };

    const handleChange = async (event) => {

        setInputVal(event.target.value);
        try {
            const endpoint = `http://api.mapbox.com/geocoding/v5/mapbox.places/${event.target.value}.json?access_token=${token}&autocomplete=true`;
    
            const response = await fetch(endpoint);
            const results = await response.json();
            setSuggestions(results.features);
        } catch(e) {
            console.log('Error fetching data', e);
        }  
    };
    
    useEffect(() => {
        const [lng, lat] = coordinates;
        setLatitude(lat);
        setLongitude(lng);
    }, [coordinates])

    if(!inputVal) {
        setCity('');
        setState('');
        setZipCode('');
    };
    
    function handleClickingNext() {

    };

    if(!token) return null;

    return (
        <div className="form-container">
            <section className="address-form-left-section">
                <span className='word-section-1'>Where's your place located?</span>
            </section>
                          
            <section className="addressForm-right-selection">
                <div className='addressForm-content-container'>   
                    <div className='grid-right-inner-page'>
                        <form>
                            <h3>Confirm your address</h3>
                            <div className='grid-right-container-input' id="address-input">
                                <input 
                                placeholder='Street'
                                type='search' 
                                value={inputVal} 
                                onChange={handleChange} 
                                />
                                    {suggestions?.length > 0 && 
                                        (<div className='address-suggestion-container'>
                                            {suggestions.map(suggestion => (
                                                <div 
                                                    key={suggestion.place_name} 
                                                    onClick={() => {
                                                        setCoordinates(suggestion.geometry.coordinates);
                                                        setAddress(suggestion.place_name)
                                                        setSuggestions([])
                                                        setInputVal(suggestion.place_name)
                                                        setZipCode(suggestion.context[1].text)
                                                        setCity(suggestion.context[2].text)
                                                        setState(suggestion.context[4].text)
                                                    }} 
                                                    style={{cursor:'pointer'}}
                                                > 
                                                    {suggestion.place_name}
                                                </div>                
                                            ))}   
                                        </div>)
                                    }
                            </div>
                            <div className='grid-right-container-input'>
                                <input 
                                    type="text" 
                                    placeholder='Apt, suite, etc. (Optional)' 
                                    defaultValue=''
                                />
                            </div>
                            <div className='grid-right-container-input'>
                                <input 
                                type="text" 
                                placeholder='City' 
                                value={city}
                                onChange={e => setCity(e.target.value)}
                                />
                            </div>
                            <div className='grid-right-container-input-bottom'>
                                <input 
                                type="text" 
                                placeholder='State' 
                                value={state}
                                onChange={e => setState(e.target.value)}
                                />
                                <input 
                                type="text" 
                                placeholder='Zip code' 
                                value={zipCode}
                                onChange={e => setZipCode(e.target.value)}
                                />
                            </div>
                        </form>
                        <div>
                            <MapBox style={containerStyle} latitude={latitude} longitude={longitude} />
                        </div> 
                    </div>
                </div>
                <div className='button-layout'>
                    <div className="button-container-div">
                        <NavLink
                            style={{color:'rgb(34,34,34)', fontWeight:'600', fontSize:'18px'}}
                            to='/createListing'
                            >
                                Back
                        </NavLink>
                        {address && city && state && zipCode ? (
                            <div className='addressform-nextpage-button-wrapper'>
                                <NavLink
                                style={{ 
                                    textDecoration:'none',
                                    color: 'white',
                                    cursor:'pointer'
                                }}
                                onClick={handleClickingNext}
                                to='/createListing-bedGuestForm'
                                >
                                    Next
                                </NavLink>
                            </div>
                            ) : (
                            <div className='addressform-nextpage-button-wrapper-disabled'>
                                <div
                                style={{ 
                                    color: 'white',
                                    cursor:'pointer'
                                }}
                                >
                                    Next
                                </div>
                            </div>)
                        }
                    </div>
                </div>          
            </section>
        </div>
    )
};