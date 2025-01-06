import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { generateRandomId } from "../utils/generateRandomId";
import { getUsersById, updateUser } from "../services/api";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

const useUser = (isNewComment?: boolean, userId?: number) => {
  const queryClient = useQueryClient();
  const mockUser = {
    id: 2,
    name: "Ervin Howell",
    username: "Antonette",
    email: "Shanna@melissa.tv",
  };

  const [user, setUser] = useState<User>(mockUser);

  const userComments = queryClient.getQueryData<User>(["user", isNewComment? user.id :generateRandomId()])

  const cachedUser = queryClient.getQueryData<User>(["user", userId]);

  const { data: getUser } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUsersById(Number(userId)),
    enabled: !cachedUser,
  });

  const { mutate: editMutation } = useMutation({
    mutationFn: updateUser,
    onSuccess: (updatedUser: User) => {
      queryClient.setQueryData<User>(["user", user.id], updatedUser);
      queryClient.setQueryData(["user", updatedUser.id], (oldUser: User) => {
        if (!oldUser) {
          return updatedUser;
        }

        return {
          ...oldUser,
          name: updatedUser.name,
          username: updatedUser.username,
        };
      });
    },
  });

  return {...user, setUser, userComments, editUserMutation: editMutation, cachedUser, getUser};
};

export default useUser;
