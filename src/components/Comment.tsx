import { Box, Flex, HStack, IconButton, Text } from "@chakra-ui/react";
import { Avatar } from "./ui/avatar";
import useUser from "../hooks/useUser";
import { Edit, Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import Input from "./Input";
import { useComments } from "../hooks/useComments";

interface CommentProps {
  body: string;
  postId: number;
  commentId: number;
  isNewComment: boolean;
}

const Comment: React.FC<CommentProps> = ({
  body,
  postId,
  commentId,
  isNewComment,
}) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [editEnabled, setEditEnabled] = useState<boolean>(false);
  const { id: userId } = useUser();

  const { userComments } = useUser(isNewComment);
  const { deleteMutation, editMutation } = useComments(
    postId,
    userId,
    commentId
  );

  const handleDelete = (commentId: number) => {
    deleteMutation(commentId);
  };

  const handleEditComment = () => {
    editMutation({ id: commentId, body: String(inputRef.current?.value) });
  };

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
    >
      <Flex>
        <Avatar size="md" name={userComments?.name} mr={4} />
        <Box flex="1">
          <Flex justify="space-between" align="center">
            <Box display="flex" gap={2}>
              <Text fontWeight="bold" color="white" fontSize="md">
                {userComments?.name}
              </Text>
              <Text fontSize="sm" color="white">
                @{userComments?.username} • 2h
              </Text>
            </Box>
          </Flex>
          {!editEnabled && (
            <Text mt={2} color="white">
              {body}
            </Text>
          )}
          <Box mt={6}>
            {editEnabled && (
              <Input
                type="comment"
                inputRef={inputRef}
                buttonActionLabel="Edit"
                placeholder=""
                defaultValue={body}
                handleSubmit={() => {
                  handleEditComment();
                  setEditEnabled(false);
                }}
                handleCancel={() => {
                  setEditEnabled(false);
                }}
              />
            )}
          </Box>
          {isNewComment && (
            <HStack p={2} justify="flex-end">
              <>
                <IconButton
                  backgroundColor="unset"
                  _hover={{ color: "#1D9BF0" }}
                >
                  <Edit
                    onClick={() => {
                      inputRef.current?.focus();
                      setEditEnabled(true);
                    }}
                  />
                </IconButton>
                <IconButton
                  backgroundColor="unset"
                  _hover={{ color: "#f01d1d" }}
                  onClick={() => {
                    handleDelete(commentId);
                    setEditEnabled(false);
                  }}
                  aria-label="Delete Comment"
                >
                  <Trash2 />
                </IconButton>
              </>
            </HStack>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default Comment;
