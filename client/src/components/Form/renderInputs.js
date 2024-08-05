import { Input } from "./Input";
import { SelectMultiple } from "./SelectMultiple";
import { Checkbox } from "./Checkbox";
import { Toggle } from "./Toggle";
import { Select } from "./Select";

const inputMap = {
    'select-multiple': SelectMultiple,
    'select': Select,
    'checkbox': Checkbox,
    'toggle': Toggle,
    'text': Input,
    'email': Input,
    'password': Input,
    'number': Input
}

function RenderInput({input, errors, register, values}) {
    const Input = inputMap[input.type];
    return (<Input key={input.id} errors={errors} register={register} {...((input.type==='checkbox' || input.type==='toggle') && {defaultChecked: values[input.id]})} {...input}/>);
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