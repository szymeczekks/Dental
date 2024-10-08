import { useLocation } from "react-router-dom";
import { useEffect, useState, useRef, useContext } from "react";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import axios from "axios";
import '@splidejs/react-splide/css/sea-green';
import { ManageableListItem } from "../../components/ManageableListItem";
import { Days } from "./Days";
import { Dates } from "./Dates";
import { Employees } from "./Employees";
import { ReservationEnd } from "./ReservationEnd";
import { SplitPanel } from "../../components/Layout/SplitPanel";
import { ReservationData } from "./ReservationData";
import { AuthContext } from './../../Context/Auth';

export function Book() { 
    const { authState: { userInfo } } = useContext(AuthContext);
    const location = useLocation();
    const [services, setServices] = useState(null);
    const [dates, setDates] = useState(null);
    const [days, setDays] = useState(null);
    const [hour, setHour] = useState(null);
    const [employee, setEmployee] = useState(null);
    const [serviceClicked, setServiceClicked] = useState(null);
    const [ reservationDone, setReservationDone ] = useState(null);
    const ref = useRef(0);

    const side_menu = [
        {
            name: "Usługa",
            value: serviceClicked?.name,
            slide: 0,
            reset: setServiceClicked
        }, 
        {
            name: "Dzień",
            value: dates?.name,
            slide: 1,
            reset: setDates
        }, 
        {
            name: "Godzina",
            value: hour?.hour,
            slide: 1,
            reset: setHour
        }, 
        {
            name: "Lekarz",
            value: employee?.name,
            slide: 1,
            reset: setEmployee
        }
    ];

    console.log('new');

    useEffect(() => {
        axios.get(`/get-cabinet-services/${location.pathname.split('/')[2]}`)
            .then(response => {
                console.log(response.data.data);
                setServices(response.data.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    useEffect(() => {
        setEmployee(null);
    }, [hour])

    useEffect(() => {
        setHour(null);
    }, [dates])

    useEffect(() => {
        setDates(null);
    }, [days])

    useEffect(() => {
        setDays(null);
    }, [serviceClicked])

    useEffect(() => {
        employee && ref.current.splide.go('>');
    }, [employee])

    useEffect(() => {
        reservationDone && ref.current.splide.go('>');
    }, [reservationDone])




    function handle_service_click(service_id, duration, name) {
        axios.get(`/get-employees-by-service/${service_id}`)
            .then(response => {
                ref.current.splide.go('>');
                console.log(response.data);
                setServiceClicked({
                    ...serviceClicked,
                    data: response.data,
                    duration: duration,
                    name: name
                });
                setDates( null );
            })
            .catch(err => {
                console.log(err);
            })
    }

    function send_reservation() {
        ref.current.splide.go('>');

        const payload = {
            name: serviceClicked.name,
            duration: serviceClicked.duration,
            day: dates.name.split(', ')[1],
            hour: hour.hour,
            employee: employee.id,
            employee_name: employee.name
        }

        setTimeout(() => {
            axios.post('/send_reservation', payload)
                .then( response => {
                    console.log(response);
                    setReservationDone( payload );
                });
        }, 2000);
    }

    function handle_side_element( reset, slide) {
        ref.current.splide.go(slide);
        reset(null);
    }

    /* PAMIĘTAJ! ODIZOLOWAĆ FUNKCJE OBLICZAJĄCE ABY JE REUŻYWAĆ / PO OBLICZENIACH USTAWIC STATE DNI, KAŻDY DZIEN TO 1 OBIEKT I MA CZY JEST WOLNY CZY ZAJĘTY I WOLNE TERMINY */

    return (
        <SplitPanel 
    left={
        <div className={`d-f fd-c gap-s ${reservationDone && 'reservation_done'}`}>
            {side_menu.map( (element, i) => {
                return <div key={ i } onClick={() => handle_side_element(element.reset, element.slide)} className={`step comp_border p-10 ${element.value && 'seen'} ${(!element.value && (side_menu[ i - 1 ]?.value || i === 0 )) && 'active'}`} ><span className="step_number txt-xs">{ i + 1 }</span><span className="txt-s">{element.name}:</span> <span className="txt-xs fw-500">{element.value}</span></div>
            })}
            {/* { (employee && !reservationDone) && <button onClick={ send_reservation }>Zapisz się</button>} */}
        </div>
    } right={
        <>
            <Splide ref={ref} options={{
                arrows: false,
                drag: false,
                pagination: false
            }}>
                <SplideSlide>
                    <>
                        {
                            services ?
                                services.map(service => {
                                    return <ManageableListItem key={service.id} item={{ header: service.name, subheader: `${service.price} zł` }}>
                                        <p>{service.duration} min.</p>
                                        <button onClick={() => handle_service_click(service.id_base_service, service.duration, service.name)}>Wybierz</button>
                                    </ManageableListItem>
                                }) : services === 0 ? <>Nie znaleziono usług</> : <>Loading...</>
                        }
                    </>
                </SplideSlide>
                <SplideSlide>
                    <Splide className="calendar" options={{
                        perPage: 5,
                        pagination: false,
                        arrows: false,
                        gap: '10px'
                    }}>
                        {serviceClicked && <Days data={serviceClicked} setDates={setDates} setDays={setDays} days={days} />}
                    </Splide>
                    <Splide options={{
                        perPage: 12,
                        pagination: false,
                        arrows: false,
                        rewind: false,
                        gap: '10px'
                    }}>
                        {dates && <Dates dates={ dates.dates } setHour={ setHour } />}
                    </Splide>
                    <Splide options={{
                        perPage: 4,
                        pagination: false,
                        arrows: false,
                        rewind: false,
                        gap: '10px',
                    }}>
                        {(hour && serviceClicked) && <Employees hour={ hour } employees={ serviceClicked?.data } setEmployee={ setEmployee } />}
                    </Splide>
                </SplideSlide>
                <SplideSlide>
                    <ReservationData service={{
                        name: userInfo.name,
                        surname: userInfo.surname,
                        service_name: serviceClicked?.name,
                        booked_time: serviceClicked?.duration,
                        day: dates?.name.split(', ')[1],
                        hour: hour?.hour,
                        employee_id: employee?.id,
                        employee_name: employee?.name,
                        user_id: userInfo.id || null,
                        cabinet_id: location.pathname.split('/')[2]
                    }} setReservationDone={ setReservationDone }  />
                </SplideSlide>
                <SplideSlide>
                    <ReservationEnd reservationDone={ reservationDone } />
                </SplideSlide>
            </Splide>
        </>
        }/>
    )
}