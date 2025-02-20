import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppContext } from "./store/app.context";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./config/firebase-config";
import { getUserData } from "./services/users.service";
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './views/Home/Home';
import NotFound from './components/NotFound/NotFound';
import Register from "./views/Register/Register";
import Login from "./views/Login/Login";
import SingleUser from "./views/SingleUser/SingleUser";
import EditUser from "./views/EditUser/EditUser";
import './App.css';
import CreatePost from './views/CreatePost/CreatePost';
import SinglePost from './views/SinglePost/SinglePost';
import AdminDashboard from './views/AdminDashboard/AdminDashboard';
import AdminRoute from './hoc/AdminRoute/AdminRoute';

export default function App() {
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
    if (!user) return;

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
      <AppContext.Provider value={{ ...appState, setAppState }}>
        <Header></Header>
        <div id="body-id">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/posts/:id" element={<SinglePost />} />
            <Route path="/users/:uid/edit" element={<EditUser />} />
            <Route path="/users/:uid" element={<SingleUser />} />
            <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer></Footer>
      </AppContext.Provider>
    </BrowserRouter>
  )
}