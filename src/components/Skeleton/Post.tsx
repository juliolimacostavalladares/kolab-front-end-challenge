import { Box, Flex, Skeleton } from "@chakra-ui/react";
import { SkeletonCircle, SkeletonText } from "../ui/skeleton";

const PostSkeleton = () => {
  return (
    <Box
      borderTopWidth={1}
      borderBottomWidth={1}
      borderLeftWidth={1}
      borderRightWidth={1}
      borderColor="#2f3336"
      p={4}
      maxW="600px"
      width="100%"
      mx="auto"
      bg="#000"
      _hover={{ backgroundColor: "#ffffff08" }}
      cursor="pointer"
    >
      <Flex>
        <SkeletonCircle size="12" />
        <Box flex="1">
          <Flex justify="space-between" align="center">
            <Box display="flex" gap={2}>
              <SkeletonText />
              <SkeletonText />
            </Box>
          </Flex>
          <Skeleton mt={2} rounded="md" height="200px" />
          <SkeletonText mt={2} color="white" noOfLines={2} />
        </Box>
      </Flex>
    </Box>
  );
};

export default PostSkeleton;
