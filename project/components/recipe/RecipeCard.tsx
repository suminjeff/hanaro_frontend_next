import Link from "next/link";
import React from "react";

// 랜덤 색상 생성 함수
export default function RecipeCard({
  recipe,
}: {
  recipe: {
    id: Date;
    ingredients: string[];
    orders: string[];
    tags: { value: string; color: string }[];
    title: string;
  };
}) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-1/2 my-3 flex flex-col gap-3">
      {/* 제목 */}
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{recipe.title}</h2>

      {/* 태그들 */}
      <div className="flex flex-wrap gap-2 space-x-2 mb-4">
        {recipe.tags.map((tag, index) => {
          return (
            <span
              key={index}
              className={`${tag.color} text-white text-sm font-medium px-2 py-1 rounded-full`}
            >
              #{tag.value}
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
