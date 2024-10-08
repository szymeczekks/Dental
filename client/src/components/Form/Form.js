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
        // console.log(data);
        try {
            const response = await postRequest(path, data, objID);
            notify(response.message);
            console.log(response);
            update(response.data);
            clearErrors("general");
            console.log(response.message);

        } catch (err) {
            console.log(err);
            setError("general", {message:err.data.message} );
        }
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

            <div className="formFooter p-r">
                <button>Wyślij</button>
                {errors.general && <span className="generalError">{errors.general.message}</span>}
            </div>
        </form>
    )
}