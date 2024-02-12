import { ApolloCache } from "@apollo/client";
import { Message } from "../gql/graphql";
import { getMessagesDocument } from "../hooks/useGetMessages";

export const updateMessages = (cache: ApolloCache<any>, message: Message) => {
  const getMessagesOptions = {
    query: getMessagesDocument,
    variables: {
      chatId: message.chatId,
    },
  };
  const messages = cache.readQuery({ ...getMessagesOptions });
  cache.writeQuery({
    ...getMessagesOptions,
    data: {
      messages: (messages?.messages || []).concat(message),
    },
  });
};
