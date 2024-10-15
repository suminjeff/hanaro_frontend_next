import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, use } from "react";
import RecipeTimer from "./RecipeTimer";

export default function RecipeDetail({ recipeId }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [recipe, setRecipe] = useState({});
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const handleDeleteRecipe = (e) => {
    e.preventDefault();
    const username = session?.user?.name;
    const recipes = JSON.parse(localStorage.getItem(username)) || [];
    const updatedRecipes = recipes.filter(({ id }) => {
      return id.toString() !== recipeId;
    });
    localStorage.setItem(username, JSON.stringify(updatedRecipes));
    alert("레시피 삭제");
    router.push("/recipe");
  };

  useEffect(() => {
    if (session !== undefined) {
      setRecipe(
        JSON.parse(localStorage.getItem(session?.user?.name)).find(
          ({ id }) => id.toString() === recipeId
        )
      );
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [session]);
  console.log(editing);
  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-6">
          {/* 레시피 제목 */}
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {recipe.title}
          </h1>

          {/* 조리 과정 */}
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            조리 과정
          </h2>
          {recipe.orders.map((order, index) => {
            return (
              <div key={index}>
                <div className="flex items-center space-x-2 mt-2">
                  <p className="text-lg">
                    Step {index + 1}: {order}
                  </p>
                  <RecipeTimer />
                </div>
              </div>
            );
          })}
          <div className="space-y-4 mb-6"></div>

          {/* 태그 */}
          <div className="flex gap-1 mb-5">
            {recipe.tags.map((tag, index) => {
              return (
                <div key={index}>
                  <span className="text-sm rounded px-3 py-1 bg-gray-200 text-gray-900 mb-6">
                    #{tag}
                  </span>
                </div>
              );
            })}
          </div>

          {/* 재료 목록 */}
          <h2 className="text-xl font-semibold text-gray-700 mb-2">재료</h2>
          <ul className="list-disc list-inside mb-6 text-lg">
            {recipe.ingredients.map((ingredient, index) => {
              return <li key={index}>{ingredient}</li>;
            })}
          </ul>

          {/* 목록으로 이동 버튼 */}
          <div className="flex gap-3">
            {editing ? (
              <button
                onClick={() => setEditing((e) => !e)}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
              >
                저장
              </button>
            ) : (
              <button
                onClick={() => setEditing((e) => !e)}
                className="bg-yellow-400 text-white px-4 py-2 rounded-lg hover:bg-yellow-500 transition duration-300"
              >
                수정
              </button>
            )}
            <button
              onClick={handleDeleteRecipe}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
            >
              삭제
            </button>
            <Link href={"/recipe"}>
              <button className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-900 transition duration-300">
                목록으로
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
