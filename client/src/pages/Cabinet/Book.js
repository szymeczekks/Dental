import { useLocation } from "react-router-dom";
import { useEffect, useState, useRef  } from "react";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import axios from "axios";
import '@splidejs/react-splide/css/sea-green';
import { ManageableListItem } from "../../components/ManageableListItem";

export function Book() {
    const location = useLocation();
    const [ services, setServices ] = useState(null);
    const [ serviceChecked, setServiceChecked ] = useState(null);
    const ref = useRef(0);

    useEffect(() => {
        handle_days();
        axios.get(`/get-cabinet-services/${location.pathname.split('/')[2]}`)
        .then(response => {
            console.log(response.data.data);
            setServices(response.data.data);
        })
        .catch(err => {
            console.log(err);
        })
    }, []);

    function handle_service_click(service_id) {
        axios.get(`/get-employees-by-service/${service_id}`)
        .then(response => {
            console.log(response);
            ref.current.splide.go('>');
        })
        .catch(err => {
            console.log(err);
        })
    }

    /* PAMIĘTAJ! ODIZOLOWAĆ FUNKCJE OBLICZAJĄCE ABY JE REUŻYWAĆ / PO OBLICZENIACH USTAWIC STATE DNI, KAŻDY DZIEN TO 1 OBIEKT I MA CZY JEST WOLNY CZY ZAJĘTY I WOLNE TERMINY */

    function handle_days() {
        const date = new Date();
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };

        for (let i = 0; i < 3; i++) {
            const followingDay = new Date(date.getTime() + (86400000 * i)); // + 1 day in ms
            console.log(followingDay.getDay());
            console.log(followingDay.toLocaleDateString(undefined, options));
        }
    }

    console.log(location.pathname.split('/')[2]);
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
                elo2
            </SplideSlide>
        </Splide>
        </>
    )
}