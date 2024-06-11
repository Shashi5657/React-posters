import { useLoaderData } from "react-router-dom";
import Post from "./Post";
import classes from "./PostsList.module.css";
// import { useEffect, useState } from "react";

function PostsList() {
  // const [posts, setPosts] = useState([]);
  // const [isFetching, setIsFetching] = useState(false);
  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       setIsFetching(true);
  //       const response = await fetch("http://localhost:8080/posts");
  //       const data = await response.json();
  //       setPosts(data.posts);
  //       setIsFetching(false);
  //     } catch (error) {
  //       console.log("Error fetching posts:", error);
  //     }
  //   };

  //   fetchPosts();
  // }, []);

  const posts = useLoaderData()

  // function addPostHandler(postData) {
  //   fetch("http://localhost:8080/posts", {
  //     method: "POST",
  //     body: JSON.stringify(postData),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   setPosts((existingPosts) => [postData, ...existingPosts]);
  // }

  return (
    <>
      {posts.length > 0 && (
        <ul className={classes.posts}>
          {posts.map((post) => (
            <Post key={post.id} id={post.id} name={post.author} message={post.body} />
          ))}
        </ul>
      )}
      { posts.length === 0 && (
        <div style={{ textAlign: "center", color: "white" }}>
          <h2>There are no posts yet.</h2>
          <p>Start adding some!</p>
        </div>
      )}
      {/* {isFetching && (
        <div style={{ textAlign: "center", color: "white" }}>
          <p>Loading Posts!</p>
        </div>
      )} */}
    </>
  );
}

export default PostsList;
