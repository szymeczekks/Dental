import { Form } from "../../components/Form/Form";
import { HeaderPanel } from "../../components/Layout/HeaderPanel";
import { formInformations } from "../../utilities/forms";
import { CabinetContext } from '../../Context/Cabinet';
import { useContext } from "react";
import { RenderInputs } from "../../components/Form/renderInputs";

export function Informations() {
    const { cabinet, setCabinet } = useContext(CabinetContext);
    const header = "Informacje";
    const subheader = "Tutaj możesz zarządzać informacjami na temat Twojego gabinetu";
    // const {name, id} = cabinet;

    const updateInfo = (response) => {
        setCabinet(prev => ({...prev, name: response.name}));
    }
    return (
        <HeaderPanel header={header} subheader={subheader}>
            <Form values={{name: cabinet?.name}} path="/updateCabinet" objID={cabinet?.id} update={updateInfo} >
                <RenderInputs inputs={formInformations}/>
            </Form>
        </HeaderPanel>
    )
}