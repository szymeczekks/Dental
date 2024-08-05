import { useState, useEffect, useContext } from 'react';
import { CabinetContext } from '../../Context/Cabinet';
import { postRequest, validateInput } from '../../functions/Functions';
import './PanelSettings.css';
import axios from 'axios';

export default function PanelSettings({ content, categories, catChoosen }) {
    const { cabinet, setCabinet } = useContext(CabinetContext);
    const [key, setKey] = useState('');
    const contentMap = {
        'Ustawienia_Ogólne': <SettingsGeneral />,
        'Ustawienia_Powiadomienia': <SettingsNotification />,
        'Ustawienia_Płatności': <SettingsPayment />,
        // 'Pracownicy_Edytuj_pracownika': <EmployeesEdit/>,
        'Pracownicy_Dodaj_pracownika': <EmployeesAdd />,
        // 'Usługi_Dodaj_usługi': <ServiicesAdd/>,
        // 'Usługi_Aktualizuj_ceny': <ServiicesUpdate/>,
        // 'Usługi_Edytuj_usługi': <ServiicesEdit/>,
        // 'Informacje': <Informations/>,
        // 'Dostępności': <Availability/>,
        // 'Opinie': <Opinions/>,
        // 'Wizyty_Wizyty_zaplanowane': <VisitsPlanned/>,
        // 'Wizyty_Wizyty_do_akceptacji': <VisitsToAccept/>,
        // 'Wizyty_Historia_wizyt': <VisitsHistory/>
    };

    useEffect(() => {
        setKey(`${content}_${catChoosen.replace(' ', '_')}`);
    }, [content, categories]);

    const toggleCard = (e) => {
        const content = e.closest('.header').querySelector('h2').innerText;
        const catChoosen = e.innerText.replace(' ', '_');
        setKey(`${content}_${catChoosen}`);

        document.querySelector('.link.fw-500').classList.remove('fw-500');
        e.classList.add('fw-500');
    };

    return (
        <>
            <div className="header">
                <h2 className="txt-xl fw-600">{content}</h2>
                <div className="d-f gap-s">
                    {categories.map(cat => {
                        return <p key={cat} onClick={(e) => toggleCard(e.target)} className={`link p-10 ${cat === catChoosen && 'fw-500'}`}>{cat}</p>
                    })}
                </div>
            </div>
            {contentMap[key]}
        </>
    )
};

function SettingsGeneral() {
    const { cabinet, setCabinet } = useContext(CabinetContext);
    const [name, setName] = useState();

    useEffect(() => {
        setName(cabinet.name);
    }, []);

    const handleRequest = async () => {
        const updated = await postRequest('/updateCabinet', 'cabinet', cabinet.id);

        if (updated.status === 201) {
            setCabinet(updated.data.updatedInfo);
        }
    }


    return (<>
        <form className='formWrapper d-f fd-c gap-s'>
            <div className='d-f gap-s'>
                <div className='user__content-inputWrapper d-f fd-c ai-s f-1 gap-s p-r'>
                    <label>Nazwa gabinetu</label>
                    <input className='input shadow-m' id='name' placeholder='Nazwa gabinetu' type='text' onChange={e => setName(e.target.value)} value={name}></input>
                </div>
            </div>
        </form>
        <div className='p-t-15 d-f jc-e'>
            <p className='info d-f ai-e txt-xs m-x-10'></p>
            <button onClick={e => handleRequest()}>Zapisz</button>
        </div>
    </>);
};


function SettingsNotification() {
    const { cabinet, setCabinet } = useContext(CabinetContext);
    const [notificationIsOn, setNottificationIsOn] = useState(false);
    const [checkNew_reservation, setCheckNew_reservation] = useState(false);
    const [checkCancellation, setCheckCancellation] = useState(false);
    const [checkVisit_ended, setCheckVisit_ended] = useState(false);

    useEffect(() => {
        setCheckCancellation(Boolean(cabinet.cancellation_agree));
        setCheckNew_reservation(Boolean(cabinet.new_reservation_agree));
        setCheckVisit_ended(Boolean(cabinet.visit_ended_agree));
        setNottificationIsOn(Boolean(cabinet.notifications_agree));
    }, [])

    const toggle = () => {
        setNottificationIsOn(!notificationIsOn);
    }

    return (
        <>
            <div className='formWrapper'>
                <div className='d-f ai-c jc-sb m-b-10'>
                    <p className='txt-m fw-500'>Powiadomienia</p>
                    <div className='Toggle link' data-on={notificationIsOn ? true : false} onClick={e => toggle()}>
                        <div className='Toggle-circle'></div>
                    </div>
                </div>
                <div className={`d-f fd-c gap-s ${!notificationIsOn && 'disable'}`}>
                    <div className='checkbox_wrapper txt-xs d-f ai-c gap-s'>
                        <span onClick={e => setCheckNew_reservation(!checkNew_reservation)} data-checked={checkNew_reservation} className='Checkbox link d-f ai-c jc-c'><i className="fa-solid fa-check txt-s"></i></span> Nowa rezerwacja
                    </div>
                    <div className='checkbox_wrapper txt-xs d-f ai-c gap-s'>
                        <span onClick={e => setCheckCancellation(!checkCancellation)} data-checked={checkCancellation} className='Checkbox link d-f ai-c jc-c'><i className="fa-solid fa-check txt-s"></i></span> Odwołanie wizyty
                    </div>
                    <div className='checkbox_wrapper txt-xs d-f ai-c gap-s'>
                        <span onClick={e => setCheckVisit_ended(!checkVisit_ended)} data-checked={checkVisit_ended} className='Checkbox link d-f ai-c jc-c'><i className="fa-solid fa-check txt-s"></i></span> Wizyta zakończona
                    </div>
                </div>
            </div>
        </>
    )
};

function SettingsPayment() {
    return (
        <>
            ogólne platnosci
        </>
    )
};

function EmployeesAdd() {
    const { cabinet, setCabinet } = useContext(CabinetContext);
    const [image, setImage] = useState(null);
    const [zip, setZip] = useState("");

    const handleRequest = async () => {
        const employee = await postRequest('/addEmployee', 'cabinet', cabinet.id);
        image && await addImage(employee.data.id);
    }

    const addImage = async (id) => {
        const formData = new FormData();
        const config = {
            headers: { "Content-Type": "multipart/form-data" },
            params: {id: id}
        };
        formData.append("file", image);
        formData.append("body", "1");
        console.log(typeof image);
        console.log(formData);
        axios.post('/addImage', formData, config)
        .then(response => {
            console.log(response);
        })
        .catch(err => {
            console.log(err);
        });
    }

    const uploadImage = (e) => {
        const [file] = e.files
        setImage(e.files[0]);
        if (file) {
            document.querySelector('#img').src = URL.createObjectURL(file);
        }
    }

    return (
        <>
            <form className='formWrapper d-f fd-c gap-s'>
                <div className='d-f gap-s ai-c'>
                    <div className='f-1 d-f jc-c'>
                        <div className='f-1 profile_photo link p-r'>
                            <label className='' htmlFor="image"></label>
                            <input onChange={e => uploadImage(e.target)} id="image" type="file" name="image"></input>
                            <img id='img' alt='' src=''></img>
                        </div>
                    </div>
                    <div className='d-f fd-c gap-sc f-1'>
                        <div className='user__content-inputWrapper d-f fd-c ai-s f-1 gap-s p-r'>
                            <label>Imię i nazwisko</label>
                            <input required className='input shadow-m' id='name' placeholder='Anna Kowalska' type='text'></input>
                        </div>
                        <div className='user__content-inputWrapper d-f fd-c ai-s f-1 gap-s p-r'>
                            <label>Nazwa stanowiska</label>
                            <input required className='input shadow-m' id='position' placeholder='Higienistka' type='text'></input>
                        </div>
                    </div>
                </div>
                <div className='d-f gap-s'>
                    <div className='user__content-inputWrapper d-f fd-c ai-s f-1 gap-s p-r'>
                        <label>Adres email</label>
                        <input required className='input shadow-m' id='email' placeholder='example@example.com' type='email'></input>
                    </div>
                    <div className='user__content-inputWrapper d-f fd-c ai-s f-1 gap-s p-r'>
                        <label>Nr telefonu</label>
                        <input required className='input shadow-m' id='phone' placeholder='123123123' type='tel'></input>
                    </div>
                </div>
                <div className='d-f gap-s'>
                    <div className='user__content-inputWrapper d-f fd-c ai-s f-1 gap-s p-r'>
                        <label>Miejsce zamieszkania</label>
                        <input required className='input shadow-m' id='town' placeholder='Piła' type='text'></input>
                    </div>
                    <div className='user__content-inputWrapper d-f fd-c ai-s f-1 gap-s p-r'>
                        <label>Kod pocztowy</label>
                        <input onChange={e => {validateInput(e.target, function(){console.log('we')}); setZip(e.target.value)}} required className='input shadow-m' id='zip-code' placeholder='00-111' maxLength="6" type='text' value={zip}></input>
                    </div>
                </div>
                <div className='d-f gap-s'>
                    <div className='user__content-inputWrapper d-f fd-c ai-s f-1 gap-s p-r'>
                        <label>Ulica</label>
                        <input required className='input shadow-m' id='street' placeholder='Nowakowska' type='text'></input>
                    </div>
                    <div className='user__content-inputWrapper d-f fd-c ai-s f-1 gap-s p-r'>
                        <label>Nr budynku / mieszkania</label>
                        <input required className='input shadow-m' id='building' placeholder='27/10' type='text'></input>
                    </div>
                </div>
            </form>
            <div className='p-t-15 d-f jc-e'>
                <p className='info d-f ai-e txt-xs m-x-10'></p>
                <button onClick={e => handleRequest()}>Dodaj</button>
            </div>
        </>
    )
};

