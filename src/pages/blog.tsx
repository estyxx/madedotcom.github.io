import Home from ".";
import PostService from "lib/post-service";
import Post from "lib/post";

export async function getStaticProps() {
  const service = new PostService();
  const posts = (await service.find()).map((post: Post) => post.meta.toJSON());

  return {
    props: {
      posts: posts,
    },
  };
}

export default Home;
