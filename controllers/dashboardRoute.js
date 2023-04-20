const router = require("express").Router();

const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/auth");

//endpoint /dashboard

//get all posts of a user

router.get("/", withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.status(200).render("userPosts", {
      layout: "dashboard",
      posts,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//create a new post
router.get("/createPost", withAuth, (req, res) => {
  res.render("createPost", {
    layout: "dashboard",
  });
});

//when select a specific post, render the edit post page
router.get("/edit/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);

    if (postData) {
      const post = postData.get({ plain: ture });
      res.status(200).render("editPost", {
        layout: "dashboard",
        post,
      });
    } else {
      res.status(404).json({ message: "Cannot find any post with this id" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
