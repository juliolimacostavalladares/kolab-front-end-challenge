import { Flex, VStack } from "@chakra-ui/react";
import Post from "../components/Post";
import Input from "../components/Input";
import PostSkeleton from "../components/Skeleton/Post";
import useUser from "../hooks/useUser";
import { usePosts } from "../hooks/usePosts";
import { useRef, useState } from "react";

const Feed = () => {
  const { id } = useUser();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [, setSelectedFiles] = useState<File[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<string>("");

  const { posts, createPost, isLoading } = usePosts();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const files = target?.files;
    if (files) {
      const fileArray = Array.from(files);
      setSelectedFiles(fileArray);

      const objectUrls = fileArray.map((file) => URL.createObjectURL(file));
      setUploadedFiles(objectUrls[0]);
    }
  };

  const handleSubmit = () => {
    if (inputRef.current) {
      if (inputRef.current.value !== "") {
        createPost({
          body: inputRef.current.value,
          image: uploadedFiles,
          title: "",
          userId: id,
        });
        inputRef.current.value = "";
        setSelectedFiles([]);
        setUploadedFiles("");
      }
    }
  };

  return (
    <Flex bg="#000" justify="space-around">
      <VStack height="100%" width="100%" gap={0} align="stretch">
        <Input
          defaultValue=""
          urlImage={uploadedFiles}
          handleImageUpload={handleImageUpload}
          type="post"
          inputRef={inputRef}
          placeholder="What is happening?"
          buttonActionLabel="Post"
          handleSubmit={handleSubmit}
        />
        {isLoading && (
          <>
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
          </>
        )}
        {posts?.map((post) => (
          <Post
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

export default Feed;
