import { useState } from "react";
import { API_URL } from "../constants/urls";
import client from "../constants/apollo-client";
import {
  CREDENTIALS_ARE_NOT_VALID,
  UNKNOWN_ERROR_MESSAGE,
} from "../constants/errors";

interface LoginRequestBody {
  email: string;
  password: string;
}

const useLogin = () => {
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
        setError(CREDENTIALS_ARE_NOT_VALID);
      } else {
        setError(UNKNOWN_ERROR_MESSAGE);
      }
      return;
    }
    setError("");
    await client.refetchQueries({ include: "active" });
  };

  return { login, error };
};

export { useLogin };
