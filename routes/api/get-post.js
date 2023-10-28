import { getPost } from "../../controllers/post";

export default async (req, res) => {
  try {
    const post = await getPost(req.params.postId);
    res.json({ post });
  } catch (error) {
    res.status(404).json({error});
  }
};
