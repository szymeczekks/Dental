import './Input.css';

export function Input({errors, id, placeholder, type, label, register, config}) {
    return (
        <div className={`d-f fd-c ai-s f-1 gap-s p-r ${errors[id] && 'validate_error'}`}>
            <label htmlFor={id} >{label}</label>
            <input className='input shadow-m' id={id} placeholder={placeholder} type={type} {...register(id, {
                ...config
            })}></input>
            { errors[id] && 
            <span className="inputError">{errors[id].message}</span> }
        </div>
    )
}