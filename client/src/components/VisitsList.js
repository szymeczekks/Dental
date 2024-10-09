import {Link} from 'react-router-dom';

export function VisitsList({ visits, target }) {

    return (
        <div className="d-f fd-c gap-s">
            {visits.map( visit => 
                <div className="comp_border p-10 d-f fd-c gap-s">
                    <div className="fw-500 txt-m"> Wizyta w gabinecie {visit.cabinet_name} </div>
                    <div className="d-f gap-s ai-c comp_border p-10">
                        <div className=" f-1 d-f fd-c gap-s">
                            <div> 
                                <p className="fw-500 txt-xs">Zabieg:</p>
                                <p>{visit.service_name}</p> 
                            </div>
                            <div> 
                                <p className="fw-500 txt-xs">Kiedy:</p> 
                                {console.log(new Date(visit.date).toLocaleString())}
                                <p> {new Date(visit.date).toLocaleString()} </p>
                            </div>
                            <div> 
                                <p className="fw-500 txt-xs">Gdzie:</p> 
                                <p> {visit.cabinet_city} </p>
                                <p> ul. {visit.cabinet_street} {visit.cabinet_address} </p>
                            </div>
                        </div>
                        <div className="f-1 d-f gap-s jc-e">
                            <div className="d-f fd-c jc-e gap-s">
                                <div className="d-f gap-s jc-e">
                                    <p>{visit.employee_phone}</p>
                                    <i className="fa-solid fa-phone"></i>
                                </div>
                                <div className="d-f gap-s jc-e">
                                    <p>{visit.employee_email}</p>
                                    <i className="fa-regular fa-envelope"></i>
                                </div>
                            </div>
                            <div>
                                <div className="fake-image comp_border p-r">
                                    <div className="txt-c fake-image-title p-a txt-xs w-100 p-5 d-f ai-c jc-c">{visit.employee_name}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    { 
                        new Date(visit.date).getTime() > new Date().getTime() ?
                        <div className="d-f fd-c gap-s ai-s">
                            <button>Odwołaj wizytę</button>
                        </div> :
                        <div className="d-f fd-c gap-s ai-s">
                            <p className="fw-500 accept"> Wizyta odbyła się </p>
                            {/* {target === 'user' && <button><Link to='/add-opinion' state={{
                                service: visit.service_name,
                                cabinet_id: visit.cabinet_id,
                                user_id: visit.user_id
                            }}>Dodaj opinię</Link></button>} */}
                        </div>
                    }
                </div>
            )}
        </div>
    )
}