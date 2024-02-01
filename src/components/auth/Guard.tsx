import publicRoutes from "../../constants/public-routes";
import { useGetCurrentUser } from "../../hooks/useGetCurrentUser";

interface GuardProps {
  children: JSX.Element;
}

const Guard = ({ children }: GuardProps) => {
  const { data: user } = useGetCurrentUser();

  return (
    <>
      {publicRoutes.includes(window.location.pathname)
        ? children
        : user && children}
    </>
  );
};

export default Guard;
