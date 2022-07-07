import type { NextPage } from "next";
import Link from "next/link";
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
  revalidate: Number;
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
        <Link key={index} href={`/test/${post.slug}`}>
          <div className="bg-slate-900 rounded px-4 py-2 cursor-pointer hover:bg-slate-700">
            <p>{post.slug}</p>
            <p>{post.frontmatter.excerpt}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export async function getStaticProps(): Promise<Props> {
  const tree: Tree | FetchError = await fetchRepositoryPosts();
  if (isFetchError(tree)) {
    return {
      props: tree,
      revalidate: 30,
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
    revalidate: 30,
  };
}

export default Test;
