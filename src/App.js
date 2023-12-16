import React, {useEffect, useState} from 'react';
import './styles/App.css'
import "./styles/Omnes Regular.ttf"
import {BrowserRouter} from "react-router-dom";
import Navbar from "./components/UI/Navbar/Navbar";
import AppRouter from "./components/UI/AppRouter";
import {AuthContext} from "./context";


function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  
  useEffect(() => {
    if(localStorage.getItem('auth')) {
      setIsAuth(true);
    }
    setIsLoading(false);
  }, []);
  
  
  return (
    <AuthContext.Provider value={{
      isAuth,
      setIsAuth,
      isLoading
    }}>
      <BrowserRouter>
        <Navbar/>
        <AppRouter />
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App;
