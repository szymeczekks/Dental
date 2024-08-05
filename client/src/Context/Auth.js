import React, { createContext, useState } from 'react';

const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
    const token = localStorage.getItem('token');
    const userInfo = localStorage.getItem('userInfo');
    const expiresAt = localStorage.getItem('expiresAt');

    const [authState, setAuthState] = useState({
        token,
        expiresAt,
        userInfo: userInfo ? JSON.parse(userInfo) : null
    });

    const setAuthInfo = ({ token, userInfo, expiresAt }) => {
        localStorage.setItem('token', token);
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        localStorage.setItem('expiresAt', expiresAt);
        setAuthState({
            token,
            userInfo,
            expiresAt
        });
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('expiresAt');
        localStorage.removeItem('userInfo');

        setAuthState({
            token: null,
            expiresAt: null,
            userInfo: null
        });

        // history.push('/');
    }

    const isAuthenticated = () => {
        if (!authState.token || !authState.expiresAt) {
            return false;
        }

        return new Date().getTime() / 1000 < authState.expiresAt;
    }

    return (
        <Provider value={{
            authState,
            setAuthState: setAuthInfo,
            isAuthenticated,
            logout
        }}>
            {children}
        </Provider>
    )
}

export { AuthContext, AuthProvider };