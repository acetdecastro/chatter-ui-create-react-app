import { useState } from "react";
import { API_URL } from "../constants/urls";
import client from "../constants/apollo-client";

interface LoginRequestBody {
  email: string;
  password: string;
}

const useSignup = () => {
  const [error, setError] = useState<string>();

  const login = async (loginRequestbody: LoginRequestBody) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginRequestbody),
    });
    if (!res.ok) {
      if (res.status === 401) {
        setError("Credentials are not valid.");
      } else {
        setError("Sorry, something went wrong.");
      }
      return;
    }
    setError("");
    await client.refetchQueries({ include: "active" });
  };

  return { login, error };
};

export { useSignup as useLogin };
