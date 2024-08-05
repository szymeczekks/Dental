import { HeaderPanel } from "../../components/Layout/HeaderPanel";

export function Accessibility() {
    const header = "Dostępności";
    const subheader = "Tutaj możesz zarządzać dostępnością Twojego gabinetu";
    
    return (
        <HeaderPanel header={header} subheader={subheader}>
        </HeaderPanel>
    )
}