import { useParams } from "react-router-dom";
import { HeaderPanel } from "../../components/Layout/HeaderPanel";
import { useEffect, useState } from "react";
import axios from "axios";
import { Form } from "../../components/Form/Form";
import { RenderInputs } from "../../components/Form/renderInputs";


export function Employee() {
    const { employeeId } = useParams();
    const [ employee, setEmployee ] = useState(null);
    const [ services, setServices ] = useState(null);
    const header = employee?.name;
    const subheader = `Tutaj możesz zmienić informacje dotyczące pracownika ${employee?.name}`;
    const formAddEmployee = [
        [
            {
                id: "name",
                type: "text",
                label: "Imię i nazwisko",
                config: {
                    required: "Podaj imie i nazwisko"
                }
            },
            {
                id: "position",
                type: "text",
                label: "Nazwa stanowiska",
                config: {
                    required: "Podaj nazwę stanowiska"
                }
            }
        ],
        [
            {
                id: "email",
                placeholder: "user@example.com",
                type: "email",
                label: "Email",
                config: {
                    required: "Podaj adres email",
                    pattern: {
                        value: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
                        message: "Niepoprawny adres email"
                    }
                }
            },
            {
                id: "phone",
                placeholder: "+48123123123",
                type: "text",
                label: "Numer telefonu",
                config: {
                    required: "Podaj numer telefonu",
                    pattern: {
                        value: /^[+][0-9]{9,15}$/,
                        message: "Niepoprawny numer telefonu"
                    }
                }
            }
        ],
        [
            {
                id: "town",
                type: "text",
                label: "Miejsce zamieszkania"
            },
            {
                id: "zip",
                placeholder: "00-999",
                type: "text",
                label: "Kod pocztowy",
                config: {
                    maxLength: {
                        value: 6,
                        message: "Kod pocztowy jest za długi"
                    },
                    pattern: {
                        value: /^\d{2}-\d{3}$/,
                        message: "Niepoprawny kod pocztowy"
                    }
                }
            }
        ],
        [
            {
                id: "street",
                type: "text",
                label: "Ulica"
            },
            {
                id: "building",
                type: "text",
                label: "Nr budynku / mieszkania"
            }
        ],
        [
            {
                id: "working_hours",
                type: "hours",
                label: "Godziny pracy"
            },
            {
                id: "employee_services",
                type: "select-multiple-tags",
                name: "Usługi pracownika",
                options: services
            }
        ]
    ]

    useEffect(() => {
        axios.get(`/get-employee/${employeeId}`)
        .then(response => {
            setEmployee(response.data)
        })
        .catch(error => {
            console.log(error);
        });

        axios.get(`/get-employee-services/${employeeId}`)
        .then(response => {
            console.log(response.data);
            setServices(response.data)
        })
        .catch(error => {
            console.log(error);
        })
    }, []);

    const updateInfo = (response) => {
        console.log(response);
    }
    
    return (employee && services)? (
        <HeaderPanel header={header} subheader={subheader}>
            <Form values={employee} path="/updateEmployee" objID={employeeId} update={updateInfo} >
                <RenderInputs inputs={formAddEmployee}/>
            </Form>
        </HeaderPanel>
    ) : ('Loading...')
}