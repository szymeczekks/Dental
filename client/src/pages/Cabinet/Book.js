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
        axios.get(`/get-cabinet-services/${location.pathname.split('/')[2]}`)
        .then(response => {
            setServices(response.data.data);
        })
        .catch(err => {
            console.log(err);
        })
    }, []);

    function handle_service_click(name) {
        setServiceChecked(name);
        ref.current.splide.go('>');
    }

    console.log(location.pathname.split('/')[2]);
    return (
        <>
        <Splide ref={ref} options={ {
            arrows: false,
            drag: false
        } }>
            <SplideSlide>
                <>
                {
                    services ? 
                    services.map(service => {
                        return <ManageableListItem key={service.id} item={{ header: service.name, subheader: `${service.price} zł` }}>
                            <button onClick={() => handle_service_click(service.name)}>Wybierz</button>
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