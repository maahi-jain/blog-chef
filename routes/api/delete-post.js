import { deletePost } from "../../controllers/post";

export default async (req, res) => {
  try {
    const post = await deletePost(req.params.postId);
    res.json({ status: true });
  } catch (error) {
    res.status(401).json({ error });
  }
};