import { Post } from "lib/types";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import { PostCard } from "components/post-card";

type Props = {
  posts: Post[];
};

export const Posts = ({ posts }: Props): JSX.Element => {
  return (
    <Box>
      <Grid
        templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)"]}
        columnGap="32px"
        rowGap="54px"
      >
        {posts?.map((post: Post) => (
          <GridItem w="100%" key={post.slug}>
            <PostCard post={post} />
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};
