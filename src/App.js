import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import React from "react";
import NavbarComponent from "./componets/navbar/NavbarComponent";
import Tasks from "./componets/pages/tasks/Tasks";
import {Route, Routes} from 'react-router-dom';
import Home from "./componets/pages/home/Home";


function App() {
    return (
        <div className="App">
            <NavbarComponent/>
            <Routes>
                <Route path='/tasks' element={<Tasks/>}/>
                <Route path='/' element={<Home/>}/>
            </Routes>
        </div>


    );
}

export default App;
