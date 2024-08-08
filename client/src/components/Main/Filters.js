import { useEffect, useState } from "react";
import { FilterSearch } from './FilterSearch';

export function Filters({ setters }) {
    const [ cities, setCities ] = useState(null);

    useEffect(() => {
        const cities_arr = setters.cabinets.get?.map( cabinet => { return cabinet.city } );
        setCities( [...new Set(cities_arr)] );
    }, []);

    function handleReset() {
        setters.cabinets.set(setters.cabinets.get);
    }

    return (
        <>
            <FilterSearch data={cities} label="Miejscowość" update={setters.cabinets} param="city"/>
            <button onClick={handleReset}>Wyczyść filtry</button>
        </>
    );
}