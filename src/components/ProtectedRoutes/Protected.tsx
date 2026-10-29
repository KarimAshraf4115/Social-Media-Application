import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

export default function Protected({ children }: { children: React.ReactNode }) {
  const { userLoggedIn } = useContext(AuthContext);
  if (userLoggedIn) {
    return <>{children}</>;
  } else {
    return (
      <>
        <h1 className="text-5xl text-center my-5 h-80">
          Not Allowed! Please{" "}
          <Link className="text-clay" to="/login">
            login
          </Link>{" "}
          first
        </h1>
      </>
    );
  }
}
