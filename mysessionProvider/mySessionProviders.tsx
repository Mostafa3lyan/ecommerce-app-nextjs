"use client";

import React, { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

const MySessionProvider = ({ children }: { children: ReactNode }) => {
    return <SessionProvider>{children}</SessionProvider>;
};

export default MySessionProvider;
