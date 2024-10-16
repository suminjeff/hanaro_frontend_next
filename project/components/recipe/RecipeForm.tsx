"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

// 랜덤 색상 생성 함수
const getRandomColor = () => {
  const colors = [
    "bg-red-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-teal-500",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

export default function RecipeForm() {
  const { data: session } = useSession();
  const user = session?.user;

  const router = useRouter();

  const [title, setTitle] = useState<string>("");
  const [tag, setTag] = useState<string>("");
  const [tags, setTags] = useState<{ value: string; color: string }[]>([]);
  const [ingredient, setIngredient] = useState<string>("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [order, setOrder] = useState<string>("");
  const [orders, setOrders] = useState<string[]>([]);

  const handleAddTag = (e) => {
    e.preventDefault();
    if (tag !== "") {
      setTags([...tags, { value: tag, color: getRandomColor() }]);
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

    const savedRecipes = JSON.parse(localStorage.getItem(user.name) || "[]");
    const id = Date.now();
    const newRecipe = {
      id,
      title: title ? title : "제목없음",
      tags: tags.map(({ value, color }) => {
        return { value, color };
      }),
      ingredients,
      orders,
      versions: [
        {
          id,
          title: title ? title : "제목없음",
          tags: tags.map(({ value, color }) => {
            return { value, color };
          }),
          ingredients,
          orders,
          updatedAt: id,
        },
      ],
    };

    const updatedRecipes = [...savedRecipes, newRecipe];

    localStorage.setItem(user.name, JSON.stringify(updatedRecipes));

    alert("레시피가 저장되었습니다!");

    setTitle("");
    setTags([]);
    setIngredients([]);
    setOrders([]);
    router.push("/recipe");
  };

  return (
    <form className="flex flex-col justify-center items-center w-full min-h-full shadow-lg rounded-lg overflow-auto px-16 py-12 gap-10 bg-white">
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
            className="w-20 py-2 px-4 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition duration-200"
          >
            추가
          </button>
        </div>
        {/* 태그 목록 */}
        <div className="flex flex-wrap mt-3 gap-3">
          {tags.map((tag, index) => (
            <div
              key={index}
              className={`flex ${tag.color} text-white px-2 py-1 rounded-lg items-center gap-1`}
            >
              <span>#{tag.value}</span>
              <svg
                onClick={() => handleDeleteTag(index)}
                className="w-4 h-4 cursor-pointer"
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
          ))}
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
            className="w-20 py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200"
          >
            추가
          </button>
        </div>
        <ul className="mt-3">
          {ingredients.map((item, index) => (
            <li
              key={index}
              className="flex items-center justify-between bg-gray-200 rounded-md px-3 py-2 mb-2"
            >
              <span className="font-medium">{item}</span>
              <svg
                onClick={() => handleDeleteIngredient(index)}
                className="w-5 h-5 cursor-pointer text-red-500"
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
            className="w-20 py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200"
          >
            추가
          </button>
        </div>
        <ul className="mt-3">
          {orders.map((item, index) => (
            <li
              key={index}
              className="flex items-center justify-between bg-gray-200 rounded-md px-3 py-2 mb-2"
            >
              <span className="font-medium">
                {index + 1}. {item}
              </span>
              <svg
                onClick={() => handleDeleteOrder(index)}
                className="w-5 h-5 cursor-pointer text-red-500"
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
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={handleSaveRecipe}
        className="w-full py-3 px-6 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
      >
        레시피 저장
      </button>
    </form>
  );
}
