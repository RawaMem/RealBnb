import { useState, useEffect } from "react";

export default function AmenitiCard({icon, amenity}) {   
    const selectedAmenity = localStorage.getItem('amenityArr').split(',');
    const initialSelect = selectedAmenity.filter(item => {
        return item.toLowerCase() === amenity.toLowerCase()
    })
    const [selected, setSelected] = useState(initialSelect.length > 0);


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