import { useEffect } from "react";
import publicRoutes from "../../constants/public-routes";
import { useGetCurrentUser } from "../../hooks/useGetCurrentUser";
import { authenticatedVar } from "../../constants/authenticated";
import { snackVar } from "../../constants/snack";
import { UNKNOWN_ERROR_SNACK_MESSAGE } from "../../constants/errors";
import { usePath } from "../../hooks/usePath";

interface GuardProps {
  children: JSX.Element;
}

const Guard = ({ children }: GuardProps) => {
  const { data: user, error } = useGetCurrentUser();
  const { path } = usePath();

  useEffect(() => {
    if (user) {
      authenticatedVar(true);
    }
  }, [user]);

  useEffect(() => {
    if (error?.networkError) {
      snackVar(UNKNOWN_ERROR_SNACK_MESSAGE);
    }
  }, [error]);

  return (
    <>
      {publicRoutes.includes(window.location.pathname)
        ? children
        : user && children}
    </>
  );
};

export default Guard;
