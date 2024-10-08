import { useEffect, useState } from "react";

export function Dots() {
    const [ dots, setDots ] = useState(1);

    useEffect(() => {
        const interval = setInterval(() => {
            setDots( prev => prev === 3 ? prev = 1 : prev + 1 );
        }, 300);
        
        return () => clearInterval( interval );
    }, []);

    return draw_dots( dots );
}

function draw_dots( number ) {
    return '.'.repeat(number);
}