import {useState, useEffect} from "react";
import "./editListing.css";

function EditCategory({categoryArr, setCategoryArr}) {

    const [allCategory, setAllCategory] = useState([]);
    const [unSelected, setUnselected] = useState([]);

    useEffect(() => {
        fetch("/api/categories")
        .then(res => res.json())
        .then(data => setAllCategory(data.map(c => c.name)))
    },[])

    
    useEffect(() => {
        const convertToLower = categoryArr.map(c => c.toLowerCase());
        const unselected =  allCategory.filter(c => !convertToLower.includes(c.toLowerCase()));
        const removeDup = new Set(unselected)
        setUnselected([...removeDup]);
    }, [categoryArr.length, setUnselected.length])

    const removeCategory = (categoryIdx, category) => {
        setCategoryArr(prev => {
            const newCategoryArr = [...prev];
            newCategoryArr.splice(categoryIdx, 1);
            return newCategoryArr;
        });
    };

    const addCateogy = (category) => {
        setCategoryArr(prev => {
            const newCategoryArr = [...prev];
            newCategoryArr.push(category);
            return newCategoryArr;
        });
    };

    return (
        <div>
            <h5>You have the following categories selected</h5>

            <div className="edit-amenity-section">
                {categoryArr.map((category, idx) => (
                    <div className="edit-amenity-selection"
                    key={category} onClick={removeCategory} > 
                        <div>{category.toLowerCase()}</div>
                        <div className="operator-icon">-</div>
                    </div>
                ))}
            </div>

            <h5>Select more categories to your listing</h5>
            <div className="edit-amenity-section">
                {unSelected.map((category, idx) => (
                    <div className="edit-amenity-selection" key={category} onClick={() => addCateogy(category)} >
                        <div>{category.toLowerCase()}</div>
                        <div className="operator-icon">+</div>
                    </div>
                    
                ))}
            </div>
        </div>
    )
};

export default EditCategory;