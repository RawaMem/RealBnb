import './createListing.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getKey, getToken } from '../../store/maps';
import Maps from '../Maps/Maps';
import { NavLink } from 'react-router-dom';

export default function AddressForm({address, setAddress, city, setCity, state, setState, zipCode, setZipCode, setLongitude, setLatitude, setPage}) {
    const key = useSelector((state) => state.maps?.key);
    const token = useSelector((state) => state.maps?.token);
    const dispatch = useDispatch();
    const [optionalAdd, setOptionalAdd] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [coordinates, setCoordinates] = useState('');
    const [inputVal, setInputVal] = useState('')
    const [handleAutoFillCity, setHandleAutoFillCity] = useState(false);
    const [handleAutoFillState, setHandleAutoFillState] = useState(false);
    const [handleAutoFillZip, setHandleAutoFillZip] = useState(false);
    console.log('address from addressForm----------', city);
    useEffect(() => {
        if (!key) {
            dispatch(getKey());
        }
        if(!token) dispatch(getToken());

    }, [dispatch, key, token]);

    const handleChange = async (event) => {
        setInputVal(event.target.value);
        setHandleAutoFillCity(false);
        setHandleAutoFillState(false);
        setHandleAutoFillZip(false);
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

    if(address) {
        let addressArr = address?.split(', ');
        let stateZip = addressArr[2]?.split(' ');                
        if(addressArr.length && !handleAutoFillCity) setCity(addressArr[1]);
        if(stateZip.length && !handleAutoFillState) setState(stateZip[0]);
        if(stateZip.length && !handleAutoFillZip) setZipCode(stateZip[1]);
    } 
    if(!inputVal) {
        setCity('');
        setState('');
        setZipCode('');
    };

    const handleAddOptionalAddress = async (event) => {
        await setOptionalAdd(e => setOptionalAdd(event.target?.value))
        if(optionalAdd) {
            setAddress(address+' '+optionalAdd)
        };
    };

    if(!key) return null;
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
                            <Maps apiKey={key} coordinates={coordinates} />    
                        </div> 
                    </div>
                </div>
                <div className='button-layout'>
                    <div
                        style={{ color: 'black', fontSize: '20px',cursor:'pointer'}}
                        onClick={() => setPage(1)}
                        >
                            Back
                    </div>
                    {address && city && state && zipCode ? (
                        <div className='addressform-nextpage-button-wrapper'>
                            <div
                            style={{ 
                                color: 'white',
                                cursor:'pointer'
                            }}
                            onClick={() => setPage(3)}
                            >
                                Next
                            </div>
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