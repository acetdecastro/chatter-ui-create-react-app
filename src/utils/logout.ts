import router from "../components/Routes";
import client from "../constants/apollo-client";

export const onLogout = () => {
  router.navigate("/login");
  // client.resetStore(); See github: https://github.com/apollographql/apollo-client/issues/1195
  client.cache.reset();
};
