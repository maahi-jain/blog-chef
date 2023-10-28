import { verifyUser } from "../controllers/user";

const protectRoute =
  (redirectTo = "/") =>
  (req, res, next) => {
    if (req.session.user && verifyUser(req.session.user.email)) {
      return next();
    }

    return res.redirect(redirectTo);
  };

export default protectRoute;
