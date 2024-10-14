import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* 로고 및 설명 */}
        <div className="text-white text-xl font-bold mb-4 md:mb-0">
          나만의 레시피
        </div>

        {/* 네비게이션 링크 */}
        <ul className="flex space-x-6 mb-4 md:mb-0">
          <li className="hover:text-white transition duration-300">
            <a href="#about">About Us</a>
          </li>
          <li className="hover:text-white transition duration-300">
            <a href="#contact">Contact</a>
          </li>
          <li className="hover:text-white transition duration-300">
            <a href="#privacy">Privacy Policy</a>
          </li>
        </ul>

        {/* 소셜 미디어 아이콘 (예시) */}
        <div className="flex space-x-4">
          <a href="https://facebook.com" className="hover:text-white">
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692V11.04h3.128V8.51c0-3.1 1.893-4.785 4.658-4.785 1.325 0 2.462.099 2.794.143v3.24h-1.917c-1.505 0-1.797.715-1.797 1.764v2.312h3.594l-.468 3.666h-3.126V24h6.13c.73 0 1.324-.593 1.324-1.324V1.325C24 .593 23.407 0 22.675 0z" />
            </svg>
          </a>
          <a href="https://twitter.com" className="hover:text-white">
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M23.444 4.834a10.087 10.087 0 01-2.828.775 4.968 4.968 0 002.165-2.724 10.056 10.056 0 01-3.127 1.195A4.925 4.925 0 0016.616 4c-2.704 0-4.912 2.207-4.912 4.917 0 .385.043.762.127 1.125A13.977 13.977 0 011.671 3.149 4.917 4.917 0 003.15 8.08a4.88 4.88 0 01-2.224-.616v.062c0 2.369 1.685 4.347 3.927 4.799a4.96 4.96 0 01-2.213.084 4.922 4.922 0 004.6 3.417A9.865 9.865 0 010 20.113 13.944 13.944 0 007.548 22c9.054 0 14.004-7.493 14.004-13.978 0-.213-.005-.426-.014-.637A10.023 10.023 0 0024 4.59a9.846 9.846 0 01-2.556.686A4.918 4.918 0 0023.444 4.834z" />
            </svg>
          </a>
        </div>
      </div>

      {/* 저작권 정보 */}
      <div className="text-center text-gray-500 text-sm mt-4">
        &copy; {new Date().getFullYear()} 나만의 레시피. All rights reserved.
      </div>
    </footer>
  );
}
