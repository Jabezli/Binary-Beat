const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

//endpoint /api/comment
//all worked without Auth

//create a new comment
//"create" will establish a new object. ...req.body is a spread syntax, basically, it imports all the properties in the req.body into the new established property.
//so I dont have to manually type them one by one in here. Besides whats in the req.body, I also add a new property - user_id.
router.post("/", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.create({
      ...req.body,
      // comment: req.body.comment,
      // post_id: req.body.post_id,
      user_id: req.session.user_id,
    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update a comment (may not be achieved in frontend at this moment)
router.put("/", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.create(
      {
        ...req.body,
      },
      {
        where: { id: req.body.comment_id },
      }
    );

    if (!commentData) {
      res.status(404).json({ message: "Comment was not found" });
    } else {
      res.status(200).json(commentData);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete a comment (may not be achieved in frontend at this moment)
router.delete("/", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: { id: req.body.comment_id },
    });

    if (!commentData) {
      res.status(404).json({ message: "Comment was not found" });
    } else {
      res.status(200).json(commentData);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
