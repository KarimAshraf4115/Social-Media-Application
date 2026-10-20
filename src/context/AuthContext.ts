import { createContext } from "react";

type AuthContextType = {
  userLoggedIn: string | null;
  setUserLoggedIn: React.Dispatch<React.SetStateAction<string | null>>;
};

export const AuthContext = createContext<AuthContextType>({
  userLoggedIn: null,
  setUserLoggedIn: () => {},
});
