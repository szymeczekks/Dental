import './App.css';
import { useEffect, useState } from 'react';
import { CabinetProvider } from './Context/Cabinet';
import { AuthProvider } from './Context/Auth';
import Home from './pages/Home/home';
import User from './pages/User/user';
import Panel from './pages/Panel/Panel';
import {Cabinet} from './pages/Cabinet/Cabinet';
import {Book} from './pages/Cabinet/Book';
import {Account} from './pages/Account';
import {Notifications} from './pages/Notifications';
import {Visits} from './pages/Visits';
import {EditEmployee} from './pages/Panel/EditEmployee';
import {Employee} from './pages/Panel/Employee';
import {AddEmployee} from './pages/Panel/AddEmployee';
import {AddServices} from './pages/Panel/AddServices';
import {EditServices} from './pages/Panel/EditServices';
import {Service} from './pages/Panel/Service';
import {Informations} from './pages/Panel/Informations';
import {Accessibility} from './pages/Panel/Accessibility';
import {Opinions} from './pages/Panel/Opinions';
import {VisitsPlanned} from './pages/Panel/VisitsPlanned';
import {VisitsToAccept} from './pages/Panel/VisitsToAccept';
import {HistoryOfVisits} from './pages/Panel/HistoryOfVisits';
import AddCabinet from './pages/AddCabinet/AddCabinet';
import axios from 'axios';
import TopNavBar from './components/topNavBar/TopNavBar';
import { BrowserRouter as Router, Route, Routes, Link, BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  // useEffect(() => {
  //   axios.get('/isUserAuth', {
  //     headers: {
  //       'x-access-token': localStorage.getItem('token')
  //     }
  //   })
  //     .then(response => {
  //       if (response.data.isAuth) {
  //         const userData = response.data.userData.data;
  //         //setUser(userData);
  //       } else {
  //         //setUser(false);
  //       }
  //     })
  // }, []);

  return (
    <div className='App p-10'>
      <BrowserRouter>
        <AuthProvider>
          <TopNavBar />
          <div className='content container shadow-m'>
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="user" element={<User />}>
                <Route index element={<Account/>} />
                <Route path="account" element={<Account/>} />
                <Route path="notifications" element={<Notifications/>} />
                <Route path="visits" element={<Visits/>} />
              </Route>
              <Route path="/add-cabinet" element={<AddCabinet />}></Route>
              <Route path="/cabinet/:cabinetId" element={<Cabinet/>}>
              </Route>
              <Route path="/cabinet/:cabinetId/book" element={<Book/>}/>
            </Routes>
            <CabinetProvider>
              <Routes>
                <Route path="/panel" element={<Panel />}>
                  <Route index element={<EditEmployee/>} />
                  <Route path="edit-employee" element={<EditEmployee/>}> 
                    <Route path=":employeeId" element={<Employee/>} />
                  </Route>
                  <Route path="add-employee" element={<AddEmployee/>}/>
                  <Route path="add-services" element={<AddServices/>} />
                  <Route path="edit-services" element={<EditServices/>} >
                    <Route path=":serviceId" element={<Service/>} />
                  </Route>
                  <Route path="informations" element={<Informations/>} />
                  <Route path="accessibility" element={<Accessibility/>} />
                  <Route path="opinions" element={<Opinions/>} />
                  <Route path="visits-planned" element={<VisitsPlanned/>} />
                  {/* <Route path="visits-to-accept" element={<VisitsToAccept/>} /> */}
                  <Route path="history-of-visits" element={<HistoryOfVisits/>} />
                </Route>
              </Routes>
            </CabinetProvider>
          </div>
        </AuthProvider>
      </BrowserRouter>
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" />
    </div>
  )
}
export default App