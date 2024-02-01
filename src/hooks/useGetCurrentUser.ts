import { gql, useQuery } from "@apollo/client";
import { User } from "../models/User";

const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    getCurrentUser {
      _id
      email
    }
  }
`;

const useGetCurrentUser = () => {
  return useQuery<User>(GET_CURRENT_USER);
};

export { useGetCurrentUser };
