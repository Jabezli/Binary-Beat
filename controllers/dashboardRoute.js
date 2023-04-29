const router = require("express").Router();

const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/auth");

//endpoint /dashboard

//render create a new post page
router.get("/createPost", withAuth, async (req, res) => {
  try {
    res.render("editPost", {
      loggedIn: req.session.loggedIn,
      isNewPost: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//when select a specific post, render the edit post page
router.get("/post/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);

    if (postData) {
      const post = postData.get({ plain: ture });
      res.status(200).render("editPost", {
        logged_in: req.session.logged_in,
        isNewPost: false,
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
