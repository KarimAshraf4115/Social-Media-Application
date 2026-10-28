import { jwtDecode } from "jwt-decode";
import { useMemo, useState } from "react";
import { AuthContext } from "./AuthContext";

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userLoggedIn, setUserLoggedIn] = useState(() =>
    localStorage.getItem("userToken"),
  ); // lazy initialization (don't call the function in every rerender)

  const userId = useMemo(
    () => (userLoggedIn ? jwtDecode<{ user: string }>(userLoggedIn).user : ""),
    [userLoggedIn],
  );

  return (
    <AuthContext.Provider value={{ userLoggedIn, setUserLoggedIn, userId }}>
      {children}
    </AuthContext.Provider>
  );
}
