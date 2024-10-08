import { float_to_hour } from "../../functions/Functions";
import { SplideSlide } from '@splidejs/react-splide';

export function Dates({ dates, setHour }) {
    const sorted = Object.keys(dates)
        .sort((a, b) => a - b)
        .reduce((dates_sorted, key) => (dates_sorted.push({
            hour: key,
            employees: Object.keys(dates[key]).filter( employee => dates[key][employee].booked === false )
        }), dates_sorted), []);

    function handle_hour_click( hour, employees ) {
        setHour({
            hour: hour,
            employees: employees
        });
    }

    return (
        sorted.map(quarter => {
            return (
                <SplideSlide key={ quarter.hour }>
                    <div onClick={ () => handle_hour_click( float_to_hour( quarter.hour ), quarter.employees ) } data-quarter={ quarter.hour } className="date d-f fd-c f-1 day h-100 gap-s comp_border txt-xs txt-c jc-s p-10">{ float_to_hour( quarter.hour ) }</div>
                </SplideSlide>
            )
        })
    );
}