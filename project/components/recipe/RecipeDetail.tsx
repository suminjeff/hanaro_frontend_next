import React from "react";

export default function RecipeDetail() {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      {/* 레시피 제목 */}
      <h1 className="text-3xl font-bold text-gray-800 mb-4">햄버거</h1>

      {/* 조리 과정 */}
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">조리 과정</h2>
      <div className="space-y-4 mb-6">
        <div>
          <p className="text-lg">Step 1: 햄버거를 준비한다</p>
          <div className="flex items-center space-x-2 mt-2">
            <input
              type="time"
              className="border rounded-lg px-3 py-1 w-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
              타이머 시작
            </button>
          </div>
        </div>

        <div>
          <p className="text-lg">Step 2: 햄버거를 데운다</p>
          <div className="flex items-center space-x-2 mt-2">
            <input
              type="time"
              className="border rounded-lg px-3 py-1 w-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
              타이머 시작
            </button>
          </div>
        </div>
      </div>

      {/* 태그 */}
      <p className="text-sm text-gray-500 mb-6">#햄버거</p>

      {/* 재료 목록 */}
      <h2 className="text-xl font-semibold text-gray-700 mb-2">재료</h2>
      <ul className="list-disc list-inside mb-6 text-lg">
        <li>햄</li>
      </ul>

      {/* 수정 기록 */}
      <h2 className="text-xl font-semibold text-gray-700 mb-2">수정 기록</h2>
      <div className="flex space-x-3 mb-6">
        <p className="text-sm text-gray-500 mb-4">
          버전 1(수정일: 2024.10.10 오후 6:45:56)
        </p>
        <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition duration-300">
          이 버전으로 복원
        </button>
      </div>

      {/* 목록으로 이동 버튼 */}
      <button className="bg-yellow-400 text-white px-4 py-2 rounded-lg hover:bg-yellow-500 transition duration-300">
        수정
      </button>
      <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300">
        삭제
      </button>
      <button className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-900 transition duration-300">
        목록으로
      </button>
    </div>
  );
}
