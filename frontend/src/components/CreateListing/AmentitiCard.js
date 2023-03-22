import { useState } from "react";

export function handleInitialSelect(localStorageKey, checkAgainst) {
    const listFromLocalStorage = localStorage.getItem(localStorageKey);
    if (listFromLocalStorage) {
        const convertToArr = listFromLocalStorage.split(',');
        const initialSelect = convertToArr.find(item => item.toLowerCase() === checkAgainst.toLowerCase()
        );
        return initialSelect !== undefined;
    } else {
        return false;
    };
};

export default function AmenitiCard({icon, amenity}) {  

    const [selected, setSelected] = useState(handleInitialSelect('amenityArr', amenity));


    const selectedStyle = {
        width:'132px',
        height:'140px',
        borderRadius:'15px',
        display:'flex', 
        flexDirection:'column',
        justifyContent:'center', 
        alignItems:'center', 
        cursor:'pointer',
        border: '2px solid black',
        backgroundColor: 'rgb(247,247,247)'
    }

    const unSelectedStyle = {
        width:'132px',
        height:'140px',
        borderRadius:'15px', 
        flexDirection:'column',               
        display:'flex', 
        justifyContent:'center', 
        alignItems:'center', 
        cursor:'pointer',
        border: '1px solid lightgray',
        backgroundColor:'white'
    }

    const handleSelected = () => {
        return selected ? setSelected(false) : setSelected(true);
    };

    return (
        <div 
            className="grid-right-inner-container-top-amentityForm-inner-block-amentiti-item"
            onClick={handleSelected}
            style={selected ? selectedStyle : unSelectedStyle}
        >
            <div>{icon}</div>
            <div style={{textAlign:"center"}}>{amenity}</div>
        </div>
    );
};