import { useState } from "react";
import { Checkbox } from "./Checkbox";
import './Input.css';

export function SelectMultiple({register, id, options, name}) {
    const [expanded, setExpanded] = useState(false);

    const handleClick = () => {
        setExpanded(!expanded);
    }

    return (
        <div className="select drop-bgc d-f fd-c ai-s f-1 shadow-m p-r br-10">
            <p className="fw-500 p-10" onClick={handleClick}>{name}</p>
            <div className={`p-a z-1 w-100 shadow-m select_wrapper ${expanded ? 'expanded' : ''}`}>
                <div className="select_height d-f fd-c gap-xs">
                    {options?.map(option => (
                        <Checkbox key={option.id} register={register} idGeneral={id} {...option}/>
                    ))}
                </div>
            </div>
        </div>
    )
}