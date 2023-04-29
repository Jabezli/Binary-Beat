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

    res.status(200).render("homePage", {
      loggedIn: req.session.loggedIn,
      posts,
    });
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
      res.status(200).render("postPage", {
        loggedIn: req.session.loggedIn,
        post,
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//login
router.get("/login", async (req, res) => {
  try {
    res.render("login");
  } catch (err) {
    res.status(500).json(err);
  }
});

//signup
router.get("/signup", (req, res) => {
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
//get all posts of a user
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.status(200).render("dashboardPage", {
      loggedIn: req.session.loggedIn,
      posts,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
