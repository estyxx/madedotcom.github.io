import Home from ".";
import { getPostsMetaData } from "../lib/api";

export async function getStaticProps() {
  const posts = getPostsMetaData();
  return {
    props: {
      posts: posts,
    },
  };
}

export default Home;
