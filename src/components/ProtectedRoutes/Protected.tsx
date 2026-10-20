import { Link } from "react-router-dom";

export default function Protected({ children } : { children: React.ReactNode }) {
    if(localStorage.getItem("userToken")){
        return <>{children}</>;
    }else{
        return <>
        <h1 className="text-5xl text-center my-5 h-80">Not Allowed! Please <Link className="text-clay" to="/login">login</Link> first</h1>
        </>
    }

}
