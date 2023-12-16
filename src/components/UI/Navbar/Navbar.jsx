import {Link} from "react-router-dom";

import React, {useContext} from 'react';
import MyButton from "../button/MyButton";
import {AuthContext} from "../../../context";

const Navbar = () => {
  const {setIsAuth} = useContext(AuthContext);
  
  const logout = () => {
    setIsAuth(false);
    localStorage.removeItem('auth');
  }
  
  return (
    <div className="navbar">
      <MyButton style={{marginLeft: 5}} onClick={logout}>
        Log Out
      </MyButton>
      <div className="navbar__links">
        <Link style={{marginRight: 5}} to="/">About</Link>
        <Link style={{marginLeft: 5, marginRight: 5}} to="/posts">Posts</Link>
      </div>
    </div>
  );
};

export default Navbar;
