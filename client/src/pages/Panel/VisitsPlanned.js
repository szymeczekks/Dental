import { HeaderPanel } from "../../components/Layout/HeaderPanel";

export function VisitsPlanned() {
    const header = "Wizyty zaplanowane";
    const subheader = "Tutaj możesz zarządzać przyszłymi wizytami";
    
    return (
        <HeaderPanel header={header} subheader={subheader}>
        </HeaderPanel>
    )
}