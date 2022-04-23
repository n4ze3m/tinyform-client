import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getAccessToken } from "../../services/token";

interface ProtectProps {
    children: React.ReactNode;
}

export default function Protect({ children }: ProtectProps) {
    const data = getAccessToken();
    if (!data) {
        return <Navigate to="/login" replace />
    }

    return <>{children}</>;
}