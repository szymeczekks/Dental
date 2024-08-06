import { SplitPanel } from '../../components/Layout/SplitPanel';
import { useEffect, useState } from "react";
import axios from 'axios';
import { CabinetListItem } from '../../components/Main/CabinetListItem';

function Home() {
    const [ cabinets, setCabinets ] = useState(null);

    const Left = () => <>Filters</>;
    const Right = () => <>
    {cabinets ? 
    cabinets.map(cabinet => {
        return <CabinetListItem key={cabinet.id} item={cabinet}/> 
    })
    : 'Loading...'}
    </>;

    useEffect(() => {

        axios.get('/get-cabinets')
        .then( response => {
            setCabinets(response.data);
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