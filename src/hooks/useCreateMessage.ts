import { useMutation } from "@apollo/client";
import { graphql } from "../gql";
import { getMessagesDocument } from "./useGetMessages";

export const createMessageDocument = graphql(`
  mutation CreateMessage($createMessageInput: CreateMessageInput!) {
    createMessage(createMessageInput: $createMessageInput) {
      ...MessageFragment
    }
  }
`);

const useCreateMessage = (chatId: string) => {
  return useMutation(createMessageDocument, {
    update(cache, { data }) {
      const getMessagesOptions = {
        query: getMessagesDocument,
        variables: {
          chatId,
        },
      };
      const messages = cache.readQuery({
        ...getMessagesOptions,
      });
      if (!messages || !data?.createMessage) {
        return;
      }
      cache.writeQuery({
        ...getMessagesOptions,
        data: {
          messages: messages.messages.concat(data?.createMessage),
        },
      });
    },
  });
};

export { useCreateMessage };
