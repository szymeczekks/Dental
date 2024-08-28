import { Input } from "./Input";
import { SelectMultiple } from "./SelectMultiple";
import { SelectMultipleTags } from "./SelectMultipleTags";
import { Checkbox } from "./Checkbox";
import { Toggle } from "./Toggle";
import { Select } from "./Select";
import { WorkingHours } from "./WorkingHours";

const inputMap = {
    'select-multiple': SelectMultiple,
    'select-multiple-tags': SelectMultipleTags,
    'select': Select,
    'checkbox': Checkbox,
    'toggle': Toggle,
    'text': Input,
    'email': Input,
    'password': Input,
    'number': Input,
    'hours': WorkingHours
}

function get_default_checked(type, data) {
    switch (type) {
        case 'checkbox' : 
        case 'toggle' : 
            return data.id;
        case 'hours':
            return data.hours;
        default:
            return false;
    }
}

function RenderInput({input, errors, register, values}) {
    const Input = inputMap[input.type];
    const defaultChecked = values && get_default_checked(input.type, values);
    return (<Input key={input.id} errors={errors} register={register} {...(defaultChecked && {defaultChecked: defaultChecked})} {...input}/>);
}

export function RenderInputs(props) {
    return props.inputs.map((input, i) => {
        if (input.length > 1) {
            return (
                <div key={i} className="d-f gap-s ai-e">
                    <RenderInputs {...props} inputs={input} />
                </div>
            );
        } else {
            return <RenderInput input={input} errors={props.errors} register={props.register} values={props.values}/>;
        }
    })
}