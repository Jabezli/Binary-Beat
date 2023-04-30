const router = require("express").Router();
const { Post } = require("../../models");
const withAuth = require("../../utils/auth");

//end point /api/post
//creat a post

//worked without auth
router.post("/", withAuth, async (req, res) => {
  try {
    const user_id = req.session.user_id;
    const postData = await Post.create({
      title: req.body.title,
      body: req.body.body,
      user_id,
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//worked without auth
router.put("/", withAuth, async (req, res) => {
  try {
    const postData = await Post.update(
      {
        title: req.body.title,
        body: req.body.body,
      },
      {
        where: { id: req.body.post_id },
      }
    );

    if (!postData) {
      res.status(404).json({ message: "Post was not found" });
    } else {
      res.status(200).json(postData);
      console.log(postData);
      console.log(postData.title);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete a post
//worked without auth
router.delete("/", withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: { id: req.body.post_id },
    });

    if (!postData) {
      res.status(404).json({ message: "Post was not found" });
    } else {
      res.status(200).json(postData);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
