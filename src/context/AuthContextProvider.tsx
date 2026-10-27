import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { jwtDecode } from "jwt-decode";

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userLoggedIn, setUserLoggedIn] = useState(() =>
    localStorage.getItem("userToken"),
  ); // lazy initialization (don't call the function in every rerender)

  const [userId , setUserId] = useState("");
  useEffect(() => {
    const { user }: { user: string } = jwtDecode(
      localStorage.getItem("userToken"),
    );
    setUserId(user);
  }, [userLoggedIn]);


  return (
    <AuthContext.Provider value={{ userLoggedIn, setUserLoggedIn , userId }}>
      {children}
    </AuthContext.Provider>
  );
}
