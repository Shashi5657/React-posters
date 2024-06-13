import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const emailRef = useRef();
  const passWordRef = useRef();
  const navigate = useNavigate();

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

    if (response.ok) {
      navigate("/posts");
    } else {
      const json = await response.json();
      console.error(json.message);
      // handle error (e.g., show error message to the user)
    }
  };

  return (
    <form action="/posts" onSubmit={handleSubmit}>
      <input type="email" ref={emailRef} />
      <input type="password" ref={passWordRef} />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
