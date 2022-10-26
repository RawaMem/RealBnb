import './createListing.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getToken, getKey } from '../../store/maps';
import Maps from '../Maps/Maps';
import { useListing } from '../../context/ListingContext';


export default function AddressForm() {
    const { address, setAddress, inputVal, setInputVal, city, setCity, state, setState, zipCode, setZipCode,setLongitude, setLatitude, latitude, longitude } = useListing();

    const token = useSelector((state) => state.maps?.token);
    const apiKey = useSelector((state) => state.maps?.key);

    const dispatch = useDispatch();
    const [optionalAdd, setOptionalAdd] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [coordinates, setCoordinates] = useState('');
    const [initialAutoFill, setInitialAutoFill] = useState(false);

    useEffect(() => {
        setInputVal(localStorage.getItem('addressInputVal'));
        setCity(localStorage.getItem('city'));
        setState(localStorage.getItem('state'));
        setZipCode(localStorage.getItem('zipCode'));
        const lng = localStorage.getItem('lng');
        const lat = localStorage.getItem('lat');
        setCoordinates([+lng, +lat])
        setInitialAutoFill(true);

        return () => setInitialAutoFill(false);
    },[])

    useEffect(() => {
        localStorage.setItem('addressInputVal', inputVal);
        localStorage.setItem('city', city);
        localStorage.setItem('state', state);
        localStorage.setItem('zipCode', zipCode);
        localStorage.setItem('lat', latitude);
        localStorage.setItem('lng', longitude)
    },[address,city, state, zipCode, latitude, longitude])
    
    useEffect(() => {
        if(!token) dispatch(getToken());
        if(!apiKey) dispatch(getKey());
    }, [dispatch, token, apiKey]);
    
    const containerStyle = {
        width: '300px',
        height: '300px',
      };

    const handleChange = async (event) => {

        setInputVal(event.target.value);
        try {
            const endpoint = `http://api.mapbox.com/geocoding/v5/mapbox.places/${event.target.value}.json?access_token=${token}&autocomplete=true`;
    
            const response = await fetch(endpoint);
            const results = await response.json();
            setSuggestions(results?.features);
        } catch(e) {
            console.log('Error fetching data', e);
        }  
    };

    let lng;
    let lat;
    if(coordinates.length) {
        [lng, lat] = coordinates;
        setLatitude(lat);
        setLongitude(lng);
    };


    if(!inputVal) {
        setCity('');
        setState('');
        setZipCode('');
    };
    
    // handleAddOptionalAddress needs editing
    const handleAddOptionalAddress = async (event) => {
        await setOptionalAdd(e => setOptionalAdd(event.target?.value))
        if(optionalAdd) {
            setAddress(address+' '+optionalAdd)
        };
    };

    if(!token || !apiKey || !initialAutoFill ) return null;

    return (
        <div className="address-form-container">
            <section className="grid-left-container">
                <span className='word-section-1'>Where's your place located?</span>
            </section>
                          
            <section className="grid-right-container">
                <div className='grid-right-inner-container'>   
                    <div className='grid-right-inner-page'>
                        <form>
                            <h3>Confirm your address</h3>
                            <div className='grid-right-container-input'>
                                <input 
                                placeholder='Street'
                                type='search' 
                                value={inputVal} 
                                onChange={handleChange} 
                                />
                                {suggestions?.length > 0 && 
                                    suggestions.map((suggestion, idx) => (
                                        <div 
                                            key={idx} 
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
                                    )
                                    )    
                                }
                                </div>
                            <div className='grid-right-container-input'>
                                <input 
                                    type="text" 
                                    placeholder='Apt, suite, etc. (Optional)' 
                                    defaultValue=''
                                    onBlur={handleAddOptionalAddress}
                                />
                            </div>
                            <div className='grid-right-container-input'>
                                <input 
                                type="text" 
                                placeholder='City' 
                                value={city}
                                onClick={() => setHandleAutoFillCity(true)}
                                onChange={e => setCity(e.target.value)}
                                />
                            </div>
                            <div className='grid-right-container-input-bottom'>
                                <input 
                                type="text" 
                                placeholder='State' 
                                value={state}
                                onClick={() => setHandleAutoFillState(true)}
                                onChange={e => setState(e.target.value)}
                                />
                                <input 
                                type="text" 
                                placeholder='Zip code' 
                                value={zipCode}
                                onClick={() => setHandleAutoFillZip(true)}
                                onChange={e => setZipCode(e.target.value)}
                                />
                            </div>
                        </form>
                        <div>
                            <Maps coordinates={coordinates} containerStyle={containerStyle} apiKey={apiKey} />    
                        </div> 
                    </div>
                </div>
                <div className='button-layout'>
                    <NavLink
                        style={{ color: 'black', fontSize: '20px',cursor:'pointer'}}
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
            </section>
        </div>
    )
};