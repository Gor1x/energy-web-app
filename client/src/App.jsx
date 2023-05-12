import { React, useState, useEffect } from 'react';
import 'react-tabs/style/react-tabs.css';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { useAuth, logout } from './auth'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const App = () => {
    const [logged] = useAuth()

    return (
        <div className="app">
            <BrowserRouter>
                <div className='header' style={{ 'position': 'relative' }}>
                    <div style={{ 'float': 'left', 'maxHeight': '50px' }}>
                        <img height="50" src="icsenergy-logo.png" />
                    </div>
                    <div style={{ 
                        'float': 'right', 
                        'maxHeight': '50px'
                        }}>
                        {logged ?
                            <a href="#" onClick={() => { logout() }}>Выйти</a> :
                            <div>
                                <Link to="/login">Войти</Link>
                                {" | "}
                                <Link to="/signup">Зарегистрироваться</Link>
                            </div>
                        }
                    </div>
                </div>
                <div className="body">
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/signup" element={<SignUpPage />} />
                        <Route path="/" element={<HomePage />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    )
}

export default App;