import { useContext, useEffect, useState } from "react";
import { HeaderPanel } from "../../components/Layout/HeaderPanel";
import axios from "axios";
import { VisitsList } from "../../components/VisitsList";
import { CabinetContext } from "../../Context/Cabinet";

export function VisitsPlanned() {
    const header = "Wizyty zaplanowane";
    const subheader = "Tutaj możesz zarządzać przyszłymi wizytami";
    const [ visits, setVisits ] = useState(null);
    const { cabinet } = useContext(CabinetContext);

    useEffect(() => {
        axios(`/get-reservations/cabinet/${cabinet?.id}`)
        .then( response => {
            setVisits(response.data
                .filter( visit => {return new Date(visit.date).getTime() > new Date().getTime()})
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
        })
        .catch( err => {
            console.log(err.response.data);
        })
    }, []);
    
    return (
        <HeaderPanel header={header} subheader={subheader}>
            {visits && <VisitsList visits={visits} />}
        </HeaderPanel>
    )
}