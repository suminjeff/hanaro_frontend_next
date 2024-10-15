import Link from "next/link";
import React from "react";

export default function RecipeCard({
  recipe,
}: {
  recipe: {
    id: Date;
    ingredients: string[];
    orders: string[];
    tags: string[];
    title: string;
  };
}) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-1/2 my-3">
      {/* 제목 */}
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{recipe.title}</h2>

      {/* 태그들 */}
      <div className="flex space-x-2 mb-4">
        {recipe.tags.map((item, index) => {
          return (
            <span
              key={index}
              className="bg-green-200 text-green-800 text-sm font-medium px-2 py-1 rounded-full"
            >
              #{item}
            </span>
          );
        })}
      </div>

      {/* 자세히 보기 버튼 */}
      <Link href={`/recipe/${recipe.id}`}>
        <button className="bg-blue-500 text-white px-4 py-2 w-full rounded-md hover:bg-blue-600 transition duration-300">
          자세히 보기
        </button>
      </Link>
    </div>
  );
}
