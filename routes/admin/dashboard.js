import moment from "moment";
import { getFlaggedPost } from "../../controllers/post";
export default async (req, res) => {
  const posts = await getFlaggedPost();
  res.render("dashboard", {
    user: req.session.user,
    lastLoggedIn: moment(req.session.user.lastLoggedIn).format(
      "MMM, Do YYYY, h:mm:ss a"
    ),
    posts: posts,
  });
};
