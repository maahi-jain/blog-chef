import { Schema, model } from "mongoose";
import profanityFilter from "../utils/profanityFilter";
const { ObjectId } = Schema.Types;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  user: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  isApproved: {
    type: Boolean,
    default: true,
  },
});

postSchema.pre("save",function (next){
  if(this.isModified("content")){
    profanityFilter(this.content);
    if(profanityFilter){
      this.isApproved = false;
      return next();
    } else{
      return next();
    }
  } else{
    return next();
  }
})

const Post = model("Post", postSchema);

export default Post;
