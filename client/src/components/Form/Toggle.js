import { useEffect, useState } from "react"

export function Toggle({register, name, defaultChecked, id}) {
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        console.log(defaultChecked);
        defaultChecked && setChecked(true);
    },[]);

    const handleCheck = () => {
        setChecked(!checked);
    }

    return (
        <div className='checkbox d-f ai-c jc-sb m-b-10'>
            <label className="txt-m fw-500 d-f jc-sb">{name}
                <input type="checkbox" onClick={handleCheck} {...register(id)}/>
                <div className='Toggle' data-on={checked ? true : false}>
                    <div className='Toggle-circle'></div>
                </div>
            </label>
        </div>
    )
}