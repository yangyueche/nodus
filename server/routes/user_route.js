const router = require("express").Router();
const {
  userRegister,
  userLogin,
  userArticle,
  userProfile,
  profileOrSignIn,
  userChannel,
  subscribe,
  unsubscribe,
  newcollection,
  changedescription,
  collectionList,
  channelAuth,
} = require("../controllers/user_controller");
const path = require("path");
const { authentication, authenticateOnly } = require("../../util/util");

// const bodyParser = require("body-parser");
// // 從 app.use 改成 router.use，因為這邊 express 建立的是 router
// router.use(bodyParser.urlencoded({ extended: false }));

// render 區域
router.route("/profile").get(authentication(), profileOrSignIn);

router.route("/sign*").get(function (req, res) {
  res.render("userSign");
});
router.route("/register").get(function (req, res) {
  res.render("register");
});
router.route("/article").get(function (req, res) {
  res.render("userArticle");
}); // render
router.route("/collectiontab").get(function (req, res) {
  var options = {
    root: path.join(__dirname, "../../public/views/user"),
  };
  res.sendFile("collectionTab.html", options);
});

// API 區域
router.route("/profileAuth").get(authentication(), function (req, res) {
  console.log(req.user);
  res.json(req.user);
  // res.render("profile", { articles: [] });
});

router.route("/article/api").get(authentication(), userArticle);
router.route("/login").post(userLogin);
router.route("/register").post(userRegister);
router.route("/deletecookie").get(function (req, res) {
  res.clearCookie("accessToken", {
    path: "/",
    signed: true,
    maxAge: 60000000000,
  });
  res.json({ status: "success" });
});

router.route("/authenticateonly").get(authenticateOnly());
router.route("/userChannel").post(authentication(), userChannel);
router.get("/:url_id", async (req, res) => {
  var options = {
    root: path.join(__dirname, "../../public/views/user"),
  };
  res.sendFile("manageProfile.html", options);
});
router.route("/subscribe").post(authentication(), subscribe);
router.route("/unsubscribe").post(authentication(), unsubscribe);
router.route("/newCollectionList").post(authentication(), newcollection);
router.route("/changedescription").post(authentication(), changedescription);
router.route("/collectionList").post(authentication(), collectionList);
router.route("/channelAuth").post(authentication(), channelAuth);
// router.route("/collectionCover").post(authentication(), collectionCover);
// router.route("/collection").get();
// router.route("/subscription").get();
// router.route("/profileAuth").get(authentication());

module.exports = router;