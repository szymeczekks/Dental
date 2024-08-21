import { Toggle } from "./Toggle";

export function WorkingHours({register, defaultChecked, id, label}) {

    const days = ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Niedziela"];

    return (
        <div className="d-f fd-c gap-s hours">
            <p>{label}</p>
            {days.map( (day, id) => {
                return (
                    <div className="d-f gap-s">
                        <Toggle register={register} name={day} defaultChecked={0} id={`hours.${id}.status`}/>
                        <input type="time" {...register(`hours.${id}.from`)}></input> 
                        <input type="time" {...register(`hours.${id}.to`)}></input> 
                    </div> 
                )
            })}
        </div>
    )
}