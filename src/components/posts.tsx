import { Meta } from "lib/types";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import { PostCard } from "components/post-card";

type Props = {
  posts: Meta[];
};

export const Posts = ({ posts }: Props): JSX.Element => {
  return (
    <Box>
      <Grid
        templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)"]}
        columnGap="32px"
        rowGap="54px"
      >
        {posts?.map((post: Meta) => {
          console.log("post", post);
          return (
            <GridItem w="100%" key={post.slug}>
              <PostCard post={post} />
            </GridItem>
          );
        })}
      </Grid>
    </Box>
  );
};
