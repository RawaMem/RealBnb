import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { csrfFetch } from '../../store/csrf';
import { getListingsThunk } from '../../store/listings';
import ListingCard from './ListingCard';


export default function Listings() {
    const dispatch = useDispatch();
    const listingsObj = useSelector(state => state.listings);

    const [categories, setCategories] = useState(null);
    const [sorted, setSorted] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [ query, setQuery ] = useState('');
    const [ search, setSearch] = useState(false);

    let listings = handleListingsDisplay();


    function removeSpacePunc(str) {
        let removeSpace = str.replace(/\s/g,'');
        let removePunc = removeSpace.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()']/g,"");
        return removePunc.toLowerCase();
    };


    function handleSearch() {
        if(listingsObj) {
            let listingsToDisplay = Object.values(listingsObj);
            let searchResult = [];
            listingsToDisplay.map(list => {
                let city = removeSpacePunc(list.city);
                let state = removeSpacePunc(list.state);
                let name = removeSpacePunc(list.name);
                let checkedQuery = removeSpacePunc(query);
                let checkedLists = [city, state, name];
                for (let checkList of checkedLists) {
                    if(checkList.indexOf(checkedQuery) !== -1 && checkList.startsWith(checkedQuery)) {
                        searchResult.push(list);
                        break;
                    }
                }
            })
            return searchResult;
        }
    }


    function handleSearchSubmit(e) {
        e.preventDefault();
        if(!query) return;
        setSearch(true);
        setSorted(false);
    }

    function handleListingsDisplay() {
        if(listingsObj) {
            let listingsToDispaly = Object.values(listingsObj);
            if(sorted) {
                listingsToDispaly = listingsToDispaly.filter(listObj => {
                    let categoryArr = listObj.Categories;
                    for(let category of categoryArr) {
                        return category.name === selectedCategory;
                    };
                });
            }

            if(search) {
                listingsToDispaly = handleSearch();
            };
            return listingsToDispaly
        };
    };


    useEffect(() => {
        dispatch(getListingsThunk());
     }, [dispatch]);

    // fetch all categories
    useEffect( async() => {
       const response = await csrfFetch('/api/categories');
       if (response.ok) {
        setCategories(await response.json())
        }
    },[])

    // display all categories
    function displayCategories() {
        return categories && categories.map(category => (
            <div key={`categoryId-${category.id}`}>
                <div style={{marginRight:"10px", cursor:"pointer"}} onClick={() => {setSelectedCategory(category.name); setSorted(true); setSearch(false)}}>
                    {category.name}
                </div>
            </div>
        ))
    }

    if (!listings) return null

    return(
        <>

            <section style={{ padding: "3rem 0 3rem 3rem", width: "90vw", maxWidth: "var(--max-width)", margin: "5 auto"}}>
                <form style={{ display: "flex"}}>
                    <input
                    style={{ width: "50%", height: "35px" }}
                    type="text" placeholder='Where Search destinations'
                    value={query}
                    onChange={(e => setQuery(e.target.value))}
                    />
                    <button
                    type="submit"
                    onClick={handleSearchSubmit}
                    >
                        Search
                    </button>
                </form>
            </section>
            <section>
                <div style={{display:"flex"}}>
                    {displayCategories()}
                </div>
            </section>
            <section>
                <div style={{display:"flex", flexWrap: "wrap"}}>
                    {listings && listings.map(listing => (
                        <article key = {`listingId-${listing.id}`} style= {{margin:"15px"}} >
                            <NavLink style={{ textDecoration: 'none'}} to={`/listings/${listing.id}`}>
                                    <ListingCard listing = {listing} />
                            </NavLink>
                        </article>
                    ))}
                </div>
            </section>
        </>
    )
}
