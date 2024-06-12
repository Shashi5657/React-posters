//React is a popular js library used for creating interactive UI
//less code, component based code
//project structure , it uses tools to convert user-friendly code to machine understandable code
//npx create-react-app my-app
//npm create vite@latest
//supports jsx syntax- which allow us to write html like code within the js
//package.json manages the dependencies of our projectx
//components are key building blocks
//returning components, importing & exporting componenst
//outputting dynamic values using curly braces {}
//react fragments - only one element should be wrapped around all elements
//props- we can reuse same components with diff details
//css styling - post.module.css(for avoiding name clashes), inline styles <div style = {{}}
//adding event listeners like onChange
//useState hook, used for dynamic changes!
//for input values, we use const[value, setValue]= useState, & onChange={changeHandler} func
//function(event) {event.target.value}

//importing that first component Post
import PostsList from "../components/PostsList";
// import MainHeader from "./components/MainHeader";
import { useState } from "react";
import { Outlet } from "react-router-dom";

function Posts() {
  const [modalIsVisible, setModalIsVisible] = useState(false);

  // function showModalHandler() {
  //   setModalIsVisible(true);
  // }
  // function hideModalHandler() {
  //   setModalIsVisible(false);
  // }

  return (
    <>
      <Outlet />
      {/* <MainHeader onCreatePost={showModalHandler} /> */}
      <main>
        <PostsList />
      </main>
    </>
  );
}

export default Posts;

export async function loader() {
  const response = await fetch("http://localhost:8081/posts");
  const data = await response.json();
  return data.posts;
}
