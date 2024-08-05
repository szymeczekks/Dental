import { HeaderPanel } from "../../components/Layout/HeaderPanel";
import { formAddEmployee } from "../../utilities/forms";
import { CabinetContext } from '../../Context/Cabinet';
import { useContext } from "react";
import { Form } from "../../components/Form/Form";
import { RenderInputs } from "../../components/Form/renderInputs";

export function AddEmployee() {
    const { cabinet } = useContext(CabinetContext);
    const header = "Dodaj pracownika";
    const subheader = "Tutaj możesz dodać pracownika";

    const updateInfo = (response) => {
        console.log(response);
    }

    return (
        <HeaderPanel header={header} subheader={subheader}>
            <Form path="/addEmployee" objID={cabinet?.id} update={updateInfo} >
                <RenderInputs inputs={formAddEmployee}/>
            </Form>
        </HeaderPanel>
    )
}