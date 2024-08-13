import { SplitPanel } from '../../components/Layout/SplitPanel';
import { CabinetListItem } from '../../components/Main/CabinetListItem';
import { Filters } from '../../components/Main/Filters';
import { CabinetsListProvider } from '../../Context/CabinetsList';

function Home() {

    const Left = () => <Filters/>;
    const Right = () => <CabinetListItem/>;

    return (
        <CabinetsListProvider>
            <SplitPanel right={<Right/>} left={<Left/>} />
        </CabinetsListProvider>
    )
}
export default Home;