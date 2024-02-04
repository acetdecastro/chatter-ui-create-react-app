import { gql, useMutation } from "@apollo/client";
import { User } from "../models/User";
import { graphql } from "../gql";

// interface CreateUserInput {
//   createUserInput: {
//     email: string;
//     password: string;
//   };
// }

// const CREATE_USER = gql`
//   mutation CreateUser($createUserInput: CreateUserInput!) {
//     createUser(createUserInput: $createUserInput) {
//       _id
//       email
//     }
//   }
// `;

const createUserDocument = graphql(`
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      _id
      email
    }
  }
`);

// const useCreateUser = () => {
//   return useMutation<User, CreateUserInput>(createUserDocument);
// };

const useCreateUser = () => {
  return useMutation(createUserDocument);
};

export { useCreateUser };
