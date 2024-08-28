import { useState } from "react";
import { CheckboxTags } from "./CheckboxTags";
import './Input.css';

export function SelectMultipleTags({register, id, options, name}) {
    const [expanded, setExpanded] = useState(false);
    const [options_local, setOptions] = useState(options);


    const handleClick = () => {
        setExpanded(!expanded);
    }

    const handleDeleting = (id, name, id_base_service) => {
        const newArray = options_local.includes.filter(option => option.id != id);
        setOptions(prev => ({
            not_includes: [...prev.not_includes, {id: id, name: name, id_base_service: id_base_service}],
            includes: [...newArray]
        }));
    }

    return (
        <div className="d-f fd-c f-1 as-s gap-s">
            <p>{name}</p>
            <div className="select select-tags drop-bgc d-f fd-c ai-s f-1 shadow-m p-r br-10">
                <p className="fw-500 p-10" onClick={handleClick}>{(options_local.not_includes.length > 0) ? 'Lista' : 'Lista wyczerpana'}</p>
                <div className={`p-a z-1 w-100 shadow-m select_wrapper ${(expanded && options_local.not_includes.length > 0) ? 'expanded' : ''}`}>
                    <div className="select_height d-f fd-c gap-xs">
                        {options_local?.not_includes.map(option => (
                            <CheckboxTags key={option.id} {...option} setOptions={setOptions} options_local={options_local}/>
                        ))}
                    </div>
                </div>
            </div>
            {(options_local.includes.length > 0) && (
            <div className="tags-container d-f p-10 comp_border gap-s fw-w">
                {options_local?.includes.map(option => (
                    <label className="p-10 comp_border fw-500" key={`tag_${option.id}`} > {option.name}
                        <input onClick={() => handleDeleting(option.id, option.name)} value={option.id_base_service} checked type="checkbox" {...register(id)}></input>
                    </label>
                ))}
            </div>
            )}
        </div>
    )
}