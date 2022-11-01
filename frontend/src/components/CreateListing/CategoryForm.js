import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useListing } from "../../context/ListingContext";
import './createListing.css';
import CategoryCard from "./CategoryCard";


export default function CategoryForm() {
    const {categoryArr, setCategoryArr} = useListing();

    useEffect(() => {
        const categoriesStr = localStorage.getItem('categoryArr');
        const category = categoriesStr.split(',');
        const categoryFromLocalStorage = category.filter(item => item.length)
        setCategoryArr([...categoryFromLocalStorage]);
    },[])

    useEffect(() => {
        localStorage.setItem('categoryArr', categoryArr)
    },[categoryArr.length]);

    const handleOnClick = (category) => {
        if(categoryArr.includes(category)) {
            const categoryIdx = categoryArr.indexOf(category);
            return setCategoryArr(prevArr => {
                prevArr.splice(categoryIdx, 1);
                return [...prevArr]
            });
        } else {
            return setCategoryArr(prevArr => [...prevArr, category])
        }
    };


    return (
        <div className="form-container">
            <section className="category-left-section">
                <div className="category-word-section">
                    Which of these best describe your place?
                </div>
            </section>

            <section className="category-selection-container">
                <div className="category-content-container">
                    <div className="category-content" id="category-content">
                        <span onClick={() => handleOnClick('Beach')}>
                            <CategoryCard categoryName="Beach" />
                        </span>
                        <span onClick={() => handleOnClick('Skyscrapers')}>
                            <CategoryCard categoryName="Skyscrapers" />
                        </span>
                        <span onClick={() => handleOnClick('Iconic')}>
                        <CategoryCard categoryName="Iconic" /></span>
                        <span onClick={() => handleOnClick('Cities')}>
                        <CategoryCard categoryName="Cities" /></span>

                        <span onClick={() => handleOnClick('Amazing views')}>
                            <CategoryCard categoryName="Amazing views" /></span>

                        <span onClick={() => handleOnClick('Castles')}>
                            <CategoryCard categoryName="Castles" /></span>

                        <span onClick={() => handleOnClick('Wildlife')}>
                            <CategoryCard categoryName="Wildlife" /></span>

                        <span onClick={() => handleOnClick('Lakefront')}>
                            <CategoryCard categoryName="Lakefront" /></span>

                        <span onClick={() => handleOnClick('National parks')}>
                            <CategoryCard categoryName="National parks" /></span>

                        <span onClick={() => handleOnClick('Cabins')}>

                            <CategoryCard categoryName="Cabins" /></span>

                        <span onClick={() => handleOnClick('Islands')}>
                        <CategoryCard categoryName="Islands" /></span>

                        <span onClick={() => handleOnClick('Tiny homes')}>
                        <CategoryCard categoryName="Tiny homes" /></span>
                        <span onClick={() => handleOnClick('Camping')}>
                            <CategoryCard categoryName="Camping" /></span>
                        <span onClick={() => handleOnClick('Design')}>
                        <CategoryCard categoryName="Design" /></span>
                        <span onClick={() => handleOnClick('Amazing pools')}>
                            <CategoryCard categoryName="Amazing pools" /></span>
                        <span onClick={() => handleOnClick('Villa')}>
                            <CategoryCard categoryName="Villa" /></span>
                        <span onClick={() => handleOnClick('Townhouse')}>
                            <CategoryCard categoryName="Townhouse" /></span>
                        <span onClick={() => handleOnClick('Cottage')}>
                            <CategoryCard categoryName="Cottage" /></span>
                        <span onClick={() => handleOnClick('Houseboat')}>
                            <CategoryCard categoryName="Houseboat" /></span>
                        <span onClick={() => handleOnClick('Farm stay')}>
                            <CategoryCard categoryName="Farm stay" /></span>
                        <span onClick={() => handleOnClick('Vacation home')}>
                            <CategoryCard categoryName="Vacation home" /></span>
                    </div>
                </div>

                <div className="button-container">
                    <div className="button-container-div">
                        <Link to="/createListing-amenitiForm" style={{color:'rgb(34,34,34)', fontWeight:'600', fontSize:'18px'}}>Back</Link>
                        <Link 
                            className={categoryArr.length ? "edit-photo-modal-save-button" : "edit-photo-modal-save-button-disabled"}
                            style={{textDecoration:'none'}}
                            to="/createListing/images"
                        >
                            <div>Next</div>
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    );
};