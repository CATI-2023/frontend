import { Navigate, Outlet } from "react-router-dom";
import { isLogged } from "../utils/Auth";

const PrivateRoutes = () =>{
    return isLogged() ? <Outlet /> : <Navigate to="/login" />
}
export default PrivateRoutes;