"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";

export default function Form() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form className="flex flex-col justify-center items-center w-full max-w-md p-6 space-y-6 bg-white shadow-lg rounded-lg">
      <p className="text-2xl font-bold">로그인</p>
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
          className=" w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
        type="button"
      >
        로그인
      </button>
      <div className="w-full flex flex-col space-y-3">
        <button
          className="w-full py-2 px-4 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition duration-200"
          onClick={() => signIn()}
        >
          Sign in with Social Account
        </button>
      </div>
    </form>
  );
}
