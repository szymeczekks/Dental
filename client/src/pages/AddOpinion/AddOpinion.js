import { useLocation, useNavigate  } from 'react-router-dom';
import { Form } from '../../components/Form/Form';
import { RenderInputs } from '../../components/Form/renderInputs';
import { formOpinion } from "../../utilities/forms";
import { useState } from 'react';

export function AddOpinion() {
    const location = useLocation();
    const [ opinionSent, setOpinionSent ] = useState(false);
    let navigate = useNavigate();

    function afterSend() {
        setOpinionSent(true);
    }

    return (
        <div className='p-10'>
            {opinionSent ? 
            <div className='txt-c d-f fd-c ai-c gap-s'> 
            Dziękujemy za przesłanie opinii! 
            <button onClick={() => navigate(-1)}>Powrót</button>
            </div> :
            <Form path="" values={ location.state } update={afterSend} >
            <RenderInputs inputs={formOpinion}/>
        </Form>
            }
        </div>
    )
}