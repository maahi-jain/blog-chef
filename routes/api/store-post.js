import { createPost } from "../../controllers/post";

export default async (req, res) => {
  try {
    const post = await createPost(req.body.post);
    res.status(201).json({post});
  } catch (error) {
    res.status(401).json({ error });
  }
};
