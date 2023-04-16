const { Post } = require("../models");

const postData = [
  {
    title: "chatGPT",
    body: "ChatGPT is a really powerful AI",
    user_id: 1,
  },
  {
    title: "MidJourney",
    body: "MidJourney is a really powerful designing AI",
    user_id: 2,
  },
  {
    title: "NoteAI",
    body: "A powerful note AI",
    user_id: 3,
  },
  {
    title: "Azure",
    body: "Machine learning studio",
    user_id: 4,
  },
  {
    title: "No more AI",
    body: "Stop developing AI",
    user_id: 5,
  },
];

const seedPosts = async () => await Post.bulkCreate(postData);

module.exports = seedPosts;
