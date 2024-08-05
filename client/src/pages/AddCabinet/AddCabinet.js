import './AddCabinet.css';
import { useState, useEffect, useContext } from 'react';
import { Form } from '../../components/Form/Form';
import { AuthContext } from './../../Context/Auth';
import axios from 'axios';
import { HeaderPanel } from '../../components/Layout/HeaderPanel';
import { SplitPanel } from '../../components/Layout/SplitPanel';
import { RenderInputs } from '../../components/Form/renderInputs';

function AddCabinet() {
    const { authState: {userInfo, token, expiresAt}, setAuthState } = useContext(AuthContext);
    const [services, setServices] = useState([]);
    const header = "Dodaj własny gabinet";
    const subheader = "Wyprzedź konkurencję i zacznij przyciągać nowych klientów, dodając swój gabinet do naszego portalu.";

    const cabinetForm = [
        {
            id: "name",
            placeholder: "Biały ząb",
            type: "text",
            label: "Nazwa gabinetu",
            config: {
                required: "Podaj nazwę gabinetu"
            }
        },
        {
            id: "services",
            name: "Dodaj usługi",
            type: "select-multiple",
            options: services
        },
        {
            id: "city",
            placeholder: "Warszawa",
            type: "text",
            label: "Miejscowość",
            config: {
                required: "Podaj nazwę miejscowości"
            }
        },
        [
            {
                id: "street",
                placeholder: "Krzywa",
                type: "text",
                label: "Ulica",
                config: {
                    required: "Podaj nazwę ulicy"
                }
            },
            {
                id: "address",
                placeholder: "23/3",
                type: "text",
                label: "Nr budynku/mieszkania",
                config: {
                    required: "Podaj nr budynku/mieszkania"
                }
            }
        ]
    ]

    useEffect(() => {
        axios.get('/getServices')
        .then(response => {
            let servicesArr = 
                response.data.services.map((service) => (
                    {
                        id: service.toLowerCase(),
                        name: service
                    }
                ))
            ;
            setServices(servicesArr);
        })
    }, []);

    const Left = () => <div className="photo f-1"></div>

    const Right = () => 
        <HeaderPanel header={header} subheader={subheader}>
            {/* dodać tu obsugę update aby po dodaniu gabinetu wyświetlić panel lub przejśc do ustawień gabinetu */}
            {services && 
            <Form path="/saveCabinet" objID={userInfo.id} update={() => {}}>
                <RenderInputs inputs={cabinetForm}/>
            </Form>
            }
        </HeaderPanel>
    

    return (
        <SplitPanel left={<Left/>} right={<Right/>}/>
    )
}
export default AddCabinet;