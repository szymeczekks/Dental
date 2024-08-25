import axios from "axios";
import { HeaderPanel } from "../../components/Layout/HeaderPanel";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import { CabinetContext } from '../../Context/Cabinet';
import { ManageableListItem } from "../../components/ManageableListItem";
import { Outlet } from "react-router-dom";

export function EditEmployee() {
    const { cabinet } = useContext(CabinetContext);
    const [ employees, setEmployees ] = useState(null);
    const header = "Edytuj pracownika";
    const subheader = "Tutaj możesz zmienić informacje dotyczące pracownika";
    const location = useLocation();

    function handleDelete(employee) {
        axios.get(`/delete-employee/${employee.id}`)
        .then(response => {
            setEmployees(employees.filter(e => e.id !== employee.id));
        })
        .catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {
        cabinet && 
        axios.get(`/get-employees/${cabinet.id}`)
        .then(response => {
            setEmployees(response.data);
        })
        .catch(err => {
            setEmployees(0);
            console.log(err);
        })
    }, []);
    
    
    return (
        (location.pathname === '/panel' || location.pathname === '/panel/edit-employee') ? (
            <HeaderPanel header={header} subheader={subheader}>
                {
                    employees ? 
                    employees.map(employee => {
                        return <ManageableListItem key={employee.id} item={{ header: employee.name }}>
                            <button><Link to={`/panel/edit-employee/${employee.id}`}>Edytuj</Link></button>
                            <button onClick={() => handleDelete(employee)}>Usuń</button>
                        </ManageableListItem>
                    }) : employees === 0 ? <>Nie znaleziono pracowników</> : <>Loading...</>
                }
            </HeaderPanel>
        ) : (<Outlet/>)
    )
}