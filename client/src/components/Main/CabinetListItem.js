import { Link } from "react-router-dom";
import { CabinetsListContext } from '../../Context/CabinetsList';
import { useContext } from "react";

export function CabinetListItem() {
    const { cabinets, setCabinets, setFilters, filters } = useContext(CabinetsListContext);

    // console.log(cabinets);

    return (
        filters?.map(item => { 
            return <div key={item.id} className="d-f m-b-10 gap-s comp_border p-10">
            <div className="cabinet_image"></div>
            <div className="d-f fd-c f-1 gap-s jc-sb p-x-10">
                <p className="fw-500 txt-m">{item.name}</p>
                <div className="d-f gap-s"><i className="fa-solid fa-location-dot"></i><p>{item.street} {item.address}, {item.city}</p></div>
            </div>
            <div className="d-f fd-c gap-s jc-e">
                <button><Link to={`/cabinet/${item.id}`}>Zajrzyj do nas</Link></button>
                <button><Link to={`/cabinet/${item.id}/book`}>Umów się na wizytę</Link></button>
            </div>
        </div>
        
        })
    )
}