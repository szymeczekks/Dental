
import { useState, useEffect, useContext } from 'react';
import { CabinetContext } from '../../Context/Cabinet';
import axios from 'axios';
import { SidePanel } from '../../components/Layout/LeftNavigation';
import { ListElement } from '../../components/ListElement';
import { AuthContext } from '../../Context/Auth';
import { SplitPanel } from '../../components/Layout/SplitPanel';
import { Outlet } from 'react-router-dom';

function Panel() {
    const { authState: { userInfo } } = useContext(AuthContext);
    const { cabinet, setCabinet } = useContext(CabinetContext);

    useEffect(() => {
        axios.get(`/get-users-cabinet/${userInfo.id}`)
            .then(response => {
                if (JSON.stringify(response.data) !== JSON.stringify(cabinet)) {
                    setCabinet(response.data);
                }
            })
            .catch(err => {
                console.log(err);
                console.log(err.response.data);
            });
    }, []);

    const Left = () =>
        <SidePanel object={cabinet}>
            <ListElement name="Pracownicy" dropdown={[{name:"Edytuj pracownika", path:"edit-employee"}, {name: "Dodaj pracownika", path: "add-employee"}]} />
            <ListElement name="Usługi" dropdown={[{name:"Dodaj usługi", path: "add-services"}, {name: "Edytuj usługi", path: "edit-services"}]} />
            <ListElement name="Informacje" path="informations" />
            <ListElement name="Dostępności" path="accessibility" />
            <ListElement name="Opinie" path="opinions" />
            <ListElement name="Wizyty" dropdown={[{name: "Wizyty zaplanowane", path: "visits-planned"}, {name: "Wizyty do akceptacji", path: "visits-to-accept"}, {name: "Historia wizyt", path: "history-of-visits"}]} />
        </SidePanel>;
    const Right = () => <Outlet/>

    return (
        <SplitPanel right={<Right/>} left={<Left/>} />
    );
}

export default Panel;