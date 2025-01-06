import { Button } from "@chakra-ui/react";
import { FileUploadRoot, FileUploadTrigger } from "./ui/file-upload";
import React from "react";

const UploadButton = ({
  icon,
  hoverColor,
  handleFileChange,
}: {
  icon: React.ReactNode;
  handleFileChange:
    | ((event: React.ChangeEvent<HTMLInputElement>) => void)
    | undefined;
  hoverColor: string;
}) => {
  return (
    <FileUploadRoot onChange={handleFileChange}>
      <FileUploadTrigger asChild>
        <Button
          unstyled
          _hover={{
            color: hoverColor,
            backgroundColor: "unset",
            cursor: "pointer",
          }}
          color={hoverColor}
          variant="outline"
          size="sm"
        >
          {icon}
        </Button>
      </FileUploadTrigger>
    </FileUploadRoot>
  );
};

export default UploadButton;
