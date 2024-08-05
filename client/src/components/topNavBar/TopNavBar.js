import React, { useState, useEffect, useContext } from 'react';
import {Link} from 'react-router-dom';
import { AuthContext } from '../../Context/Auth';
import './TopNavBar.css';
import Login from '../Login/Login';

function TopNavBar() {
  const { authState, logout } = useContext(AuthContext);
  const [openLoginModule, setOpenLoginModule] = useState(false);

  useEffect(() => {

    const handleClickOutside = (e) => {
      if (openLoginModule && !e.target.closest('.topNavBar')) {
        setOpenLoginModule(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    }
  }, [openLoginModule]);

  const toggleLoginModule = () => {
    setOpenLoginModule(!openLoginModule);
  }

  function toggleList(e) {
    e.currentTarget.classList.toggle('show_list');
  }

  return (
    <div className='topNavBar shadow-m container p-10'>
      <div className='logo d-f ai-c'><Link className='txt-xl fw-600' to='/'>DENTASTICK</Link></div>
      {authState.userInfo ? (
        <NavUser user={authState.userInfo} toggleList={toggleList} logout={logout} />
      ) : (
        <button onClick={toggleLoginModule}>Zaloguj/zarejestruj</button>
      )}
      {openLoginModule && (<Login />)}
    </div>
  )
}


function NavUser({ user, toggleList, logout }) {
  return (
    <div className='nav-user d-f gap-s ai-c txt-l link p-r' onClick={(e) => toggleList(e)}>
      <i className="fa-regular fa-user txt-xl"></i>
      <div className='nav-userName'>
        <p className='fw-500'>{user.username}</p>
        <p className='txt-xs'>{user.role}</p>
      </div>
      <i className="fa-solid fa-angle-down"></i>
      <div className='user-list p-a shadow-m'>
        <ul>
          <li className='p-r hover-slide'><Link className='d-f gap-s p-r' to='/user'><i className=" txt-m fa-regular fa-circle-user"></i>Konto</Link></li>
          <li className='p-r hover-slide'><Link className='d-f gap-s p-r' to='/settings'><i className=" txt-m fa-solid fa-sliders"></i>Ustawienia</Link></li>
          {user.role === 'user' && <NavCabinet path='/add-cabinet' text='Dodaj swój gabinet'/>} 
          {user.role === 'właściciel' && <NavCabinet path='/panel' text='Mój gabinet'/>}
          {user.role === 'pracownik' && <NavCabinet path='/dentist-panel' text='Mój panel'/>}
          <li onClick={logout} className='d-f gap-s p-r hover-slide'><i className=" txt-m fa-solid fa-arrow-right-from-bracket"></i><p>Wyloguj się</p></li>
        </ul>
      </div>
    </div>
  );
}

function NavCabinet({ path, text }) {
  return (
    <li className='p-r hover-slide'><Link className='d-f gap-s p-r' to={path}><i className=" txt-m fa-solid fa-plus"></i>{text}</Link></li>
  );
}

export default TopNavBar;