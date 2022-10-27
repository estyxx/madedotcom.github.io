import { Post } from "lib/types";
import Link from "next/link";
import { Box, Text } from "@chakra-ui/react";
import Image from "next/image";
import { TagLine } from "./tag-line";

type Props = {
  post: Post;
};
export const PostCard = ({ post }: Props): JSX.Element => {
  return (
    <Box>
      <Box mb="32px">
        {" "}
        <Link href={`${post.slug}`}>
          <Image
            alt="Sofa image"
            src={`/landscapes/sofa${Math.floor(Math.random() * 10)}.jpg`}
            width={432}
            height={227}
          />
        </Link>{" "}
      </Box>

      <TagLine tags={post.tags} variant="sm" />
      <Box minHeight="92px">
        <Link href={`${post.slug}`}>
          <Text fontFamily="heading" fontSize="2xl" py="16px" lineHeight="1.25">
            {post.title}
          </Text>
        </Link>
      </Box>
      <Text fontSize="sm" color="made.60">
        {new Date(post.date).toLocaleDateString("en-UK", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </Text>
    </Box>
  );
};
