import {useState } from "react";
import { AuthContext } from "./AuthContext";


export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userLoggedIn, setUserLoggedIn] = useState(() =>
    localStorage.getItem("userToken"),
  ); // lazy initialization (don't call the function in every rerender)
  return (
    <AuthContext.Provider value={{ userLoggedIn, setUserLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}
