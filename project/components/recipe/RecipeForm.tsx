"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function RecipeForm() {
  const { data: session } = useSession();
  const user = session?.user;

  const router = useRouter();

  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);
  const [ingredient, setIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [order, setOrder] = useState("");
  const [orders, setOrders] = useState([]);

  const handleAddTag = (e) => {
    e.preventDefault();
    if (tag !== "") {
      setTags([...tags, tag]);
      setTag("");
    }
  };

  const handleDeleteTag = (index: number) => {
    setTags((tags) => {
      return tags.filter((_, i) => i !== index);
    });
  };

  const handleAddIngredient = (e) => {
    e.preventDefault();
    if (ingredient !== "") {
      setIngredients([...ingredients, ingredient]);
      setIngredient("");
    }
  };

  const handleDeleteIngredient = (index: number) => {
    setIngredients((ingredients) => {
      return ingredients.filter((_, i) => i !== index);
    });
  };

  const handleAddOrder = (e) => {
    e.preventDefault();
    if (order !== "") {
      setOrders([...orders, order]);
      setOrder("");
    }
  };

  const handleDeleteOrder = (index: number) => {
    setOrders((orders) => {
      return orders.filter((_, i) => i !== index);
    });
  };

  const handleSaveRecipe = (e) => {
    e.preventDefault();

    if (!user?.name) {
      alert("로그인이 필요합니다.");
      return;
    }

    // 현재 유저의 이름을 기반으로 저장된 레시피 목록 가져오기
    const savedRecipes = JSON.parse(localStorage.getItem(user.name) || "[]");

    // 새 레시피 객체 생성
    const newRecipe = {
      id: Date.now(),
      title,
      tags,
      ingredients,
      orders,
      versions: [],
    };

    // 기존 레시피 배열에 새 레시피 추가
    const updatedRecipes = [...savedRecipes, newRecipe];

    // 업데이트된 레시피 목록을 localStorage에 저장
    localStorage.setItem(user.name, JSON.stringify(updatedRecipes));

    alert("레시피가 저장되었습니다!");

    // 상태 초기화
    setTitle("");
    setTags([]);
    setIngredients([]);
    setOrders([]);
    router.push("/recipe");
  };

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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="레시피 제목을 입력하세요"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            placeholder="태그를 입력하세요"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            onClick={handleAddTag}
            className="w-20 py-2 px-4 bg-purple-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
          >
            추가
          </button>
        </div>
        {/* 태그 목록 */}
        <div className="flex flex-wrap mt-3 gap-3">
          {tags.map((tag, index) => {
            return (
              <div
                key={index}
                className="flex bg-gray-500 text-white px-2 py-1 rounded-lg items-center gap-1"
              >
                <span>#{tag}</span>
                <svg
                  onClick={() => handleDeleteTag(index)}
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 6l12 12M6 18L18 6"
                  />
                </svg>
              </div>
            );
          })}
        </div>
      </div>
      {/* 재료 목록 */}
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
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
            placeholder="재료를 입력하세요"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            onClick={handleAddIngredient}
            className="w-20 py-2 px-4 bg-green-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
          >
            추가
          </button>
        </div>
        <ul>
          {ingredients.map((item, index) => (
            <li key={index}>
              <div className="flex items-center">
                <span>{item}</span>
                <svg
                  onClick={() => handleDeleteIngredient(index)}
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 6l12 12M6 18L18 6"
                  />
                </svg>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {/* 조리 과정 목록 */}
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
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            placeholder="조리 과정을 입력하세요"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            onClick={handleAddOrder}
            className="w-20 py-2 px-4 bg-green-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
          >
            추가
          </button>
        </div>
        <ul>
          {orders.map((item, index) => (
            <li key={index}>
              <div className="flex items-center">
                <span>
                  {index + 1}. {item}
                </span>
                <svg
                  onClick={() => handleDeleteOrder(index)}
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 6l12 12M6 18L18 6"
                  />
                </svg>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <button
        className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
        type="button"
        onClick={handleSaveRecipe}
      >
        레시피 저장
      </button>
    </form>
  );
}
