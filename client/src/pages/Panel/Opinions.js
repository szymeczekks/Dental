import { useContext, useEffect, useState } from "react";
import { HeaderPanel } from "../../components/Layout/HeaderPanel";
import axios from "axios";
import { CabinetContext } from '../../Context/Cabinet';
import { OpinionsList } from "../../components/OpinionsList";

export function Opinions() {
    const header = "Opinie";
    const subheader = "Tutaj możesz zarządzać opiniami o Twoim gabinecie";
    const { cabinet } = useContext(CabinetContext);
    const [ opinions, setOpinions ] = useState(null);

    useEffect(() => {
        axios.get(`/get-opinions/${cabinet?.id}`)
        .then( response => {
            setOpinions(response.data);
            console.log(response.data);
        })
        .catch( err => {
            console.log(err);
        })
    }, []);
    
    return (
        <HeaderPanel header={header} subheader={subheader}>
            {opinions ? <OpinionsList opinions={opinions} purpose="admin" /> : 'Loading...'}
        </HeaderPanel>
    )
}