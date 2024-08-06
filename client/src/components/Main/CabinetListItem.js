export function CabinetListItem({item}) {
    return (
        <div className="d-f m-b-10 gap-s comp_border p-10">
            <div className="cabinet_image"></div>
            <div className="d-f fd-c f-1 gap-s jc-sb p-x-10">
                <p className="fw-500 txt-m">{item.name}</p>
                <div className="d-f gap-s"><i className="fa-solid fa-location-dot"></i><p>{item.street} {item.address}, {item.city}</p></div>
            </div>
            <div className="d-f fd-c gap-s jc-e">
                <button>Zajrzyj do nas</button>
                <button>Umów się na wizytę</button>
            </div>
        </div>
    )
}