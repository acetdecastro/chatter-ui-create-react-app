import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Branding from "./Branding";
import MobileNavigation from "./mobile/MobileNavigation";
import MobileBranding from "./mobile/MobileBranding";
import Navigation from "./Navigation";
import Settings from "./Settings";
import { Page } from "../../interfaces/page.interface";
import { useReactiveVar } from "@apollo/client";
import { authenticatedVar } from "../../constants/authenticated";

const pages: Page[] = [
  {
    title: "Home",
    path: "/",
  },
];

const publicPages: Page[] = [
  {
    title: "Login",
    path: "/login",
  },
  {
    title: "Sign Up",
    path: "/signup",
  },
];

const Header = () => {
  const authenticated = useReactiveVar(authenticatedVar);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Branding />
          <MobileNavigation pages={authenticated ? pages : publicPages} />
          <MobileBranding />
          <Navigation pages={authenticated ? pages : publicPages} />

          {authenticated && <Settings />}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
