import React from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './views/Home/Home';
import NotFound from './components/NotFound/NotFound';
import './App.css';
export default function App()  {
    return (
        <BrowserRouter>
            <Header></Header>
            <div id="body-id">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="*" element={<NotFound/>} />
                </Routes>
            </div>
            <Footer></Footer>
        </BrowserRouter>
    )
}