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

export default function Test2() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loginResult, setLoginResult] = useState("");
  const [status, setStatus] = useState("Not logged in");

  const [confirmEmail, setConfirmEmail] = useState("");
  const [code, setCode] = useState("");
  const [confirmResult, setConfirmResult] = useState("");

  const [apiResponse, setApiResponse] = useState("");

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

  // サインアップ
  const handleSignup = () => {
    let attributeList = [];

    const attributeEmail = new CognitoUserAttribute({
      Name: "email",
      Value: email,
    });
    attributeList.push(attributeEmail);

    const attributeName = new CognitoUserAttribute({
      Name: "name",
      Value: name,
    });
    attributeList.push(attributeName);

    userPool.signUp(email, password, attributeList, null, function (err, result) {
      if (err) {
        alert(err.message || JSON.stringify(err));
        return;
      }
      const cognitoUser = result.user;
      setLoginResult("user name is " + cognitoUser.getUsername());
    });
  };

  // サインアップ確認
  const handleConfirm = () => {
    const userData = {
      Username: confirmEmail,
      Pool: userPool,
    };
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.confirmRegistration(code, true, function (err, result) {
      if (err) {
        alert(err.message || JSON.stringify(err));
        return;
      }
      setConfirmResult("confirm result: " + result);
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
        <button
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          onClick={handleSignup}
        >
          Sign Up
        </button>
      </div>
      <button
        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded mb-3"
        onClick={handleLogout}
      >
        Logout
      </button>

      <div className="mb-3">
        <textarea
          disabled
          className="border rounded px-2 py-1 w-full h-32"
          value={loginResult}
          placeholder="loginResult"
          readOnly
        />
      </div>

      <hr className="my-4" />

      <div>
        <h2 className="text-xl font-semibold mb-2">Confirmation Sign Up User</h2>
        <div className="mb-3">
          <label htmlFor="confirmEmail" className="block mb-1 font-medium">
            Email:
          </label>
          <input
            id="confirmEmail"
            type="email"
            className="border rounded px-2 py-1 w-full"
            value={confirmEmail}
            onChange={e => setConfirmEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="code" className="block mb-1 font-medium">
            ConfirmCode:
          </label>
          <input
            id="code"
            type="text"
            className="border rounded px-2 py-1 w-full"
            value={code}
            onChange={e => setCode(e.target.value)}
          />
        </div>
        <div>
          <button
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
            onClick={handleConfirm}
          >
            Confirmation
          </button>
        </div>
      </div>

      <div className="mb-3">
        <textarea
          disabled
          className="border rounded px-2 py-1 w-full h-24"
          value={confirmResult}
          placeholder="idトークン"
          readOnly
        />
      </div>
    </div>
  );
}