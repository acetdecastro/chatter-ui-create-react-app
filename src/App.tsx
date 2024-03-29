import {
  Container,
  CssBaseline,
  Grid,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { RouterProvider } from "react-router-dom";
import router from "./components/Routes";
import { ApolloProvider } from "@apollo/client";
import client from "./constants/apollo-client";
import Guard from "./components/auth/Guard";
import Header from "./components/header/Header";
import Snackbar from "./components/snackbar/Snackbar";
import ChatList from "./components/chat-list/ChatList";
import { usePath } from "./hooks/usePath";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

const App = () => {
  const { path } = usePath();
  const showChatlist = path === "/" || path.includes("chats");

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <Header />
        <Guard>
          <Container sx={{ marginTop: "1rem" }}>
            {showChatlist ? (
              <Grid container spacing={5}>
                <Grid item xs={12} md={5} lg={4} xl={3}>
                  <ChatList />
                </Grid>
                <Grid item xs={12} md={7} lg={8} xl={9}>
                  <Routes />
                </Grid>
              </Grid>
            ) : (
              <Routes />
            )}
          </Container>
        </Guard>
        <Snackbar />
      </ThemeProvider>
    </ApolloProvider>
  );
};

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default App;
