import React, {useContext} from 'react';
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";
import {AuthContext} from "../context";

const Login = () => {
  const {setIsAuth} = useContext(AuthContext);
  
  const login = e => {
    e.preventDefault();
    setIsAuth(true);
    localStorage.setItem('auth', 'true');
  }
  
  return (
    <div onSubmit={login}>
      <h1>Login Page</h1>
      <form>
        <MyInput type="text" placeholder="Enter a login"/>
        <MyInput type="password" placeholder="Enter a password"/>
        <MyButton>Log In</MyButton>
      </form>
    </div>
  );
};

export default Login;
