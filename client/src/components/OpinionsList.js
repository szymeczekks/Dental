import { OpinionElement } from './OpinionElement';

export function OpinionsList({ opinions, purpose }) {
    return (
        <div className='d-f gap-s fd-c'>
            { (!opinions || (opinions.every((opinion) => opinion.status == 0 ) && purpose === 'front')) ? 'Brak opinii' :
                opinions.map( opinion => 
                    <OpinionElement opinion={opinion} purpose={purpose} /> 
                )
            }
        </div>
    )
}