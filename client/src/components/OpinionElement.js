import { useState, useRef } from 'react';
import { postRequest } from './../functions/Functions';
import { toast } from 'react-toastify';
import { Button } from './Button';

export function OpinionElement({ opinion, purpose }) {
    const [ status, setStatus ] = useState( opinion.status );
    const notify = (text) => toast.success(text);
    const buttonRef = useRef(null);
    
    async function toggleStatus( id ) {
        try {
            console.log("click");
            buttonRef.current.setLoading( true );
            const update = await postRequest('/update-opinion', { id: id, status: !status });
            buttonRef.current.setLoading( false );
            notify(update.message);
            setStatus( prev => !prev);
            buttonRef.current.setVariant( !status ? 'white' : '' );
            buttonRef.current.setText( !status ? 'Ukryj opinię' : 'Odkryj opinię' );
        } catch (err) {
            console.log(err);
        }
    }

    console.log(status);
    console.log(status ? 'white' : '');

    return (
        <>
            { (!status && purpose === 'front') ? '' :
                <div className="comp_border p-10 d-f fd-c gap-s">
                    <p className="fw-500 txt-xs">{opinion.name} {opinion.surname}</p>
                    <p className="txt-m"> {opinion.content} </p>
                    {purpose === 'admin' && <Button ref={buttonRef} initialText={ status ? 'Ukryj opinię' : 'Odkryj opinię' } initialVariant={ status ? 'white' : '' } onClick={() => toggleStatus(opinion.id)} />}
                </div>
            }
        </>
    )
}