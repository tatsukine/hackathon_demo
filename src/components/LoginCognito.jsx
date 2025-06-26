import React, { useState, useEffect } from "react";
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserAttribute,
} from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "ap-southeast-2_1jBWYudnK",
  ClientId: "3epu6snl4rh3b0pnem8sajahqr",
};
const STORAGE_KEY = "cognitoToken";

export default function LoginCognito() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loginResult, setLoginResult] = useState("");
  const [status, setStatus] = useState("Not logged in");

 

  // AWS Cognito UserPool
  const userPool = React.useMemo(() => {
    return new CognitoUserPool(poolData);
  }, []);

  // ログイン状態の更新
  const updateLoginStatus = () => {
    const token = localStorage.getItem(STORAGE_KEY);
    if (token) {
      setStatus("Logged in");
    } else {
      setStatus("Not logged in");
    }
  };

  useEffect(() => {
    updateLoginStatus();
  }, []);

  // ログイン
  const handleLogin = () => {
    const authenticationData = {
      Username: email,
      Password: password,
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);
    const userData = {
      Username: email,
      Pool: userPool,
    };
    const cognitoUser = new CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        const idToken = result.idToken.jwtToken;
        setLoginResult(idToken);
        localStorage.setItem(STORAGE_KEY, idToken);
        updateLoginStatus();
      },
      onFailure: function (err) {
        alert(err.message || JSON.stringify(err));
      },
    });
  };


  // ログアウト
  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setLoginResult("");
    updateLoginStatus();
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div>
        <h1 className="text-2xl font-bold mb-2">
          Login status:
          <span
            className={`ml-2 px-2 py-1 rounded text-white text-sm ${
              status === "Logged in" ? "bg-green-600" : "bg-gray-500"
            }`}
          >
            {status}
          </span>
        </h1>
      </div>
      <hr className="my-4" />

      <h2 className="text-xl font-semibold mb-2">Login or Sign Up</h2>

      <div className="mb-3">
        <label htmlFor="email" className="block mb-1 font-medium">
          Email:
        </label>
        <input
          id="email"
          type="email"
          className="border rounded px-2 py-1 w-full"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="name" className="block mb-1 font-medium">
          Name:
        </label>
        <input
          id="name"
          type="text"
          className="border rounded px-2 py-1 w-full"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="block mb-1 font-medium">
          Password:
        </label>
        <input
          id="password"
          type="password"
          className="border rounded px-2 py-1 w-full"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>

      <div className="flex gap-2 mb-3">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>

      <button
        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded mb-3"
        onClick={handleLogout}
      >
        Logout
      </button>

    </div>
  );
}