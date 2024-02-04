import { useQuery } from "@apollo/client";
import { graphql } from "../gql";

const getCurrentUserDocument = graphql(`
  query GetCurrentUser {
    getCurrentUser {
      _id
      email
    }
  }
`);

const useGetCurrentUser = () => {
  return useQuery(getCurrentUserDocument);
};

export { useGetCurrentUser };
