import { HeaderPanel } from "../../components/Layout/HeaderPanel";

export function Opinions() {
    const header = "Opinie";
    const subheader = "Tutaj możesz zarządzać opiniami o Twoim gabinecie";
    
    return (
        <HeaderPanel header={header} subheader={subheader}>
        </HeaderPanel>
    )
}