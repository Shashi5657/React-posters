import React, { useRef } from "react";
import { redirect, useNavigate } from "react-router-dom";



const Login = () => {

  const emailRef = useRef();
  const passWordRef = useRef();

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      email: emailRef.current.value,
      password: passWordRef.current.value,
    };
    login(payload);
  };

  const login = async (payload) => {
    const response = await fetch("http://localhost:8081/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(payload),
    });
    const json = await response.json();
    navigate('/posts')
    console.log(json);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input type="email" ref={emailRef} />
      <input type="text" ref={passWordRef} />
      <button type="submit">login</button>
    </form>
  );
};

export default Login;
