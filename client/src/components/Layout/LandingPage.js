import { useEffect, useState } from "react";
import { HeaderPanel } from "./HeaderPanel";
import axios from "axios";
import { OpinionsList } from "../OpinionsList";

export function LandingPage ({cabinetId}) {
    const header = "Opinie";
    const [ opinions, setOpinions ] = useState(null);

    useEffect(() => {
        axios.get(`/get-opinions/${cabinetId}`)
        .then( response => {
            setOpinions(response.data);
            console.log(response.data);
        })
        .catch( err => {
            console.log(err);
        })
    }, []);
    return (
        <>
            <h2 className="txt-xl fw-500">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor, eos!</h2>
            <p className="txt-s">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro, repudiandae modi. Enim placeat veritatis voluptatem aliquam sapiente esse. Iure laudantium illo libero at nemo consequuntur temporibus adipisci magnam ut quis unde, deleniti quas culpa esse placeat delectus minima sed numquam eum earum fuga animi quod. Voluptatem qui mollitia ab quisquam vitae numquam impedit doloremque, beatae facere cum excepturi consequuntur amet assumenda vero porro laudantium unde nisi earum ratione fugiat natus hic. Fugiat adipisci pariatur repudiandae saepe ea tempora corporis cumque labore eos nulla. Doloremque soluta, voluptatum eos officia voluptates at pariatur natus mollitia similique earum corporis ratione, alias deleniti? Ad!</p>
            <h2 className="txt-xl fw-500">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor, eos!</h2>
            <p className="txt-s">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro, repudiandae modi. Enim placeat veritatis voluptatem aliquam sapiente esse. Iure laudantium illo libero at nemo consequuntur temporibus adipisci magnam ut quis unde, deleniti quas culpa esse placeat delectus minima sed numquam eum earum fuga animi quod. Voluptatem qui mollitia ab quisquam vitae numquam impedit doloremque, beatae facere cum excepturi consequuntur amet assumenda vero porro laudantium unde nisi earum ratione fugiat natus hic. Fugiat adipisci pariatur repudiandae saepe ea tempora corporis cumque labore eos nulla. Doloremque soluta, voluptatum eos officia voluptates at pariatur natus mollitia similique earum corporis ratione, alias deleniti? Ad!</p>
            <h2 className="txt-xl fw-500">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor, eos!</h2>
            <p className="txt-s">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro, repudiandae modi. Enim placeat veritatis voluptatem aliquam sapiente esse. Iure laudantium illo libero at nemo consequuntur temporibus adipisci magnam ut quis unde, deleniti quas culpa esse placeat delectus minima sed numquam eum earum fuga animi quod. Voluptatem qui mollitia ab quisquam vitae numquam impedit doloremque, beatae facere cum excepturi consequuntur amet assumenda vero porro laudantium unde nisi earum ratione fugiat natus hic. Fugiat adipisci pariatur repudiandae saepe ea tempora corporis cumque labore eos nulla. Doloremque soluta, voluptatum eos officia voluptates at pariatur natus mollitia similique earum corporis ratione, alias deleniti? Ad!</p>
            <h2 className="txt-xl fw-500">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor, eos!</h2>
            <p className="txt-s">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro, repudiandae modi. Enim placeat veritatis voluptatem aliquam sapiente esse. Iure laudantium illo libero at nemo consequuntur temporibus adipisci magnam ut quis unde, deleniti quas culpa esse placeat delectus minima sed numquam eum earum fuga animi quod. Voluptatem qui mollitia ab quisquam vitae numquam impedit doloremque, beatae facere cum excepturi consequuntur amet assumenda vero porro laudantium unde nisi earum ratione fugiat natus hic. Fugiat adipisci pariatur repudiandae saepe ea tempora corporis cumque labore eos nulla. Doloremque soluta, voluptatum eos officia voluptates at pariatur natus mollitia similique earum corporis ratione, alias deleniti? Ad!</p>

<br/>
<br/>
<br/>
            <HeaderPanel header={header}>
                {opinions ? <OpinionsList opinions={opinions} purpose='front' /> : 'Loading...'}
            </HeaderPanel>
        </>
    )
}