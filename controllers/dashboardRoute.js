const router = require("express").Router();

const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/auth");

//endpoint /dashboard

//render create a new post page
router.get("/createPost", withAuth, (req, res) => {
  res.render("createPost");
});

//when select a specific post, render the edit post page
router.get("/edit/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);

    if (postData) {
      const post = postData.get({ plain: ture });
      res.status(200).render("editPost", {
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
