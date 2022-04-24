import React from "react";
import { Navigate } from "react-router-dom";
import { getAccessToken } from "../../services/token";

interface UnProtectProps {
    children: React.ReactNode;
}

export default function UnProtect({ children }: UnProtectProps) {
    const data = getAccessToken();
    if (data) {
        return <Navigate to="/dashboard" replace />
    }

    return <>{children}</>;
}