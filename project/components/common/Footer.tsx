import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* 로고 및 설명 */}
        <div className="text-white text-xl font-bold mb-4 md:mb-0">
          나만의 레시피
        </div>
      </div>

      {/* 저작권 정보 */}
      <div className="text-center text-gray-500 text-sm mt-4">
        &copy; {new Date().getFullYear()} 나만의 레시피. All rights reserved.
      </div>
    </footer>
  );
}
