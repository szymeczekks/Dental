import { SplitPanel } from '../../components/Layout/SplitPanel';
import { useEffect, useState } from "react";
import axios from 'axios';
import { CabinetListItem } from '../../components/Main/CabinetListItem';
import { Filters } from '../../components/Main/Filters';

function Home() {
    const [ cabinets, setCabinets ] = useState(null);
    const [ filters, setFilters ] = useState([]); 

    console.log(1);

    const setters = {
        cabinets: {
            get: cabinets,
            set: setFilters
        }
    }

    const Left = () => <Filters setters={setters} />;
    const Right = () => <>
    {filters ? 
    filters.map(filter => {
        return <CabinetListItem key={filter.id} item={filter}/> 
    })
    : 'Loading...'}
    </>;

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
        <SplitPanel right={<Right/>} left={<Left/>} />
    )
}
export default Home;