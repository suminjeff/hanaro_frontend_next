import React from "react";

export default function NotFoundPage() {
  return (
    <div className="w-full h-4/5 flex flex-col items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          페이지를 찾을 수 없습니다
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          요청하신 페이지가 존재하지 않거나 삭제되었습니다.
        </p>
        <a
          href="/"
          className="bg-blue-500 text-white px-6 py-2 rounded-md text-lg hover:bg-blue-600 transition-colors"
        >
          홈으로 돌아가기
        </a>
      </div>
    </div>
  );
}
