import { BrowserRouter, Route, Routes } from 'react-router-dom'

import React, { useState } from 'react';

import Home from './pages/Home';
import Login from './pages/Login';
import Reg from './pages/Reg';
import ProtectedRoute from './pages/ProtectedRoute';
import SubGred from './pages/SubGreddiit';
import MySubGred from './pages/MySubGreddiit';
import Temp from './pages/Temp';


// /*backend*/


function App() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <BrowserRouter>
    <Routes>
        <Route exact path='/' 
          element={currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Reg onFormSwitch={toggleForm} />
        } />
        <Route element={<ProtectedRoute />}>
          <Route path='/home' element={<Home />} />
          <Route path='/subgreddiit' element={<SubGred />} />
          <Route path='/mysubgreddiit' element={<MySubGred />} />
          <Route path='/mysubgreddiit/temp' element={<Temp />} />
          {/* <Route path='/subgreddiit_users' element={<Temp1 />} />
          <Route path='/joiningreqpage' element={<Temp2 />} />
          <Route path='/stats' element={<Temp3 />} />
          <Route path='/reportedpage' element={<Temp4 />} /> */}
        </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;