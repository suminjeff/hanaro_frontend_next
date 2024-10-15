"use client";

import RecipeCard from "@/components/recipe/RecipeCard";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function RecipePage() {
  const { data: session } = useSession(); // 세션 정보를 가져옴
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    if (session) {
      const username = session.user?.name;
      if (!username) {
        alert("로그인이 필요합니다.");
        return;
      }
      if (localStorage.getItem(username)) {
        const userRecipes = localStorage.getItem(username);
        setRecipes(JSON.parse(userRecipes!));
      } else {
        localStorage.setItem(username, JSON.stringify([]));
      }
    }
  }, [session]);

  return (
    <div className="flex flex-col justify-center items-center h-4/5">
      {recipes.length > 0 ? (
        recipes.map((item, index) => {
          return <RecipeCard recipe={item} key={index} />;
        })
      ) : (
        <div className="text-center flex flex-col justify-center items-center gap-5">
          <p className="text-gray-500 text-lg">레시피가 없습니다</p>
          <Link href="/recipe/add">
            <button className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200">
              만들러 가기
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
