import { useContext, useEffect, useState } from "react";
import { HeaderPanel } from "../../components/Layout/HeaderPanel";
import axios from "axios";
import { CabinetContext } from "../../Context/Cabinet";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { ManageableListItem } from "../../components/ManageableListItem";

export function EditServices() {
    const { cabinet } = useContext(CabinetContext);
    const [ services, setServices ] = useState(null);
    const location = useLocation();
    const header = "Edytuj usługi";
    const subheader = "Tutaj możesz zarządzać usługami";

    function handleDelete(service) {
        axios.get(`/delete-service/${service.id}`)
        .then(response => {
            console.log(response);
            setServices(services.filter(e => e.id !== service.id));
        })
        .catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {
        cabinet && 
        axios.get(`/get-cabinet-services/${cabinet.id}`)
        .then(response => {
            setServices(response.data.data);
        })
        .catch(err => {
            setServices(0);
            console.log(err);
        })
    }, []);
    
    return (
        (location.pathname === '/panel' || location.pathname === '/panel/edit-services') ? (
            <HeaderPanel header={header} subheader={subheader}>
                {
                    services ? 
                    services.map(service => {
                        return <ManageableListItem key={service.id} item={{ header: service.name , id: service.id }} path='/panel/edit-services' delete_function={() => handleDelete(service)} missing_items={{price: service.price}}/>
                    }) : services === 0 ? <>Nie znaleziono usług</> : <>Loading...</>
                }
            </HeaderPanel>
        ) : (<Outlet/>)
    )
}