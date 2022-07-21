import type { NextPage } from "next";
import { Post } from "../common/types";
import PostCardComponent from "./PostCardComponent";

interface PostsProps {
  posts: Post[];
}

const PostsComponent: NextPage<PostsProps> = ({ posts }) => {
  return (
    <article className="">
      <p className="text-2xl font-bold">Posts:</p>
      {posts.map((post, index) => (
        <PostCardComponent key={index} post={post} />
      ))}
    </article>
  );
};

export default PostsComponent;