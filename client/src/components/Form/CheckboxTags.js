import { useEffect, useState } from "react"
import './Checkbox.css';

export function CheckboxTags({id, name, defaultChecked, setOptions, options_local, id_base_service}) {
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        defaultChecked && setChecked(true);
    },[]);

    const handleCheck = () => {
        const newArray = options_local.not_includes.filter(option => option.id != id);
        setChecked(prev => !prev);
        setOptions(prev => ({
            not_includes: [...newArray],
            includes: [...prev.includes, {id: id, name: name, id_base_service: id_base_service}]
        }));
    }

    return (
        <div key={id} className={`checkbox d-f gap-s ${checked ? 'checked' : ''}`}>
            <p className='p-r' onClick={handleCheck} >{name}</p>
        </div>
    )
}