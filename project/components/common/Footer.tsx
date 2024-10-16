import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6">
      <div className="text-center text-gray-500 text-sm mt-4">
        &copy; {new Date().getFullYear()} 나만의 레시피. All rights reserved.
        디지털 하나로 개인 프로젝트
      </div>
    </footer>
  );
}
