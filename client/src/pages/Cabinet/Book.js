import { useLocation } from "react-router-dom";

export function Book() {
    const location = useLocation();

    console.log(location.pathname.split('/')[2]);
    return (
        <>Book {location.pathname.split('/')[2]}</>
    )
}