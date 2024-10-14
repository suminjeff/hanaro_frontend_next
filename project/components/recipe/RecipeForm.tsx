import React from "react";

export default function RecipeForm() {
  return (
    <form className="flex flex-col justify-center items-center w-full p-6 space-y-6 bg-white">
      <p className="text-2xl font-bold">새 레시피 추가</p>
      <div className="w-full">
        <label
          htmlFor="recipe-title"
          className="font-semibold block text-sm text-gray-700 mb-1"
        >
          레시피 제목
        </label>
        <input
          id="recipe-title"
          type="text"
          placeholder="레시피 제목을 입력하세요"
          className=" w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="w-full">
        <label
          htmlFor="recipe-tag"
          className="font-semibold block text-sm text-gray-700 mb-1"
        >
          태그
        </label>
        <div className="flex">
          <input
            id="recipe-tag"
            type="text"
            placeholder="태그를 입력하세요"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button className="w-20 py-2 px-4 bg-purple-500 text-white rounded-md hover:bg-blue-600 transition duration-200">
            추가
          </button>
        </div>
      </div>
      <div className="w-full">
        <label
          htmlFor="recipe-ingredients"
          className="font-semibold block text-sm text-gray-700 mb-1"
        >
          재료 목록
        </label>
        <div className="flex">
          <input
            id="recipe-ingredients"
            type="text"
            placeholder="재료를 입력하세요"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button className="w-20 py-2 px-4 bg-green-500 text-white rounded-md hover:bg-blue-600 transition duration-200">
            추가
          </button>
        </div>
      </div>
      <div className="w-full">
        <label
          htmlFor="recipe-order"
          className="font-semibold block text-sm text-gray-700 mb-1"
        >
          조리 과정
        </label>
        <div className="flex">
          <input
            id="recipe-order"
            type="text"
            placeholder="조리 과정을 입력하세요"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button className="w-20 py-2 px-4 bg-green-500 text-white rounded-md hover:bg-blue-600 transition duration-200">
            추가
          </button>
        </div>
      </div>
      <button
        className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
        type="button"
      >
        레시피 저장
      </button>
    </form>
  );
}
