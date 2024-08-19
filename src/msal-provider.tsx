'use client'

import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./authConfig";
import { ReactNode } from "react";

export const msalInstance = new PublicClientApplication(msalConfig);

type Props = {
    children: ReactNode
}

export function AuthProvider({ children }: Props) {
  console.log(msalConfig)
  return <MsalProvider instance={msalInstance}>{children}</MsalProvider>;
}
