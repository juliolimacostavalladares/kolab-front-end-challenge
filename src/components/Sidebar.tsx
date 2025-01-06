import { Box, VStack, IconButton, Text, HStack } from "@chakra-ui/react";
import { House, User } from "lucide-react";

const Sidebar = () => {
  return (
    <Box
      width="250px"
      height="100vh"
      p={4}
      borderRight="1px"
      borderColor="gray.200"
    >
      <VStack align="start">
        <VStack align="start" width="100%">
          <HStack cursor="pointer">
            <IconButton
              variant="ghost"
              _hover={{ backgroundColor: "unset" }}
              color="#fff"
              aria-label="Home"
            >
              <House />
            </IconButton>
            <Text fontSize="25px" fontWeight={600} color="#fff">
              Home
            </Text>
          </HStack>
          <HStack cursor="pointer">
            <IconButton
              variant="ghost"
              _hover={{ backgroundColor: "unset" }}
              color="#fff"
              aria-label="Profile"
            >
              <User />
            </IconButton>
            <Text fontSize="25px" fontWeight={600} color="#fff">
              Profile
            </Text>
          </HStack>
        </VStack>
      </VStack>
    </Box>
  );
};

export default Sidebar;
