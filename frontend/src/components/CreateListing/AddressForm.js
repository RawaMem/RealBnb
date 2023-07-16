import './createListing.css';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { csrfFetch } from '../../store/csrf';
import { NavLink } from 'react-router-dom';
import { getToken } from '../../store/maps';
import { GeoLocationMap } from '../Maps/GeoLocationMap';
import InputField from '../../ui/TextField';


export default function AddressForm() {
    const dispatch = useDispatch();
    const [address, setAddress] = useState('');
    const [inputVal, setInputVal] = useState(localStorage.getItem('addressInputVal') || '');
    const [city, setCity] = useState(localStorage.getItem('city') || '');
    const [state, setState] = useState(localStorage.getItem('state') || '');
    const [zipCode, setZipCode] = useState(localStorage.getItem('zipCode') || '');
    const [longitude, setLongitude] = useState(Number(localStorage.getItem('lng')) || -74.0060);
    const [latitude, setLatitude] = useState(Number(localStorage.getItem('lat')) || 40.7128);
    const optinalAddress = useRef(null);
    const [suggestions, setSuggestions] = useState([]);
    const [displayedSuggestions, setDisplayedSuggestions] = useState([]);
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
        localStorage.setItem('lat', String(latitude));
        localStorage.setItem('lng', String(longitude))
    };

    const containerStyle = {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        filter: "brightness(90%)"
    };

    useEffect(() => {
        let timerId = null;
        if (suggestions && suggestions.length > 0) {
          timerId = setTimeout(() => {
            setDisplayedSuggestions(suggestions);
          }, 500); 
        }
    
        return () => {
          if (timerId) {
            clearTimeout(timerId);
          }
        };
      }, [suggestions]);

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

        if(!event.target.value.length) setDisplayedSuggestions([]);
    };

    
    
    if(!token) return null;

    return (
        <div className="form-container">
            <section className="left-section-container">
                <GeoLocationMap 
                    style={containerStyle} 
                    latitude={latitude} 
                    longitude={longitude}
                    zoom={12} 
                    />
            </section>
                          
            <section className="right-section-container">
                <div className='addressForm-content-container'>   
                    <div className='grid-right-inner-page'>
                        <form>
                            <h3>Confirm your address</h3>
                            <div id="address-input">
                                <div className='address-form-input-field-container-search'> 
                                        <input 
                                        placeholder='Street'
                                        type='text' 
                                        value={inputVal} 
                                        onChange={handleChange} 
                                        className='address-form-address'
                                        />
                                        <div className='material-symbols-search-grey-container'>
                                            <span 
                                                className="material-symbols-outlined"
                                                id="material-symbols-search-grey"
                                            >
                                                search
                                            </span>
                                        </div>
                                            {displayedSuggestions?.length > 0 && 
                                                (<div className='address-suggestion-container'>
                                                    {displayedSuggestions.map(suggestion => (
                                                        <div 
                                                            className='suggestion-location-container'
                                                            key={suggestion.place_name} 
                                                            onClick={() => {
                                                             
                                                                setLatitude(suggestion.geometry.coordinates[1])
                                                                setLongitude(suggestion.geometry.coordinates[0])
                                                                setAddress(suggestion.place_name)
                                                                setDisplayedSuggestions([])
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
                            </div>

                            <div className='address-form-input-field-container'>
                                <input 
                                    type="text" 
                                    placeholder='Apt, suite, etc. (Optional)' 
                                    defaultValue={localStorage.getItem('optinalAddress') || ''}
                                    ref={optinalAddress}
                                    className='optional-address-input'
                                />
                            </div>
                            
                            <div className='address-form-input-field-city-state'>
                                <div>
                                    <InputField 
                                        size={{ m: 3, width: "15ch"}}
                                        setter={setCity}
                                        val={city}
                                        label={"City"}
                                        id={"standard-basic"}
                                        multiline={false}
                                        variant={"standard"}
                                        labelFontSize={"20px"}
                                    />
                                </div>

                                <div>
                                    <InputField 
                                        size={{ m: 3, width: "15ch"}}
                                        setter={setState}
                                        val={state}
                                        label={"State"}
                                        id={"standard-basic"}
                                        multiline={false}
                                        variant={"standard"}
                                        labelFontSize={"20px"}
                                    />
                                </div>
                            </div>
                            <div className='address-form-input-field-zipcode'>
                                <InputField 
                                    size={{ m: 3, width: "25ch"}}
                                    setter={setZipCode}
                                    val={zipCode}
                                    label={"Zip code"}
                                    id={"standard-basic"}
                                    multiline={false}
                                    variant={"standard"}
                                    labelFontSize={"20px"}
                                />
                            </div>
                        </form>
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
                                    cursor:'not-allowed'
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