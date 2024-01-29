import { ApolloClient, InMemoryCache } from "@apollo/client";
import { API_URL } from "./urls";

console.log(API_URL);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: `${API_URL}/graphql`,
});

export default client;
