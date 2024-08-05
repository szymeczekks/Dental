import { useParams } from "react-router-dom";
import { HeaderPanel } from "../../components/Layout/HeaderPanel";
import { useEffect, useState } from "react";
import { formUpdateService } from "../../utilities/forms";
import axios from "axios";
import { Form } from "../../components/Form/Form";
import { RenderInputs } from "../../components/Form/renderInputs";

export function Service() {
    const { serviceId } = useParams();
    const [ service, setService ] = useState(null);
    const header = service?.name;
    const subheader = `Tutaj możesz zmienić informacje dotyczące usługi ${service?.name}`;

    useEffect(() => {
        console.log(serviceId);
        axios.get(`/get-service/${serviceId}`)
        .then(response => {
            console.log(response.data);
            setService(response.data)
        })
        .catch(error => {
            console.log(error);
        })
    }, []);

    const updateInfo = (response) => {
        console.log(response);
    }
    
    return service? (
        <HeaderPanel header={header} subheader={subheader}>
            <Form values={{price: service.price, description: service.description}} path="/update-service" objID={serviceId} update={updateInfo} >
                <RenderInputs inputs={formUpdateService}/>
            </Form>
        </HeaderPanel>
    ) : ('Loading...')
}