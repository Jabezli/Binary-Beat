const { Comment } = require("../models");

const commentData = [
  {
    comment: "so cool",
    post_id: "1",
    user_id: "1",
  },
  {
    comment: "so cool * 2",
    post_id: "1",
    user_id: "2",
  },
  {
    comment: "wow",
    post_id: "2",
    user_id: "1",
  },
  {
    comment: "ah ha",
    post_id: "4",
    user_id: "5",
  },
  {
    comment: "so coollllllla",
    post_id: "3",
    user_id: "3",
  },
];

const seedComments = async () => await Comment.bulkCreate(commentData);

module.exports = seedComments;
