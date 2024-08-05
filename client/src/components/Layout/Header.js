import './Header.css';

export function Header ({header, subheader}) {
    return (
        <div className="header">
            <h2 className="txt-xl fw-500">{header}</h2>
            <p className="txt-xs">{subheader}</p>
        </div>
    )
}