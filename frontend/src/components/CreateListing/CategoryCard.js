import { useState } from "react";

export default function CategoryCard({categoryName}) {
    const selectedCategory = localStorage.getItem('categoryArr').split(',');
    const initialSelect = selectedCategory.filter(item => item.toLowerCase() === categoryName.toLowerCase());

    const [selected, setSelected] = useState(initialSelect.length > 0);

    const selectedStyle = {
        width:'132px',
        height:'132px',
        borderRadius:'15px',
        display:'flex', 
        flexDirection:'column',
        justifyContent:'center', 
        alignItems:'center', 
        cursor:'pointer',
        border: '2px solid black',
        backgroundColor: 'rgb(247,247,247)'
    };

    const unSelectedStyle = {
        width:'132px',
        height:'132px',
        borderRadius:'15px', 
        flexDirection:'column',               
        display:'flex', 
        justifyContent:'center', 
        alignItems:'center', 
        cursor:'pointer',
        border: '1px solid lightgray',
        backgroundColor:'white'
    };

    const handleSelected = () => {
        return selected ? setSelected(false) : setSelected(true);
    };

    return (
        <div 
        className="category-card-container"
        onClick={handleSelected}
        style={selected ? selectedStyle : unSelectedStyle}
        >
            {categoryName}
        </div>
    );
};