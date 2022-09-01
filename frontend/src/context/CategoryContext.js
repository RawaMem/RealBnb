import { createContext, useContext, useState } from "react";

export const CategoryContext = createContext();

export const useCategory = () => useContext(CategoryContext);

export default function CategoryProvider( {children} ) {
    const [categories, setCategories] = useState(null);
    const [sorted, setSorted] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    return (
        <CategoryContext.Provider
            value={{
                categories, 
                setCategories,
                sorted, 
                setSorted,
                selectedCategory, 
                setSelectedCategory
            }}
        >
            {children}
        </CategoryContext.Provider>
    );
};