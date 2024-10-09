import { Link, useParams } from "react-router-dom";
import { SplitPanel } from "../../components/Layout/SplitPanel";
import { LandingPage } from "../../components/Layout/LandingPage";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from './../../Context/Auth';

export function Cabinet() {
    const { authState: { userInfo } } = useContext(AuthContext);
    const { cabinetId } = useParams();
    const [ cabinet, setCabinet ] = useState(null);

    useEffect(() => {
        axios.get(`/get-cabinet/${cabinetId}`)
            .then(response => {
                setCabinet(response.data);
            })
            .catch(err => {
                console.log(err);
                console.log(err.response.data);
            });
    }, []);

    const Left = () => 
    <div className="d-f fd-c gap-s">  
        <h2 className="txt-xl fw-500">{cabinet?.name}</h2>
        <p><span className="fw-500">Adres:</span> ul. {cabinet?.street} {cabinet?.address}, {cabinet?.city}</p>
        <h3 className="fw-500 m-y-5">Godziny otwarcia</h3>
        <p><span className="fw-500">Pn-pt:</span> 10:00 - 18:00</p>
        <p><span className="fw-500">Sob:</span> 10:00 - 14:00</p>
        <p><span className="fw-500">Ndz</span> Nieczynne</p>
        <button><Link to={`/cabinet/${cabinetId}/book`}>Umów się na wizytę</Link></button>
        <button><Link to={`/add-opinion`} state={{
            cabinet_id: cabinetId,
            user_id: userInfo?.id
        }}>Napisz opinię</Link></button>
    </div>;
    const Right = () => <LandingPage cabinetId={cabinetId} />;


    return (
        <SplitPanel right={<Right/>} left={<Left/>} />
    )
}