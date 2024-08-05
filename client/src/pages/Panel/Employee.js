import { useParams } from "react-router-dom";
import { HeaderPanel } from "../../components/Layout/HeaderPanel";
import { useEffect, useState } from "react";
import { formAddEmployee } from "../../utilities/forms";
import axios from "axios";
import { Form } from "../../components/Form/Form";
import { RenderInputs } from "../../components/Form/renderInputs";

export function Employee() {
    const { employeeId } = useParams();
    const [ employee, setEmployee ] = useState(null);
    const header = employee?.name;
    const subheader = `Tutaj możesz zmienić informacje dotyczące pracownika ${employee?.name}`;

    useEffect(() => {
        axios.get(`/get-employee/${employeeId}`)
        .then(response => {
            setEmployee(response.data)
        })
        .catch(error => {
            console.log(error);
        })
    }, []);

    const updateInfo = (response) => {
        console.log(response);
    }
    
    return employee? (
        <HeaderPanel header={header} subheader={subheader}>
            <Form values={employee} path="/updateEmployee" objID={employeeId} update={updateInfo} >
                <RenderInputs inputs={formAddEmployee}/>
            </Form>
        </HeaderPanel>
    ) : ('Loading...')
}