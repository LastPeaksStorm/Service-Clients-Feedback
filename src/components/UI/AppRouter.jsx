import React, {useContext} from 'react';
import {Route, Routes} from "react-router-dom";
import {privateRoutes, publicRoutes} from "../../router/index";
import Login from "../../pages/Login";
import Posts from "../../pages/Posts";
import {AuthContext} from "../../context";
import Loader from "./Loader/Loader";

const AppRouter = () => {
  const {isAuth, isLoading} = useContext(AuthContext);
  
  if(isLoading) {
    return <Loader />;
  }
  
  return (
    isAuth
      ?
      <Routes>
        {privateRoutes.map(route =>
          <Route
            path={route.path}
            element={route.component}
            exact={route.exact}
            key={route.path}
          />
        )}
        <Route path="/*" element={<Posts/>}/>
      </Routes>
      :
      <Routes>
        {publicRoutes.map(route =>
          <Route
            path={route.path}
            element={route.component}
            exact={route.exact}
            key={route.path}
          />
        )}
        <Route path="/*" element={<Login/>}/>
      </Routes>
  
  );
};

export default AppRouter;
