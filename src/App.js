import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import React, {useState} from "react";
import NavbarComponent from "./componets/navbar/NavbarComponent";
import Tasks from "./componets/pages/tasks/Tasks";
import Board from "./componets/board/Board";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';


function App() {
    return (
        <div className="App">
            <NavbarComponent/>
            <Routes>
                <Route path='/tasks' element={<Tasks/>}/>
            </Routes>
            <Board />
        </div>


    );
}

export default App;
