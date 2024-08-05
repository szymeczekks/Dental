import { HeaderPanel } from "../../components/Layout/HeaderPanel";

export function HistoryOfVisits() {
    const header = "Historia wizyt";
    const subheader = "Tutaj znajdziesz historię wizyt w Twoim gabinecie";
    
    return (
        <HeaderPanel header={header} subheader={subheader}>
        </HeaderPanel>
    )
}