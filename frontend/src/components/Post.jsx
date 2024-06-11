//creating our first custom component
//function name should always statr with capital letter
//otherwise react will treat them as default html elements while importing or using them
//return and export are must
import { Link } from "react-router-dom";
import classes from "./Post.module.css";

function Post({ id, name, message }) {
  return (
    <li className={classes.post}>
      <Link to={id}>
        {/* we can output dynamic values in the curly braces */}
        <p className={classes.author}>{name}</p>
        <p className={classes.text}>{message}</p>
      </Link>
    </li>
  );
}

export default Post;
