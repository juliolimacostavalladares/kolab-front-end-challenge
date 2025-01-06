import { Box, Button, Flex, Textarea, Image } from "@chakra-ui/react";
import { Avatar } from "./ui/avatar";
import { Image as ImageIcon } from "lucide-react";
import UploadButton from "./UploadButton";

const Input = ({
  buttonActionLabel,
  handleImageUpload,
  placeholder,
  handleSubmit,
  handleCancel,
  defaultValue,
  inputRef,
  urlImage,
  type,
}: {
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleCancel?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleImageUpload?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef: React.RefObject<HTMLTextAreaElement>;
  buttonActionLabel: string;
  type: "comment" | "post";
  defaultValue: string;
  placeholder: string;
  urlImage?: string;
}) => {
  return (
    <Box
      borderTopWidth={1}
      borderBottomWidth={1}
      borderLeftWidth={1}
      borderRightWidth={1}
      borderColor="#2f3336"
      p={4}
      width="100%"
      maxW="600px"
      mx="auto"
      bg="#000"
    >
      <Flex>
        <Avatar size="md" mr={4} />
        <Flex direction="column" flex="1">
          <Flex justify="space-between">
            <Box width="100%">
              <Textarea
                ref={inputRef}
                autoresize
                placeholder={placeholder}
                color="#fff"
                fontSize={20}
                _placeholder={{ color: "#71767B", fontSize: 20 }}
                border={0}
                variant="flushed"
                defaultValue={defaultValue}
              />
            </Box>
          </Flex>
          <Image mt={2} mb={5} rounded="md" src={urlImage} />
          <Flex justify="space-between">
            {type === "post" && (
              <UploadButton
                handleFileChange={handleImageUpload}
                hoverColor="#1D9BF0"
                icon={<ImageIcon />}
              />
            )}
            {type !== "post" && !defaultValue && (
              <Box visibility="hidden"></Box>
            )}

            {defaultValue && (
              <Button
                onClick={(e) => {
                  if (handleCancel) {
                    handleCancel(e);
                  }
                }}
                color="#fff"
              >
                Cancel
              </Button>
            )}
            <Button onClick={(e) => handleSubmit(e)} bg="#1D9BF0" color="#000">
              {buttonActionLabel}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Input;
