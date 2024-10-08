export function Day({ day, setDates }) {
    const availability_factor = day.availability?.availability_factor;
    let color = '';
    if (availability_factor >= 75) { color = 'green' }
    else if (availability_factor >= 50) { color = 'yellow' }
    else if (availability_factor >= 25) { color = 'orange' }
    else color = 'red';

    return (
        <div onClick={() => {setDates({dates: day.availability.dates, name: day.name})}} className={`d-f fd-c f-1 day h-100 gap-s comp_border txt-c jc-s p-10 ${!day.availability && "off"}`}>
            <div>
                <b className="fw-500">{day.name.split(',')[1]}</b><br></br>{day.name.split(',')[0]}
            </div>
            {
                day.availability &&
                <div className="d-f fd-c ai-c gap-s txt-xs">
                    Dostępność:
                    <span className={`status comp_border ${color}`}></span>
                </div>
            }
        </div>
    )
}