"use client";

import RecipeDetail from "@/components/recipe/RecipeDetail";
import React from "react";

export default function RecipeDetailPage(props) {
  return (
    <>
      <RecipeDetail recipeId={props.params.id} />
    </>
  );
}
