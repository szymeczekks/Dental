import { useEffect, useState, useContext } from "react";
import { CabinetsListContext } from '../../Context/CabinetsList';

export function FilterSearch({ data, label, param }) {
    const [ typed, setTyped ] = useState('');
    const [ itemsSearched, setItemsSearched ] = useState(null);
    const [ expanded, setExpanded ] = useState(false);
    const { cabinets, setCabinets, setFilters, filters } = useContext(CabinetsListContext);

    console.log(data);

    function handleSearch(e) {
        console.log(filters);
        const value = e.target.value;
        setTyped(value);
        console.log(data);
        if ( value.length === 0 ) return setExpanded(false);

        const searched_items = data.filter( item => item.toLowerCase().includes(value.toLowerCase()) );
        if ( searched_items.length === 0 ) return setExpanded(false);
        setItemsSearched(searched_items);

        if ( value.length > 0 ) setExpanded(true);
    }

    function handleSelect(e) {
        console.log(e.target.innerHTML);
        
        setFilters(cabinets.filter(item => {return item[param] === e.target.innerHTML}));
        setExpanded(false);
        setTyped(e.target.innerHTML);
    }

    return (
        <div className="d-f fd-c ai-s f-1 gap-s p-r">
            <label>{label}</label>
            <input type="search" className="input shadow-m" value={typed} onChange={handleSearch}></input>
            <div className={`select_wrapper ${expanded && 'expanded'}`}>
                <div className="select_height">
                    {itemsSearched?.map(item => {return <p onClick={handleSelect} key={item}>{item}</p>})}
                </div>
            </div>
        </div>
    );
}