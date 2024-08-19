'use client'
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";

import { authScopes } from "@/authConfig";
import { useState } from "react";

export default function Home() {
  const { instance } = useMsal();
  const [accountDetails, setAccountDetails] = useState<string | null>(null)

  const handleLogin = () => {
    instance
      .loginPopup(authScopes)
      .then((response) => {
        console.log("login successful!", response);

        instance.setActiveAccount(response.account);

        setAccountDetails(response.account.name ?? '')
      })
      .catch((e) => {
        console.log(e);
      });
  };

  function handleLogout() {
    instance
      .logoutPopup()
      .then((response) => {})
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>ok </h1>

      <AuthenticatedTemplate>
        <h6>Vc estah logado</h6>
        {accountDetails && <p>{accountDetails}</p>}
        <button onClick={() => handleLogout()}>logout</button>
      </AuthenticatedTemplate>

      <UnauthenticatedTemplate>
        <h6>Vc estah deslogado</h6>

        <button onClick={() => handleLogin()}>login</button>
      </UnauthenticatedTemplate>
    </main>
  );
}
