import { Navigate } from "react-router-dom";
import { removeTokens } from "../../services/token"

export default function LogoutBody() {
    removeTokens();
    return <Navigate to="/" replace />
}