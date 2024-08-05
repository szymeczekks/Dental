import { useState, useEffect, useContext } from 'react';
import { AuthContext } from './../../Context/Auth';
import { SidePanel } from '../../components/Layout/LeftNavigation';
import { ListElement } from '../../components/ListElement';
import './user.css';
import { SplitPanel } from '../../components/Layout/SplitPanel';
import { BrowserRouter as Router, Route, Routes, Link, BrowserRouter, Outlet } from 'react-router-dom';

function User() {
    const { authState: { userInfo } } = useContext(AuthContext);

    const Left = () =>
        <SidePanel object={userInfo}>
            <ListElement name="Ustawienia konta" path="account" />
            <ListElement name="Powiadomienia" path="notifications" />
            <ListElement name="Wizyty" path="visits" />
        </SidePanel>;
    const Right = () => <Outlet/>

    return (
        <SplitPanel right={<Right/>} left={<Left/>} />
    )
}
export default User;
