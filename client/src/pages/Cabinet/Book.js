import { useLocation } from "react-router-dom";
import { useEffect, useState, useRef  } from "react";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import axios from "axios";
import '@splidejs/react-splide/css/sea-green';
import { ManageableListItem } from "../../components/ManageableListItem";

export function Book() {
    const location = useLocation();
    const [ services, setServices ] = useState(null);
    const [ days, setDays ] = useState(null);
    const [ daysLimit, setDaysLimit ] = useState(30);
    const ref = useRef(0);
    const refDays = useRef(0);

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

    function count_availability(booked) {
        
    }
    

    function Day({day}) {
        let color = '';
        count_availability(day.booked);
        switch (day.booked?.length) {
            case 3:
                color = 'yellow'
                break;
            default:
                break;
        }
        return (
            <div className={`d-f fd-c f-1 day h-100 gap-s comp_border txt-c jc-s p-10 ${!day.is_available && "off"}`}>
                <div>
                    <b className="fw-500">{day.name.split(',')[1]}</b><br></br>{day.name.split(',')[0]}
                </div>
                {
                    day.is_working &&
                    <div className="d-f fd-c ai-c gap-s txt-xs">
                        Dostępność: 
                        <span className={`status comp_border ${color}`}></span>
                    </div>
                }
            </div>
        )
    }

    function Days() {
        return (
            days.map( ( day, i ) => { 
            return (
                <SplideSlide key={i}>
                    <Day day={day} />
                </SplideSlide>
            )})
        )
    }

    function handle_service_click(service_id) {
        axios.get(`/get-employees-by-service/${service_id}`)
        .then(response => {
            handle_days(response.data);
            console.log(response.data);
            ref.current.splide.go('>');
        })
        .catch(err => {
            console.log(err);
        })
    }

    /* PAMIĘTAJ! ODIZOLOWAĆ FUNKCJE OBLICZAJĄCE ABY JE REUŻYWAĆ / PO OBLICZENIACH USTAWIC STATE DNI, KAŻDY DZIEN TO 1 OBIEKT I MA CZY JEST WOLNY CZY ZAJĘTY I WOLNE TERMINY */

    function get_working_days(obj) {
        const week = new Set();
        for (const key in obj) {
            const employee = obj[key];
            for (const day of employee.hours) {
                if ( day.status !== 0 ) week.add(day.day)
            }
        }

        return week;
    }

    function is_date_available(obj, weekday, date) {

    }

    function getBookedDates(obj) {
        const dates = {};
        for (const key in obj) {
            const employee = obj[key];
            for (const date of employee.booked) {
                const date_arr = date.date.split(', ');
                if (!dates[date_arr[0]]) dates[date_arr[0]] = [];
                dates[date_arr[0]].push({
                    hour: date_arr[1],
                    booked_time: date.booked_time 
                });
            }
        }
        return dates;
    }

    function get_dates_data(obj) {

    }
    

    function handle_days(obj) {
        const date = new Date();
        const days_arr = [];
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        };

        const days_data = get_dates_data(obj);

        const working_days = get_working_days(obj);
        const booked_dates = getBookedDates(obj);

        console.log(working_days);
        console.log(booked_dates);

        for (let i = 0; i < daysLimit; i++) {
            const day = new Date(date.getTime() + (86400000 * i)); // + 1 day in ms
            const weekday = day.getDay() === 0 ? 6 : day.getDay() - 1; 
            const name = day.toLocaleDateString(undefined, options);
            const availability = is_date_available(obj, weekday, day);
            days_arr.push({
                weekday: weekday,
                is_available: availability,
                name: name,
                booked: booked_dates[name.split(', ')[1]],
            });
        }

        setDays(days_arr);
    }

    return (
        <>
        <Splide ref={ref} options={ {
            arrows: false,
            drag: false
        } }>
            <SplideSlide className="p-15">
                <>
                {
                    services ? 
                    services.map(service => {
                        return <ManageableListItem key={service.id} item={{ header: service.name, subheader: `${service.price} zł` }}>
                            <p>{service.duration} min.</p>
                            <button onClick={() => handle_service_click(service.id_base_service)}>Wybierz</button>
                        </ManageableListItem>
                    }) : services === 0 ? <>Nie znaleziono usług</> : <>Loading...</>
                }
                </>
            </SplideSlide>
            <SplideSlide>
                <Splide className="calendar" ref={refDays} options={ {
                    perPage: 7,
                    pagination: false,
                    arrows: false,
                    gap: '10px'
                } }>
                    {days && <Days/>}
                </Splide>
            </SplideSlide>
        </Splide>
        </>
    )
}