import { Toggle } from "./Toggle";

export function WorkingHours({register, defaultChecked, id, label}) {

    const days = ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Niedziela"];

    return (
        <div className="d-f fd-c gap-s hours f-1">
            <p>{label}</p>
            {days.map( (day, id) => {
                return (
                    <div key={id} className="d-f gap-s">
                        <Toggle register={register} name={day} {...(defaultChecked && {defaultChecked: defaultChecked[id].status})} id={`hours.${id}.status`}/>
                        <input type="time" {...register(`hours.${id}.from`)}></input> 
                        <input type="time" {...register(`hours.${id}.to`)}></input> 
                    </div> 
                )
            })}
        </div>
    )
}