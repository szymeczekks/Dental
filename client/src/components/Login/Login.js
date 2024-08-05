import React, { useContext, useEffect, useState } from 'react';
import { Form } from '../Form/Form';
import { formRegister, formLogin } from '../../utilities/forms';
import { HeaderPanel } from '../Layout/HeaderPanel';
import axios from 'axios';
import './login.css';
import { AuthContext } from '../../Context/Auth';
import { RenderInputs } from '../Form/renderInputs';

function Login() {
    const { authState: { userInfo, token, expiresAt }, setAuthState } = useContext(AuthContext);
    const header = "Rejestracja - pierwszy krok do uśmiechu!";
    const subheader = "Uzupełnij wymagane pola";
    const header2 = "Witaj!";

    const updateInfo = (userInfo) => {
        setAuthState({ token, userInfo, expiresAt });
    }

    const authContext = useContext(AuthContext);
    const authState = authContext.authState;
    const [logOrSignToggle, setLogOrSignToggle] = useState(true);

    const clearInputs = () => {
        const inputs = document.querySelectorAll('.inputsWrapper input').forEach(input => {
            input.value = '';
        })
    };

    const logout = () => {
        //logout
        localStorage.removeItem('token');
    }

    return (
        <div className='login shadow-l'>
            <div className='form-wrapper'>
            {
                logOrSignToggle ? (
                    <HeaderPanel header={header} subheader={subheader}>
                        <Form values={userInfo} path="/register" update={() => {}} >
                            <RenderInputs inputs={formRegister}/>
                        </Form>  
                    </HeaderPanel>
                ) : (
                    !authState.userInfo ? (
                        <HeaderPanel header={header2} subheader={subheader}>
                            <Form values={userInfo} path="/login" update={updateInfo} >
                                <RenderInputs inputs={formLogin}/>
                            </Form>  
                        </HeaderPanel>
                    ) : (
                        <div className='inputsWrapper'>
                            <h5>Witaj {authState.userInfo.username}!</h5>
                            <button onClick={logout}>Wyloguj się</button>
                        </div>
                    )
                )
                
            }
            {!authState.userInfo && 
            <p className='link' onClick={() => {setLogOrSignToggle(!logOrSignToggle);clearInputs()}}>{logOrSignToggle ? ("Masz już konto?") : ("Załóż konto")}</p>
            }
            </div>
            <div className='image-wrapper'>
                <img src={require('../../images/login.jpg')} alt=''></img>
            </div>
        </div>
    )
}

export default Login;