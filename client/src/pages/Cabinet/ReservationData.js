import { Form } from "../../components/Form/Form";
import { RenderInputs } from "../../components/Form/renderInputs";
import { HeaderPanel } from "../../components/Layout/HeaderPanel";
import { formReservation } from "../../utilities/forms";

export function ReservationData({ service, setReservationDone }) {

    const header = "Dane pacjenta";
    const subheader = "Tutaj podaj dane wymagane do dokonania rezerwacji";

    function after_reservation( data ) {
        setReservationDone( {
            name: service.service_name,
            day: service.day,
            hour: service.hour,
            employee_name: service.employee_name,
        } );
    }

    return (
        <HeaderPanel header={header} subheader={subheader}>
            <Form path="/send_reservation" values={ service } update={after_reservation} >
                <RenderInputs inputs={formReservation}/>
            </Form>
        </HeaderPanel>
    );
}