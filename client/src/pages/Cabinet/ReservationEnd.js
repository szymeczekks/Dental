import { Dots } from "./Dots";

export function ReservationEnd({ reservationDone }) {
    console.log(reservationDone);
    return (
        <div className="d-f jc-c ai-c h-100">
            {
                reservationDone ? 
                <div className="d-f fd-c gap-s">
                    <p className="fw-500 txt-m"> Zarejestrowano pomyślnie! </p> 
                    <div className="comp_border p-10 d-f fd-c gap-s">
                        <div>
                            <span className="txt-s">Usługa: </span><span className="txt-xs fw-500">{ reservationDone.name }</span>
                        </div>
                        <div>
                            <span className="txt-s">Dzień: </span><span className="txt-xs fw-500">{ reservationDone.day }</span>
                        </div>
                        <div>
                            <span className="txt-s">Godzina: </span><span className="txt-xs fw-500">{ reservationDone.hour }</span>
                        </div>
                        <div>
                            <span className="txt-s">Lekarz: </span><span className="txt-xs fw-500">{ reservationDone.employee_name }</span>
                        </div>
                    </div>
                    <button> Moje wizyty </button>
                    <button> Strona gabinetu </button>
                </div>
                :
                <div>
                    <p className="fw-500 txt-m"> Twoja rezerwacja jest w trakcie przetwarzania :) </p>
                    <p className="fw-500 txt-m txt-c"> <Dots/> </p>
                </div>
            }
        </div>
    );
}