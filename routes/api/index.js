import { Router } from "express";
import getPosts from "./get-posts";
import storePost from "./store-post";
import loginUser from "./login-user";
import signUpUser from "./signup-user";
import getPost from "./get-post";
import deletePost from "./delete-post";
import catchAll from "./catch-all";
import protectApi from "../../utils/protectApi";
import verify from "./verify";
const router = Router();

router.get("/posts", getPosts);
router
  .route("/post/:postId?")
  .get(getPost)
  .post(protectApi, storePost)
  .delete(protectApi, deletePost);
router.post("/login", loginUser);
router.post("/signup", signUpUser);
router.use(catchAll);

router.post("/verify", verify);

export default router;
