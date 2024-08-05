import './SplitPanel.css';

export function SplitPanel({left, right}) {
    return (
        <div className="d-f gap-s p-10 split-panel">
            <div className="left-side d-f fd-c p-15 comp_border">{left}</div>
            <div className="right-side p-15 comp_border">{right}</div>
        </div>
    )
}