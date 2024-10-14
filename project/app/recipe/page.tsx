"use client";

import RecipeCard from "@/components/recipe/RecipeCard";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function RecipePage() {
  const router = useRouter();
  const { data: socialSession } = useSession(); //세션 정보를 가져옴
  useEffect(() => {
    if (socialSession) {
      router.push("/recipe");
    } else {
      router.push("/login");
    }
  });
  return (
    <div className="flex flex-col justify-center items-center">
      <RecipeCard />
      <RecipeCard />
      <RecipeCard />
      <RecipeCard />
      <RecipeCard />
      <RecipeCard />
      <RecipeCard />
    </div>
  );
}
