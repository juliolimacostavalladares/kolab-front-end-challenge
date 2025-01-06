import { Box, Button, Flex, Input, Text, VStack } from "@chakra-ui/react";
import Post from "../components/Post";
import { useParams } from "react-router-dom";
import { Avatar } from "../components/ui/avatar";
import { useRef, useState } from "react";
import { Edit2 } from "lucide-react";
import useUser from "../hooks/useUser";
import { usePosts } from "../hooks/usePosts";

const Profile = () => {
  const [isToggled, setIsToggled] = useState(true);
  const nameRef = useRef<HTMLInputElement>(null);
  const userNameRef = useRef<HTMLInputElement>(null);

  const { id } = useParams();
  const {
    id: userId,
    editUserMutation,
    cachedUser,
  } = useUser(false, Number(id));

  const { editPost, deletePost, cachedPosts } = usePosts();

  const userPosts = cachedPosts?.filter((post) => post.userId === Number(id));

  const handleEditPost = (postId: number, updatedBody: string) => {
    const updatedPost = {
      id: postId,
      body: updatedBody,
    };
    editPost(updatedPost);
  };

  const handleDeletePost = (postId: number) => {
    deletePost(postId);
  };

  const toggle = () => {
    setIsToggled(!isToggled);
  };

  const handleSetNewUser = () => {
    if (
      nameRef.current &&
      userNameRef.current &&
      nameRef.current.value.length > 0 &&
      userNameRef.current.value.length > 0
    ) {
      editUserMutation({
        id: Number(id),
        name: nameRef.current.value,
        username: userNameRef.current.value,
      });
    }
    toggle();
  };

  const allUsers = cachedUser;

  return (
    <Flex bg="#000" justify="space-around">
      <VStack height="100%" gap={0} align="stretch">
        <Box
          borderTopWidth={1}
          borderLeftWidth={1}
          borderRightWidth={1}
          borderColor="#2f3336"
          maxW="600px"
          width="100%"
          mx="auto"
          bg="#000"
          color="#fff"
        >
          <Box bg="blue.400" width="100%" height="120px" position="relative">
            <Avatar
              size="xl"
              position="absolute"
              name={allUsers?.name}
              bottom="-40px"
              left="16px"
            />
          </Box>
          <Box p="6" pt="12">
            {isToggled ? (
              <>
                <Flex gap={5}>
                  <Text fontWeight="bold" fontSize="xl">
                    {allUsers?.name}
                  </Text>
                  {userId === Number(id) && (
                    <Edit2 color="#fff" onClick={() => toggle()} />
                  )}
                </Flex>

                <Text color="gray.500" fontSize="md">
                  @{allUsers?.username}
                </Text>
              </>
            ) : (
              <>
                <Flex>
                  <Input
                    ref={nameRef}
                    color="#fff"
                    fontSize={20}
                    _placeholder={{ color: "#71767B", fontSize: 20 }}
                    placeholder={allUsers?.name}
                    border={0}
                    defaultValue={allUsers?.name}
                  />
                </Flex>
                <Flex>
                  <Input
                    ref={userNameRef}
                    color="#fff"
                    fontSize={20}
                    _placeholder={{ color: "#71767B", fontSize: 20 }}
                    placeholder={allUsers?.username}
                    border={0}
                    defaultValue={allUsers?.username}
                  />
                </Flex>
                <Button
                  mt={4}
                  onClick={() => handleSetNewUser()}
                  bg="#fff"
                  color="#000"
                >
                  Edit
                </Button>
              </>
            )}
            <Flex mt="4" justify="space-between">
              <Box textAlign="center">
                <Text fontWeight="bold" fontSize="lg">
                  {userPosts?.length}
                </Text>
                <Text color="gray.500" fontSize="sm">
                  Tweets
                </Text>
              </Box>
              <Box textAlign="center">
                <Text fontWeight="bold" fontSize="lg">
                  1000
                </Text>
                <Text color="gray.500" fontSize="sm">
                  Following
                </Text>
              </Box>
              <Box textAlign="center">
                <Text fontWeight="bold" fontSize="lg">
                  3000
                </Text>
                <Text color="gray.500" fontSize="sm">
                  Followers
                </Text>
              </Box>
            </Flex>
          </Box>
        </Box>
        {userPosts?.map((post) => (
          <Post
            handleEdit={handleEditPost}
            handleDelete={handleDeletePost}
            key={post.id}
            body={post.body}
            userId={post.userId}
            postId={post.id}
            imagePost={post.image}
          />
        ))}
      </VStack>
    </Flex>
  );
};

export default Profile;
