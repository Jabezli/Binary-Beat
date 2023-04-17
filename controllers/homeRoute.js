const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/auth");

//find all post
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
      //attributes: get only "username" back.
    });
    //post.get plain true : return json format.
    const posts = postData.map((post) => post.get({ plain: true }));
    console.log(posts);
    res.status(200).render("homePage", { posts });
  } catch (err) {
    res.status(500).json(err);
  }
});

//get one post - click to see the post

router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        //post needs to cross check with comment, then once find the comments, need to cross check comments with users to get the people commented the post.
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["username"],
            },
          ],
        },
      ],
    });
    console.log(postData);
    if (!postData) {
      res.status(404).json({ message: "Cannot find any post with this id" });
    } else {
      const post = postData.get({ plain: true });
      console.log(post);
      res.status(200).render("singlePost", { post });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//login
router.get("/login", withAuth, async (req, res) => {
  try {
    res.status(200).render("login");
  } catch (err) {
    res.status(500).json(err);
  }
});

//signup
router.get("/signup", (res, req) => {
  try {
    if (req.session.loggedIn) {
      res.redirect("/");
      return;
    } else {
      res.render("signup");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//show dashboard
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    res.render("dashboardPage", {});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
