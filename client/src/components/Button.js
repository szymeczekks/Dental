import { useState, useImperativeHandle, forwardRef } from "react";

export const Button = forwardRef(({ onClick, initialText, initialVariant }, ref) => {
    const [variant, setVariant] = useState(initialVariant);
    const [text, setText] = useState(initialText);
    const [loading, setLoading] = useState(false);

    useImperativeHandle(ref, () => ({
        setText: (newText) => setText(newText),
        setVariant: (variant) => setVariant(variant),
        setLoading: (loading) => setLoading(loading),
    }));

    return (
        <div className="p-r d-ib as-e">
            <div className={`button-loader ${loading ? 'is-loading' : ''} w-100 h-100 ai-c jc-c p-a`}><span className="p-r"><span className="p-a"></span></span></div>
            <button onClick={onClick} className={variant}>{text}</button>
        </div>
    )
})