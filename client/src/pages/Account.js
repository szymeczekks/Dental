import { useContext } from 'react';
import { Form } from '../components/Form/Form';
import { formAccount } from '../utilities/forms';
import { AuthContext } from './../Context/Auth';
import { HeaderPanel } from '../components/Layout/HeaderPanel';
import { RenderInputs } from '../components/Form/renderInputs';

export function Account() {
    const { authState: { userInfo, token, expiresAt }, setAuthState } = useContext(AuthContext);
    const header = "Ustawienia konta";
    const subheader = "Tutaj możesz zmienić informacje dotyczące Twojego konta";

    const updateInfo = (userInfo) => {
        setAuthState({ token, userInfo, expiresAt });
    }

    return (
        <HeaderPanel header={header} subheader={subheader}>
            <Form values={userInfo} path="/updateUser" objID={userInfo.id} update={updateInfo} >
                <RenderInputs inputs={formAccount}/>
            </Form>
        </HeaderPanel>
    )
}