import { useParams } from "react-router-dom";

export function Cabinet() {
    const { cabinetId } = useParams();

    console.log(cabinetId);
    return (
        <>Cabinet {cabinetId}</>
    )
}