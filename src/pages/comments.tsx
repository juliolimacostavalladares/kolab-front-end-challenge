import { Box, Text, VStack } from "@chakra-ui/react";
import Comment from "../components/Comment";
import { useParams } from "react-router-dom";
import Post from "../components/Post";
import Input from "../components/Input";
import { useRef } from "react";
import useUser from "../hooks/useUser";
import { useComments } from "../hooks/useComments";

const Comments = () => {
  const { id } = useParams();
  const { id: userId } = useUser();
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { queryComments, postComment, createComment } = useComments(
    Number(id),
    userId
  );

  const hasComments = queryComments && queryComments.length > 0;

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    if (inputRef.current?.value) {
      createComment({
        id: Date.now(),
        body: inputRef.current.value || "",
        email: "",
        postId: Number(id),
      });
      inputRef.current.value = "";
    }
  };

  return (
    <VStack bg="#000" gap={0} height="100%" align="stretch">
      <Post
        key={Number(postComment?.id)}
        body={String(postComment?.body)}
        userId={Number(postComment?.userId)}
        postId={Number(postComment?.id)}
        imagePost={String(postComment?.image)}
      />
      <Input
        type="comment"
        inputRef={inputRef}
        defaultValue=""
        buttonActionLabel="Comment"
        placeholder="Post your replay"
        handleSubmit={handleSubmit}
      />
      {hasComments && (
        <Box
          borderTopWidth={1}
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
          <Text color="#fff" fontSize={25}>
            Comments
          </Text>
        </Box>
      )}
      {queryComments?.map((comment) => (
        <>
          <Comment
            key={comment.id}
            body={comment.body}
            commentId={comment.id}
            postId={Number(id)}
            isNewComment={comment.userId ? true : false}
          />
        </>
      ))}
    </VStack>
  );
};

export default Comments;
