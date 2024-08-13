import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

const CabinetsListContext = createContext();
const { Provider } = CabinetsListContext;

const CabinetsListProvider = ({ children }) => {
    const [ cabinets, setCabinets ] = useState(null);
    const [ filters, setFilters ] = useState([]);

    useEffect(() => {

        axios.get('/get-cabinets')
        .then( response => {
            setCabinets(response.data);
            setFilters(response.data);
        })
        .catch( err => {
            console.log(err.response.data);
        })

    }, []);

    return (
        <Provider value={{
            cabinets,
            setCabinets,
            filters,
            setFilters
        }}>
            {children}
        </Provider>
    )
}
export { CabinetsListContext, CabinetsListProvider }