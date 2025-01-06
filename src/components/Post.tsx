import { Box, Flex, Text, Image, HStack, IconButton } from "@chakra-ui/react";
import { Avatar } from "./ui/avatar";
import { useNavigate } from "react-router-dom";
import { Edit, Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import useUser from "../hooks/useUser";
import Input from "./Input";

const Post = ({
  body,
  postId,
  userId,
  imagePost,
  handleEdit,
  handleDelete,
}: {
  body: string;
  postId: number;
  userId: number;
  imagePost?: string;
  handleEdit?: (postId: number, updatedBody: string) => void;
  handleDelete?: (postId: number) => void;
}) => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [editEnabled, setEditEnabled] = useState<boolean>(false);

  const { id, cachedUser, getUser } = useUser(false, userId);

  const handleRedirectToComments = (postId: number) => {
    navigate(`/${postId}/comments/`);
  };

  const handleRedirectToProfile = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    userId: number
  ) => {
    e.stopPropagation();
    navigate(`/${userId}/profile/`);
  };

  const isProfilePage = location.pathname.includes("profile");

  const allUsers = cachedUser || getUser;

  return (
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
      onClick={() => handleRedirectToComments(postId)}
    >
      <Flex>
        <Avatar
          onClick={(e) => handleRedirectToProfile(e, userId)}
          size="md"
          name={allUsers?.name}
          mr={4}
        />
        <Box flex="1">
          <Flex
            onClick={(e) => handleRedirectToProfile(e, userId)}
            justify="space-between"
            align="center"
          >
            <Box display="flex" gap={2}>
              <Text fontWeight="bold" color="white" fontSize="md">
                {allUsers?.name}
              </Text>
              <Text fontSize="sm" color="white">
                @{allUsers?.username} • 2h
              </Text>
            </Box>
            {userId === id && isProfilePage && (
              <HStack p={2} justify="flex-end">
                <>
                  <IconButton
                    backgroundColor="unset"
                    _hover={{ color: "#1D9BF0" }}
                  >
                    <Edit
                      onClick={() => {
                        setEditEnabled(true);
                      }}
                    />
                  </IconButton>
                  <IconButton
                    backgroundColor="unset"
                    _hover={{ color: "#f01d1d" }}
                    onClick={(e) => {
                      if (handleDelete) {
                        e.stopPropagation();
                        handleDelete(postId);
                      }
                    }}
                    aria-label="Delete Post"
                  >
                    <Trash2 />
                  </IconButton>
                </>
              </HStack>
            )}
          </Flex>
          {!editEnabled && (
            <Text mt={6} color="white">
              {body}
            </Text>
          )}
          <Box onClick={(e) => e.stopPropagation()} mt={6}>
            {editEnabled && (
              <Input
                type="comment"
                inputRef={inputRef}
                buttonActionLabel="Edit"
                placeholder=""
                defaultValue={body}
                handleSubmit={() => {
                  if (handleEdit) {
                    handleEdit(postId, String(inputRef.current?.value));
                    setEditEnabled(false);
                  }
                }}
              />
            )}
          </Box>

          {!!imagePost && imagePost !== "undefined" && (
            <Image mb={6} mt={6} rounded="md" src={imagePost} />
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default Post;
