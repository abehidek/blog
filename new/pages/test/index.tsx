import type { NextPage } from "next";
import fetchRepositoryPost, { Post } from "../../lib/fetchRepositoryPost";
import fetchRepositoryPosts, {
  Tree,
  FetchError,
  isFetchError,
} from "../../lib/fetchRepositoryPosts";

type Ok = {
  posts: Post[];
};

interface Props {
  props: Ok | FetchError;
}

const Test: NextPage<Ok | FetchError> = (props) => {
  if (isFetchError(props)) {
    return <div>Error</div>;
  }

  console.log(props);

  return (
    <div className="text-white">
      <p>Posts:</p>
      {props.posts.map((post, index) => (
        <div key={index} className="bg-slate-900 rounded px-4 py-2">
          <p>{post.slug}</p>
          <p>{post.frontmatter.excerpt}</p>
        </div>
      ))}
    </div>
  );
};

export async function getStaticProps(): Promise<Props> {
  const tree: Tree | FetchError = await fetchRepositoryPosts();
  if (isFetchError(tree)) {
    return {
      props: tree,
    };
  }
  const posts: Post[] = [];
  for (const item of tree) {
    const post = await fetchRepositoryPost(item);
    if (!isFetchError(post)) {
      posts.push(post);
    }
  }

  return {
    props: {
      posts,
    },
  };
}

export default Test;
