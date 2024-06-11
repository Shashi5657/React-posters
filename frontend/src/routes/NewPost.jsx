import Modal from "../components/Modal";
import classes from "./NewPost.module.css";
// import { useState } from "react";
import { Link, Form, redirect } from "react-router-dom";

function NewPost({ onAddPost }) {
  // const [bodyText, setBodyText] = useState("");
  // const [author, setAuthor] = useState("");

  // function changeBodyHandler(event) {
  //   setBodyText(event.target.value);
  // }

  // function changeAuthorHandler(event) {
  //   setAuthor(event.target.value);
  // }

  // function submitHandler(event) {
  //   event.preventDefault();
  //   const postData = {
  //     body: bodyText,
  //     author: author,
  //   };
  //   onAddPost(postData);
  // }
  return (
    <Modal>
      <Form method="post" className={classes.form}>
        <p>
          <label htmlFor="body">Text</label>
          <textarea id="body" name="body" required rows={3} />
        </p>
        <p>
          <label htmlFor="name">Your name</label>
          <input type="text" id="name" name="author" required />
        </p>
        <p className={classes.actions}>
          <Link to=".." type="button">
            Cancel
          </Link>
          <button>Submit</button>
        </p>
      </Form>
    </Modal>
  );
}

export default NewPost;

export async function action({ request }) {
  const formData = await request.formData();
  const postData = Object.fromEntries(formData);
  console.log(postData);
  await fetch("http://localhost:8080/posts", {
    method: "POST",
    body: JSON.stringify(postData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return redirect("/");
}
