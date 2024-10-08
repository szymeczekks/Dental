import { useContext, useEffect, useState } from "react";
import { HeaderPanel } from "../components/Layout/HeaderPanel";
import { AuthContext } from './../Context/Auth';
import axios from "axios";
import { VisitsList } from "../components/VisitsList";

export function Visits() {
    const { authState: { userInfo, token, expiresAt }, setAuthState } = useContext(AuthContext);
    const header = "Wizyty";
    const subheader = "Tutaj znajdziesz informację o swoich wizytach";
    const [ visits, setVisits ] = useState(null);

    useEffect(() => {
        axios(`/get-reservations/user/${userInfo?.id}`)
        .then( response => {
            console.log(response.data);
            setVisits(response.data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
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