import { useNavigate } from "react-router-dom";
import { login } from "../../utils/Auth";

export function LoginPage(){
    const navigate = useNavigate();
    return(
        <>
        <h1>Pagina de Login</h1>
        <button onClick={() => {login("123")}} >Login</button>
        <button onClick={() => {navigate("/authentic")}}>page login</button>
        </>
    );
}