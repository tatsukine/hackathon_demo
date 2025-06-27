"use client"

//UI用
import React, { useEffect, useState} from "react"
import { FaMusic, FaEye, FaEyeSlash, FaEnvelope, FaLock, FaCheck } from "react-icons/fa"
import { TbBrandSpotifyFilled } from "react-icons/tb";

//AWSCognito用
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
} from "amazon-cognito-identity-js";

//個人的に追加
import { Link } from 'react-router-dom';
import SpotifyLoginButton from "./SpotifyLoginButton ";

//認証周り
const poolData = {
  UserPoolId: "ap-southeast-2_1jBWYudnK",
  ClientId: "3epu6snl4rh3b0pnem8sajahqr",
};
const STORAGE_KEY = "cognitoToken";



export default function Login() {
  //UI用
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  //AWSCognito用
  const [loginResult, setLoginResult] = useState("");
  const [status, setStatus] = useState(false);


  // AWS Cognito UserPool
  const userPool = React.useMemo(() => {
    return new CognitoUserPool(poolData);
  }, []);

  //Spotifyログイン用
  const clientId = '22d113b6c798414b8c4825aa08057a35';
  const redirectUri = 'https://43734y7gx3.execute-api.ap-northeast-1.amazonaws.com/default/hack-shiomi-mesic-0625-2';
  const scopes = [
    'user-read-email',
    'user-read-private',
    'playlist-read-private',
    'playlist-read-collaborative',
    'user-top-read',
    'user-read-recently-played',
    'user-follow-read',
    'user-library-read',
    'user-read-playback-state'
  ];

  const handleSpotifyLoginClick = () => {
    const authUrl = `https://accounts.spotify.com/authorize`
      + `?response_type=code`
      + `&client_id=${encodeURIComponent(clientId)}`
      + `&scope=${encodeURIComponent(scopes.join(' '))}`
      + `&redirect_uri=${encodeURIComponent(redirectUri)}`;
    
    window.location.href = authUrl;
  };

  //検証処理
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // Simulate API call to verify code and create account
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setStatus(true)

      setTimeout(() => {
        console.log("Redirecting to main app...")
      }, 2000)
    } catch (error) {
      
    } finally {
      
    }
  }


  // ログイン状態の更新
  const updateLoginStatus = () => {
    const token = localStorage.getItem(STORAGE_KEY);
    console.log(token)
    if (token) {
      setStatus(true);
    } else {
      setStatus(false);
    }
  };

  // useEffect(() => {
  //   updateLoginStatus();
  // }, []);


  // ログイン
  const handleLogin = async () => {
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
  }

  // ログアウト
  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setLoginResult("");
    updateLoginStatus();
  };



  if (status) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <div className="w-full max-w-md text-center">
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-8">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="bg-green-600 p-4 rounded-full">
                <FaCheck className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white mb-4">ログイン完了！</h1>
            <p className="text-gray-400 mb-6">
              ようこそ、MeSicへ！
            </p>
            {/* <button to="/TimeLine" 
            onClick={handleSpotifyLoginClick}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-md transition-colors cursor-pointer"
            handleLogout={handleLogout}
            >
              Spotifyにログインする
            </button> */}
            <SpotifyLoginButton/>
          </div>
        </div>
      </div>
    )
  }



  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-purple-600 p-3 rounded-full">
              <FaMusic className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">MeSic</h1>
          <p className="text-gray-400">音楽でつながる、新しい体験</p>
        </div>

        {/* Login Form */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg">
          <div className="p-6 pb-4">
            <h2 className="text-2xl font-bold text-white text-center mb-2">ログイン</h2>
            <p className="text-gray-400 text-center mb-6">アカウントにサインインしてください</p>
          </div>

          <div className="px-6 pb-6">
            <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-white font-medium text-sm">
                  メールアドレス
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="email"
                    type="email"
                    placeholder="example@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-white font-medium text-sm">
                  パスワード
                </label>
                <div className="relative">
                  <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="パスワードを入力"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me and Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    id="remember"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-purple-600 bg-gray-800 border-gray-600 rounded focus:ring-purple-500 focus:ring-2"
                  />
                  <label htmlFor="remember" className="text-sm text-gray-300 cursor-pointer">
                    ログイン状態を保持
                  </label>
                </div>
                <button type="button" className="text-purple-400 hover:text-purple-300 text-sm transition-colors">
                  パスワードを忘れた方
                </button>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
                onClick={handleLogin}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ログイン中...
                  </div>
                ) : (
                  "ログイン"
                )}
              </button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-900 text-gray-400">または</span>
                </div>
              </div>

              {/* Social Login Options */}
              <div className="space-y-3">
                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-3 bg-gray-800 border border-gray-700 text-white hover:bg-gray-700 py-3 px-4 rounded-md transition-colors"
                >
                  <TbBrandSpotifyFilled className="w-5 h-5" />
                  Spotifyでログイン
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Sign Up Link */}
        <Link to="/SignUp" className="text-center mt-6">
          <p className="text-gray-400">
            アカウントをお持ちでない方は{" "}
            <button className="text-purple-400 hover:text-purple-300 transition-colors">新規登録</button>
          </p>
        </Link>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>&copy; 2024 MeSic. All rights reserved.</p>
          <div className="flex justify-center gap-4 mt-2">
            <button className="text-gray-500 hover:text-gray-400 transition-colors">利用規約</button>
            <button className="text-gray-500 hover:text-gray-400 transition-colors">プライバシーポリシー</button>
            <button className="text-gray-500 hover:text-gray-400 transition-colors">ヘルプ</button>
          </div>
        </div>
      </div>
    </div>
  )
}
