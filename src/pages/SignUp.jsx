"use client"

import React from 'react';
import { useState } from "react"
import { Link } from 'react-router-dom';
import {
    CognitoUserPool,
    CognitoUser,
    CognitoUserAttribute,
} from "amazon-cognito-identity-js";

import { FaMusic, FaEye, FaEyeSlash, FaEnvelope, FaLock, FaUser, FaSpotify, FaCheck, FaSpinner } from "react-icons/fa"

const STORAGE_KEY = "cognitoToken";

const poolData = {
    UserPoolId: "ap-southeast-2_1jBWYudnK",
    ClientId: "3epu6snl4rh3b0pnem8sajahqr",
};



export default function SignUp() {
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: "",
        verificationCode: "",
    })
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isSendingCode, setIsSendingCode] = useState(false)
    const [isVerifying, setIsVerifying] = useState(false)
    const [errors, setErrors] = useState({})
    const [codeSent, setCodeSent] = useState(false)
    const [isRegistrationComplete, setIsRegistrationComplete] = useState(false)

    const [loginResult, setLoginResult] = useState("");
    // AWS Cognito UserPool
    const userPool = React.useMemo(() => {
        return new CognitoUserPool(poolData);
    }, []);


    //formDataに変更があった時に、その内容を保持するイベントハンドラ
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }))
        }
    }


    //入力フォームのバリデーションチェック関数
    const validateForm = () => {
        const newErrors = {}

        if (!formData.email) {
            newErrors.email = "メールアドレスを入力してください"
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "有効なメールアドレスを入力してください"
        }

        if (!formData.username) {
            newErrors.username = "ユーザー名を入力してください"
        } else if (formData.username.length < 3) {
            newErrors.username = "ユーザー名は3文字以上で入力してください"
        }

        if (!formData.password) {
            newErrors.password = "パスワードを入力してください"
        } else if (formData.password.length < 8) {
            newErrors.password = "パスワードは8文字以上で入力してください"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    //認証コードの送信
    const handleSendVerificationCode = async () => {
        if (!validateForm()) return

        setIsSendingCode(true)
        setErrors({})

        try {
            // Simulate API call to send verification code
            await new Promise((resolve) => setTimeout(resolve, 2000))

            console.log("Sending verification code to:", formData.email)
            setCodeSent(true)
        } catch (error) {
            setErrors({ general: "認証コードの送信に失敗しました。もう一度お試しください。" })
        } finally {
            setIsSendingCode(false)
        }
    }

    //検証処理
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!codeSent) {
            await handleSendVerificationCode()
            return
        }

        if (!formData.verificationCode) {
            setErrors({ verificationCode: "認証コードを入力してください" })
            return
        }

        if (formData.verificationCode.length !== 6) {
            setErrors({ verificationCode: "認証コードは6桁で入力してください" })
            return
        }

        setIsVerifying(true)
        setErrors({})

        try {
            // Simulate API call to verify code and create account
            await new Promise((resolve) => setTimeout(resolve, 2000))

            console.log("Account created:", {
                email: formData.email,
                username: formData.username,
                verificationCode: formData.verificationCode,
            })

            setIsRegistrationComplete(true)
            // Here you would typically redirect to the main app or login page
            setTimeout(() => {
                console.log("Redirecting to main app...")
            }, 2000)
        } catch (error) {
            setErrors({ verificationCode: "認証コードが正しくありません。もう一度お試しください。" })
        } finally {
            setIsVerifying(false)
        }
    }

    //
    const handleResendCode = async () => {
        setIsSendingCode(true)
        setErrors({})
        try {
            await new Promise((resolve) => setTimeout(resolve, 1500))
            console.log("Resending verification code to:", formData.email)
        } catch (error) {
            setErrors({ general: "認証コードの再送信に失敗しました。" })
        } finally {
            setIsSendingCode(false)
        }
    }

    // サインアップ関数
    const handleSignup = () => {
        let attributeList = [];

        const attributeEmail = new CognitoUserAttribute({
            Name: "email",
            Value: formData.email,
        });
        attributeList.push(attributeEmail);

        const attributeName = new CognitoUserAttribute({
            Name: "name",
            Value: formData.username,
        });
        attributeList.push(attributeName);



        userPool.signUp(formData.email, formData.password, attributeList, null, function (err, result) {
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
            Username: formData.email,
            Pool: userPool,
        };
        const cognitoUser = new CognitoUser(userData);
        cognitoUser.confirmRegistration(formData.verificationCode, true, function (err, result) {
            if (err) {
                alert(err.message || JSON.stringify(err));
                return;
            }
            // setConfirmResult("confirm result: " + result);
        });
    };

    if (isRegistrationComplete) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-6">
                <div className="w-full max-w-md text-center">
                    <div className="bg-gray-900 border border-gray-800 rounded-lg p-8">
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <div className="bg-green-600 p-4 rounded-full">
                                <FaCheck className="w-8 h-8 text-white" />
                            </div>
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-4">アカウント作成完了！</h1>
                        <p className="text-gray-400 mb-6">
                            アカウントの作成が完了しました。
                            <br />
                            もう一度ログインをして、MeSicを始めよう！
                        </p>
                        <Link to="/Login" className="w-full flex justify-center items-center bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-md transition-colors cursor-pointer">
                            MeSicを始める
                        </Link>
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

                {/* Signup Form */}
                <div className="bg-gray-900 border border-gray-800 rounded-lg">
                    <div className="p-6 pb-4">
                        <h2 className="text-2xl font-bold text-white text-center mb-2">新規登録</h2>
                        <p className="text-gray-400 text-center mb-6">アカウントを作成してください</p>
                    </div>

                    <div className="px-6 pb-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email Field */}
                            <div className="space-y-2">
                                <label htmlFor="email" className="block text-white font-medium text-sm">
                                    メールアドレス
                                </label>
                                <div className="relative">
                                    <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="example@email.com"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className={`w-full pl-10 pr-4 py-3 bg-gray-800 border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors ${errors.email ? "border-red-500" : "border-gray-700"
                                            }`}
                                        required
                                        disabled={codeSent}
                                    />
                                </div>
                                {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
                            </div>

                            {/* Username Field */}
                            <div className="space-y-2">
                                <label htmlFor="username" className="block text-white font-medium text-sm">
                                    ユーザー名
                                </label>
                                <div className="relative">
                                    <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        id="username"
                                        name="username"
                                        type="text"
                                        placeholder="ユーザー名を入力"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        className={`w-full pl-10 pr-4 py-3 bg-gray-800 border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors ${errors.username ? "border-red-500" : "border-gray-700"
                                            }`}
                                        required
                                        disabled={codeSent}
                                    />
                                </div>
                                {errors.username && <p className="text-red-400 text-sm">{errors.username}</p>}
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
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="パスワードを入力"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className={`w-full pl-10 pr-12 py-3 bg-gray-800 border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors ${errors.password ? "border-red-500" : "border-gray-700"
                                            }`}
                                        required
                                        disabled={codeSent}
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                                    </button>
                                </div>
                                {errors.password && <p className="text-red-400 text-sm">{errors.password}</p>}
                            </div>

                            {/* General Error */}
                            {errors.general && <div className="text-red-400 text-sm text-center">{errors.general}</div>}

                            {/* Send Verification Code Button */}
                            {!codeSent && (
                                <button
                                    type="submit"
                                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={isSendingCode}
                                    onClick={handleSignup}
                                >
                                    {isSendingCode ? (
                                        <div className="flex items-center justify-center gap-2">
                                            <FaSpinner className="w-4 h-4 animate-spin" />
                                            認証コードを送信中...
                                        </div>
                                    ) : (
                                        "認証コードを送信"
                                    )}
                                </button>
                            )}

                            {/* Verification Code Section */}
                            {codeSent && (
                                <div className="space-y-4">
                                    {/* Success Message */}
                                    <div className="bg-green-900/20 border border-green-800 rounded-lg p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-green-600 p-2 rounded-full">
                                                <FaEnvelope className="w-4 h-4 text-white" />
                                            </div>
                                            <div>
                                                <p className="text-green-400 font-medium">認証コードを送信しました</p>
                                                <p className="text-sm text-green-300">{formData.email} に6桁のコードを送信しました</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Verification Code Field */}
                                    <div className="space-y-2">
                                        <label htmlFor="verificationCode" className="block text-white font-medium text-sm">
                                            認証コード
                                        </label>
                                        <input
                                            id="verificationCode"
                                            name="verificationCode"
                                            type="text"
                                            placeholder="6桁のコードを入力"
                                            value={formData.verificationCode}
                                            onChange={handleInputChange}
                                            maxLength={6}
                                            className={`w-full px-4 py-3 bg-gray-800 border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors text-center text-2xl tracking-widest ${errors.verificationCode ? "border-red-500" : "border-gray-700"
                                                }`}
                                            required
                                        />
                                        {errors.verificationCode && <p className="text-red-400 text-sm">{errors.verificationCode}</p>}
                                    </div>

                                    {/* Create Account Button */}
                                    <button
                                        type="submit"
                                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        disabled={isVerifying}
                                        onClick={handleConfirm}
                                    >
                                        {isVerifying ? (
                                            <div className="flex items-center justify-center gap-2">
                                                <FaSpinner className="w-4 h-4 animate-spin" />
                                                アカウントを作成中...
                                            </div>
                                        ) : (
                                            "アカウントを作成"
                                        )}
                                    </button>

                                    {/* Resend Code */}
                                    <div className="text-center">
                                        <p className="text-gray-400 text-sm mb-2">認証コードが届かない場合</p>
                                        <button
                                            type="button"
                                            onClick={handleResendCode}
                                            className="text-purple-400 hover:text-purple-300 text-sm transition-colors disabled:opacity-50"
                                            disabled={isSendingCode}
                                        >
                                            {isSendingCode ? "再送信中..." : "認証コードを再送信"}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </form>

                        {/* Social Signup Options - Only show if code hasn't been sent */}
                        {!codeSent && (
                            <>
                                {/* Divider */}
                                <div className="relative mt-6">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-700" />
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-2 bg-gray-900 text-gray-400">または</span>
                                    </div>
                                </div>

                                {/* Social Signup Options */}
                                <div className="space-y-3 mt-6">
                                    <button
                                        type="button"
                                        className="w-full flex items-center justify-center gap-3 bg-gray-800 border border-gray-700 text-white hover:bg-gray-700 py-3 px-4 rounded-md transition-colors"
                                    >
                                        <FaSpotify className="w-5 h-5" />
                                        Spotifyで登録
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Login Link */}
                <Link to="/Login" className="text-center mt-6">
                    <p className="text-gray-400">
                        すでにアカウントをお持ちの方は{" "}
                        <button className="text-purple-400 hover:text-purple-300 transition-colors">ログイン</button>
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
