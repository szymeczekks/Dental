import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function ManageableListItem({item, path, delete_function, missing_items = []}) {
    const [ missing, setMissing ] = useState(null);
    const { header, subheader, id } = item;

    useEffect(() => {
        if ( missing_items.length === 0 ) return; 
        const missing_arr = [];
        for (const key in missing_items) {
            const element = missing_items[key];
            if (!element) missing_arr.push(key);
        }
        if (missing_arr.length !== 0) setMissing(missing_arr);
    }, []);

    return (
        <div className="d-f jc-sb ai-c shadow-m p-10 br-10 m-b-10 p-r">
            {missing && <span className="p-a warning_tag">!</span>}
            <div className="d-f fd-c gap-s">
                <span className="fw-500">{header}</span>
                {subheader && <span>{subheader}</span>}
            </div>
            <div className="d-f gap-s">
                <button><Link to={`${path}/${id}`}>Edytuj</Link></button>
                <button onClick={delete_function}>Usuń</button>
            </div>
        </div>
    )
}