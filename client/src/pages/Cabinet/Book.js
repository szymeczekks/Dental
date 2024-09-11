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
    const [ dates, setDates ] = useState(null);
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

    function draw_dates(dates) {
        setDates(dates);
    }

    function Dates() {
        console.log(dates);
        return (
            Object.keys(dates).map( key => {
                console.log(key);
                return (
                    <SplideSlide>
                        <div className="date d-f fd-c f-1 day h-100 gap-s comp_border txt-xs txt-c jc-s p-10">{key}</div>
                    </SplideSlide>
                )
            })
        );
    }
    

    function Day({day}) {
        const availability_factor = day.availability?.availability_factor;
        let color = '';
        if ( availability_factor >= 98 ) { color = 'green' }
        else if ( availability_factor >= 50 ) { color = 'yellow' }
        else if ( availability_factor >= 25 ) { color = 'orange' }
        else color = 'red';

        return (
            <div onClick={() => draw_dates(day.availability.dates)} className={`d-f fd-c f-1 day h-100 gap-s comp_border txt-c jc-s p-10 ${!day.availability && "off"}`}>
                <div>
                    <b className="fw-500">{day.name.split(',')[1]}</b><br></br>{day.name.split(',')[0]}
                </div>
                {
                    day.availability &&
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

    function hour_to_float(hour_string) {
        const hour = hour_string.split(':');
        hour[1] = (parseInt(hour[1]) / 60) * 100;
        return parseFloat(hour.join('.'));
    }

    function float_to_hour(hour_float) {
        const minutes = (((hour_float % 1).toFixed(2) * 100) / 75) * 15;
        return `${hour_float < 10 ? '0' : ''}${Math.floor(hour_float)}:${minutes}`;
    }

    function handle_availability(weekday, date, working_days, booked_dates, current_date) {
        if (!working_days[weekday]) return false;
        const current_date_string = current_date.toLocaleString().split(', ');
        const is_too_late = Object.keys(working_days[weekday]).at(-1) < hour_to_float(current_date_string[1]) && new Date(current_date_string[0]).getTime() === new Date(date).getTime();
        if (is_too_late) return false;
        if (!booked_dates[date]) return {
            dates: {...working_days[weekday]},
            availability_factor: 100
        };
        let booked_hours = {...working_days[weekday]};
        for (const key in booked_dates[date]) {
            const employee_booked_hours = booked_dates[date][key];
            for (const hour of employee_booked_hours) {
                const from = hour_to_float(hour.hour);
                const number_of_quarters = hour.booked_time / 15;
                for (let i = 0; i < number_of_quarters; i++) {
                    booked_hours[from + (0.25 * i)][key].booked = true;
                }

            }
        }

        const available = Object.keys(booked_hours)
            .filter( quarter => Object.values(booked_hours[quarter]).some( booked => booked.booked === false ))
            .sort((a, b) => a - b)
            .reduce( (dates, key) => ( dates[key] = booked_hours[key], dates), {} );

        console.log(available);

        const availability_factor = Math.floor(( Object.keys(available).length * 100 ) / Object.keys(booked_hours).length);

        return {
            dates: available,
            availability_factor:availability_factor
        };
    }

    function handle_dates(obj) {
        const booked_dates = {};
        const week = {};
        const quarters = {};
        for (const key in obj) {
            const employee = obj[key];

            for (const date of employee.booked) {
                const date_arr = date.date.split(', ');
                if (!booked_dates[date_arr[0]]) booked_dates[date_arr[0]] = {};
                if (!booked_dates[date_arr[0]][key]) booked_dates[date_arr[0]][key] = [];

                booked_dates[date_arr[0]][key].push({
                    hour: date_arr[1],
                    booked_time: date.booked_time 
                });
            }

            for (const day of employee.hours) {
                if (day.status === 0) continue;
                if (!week[day.day]) week[day.day] = [];

                const from = hour_to_float(day.from);
                const to = hour_to_float(day.to);
                const difference = to - from;
                const number_of_quarters = difference / 0.25;

                for (let i = 0; i < number_of_quarters; i++) {
                    if (!quarters[from + (0.25 * i)]) quarters[from + (0.25 * i)] = {};
                    quarters[from + (0.25 * i)][key] = { booked: false };
                }

                week[day.day] = quarters;
            }
        }

        return {
            booked_dates: booked_dates,
            working_days: week
        }
    }

    function handle_day(i, date, options, booked_dates, working_days, obj) {
        const day = new Date(date.getTime() + (86400000 * i)); // + 1 day in ms
        const weekday = day.getDay() === 0 ? 6 : day.getDay() - 1; 
        const name = day.toLocaleDateString(undefined, options);
        const availability = handle_availability( weekday, name.split(', ')[1], working_days, booked_dates, date );
        return {
            weekday: weekday,
            availability: availability,
            name: name
        };
    }

    function handle_days(obj) {
        const date = new Date("2024-09-10T12:24:00");
        const days_arr = [];
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        };

        const dates = handle_dates(obj);

        for (let i = 0; i < daysLimit; i++) {
            days_arr.push(handle_day(i, date, options, dates.booked_dates, dates.working_days, obj));
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
                <Splide options={ {
                    perPage: 12,
                    pagination: false,
                    arrows: false,
                    rewind: false,
                    gap: '10px'
                } }>
                    {dates && <Dates/>}
                </Splide>
            </SplideSlide>
        </Splide>
        </>
    )
}