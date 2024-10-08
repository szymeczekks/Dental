import { useEffect, useState } from "react";
import { hour_to_float } from "../../functions/Functions";
import { SplideSlide } from '@splidejs/react-splide';
import { Day } from "./Day";

export function Days({ data, setDates, setDays, days }) {
    const [ daysLimit, setDaysLimit ] = useState(30);


    useEffect(() => {
        handle_days();
    }, [data]);

    function handle_availability(weekday, date, working_days, booked_dates, current_date) {
        if (!working_days[weekday]) return false;
        const current_date_string = current_date.toLocaleString().split(', ');
        const is_too_late = Object.keys(working_days[weekday]).at(-1) < hour_to_float(current_date_string[1]) && new Date(current_date_string[0]).getTime() === new Date(date).getTime();
        if (is_too_late) return false;
        // if (!booked_dates[date]) return {
        //     dates: {...working_days[weekday]},
        //     availability_factor: 100
        // };
        const booked_hours = JSON.parse(JSON.stringify(working_days[weekday]));;
        
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

        let available = Object.keys(booked_hours)
            .filter( quarter => Object.values(booked_hours[quarter]).some( booked => booked.booked === false ))
            .sort((a, b) => a - b)
            .reduce( (dates, key) => ( dates[key] = booked_hours[key], dates), {} );

        available = Object.keys(booked_hours)
        .filter( quarter => {
            const quarters = Math.ceil(data.duration / 15);
            let is_quarters_enough = true;
            for (let i = 0; i < quarters; i++) {
                if (!Object.keys(available).includes(String(parseFloat(quarter) + (0.25 * i)))) is_quarters_enough = false;
            }


            return is_quarters_enough;
        })
        .reduce( (dates, key) => ( dates[key] = available[key], dates), {} );

        const availability_factor = Math.floor(( Object.keys(available).length * 100 ) / Object.keys(booked_hours).length);

        if ( availability_factor === 0 ) return false;

        return {
            dates: available,
            availability_factor: availability_factor
        };
    }

    function handle_dates(obj) {
        const booked_dates = {};
        const week = {};
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
                if (!week[day.day]) week[day.day] = {};

                const from = hour_to_float(day.from);
                const to = hour_to_float(day.to);
                const difference = to - from;
                const number_of_quarters = difference / 0.25;

                for (let i = 0; i < number_of_quarters; i++) {
                    if (!week[day.day][from + (0.25 * i)]) week[day.day][from + (0.25 * i)] = {};
                    week[day.day][from + (0.25 * i)][key] = { booked: false };
                }
            }
        }

        return {
            booked_dates: booked_dates,
            working_days: week
        }
    }

    function handle_day(i, date, options, booked_dates, working_days) {
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

    function handle_days() {
        const date = new Date();
        const days_arr = [];
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        };

        const dates = handle_dates(data.data);

        for (let i = 0; i < daysLimit; i++) {
            days_arr.push(handle_day(i, date, options, dates.booked_dates, dates.working_days));
        }


        setDays(days_arr);
    }

    return (
        days?.map( ( day, i ) => { 
        return (
            <SplideSlide key={i}>
                <Day day={day} setDates={setDates}/>
            </SplideSlide>
        )})
    )
}