import router from "../components/Routes";
import client from "../constants/apollo-client";
import { authenticatedVar } from "../constants/authenticated";

export const onLogout = () => {
  authenticatedVar(false);
  router.navigate("/login");
  client.cache.reset();
  // client.resetStore(); See github: https://github.com/apollographql/apollo-client/issues/1195
};
