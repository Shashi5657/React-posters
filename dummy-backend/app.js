const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const { getStoredPosts, storePosts } = require('./data/posts');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  // Attach CORS headers
  // Required when using a detached backend (that runs on a different domain)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

mongoose
  .connect("mongodb://127.0.0.1:27017/twist-posts")
  .then(() => console.log("mongoDb connected"))
  .catch((err) => console.log("mongo error", err));

  //schema for registration
const userSignupSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
  token : {
    type : String
  }
});

//model for registration
const UserSignup = mongoose.model("Users", userSignupSchema);

//Schema for posts
const postSchema = mongoose.Schema({
  author: {
    type: String,
    required: true,
    unique: true,
  },
  body: {
    type: String,
    required: true,
  },
});

//model
const Post = mongoose.model("post", postSchema);

//signup api
app.post("/signup", async (req, res) => {
  const { firstName, lastName, user, password, confirmPassword } = req.body;
  const userData = await UserSignup.create({
    firstName,
    lastName,
    user,
    password,
    confirmPassword,
  });
  console.log(userData);
  return res.json({ staus: "success" });
});

app.get('/posts', async (req, res) => {
  const storedPosts = await getStoredPosts();
  // await new Promise((resolve, reject) => setTimeout(() => resolve(), 1500));
  res.json({ posts: storedPosts });
});

app.get('/posts/:id', async (req, res) => {
  const storedPosts = await getStoredPosts();
  const post = storedPosts.find((post) => post.id === req.params.id);
  res.json({ post });
});

app.post('/posts', async (req, res) => {

  const { author, body } = req.body;

  if (!author || !body) {
    return res.status(400).json({ msg: "author & body are required" });
  }
  try {
    const newPost = await Post.create({ author, body });
    return res.status(201).json({ message: "success" });
    const updatedPosts = [newPost, ...existingPosts];
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }

  

  // const existingPosts = await getStoredPosts();
  // const postData = req.body;
  // const newPost = {
  //   ...postData,
  //   id: Math.random().toString(),
  // };
  // const updatedPosts = [newPost, ...existingPosts];
  // await storePosts(updatedPosts);
  // res.status(201).json({ message: 'Stored new post.', post: newPost });
});

app.listen(8080);
















































// const express = require("express");
// const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
// const path = require("path");
// const jwt = require("jsonwebtoken");
// const secretKey = "Shashi@11";

// const cookieParser = require("cookie-parser");
// const { type } = require("os");

// const app = express();
// app.use(express.json());
// app.use(cookieParser());

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// mongoose
//   .connect("mongodb://127.0.0.1:27017/twist-posts")
//   .then(() => console.log("mongoDb connected"))
//   .catch((err) => console.log("mongo error", err));

// function setUser(user) {
//   return jwt.sign(
//     {
//       _id: user._id,
//       email: user.email,
//     },
//     secretKey,
//     { expiresIn: "1h" }
//   );
// }

// function getUser(token) {
//   try {
//     return jwt.verify(token, secretKey);
//   } catch (error) {
//     return null;
//   }
// }

// async function restrictToLoggedinUserOnly(req, res, next) {
//   const userUid = req.cookies?.uid;
//   console.log(userUid, "userUid");
//   if (!userUid) {
//     // return res.status(401).json({ message: "Unauthorized" });
//     return res.redirect("/login");
//   }

//   const user = getUser(userUid);
//   if (!user) {
//     // return res.status(401).json({ message: "Unauthorized" });
//     return res.redirect("/login");
//   }

//   req.user = user;
//   next();
// }

// //schema for registration
// const userSignupSchema = mongoose.Schema({
//   firstName: {
//     type: String,
//     required: true,
//   },
//   lastName: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   confirmPassword: {
//     type: String,
//     required: true,
//   },
//   token : {
//     type : String
//   }
// });

// //model for registration
// const UserSignup = mongoose.model("Users", userSignupSchema);

// //Schema for posts
// const postSchema = mongoose.Schema({
//   author: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   body: {
//     type: String,
//     required: true,
//   },
// });

// //model
// const Post = mongoose.model("post", postSchema);

// app.use((req, res, next) => {
//   // Attach CORS headers
//   // Required when using a detached backend (that runs on a different domain)
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET,POST");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   next();
// });

// //signup api
// app.post("/signup", async (req, res) => {
//   const { firstName, lastName, user, password, confirmPassword } = req.body;
//   const userData = await UserSignup.create({
//     firstName,
//     lastName,
//     user,
//     password,
//     confirmPassword,
//   });
//   console.log(userData);
//   return res.json({ staus: "success" });
// });

// //login api
// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   const user = await UserSignup.findOne({
//     email,
//     password,
//   });
//   if (!user) {
//     return res.status(400).json({ message: "No user found, Please signup" });
//   }
//   const token = jwt.sign(
//     {
//       _id: user._id,
//       email: user.email,
//     },
//     secretKey,
//     { expiresIn: "1h" }
//   );
//   UserSignup.findByIdAndUpdate()
//   res.json({ token });
//   // return res.status(200).json({ message: "Login successful" });
// });

// const authenticatedToken = (req, res, next) => {
//   const token = req;
//   console.log(token, "toke");
// };

// //posts api
// app.get("/posts", async (req, res) => {
//   res.json({ message: "this is post request", user: req.user });
//   // console.log("Entered in Redirect");

//   // const allPosts = await Post.find({});
//   // res.render("posts", {
//   //   posts: allPosts,
//   // });

//   // const storedPosts = await getStoredPosts();
//   // await new Promise((resolve, reject) => setTimeout(() => resolve(), 1500));
// });

// // app.get("/posts", async (req, res) => {
// //   console.log("Entered in Redirect");

// //   const uid = req.cookies.uid;
// //   console.log(uid, "uid");
// //   if (!uid) {
// //     return res.status(401).json({ message: "Unauthorized" });
// //   }

// //   const user = getUser(uid);
// //   console.log(user, "user");
// //   if (!user) {
// //     return res.status(401).json({ message: "Unauthorized" });
// //   }

// //   const allPosts = await Post.find({});
// //   return res.status(200).json({ posts: allPosts });
// // });

// app.get("/posts/:id", async (req, res) => {
//   const allPosts = await Post.find({});
//   // const storedPosts = await getStoredPosts();
//   const post = allPosts.find((post) => post.id === req.params.id);
//   res.json({ post });
// });

// app.post("/posts", async (req, res) => {
//   const { author, body } = req.body;

//   if (!author || !body) {
//     return res.status(400).json({ msg: "author & body are required" });
//   }
//   try {
//     const newPost = await Post.create({ author, body });
//     console.log(newPost, "newPost");
//     return res.status(201).json({ message: "success" });
//   } catch (error) {
//     console.error(error);
//     return res
//       .status(500)
//       .json({ message: "An error occurred", error: error.message });
//   }

//   // const existingPosts = await getStoredPosts();
//   // const postData = req.body;
//   // const newPost = {
//   //   ...postData,
//   //   id: Math.random().toString(),
//   // };
//   // const updatedPosts = [newPost, ...existingPosts];
//   // await storePosts(updatedPosts);
//   // res.status(201).json({ message: "Stored new post.", post: newPost });
// });

// app.delete("/posts/:id", async (req, res) => {
//   await Post.findByIdAndDelete(req.params.id);
//   return res.json({ status: "success" });
// });

// app.listen(8081);

// app.get("/loginn", async (req, res) => {
//   const user = await UserSignup.findOne({
//     email: "jagad@gmail.com",
//     password: "jagad",
//   });
//   if (!user) {
//     return res.status(400).json({ message: "No user found, Please signup" });
//   }
//   const sessionId = uuidv4();
//   setUser(sessionId, user);
//   res.cookie("uid", sessionId);
//   return res.json({ message: "Login successful" });
// });

// const express = require("express");
// const bodyParser = require("body-parser");
// const mongoose = require("mongoose");

// const app = express();

// // Connect to MongoDB
// mongoose
//   .connect("mongodb://127.0.0.1:27017/twist-posts", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .catch((err) => {
//     console.error("Failed to connect to MongoDB", err);
//   });

// // Define Mongoose Schema and Model
// const postSchema = new mongoose.Schema({
//   author: {
//     type: String,
//     required: true,
//   },
//   body: {
//     type: String,
//     required: true,
//   },
// });

// const Post = mongoose.model("Post", postSchema);

// app.use(bodyParser.json());

// app.use((req, res, next) => {
//   // Attach CORS headers
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET,POST");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   next();
// });

// app.get("/posts", async (req, res) => {
//   try {
//     const storedPosts = await Post.find();
//     res.json({ posts: storedPosts });
//   } catch (error) {
//     res.status(500).json({ message: "Fetching posts failed.", error });
//   }
// });

// app.get("/posts/:id", async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     if (!post) {
//       return res.status(404).json({ message: "Post not found." });
//     }
//     res.json({ post });
//   } catch (error) {
//     res.status(500).json({ message: "Fetching post failed.", error });
//   }
// });

// app.post("/posts", async (req, res) => {
//   const { author, body } = req.body;

//   if (!author || !body) {
//     return res.status(400).json({ message: "Author and body are required." });
//   }

//   const newPost = new Post({
//     author,
//     body,
//   });

//   try {
//     const savedPost = await newPost.save();
//     res.status(201).json({ message: "Stored new post.", post: savedPost });
//   } catch (error) {
//     res.status(500).json({ message: "Creating post failed.", error });
//   }
// });

// app.listen(8080, () => {
//   console.log("Server running on port 8080");
// });
