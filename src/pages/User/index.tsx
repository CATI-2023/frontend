import { useNavigate } from "react-router-dom";
import { logout } from "../../utils/Auth";

export function UserPage() {
    const navigate = useNavigate();
  return (
    <>
      <h1>Vc está logado</h1>
      <button onClick={() => {logout(), navigate("/")}}>Logout</button>
    </>
  );
}
