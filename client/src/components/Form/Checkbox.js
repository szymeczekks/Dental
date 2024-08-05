import { useEffect, useState } from "react"
import './Checkbox.css';

export function Checkbox({register, id, name, defaultChecked, idGeneral = id}) {
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        defaultChecked && setChecked(true);
    },[]);

    const handleCheck = (e) => {
        console.log(e.target.checked);
        setChecked(prev => !prev);
    }

    return (
        <div key={id} className="checkbox d-f gap-s">
            <label className='p-r'>{name}
                <input type="checkbox" value={name} onClick={handleCheck} {...register(idGeneral)}/>
                <span className={`checkmark d-f jc-c ai-c ${checked ? 'checked' : ''}`}><i className="fa-solid fa-check txt-s"></i></span>
            </label>
        </div>
    )
}