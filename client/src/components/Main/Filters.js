import { useEffect, useState } from "react";
import { FilterSearch } from './FilterSearch';
import { CabinetsListContext } from '../../Context/CabinetsList';
import { useContext } from "react";

export function Filters() {
    const { cabinets, setCabinets, setFilters, filters } = useContext(CabinetsListContext);
    const [ cities, setCities ] = useState(null);
    const [ names, setNames ] = useState(null);

    useEffect(() => {
        const cities_arr = cabinets?.map( cabinet => { return cabinet.city } );
        setCities( [...new Set(cities_arr)] );
        const names_arr = cabinets?.map( cabinet => { return cabinet.name } );
        setNames( [...new Set(names_arr)] );

        console.log(cabinets);
        console.log(cities);
    }, [cabinets]);

    function handleReset() {
        setFilters(cabinets);
    }

    return (
        <>
            <FilterSearch data={cities} label="Miejscowość" param="city"/>
            <FilterSearch data={names} label="Nazwa" param="name"/>
            <button onClick={handleReset}>Wyczyść filtry</button>
        </>
    );
}