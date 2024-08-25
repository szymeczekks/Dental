import axios from "axios";
import { HeaderPanel } from "../../components/Layout/HeaderPanel";
import { useContext, useEffect, useState } from "react";
import { AddItemContainer } from "../../components/AddItem/AddItemContainer";
import { CabinetContext } from "../../Context/Cabinet";
import { Form } from "../../components/Form/Form";
import { RenderInputs } from "../../components/Form/renderInputs";

export function AddServices() {
    const [ services, setServices ] = useState(null);
    const { cabinet } = useContext(CabinetContext);
    const header = "Dodaj usługi";
    const subheader = "Tutaj możesz dodać usługi do swojego gabinetu";

    const formTemplate = [
        [
            {
                id: "service",
                type: "select",
                name: "Nazwa usługi",
                options: services,
                config: {
                    required: "Podaj nazwę usługi"
                }
            },
            {
                id: "description",
                placeholder: "Opis usługi",
                type: "text",
                label: "Opis",
                config: {
                    required: "Podaj opis usługi"
                }
            }
        ],
        [
            {
                id: "price",
                placeholder: "100.00",
                type: "number",
                label: "Cena",
                config: {
                    required: "Podaj cenę usługi"
                }
            },
            {
                id: "duration",
                placeholder: "45",
                type: "number",
                label: "Czas trwania (w minutach)",
                config: {
                    required: "Podaj czas trwania usługi"
                }
            }

        ]
    ]

    useEffect(() => {
        axios.get(`/getServicesAvailable/${cabinet?.id}`)
        .then(response => {
            console.log(response);
            let servicesArr = 
            response.data.data.map((service) => (
                {
                    id: service.toLowerCase(),
                    name: service
                }
            ));
            setServices(servicesArr);
        })
        .catch(err => {
            console.log(err);
        })
    }, []);
    
    
    return (
        <HeaderPanel header={header} subheader={subheader}>
            <Form path="/add-services" objID={cabinet?.id} update={() => {}} >
                <RenderInputs inputs={formTemplate}/>
            </Form>
        </HeaderPanel>
    )
}