import './Input.css';

export function Textarea({errors, id, placeholder, type, label, register, config}) {
    return (
        <div className={`d-f fd-c ai-s f-1 gap-s p-r ${errors[id] && 'validate_error'}`}>
            <label htmlFor={id} >{label}</label>
            <textarea className='input shadow-m w-100' id={id} placeholder={placeholder} type={type} {...register(id, {
                ...config
            })}></textarea>
            { errors[id] && 
            <span className="inputError">{errors[id].message}</span> }
        </div>
    )
}