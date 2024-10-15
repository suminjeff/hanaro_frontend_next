"use client";

import RecipeCard from "@/components/recipe/RecipeCard";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

export default function RecipePage() {
  const { data: session } = useSession(); //세션 정보를 가져옴
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
    <div className="flex flex-col justify-center items-center min-h-96">
      {recipes.map((item, index) => {
        return <RecipeCard recipe={item} key={index} />;
      })}
    </div>
  );
}
