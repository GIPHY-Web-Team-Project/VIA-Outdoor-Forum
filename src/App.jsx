import React from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './views/Home/Home';
import NotFound from './components/NotFound/NotFound';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./views/Register/Register";
import { AppContext } from "./store/app.context";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./config/firebase-config";
import { getUserData } from "./services/users.service";
import './App.css';

export default function App()  {
    const [appState, setAppState] = useState({
        user: null,
        userData: null,
    });

    const [user, loading, error] = useAuthState(auth);
    
      if (appState.user !== user) {
        setAppState({
          ...appState,
          user,
        });
      }
    
      useEffect(() => {
        if(!user) return;
    
        getUserData(appState.user.uid)
        .then(data => {
          const userData = data[Object.keys(data)[0]];
          setAppState({
            ...appState,
            userData,
          });
        })
        .catch(error => {
          console.log(error);
        });
      }, [user]);

    return (
      <BrowserRouter>
          <Header></Header>
          <div id="body-id">
              <AppContext.Provider value={{ ...appState, setAppState }}>
                  <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="*" element={<NotFound/>} />          
                  </Routes>
              </AppContext.Provider>
          </div>
          <Footer></Footer>
      </BrowserRouter>
    )
}