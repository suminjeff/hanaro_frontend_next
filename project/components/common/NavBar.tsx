"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // 현재 경로를 가져오기 위한 hook
import { useSession, signOut } from "next-auth/react";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const { data: session } = useSession();

  const pathname = usePathname(); // 현재 경로를 가져옴
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // 경로가 일치하면 활성화된 스타일을 추가하는 함수
  const isActive = (href: string) =>
    pathname === href ? "text-white font-bold" : "hover:text-white";

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* 로고 */}
        <div className="text-white text-2xl font-bold">
          <Link href="/">나만의 레시피</Link>
        </div>

        {/* 사용자 정보 및 데스크탑 네비게이션 링크 */}
        <div className="flex items-center space-x-4">
          <ul className="hidden md:flex space-x-8 text-gray-300">
            <li className="relative group">
              {session ? (
                <button
                  className={`text-lg font-medium ${isActive(
                    "/logout"
                  )} transition duration-300`}
                  onClick={() => signOut()}
                >
                  로그아웃
                </button>
              ) : (
                <Link
                  href="/login"
                  className={`text-lg font-medium ${isActive(
                    "/login"
                  )} transition duration-300`}
                >
                  로그인
                </Link>
              )}
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </li>
            {session && (
              <>
                <li className="relative group">
                  <Link
                    href="/recipe"
                    className={`text-lg font-medium ${isActive(
                      "/recipe"
                    )} transition duration-300`}
                  >
                    레시피 목록
                  </Link>
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                </li>
                <li className="relative group">
                  <Link
                    href="/recipe/add"
                    className={`text-lg font-medium ${isActive(
                      "/recipe/add"
                    )} transition duration-300`}
                  >
                    레시피 만들기
                  </Link>
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* 모바일 메뉴 버튼 */}
        <div className="md:hidden text-white">
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* 모바일 네비게이션 메뉴 */}
      <div
        className={`${
          isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        } md:hidden transition-all duration-300 bg-gray-700 mt-2 rounded-lg shadow-lg overflow-hidden`}
      >
        <ul className="flex flex-col items-center space-y-4 p-6 text-gray-300">
          <li className="w-full text-center hover:bg-gray-600 rounded-lg transition duration-300">
            {session ? (
              <button className="block py-2 w-full" onClick={() => signOut()}>
                SignOut
              </button>
            ) : (
              <Link
                href="/login"
                className={`block py-2 w-full ${isActive("/login")}`}
              >
                Login
              </Link>
            )}
          </li>
          {session && (
            <>
              <li className="w-full text-center hover:bg-gray-600 rounded-lg transition duration-300">
                <Link
                  href="/recipe"
                  className={`block py-2 w-full ${isActive("/recipe")}`}
                >
                  Recipe List
                </Link>
              </li>
              <li className="w-full text-center hover:bg-gray-600 rounded-lg transition duration-300">
                <Link
                  href="/recipe/add"
                  className={`block py-2 w-full ${isActive("/recipe/add")}`}
                >
                  Create Recipe
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
