const router = require("express").Router();
// it will go to index.js in model folder to find the exported User.
const { User } = require("../../models");

//endpoint /api/user

//create new user

router.post("/", async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    req.session.user_id = newUser.id;
    req.session.username = newUser.username;
    req.session.loggedIn = true;
    res.status(200).json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//login route

router.post("/login", async (req, res) => {
  try {
    //user is the variable to store the matched user in database. matched meaning same username.
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    //in case the username cannot be matched

    if (!user) {
      res.status(401).json({
        message: "login failed, please check your username and password",
      });
      return;
    }

    //we know which user is logining in, now it is time to verify password.
    // checkPassword is a method we added when create the class User - extended from Model.
    // in this method, a buildin bcrypt method "compareSync()" is invoked. It compares the hashed version of "this.password" to hassed password in the database
    // then returns a boolean which will be stored in validPassword.
    const validPassword = user.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(401).json({
        message: "login failed, please check your username and password",
      });
      return;
    }
    //if js runs to this line, it means both username and password are correct.

    req.session.user_id = user.id;
    req.session.username = user.username;
    req.session.loggedIn = true;
    console.log(req.session);
    res.status(200).json({ user, message: `Welcome back ${user.username}!` });
    console.log(user);
  } catch (err) {
    res.status(401).json({ message: "No user account found!" });
  }
});

router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
