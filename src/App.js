import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import React, {useState} from "react";
import NavbarComponent from "./componets/navbar/NavbarComponent";
import Tasks from "./componets/pages/tasks/Tasks";
import Home from "./componets/pages/home/Home";
import Board from "./componets/pages/board/Board";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';


function App() {
    return (
        <div className="App">
            <NavbarComponent/>
            <Routes>
                <Route path='/home' exact element={<Home/>}/>
                <Route path='/tasks' element={<Tasks/>}/>
                <Route path='/board' element={<Board/>}/>
            </Routes>
        </div>
    );
}

export default App;
