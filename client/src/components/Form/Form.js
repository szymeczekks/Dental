import { useForm } from "react-hook-form"
import React, { useEffect } from "react";
import { postRequest } from "../../functions/Functions";
import { toast } from 'react-toastify';

export function Form({values, children, path, objID, update}) {
    const { register, handleSubmit, formState: { errors }, reset, setError, clearErrors } = useForm({
        mode:"onBlur"
    });

    const notify = (text) => toast.success(text);

    useEffect(() => {
        reset(values);
    }, [values]);

    async function onSubmit(data) {
        console.log(data);
        // try {
        //     const response = await postRequest(path, data, objID);
        //     notify(response.message);
        //     console.log(response);
        //     update(response.data);
        //     clearErrors("general");
        //     console.log(response.message);

        // } catch (err) {
        //     console.log(err);
        //     setError("general", {message:err.data.message} );
        // }
    }

    return (
        <form noValidate onSubmit={handleSubmit(onSubmit)} className="d-f fd-c gap-s">
            
            {React.Children.map(children, child => {
                return React.createElement(child.type, {
                    ...{
                    ...child.props,
                    register: register,
                    errors: errors,
                    key: child.props.name,
                    values: values
                    }
                })
            })} 
            

            {/* {inputs.map((input, i) => {
                if (input.type === 'select-multiple') {
                    return <SelectMultiple key={input.id} register={register} name={input.name} options={input.options[0]} id={input.id}/>
                }

                if (input.type === 'checkbox') {
                    return <Checkbox key={input.id} register={register} id={input.id} idGeneral={input.id} name={input.name} defaultChecked={values[input.id]}/>
                }

                if (input.type === 'toggle') {
                    return <Toggle key={input.id} register={register} idGeneral={input.id} values={input.values} name={input.name} defaultChecked={values[input.id]}/>
                }

                if (input.length > 1) {
                    return (
                        <div key={i} className="d-f gap-s ai-e">
                            {input.map(inputNested => {
                                if (inputNested.type === 'select-multiple') {
                                    return <SelectMultiple key={inputNested.id} register={register} name={inputNested.name} options={inputNested.options[0]} id={inputNested.id}/>
                                }
                                return (
                                    <Input key={inputNested.id} errors={errors} register={register} id={inputNested.id} placeholder={inputNested.placeholder} type={inputNested.type} label={inputNested.label} config={inputNested.config}/>
                                )
                            })}
                        </div>
                    )
                } else {
                    return <Input key={input.id} errors={errors} register={register} id={input.id} placeholder={input.placeholder} type={input.type} label={input.label} config={input.config}/>
                }
            })} */}

            <div className="formFooter p-r">
                <button>Wyślij</button>
                {errors.general && <span className="generalError">{errors.general.message}</span>}
            </div>
        </form>
    )
}