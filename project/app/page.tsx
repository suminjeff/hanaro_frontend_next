"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function HomePage() {
  const { data: session } = useSession();

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center p-10 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-gray-800">나만의 레시피</h1>
        <p className="mt-4 text-lg text-gray-600">레시피 만들기 웹사이트</p>

        {session?.user?.name ? (
          <Link href={"/recipe"}>
            <button className="mt-6 px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
              시작하기
            </button>
          </Link>
        ) : (
          <Link href={"/login"}>
            <button className="mt-6 px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
              시작하기
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
