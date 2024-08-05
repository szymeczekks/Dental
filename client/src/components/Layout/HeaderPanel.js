import { Header } from "./Header";

export function HeaderPanel ({children, header, subheader}) {
    return (
        <>
            <Header header={header} subheader={subheader}/>
            {children}
        </>
    )
}