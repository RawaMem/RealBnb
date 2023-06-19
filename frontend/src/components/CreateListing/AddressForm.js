import './createListing.css';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { csrfFetch } from '../../store/csrf';
import { NavLink } from 'react-router-dom';
import { getToken } from '../../store/maps';
import { GeoLocationMap } from '../Maps/GeoLocationMap';


export default function AddressForm() {
    const dispatch = useDispatch();
    const [address, setAddress] = useState('');
    const [inputVal, setInputVal] = useState(localStorage.getItem('addressInputVal') || '');
    const [city, setCity] = useState(localStorage.getItem('city') || '');
    const [state, setState] = useState(localStorage.getItem('state') || '');
    const [zipCode, setZipCode] = useState(localStorage.getItem('zipCode') || '');
    const [longitude, setLongitude] = useState(localStorage.getItem('lng') || 40.7128);
    const [latitude, setLatitude] = useState(localStorage.getItem('lat') || 74.0060);
    const optinalAddress = useRef(null);
    const [suggestions, setSuggestions] = useState([]);
    const token = useSelector((state) => state.maps.token);

    useEffect(() => {
        if(!token) dispatch(getToken());
    }, [dispatch]);

    function handleClickingNext() {

        if (optinalAddress.current.value) {
            setAddress(optinalAddress.current.value + address)
            localStorage.setItem('address', address);
            localStorage.setItem('optinalAddress', optinalAddress.current.value);
        } else {
            localStorage.setItem('optinalAddress', '');
        }; 

        localStorage.setItem('addressInputVal', inputVal);
        localStorage.setItem('city', city);
        localStorage.setItem('state', state);
        localStorage.setItem('zipCode', zipCode);
        localStorage.setItem('lat', latitude);
        localStorage.setItem('lng', longitude)
    };

    const containerStyle = {
        width: '90%',
        height: '95%',
    };

    const handleChange = async (event) => {

        setInputVal(event.target.value);
        try {
            const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${event.target.value}.json?access_token=${token}&autocomplete=true`;
    
            const response = await csrfFetch(endpoint);
            const results = await response.json();
            setSuggestions(results.features);
        } catch(e) {
            console.log('Error fetching data', e);
        }  
    };
    
    if(!token) return null;

    return (
        <div className="form-container">
            <section className="address-form-left-section">
                <span className='word-section-1'>Where's your place located?</span>
            </section>
                          
            <section className="right-section-container">
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
                                                        setLatitude(suggestion.geometry.coordinates[1])
                                                        setLongitude(suggestion.geometry.coordinates[0])
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
                                    defaultValue={localStorage.getItem('optinalAddress') || ''}
                                    ref={optinalAddress}
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
                            <GeoLocationMap style={containerStyle} latitude={latitude} longitude={longitude} />
                        </div> 
                    </div>
                </div>
                <div className='button-layout'>
                    <div className="button-container-div">
                        <NavLink
                            style={{color:'rgb(34,34,34)', fontWeight:'600', fontSize:'18px'}}
                            to='/createListing/introduction'
                            onClick={handleClickingNext}
                            >
                                Back
                        </NavLink>
                        {inputVal && city && state && zipCode ? (
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