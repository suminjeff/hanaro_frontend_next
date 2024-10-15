"use client";

import { signIn } from "next-auth/react";
import React, { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: true,
      email: email,
      password: password,
      callbackUrl: "/recipe",
    });
    if (result?.error) {
      console.log("로그인 중 에러 발생");
    } else {
      console.log("로그인 성공");
    }
  };

  return (
    <div className="h-4/5 w-full flex justify-center items-center bg-gray-100">
      <div className="flex flex-col w-1/3 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6">로그인</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="w-full">
            <label
              htmlFor="email"
              className="font-semibold block text-sm text-gray-700 mb-1"
            >
              이메일
            </label>
            <input
              id="email"
              type="email"
              placeholder="your-email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="password"
              className="font-semibold block text-sm text-gray-700 mb-1"
            >
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
            type="submit"
          >
            로그인
          </button>
        </form>

        <div className="flex flex-col gap-3 mt-4">
          <button
            className="w-full py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
            onClick={() =>
              signIn("google", {
                callbackUrl: "/recipe",
              })
            }
          >
            Google로 로그인
          </button>
          <button
            className="w-full py-2 px-4 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition duration-200"
            onClick={() =>
              signIn("github", {
                callbackUrl: "/recipe",
              })
            }
          >
            Github로 로그인
          </button>
        </div>
      </div>
    </div>
  );
}
