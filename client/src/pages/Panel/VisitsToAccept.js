import { HeaderPanel } from "../../components/Layout/HeaderPanel";

export function VisitsToAccept() {
    const header = "Wizyty do akceptacji";
    const subheader = "Tutaj znajdziesz wizyty, które oczekują na decyzję";
    
    return (
        <HeaderPanel header={header} subheader={subheader}>
        </HeaderPanel>
    )
}