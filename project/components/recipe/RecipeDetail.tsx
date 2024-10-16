import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import RecipeTimer from "./RecipeTimer";
import Loading from "../common/Loading";

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

export default function RecipeDetail({ recipeId }: { recipeId: string }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [recipe, setRecipe] = useState({
    title: "",
    orders: [],
    ingredients: [],
    tags: [],
    versions: [],
  });

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

  const handleSaveRecipe = () => {
    const username = session?.user?.name;
    const recipes = JSON.parse(localStorage.getItem(username)) || [];

    // 수정된 버전 추가
    const updatedRecipe = {
      ...recipe,
      versions: [
        ...recipe.versions,
        { ...recipe, updatedAt: new Date().toISOString() },
      ],
    };
    setRecipe(updatedRecipe);
    // 해당 레시피 업데이트
    const updatedRecipes = recipes.map((r) =>
      r.id.toString() === recipeId ? updatedRecipe : r
    );

    localStorage.setItem(username, JSON.stringify(updatedRecipes));
    setEditing(false);
    alert("레시피 수정 완료");
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

  const handleInputChange = (e, field, index) => {
    const value = e.target.value;
    setRecipe((prev) => {
      if (index !== undefined) {
        if (field === "tags") {
          return {
            ...prev,
            [field]: prev[field].map((item, i) =>
              i === index ? { ...item, value } : item
            ),
          };
        }
        return {
          ...prev,
          [field]: prev[field].map((item, i) => (i === index ? value : item)),
        };
      }
      return { ...prev, [field]: value };
    });
  };

  const handleAddField = (field) => {
    setRecipe((prev) => ({
      ...prev,
      [field]:
        field === "tags"
          ? [...prev[field], { value: "", color: getRandomColor() }]
          : [...prev[field], ""],
    }));
  };

  const handleRemoveField = (field, index) => {
    setRecipe((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleRestoreVersion = (versionIndex) => {
    setRecipe((prev) => {
      const { versions, ...rest } = prev; // 현재 recipe에서 versions를 제외한 나머지 속성들만 추출
      const selectedVersion = prev.versions[versionIndex]; // 복원할 버전 가져오기

      return {
        ...selectedVersion, // 선택한 버전의 데이터로 덮어쓰기
        versions, // 기존의 versions는 그대로 유지
      };
    });
  };

  const getDateString = (inputDate) => {
    const date = new Date(inputDate);

    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);

    let hours = date.getHours();
    const minutes = ("0" + date.getMinutes()).slice(-2);

    // 오전/오후 구분
    const period = hours >= 12 ? "오후" : "오전";
    hours = hours % 12 || 12; // 12시간제로 변환 (0시를 12시로 표시)

    const timeString = `${period} ${hours}:${minutes}`;
    const dateString = `${year}년 ${month}월 ${day}일 ${timeString}`;

    return dateString;
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-6">
          {/* 레시피 제목 */}
          {editing ? (
            <input
              type="text"
              value={recipe.title}
              onChange={(e) => handleInputChange(e, "title")}
              className="text-3xl font-bold text-gray-800 mb-4 w-full p-2 border rounded"
            />
          ) : (
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {recipe.title}
            </h1>
          )}

          {/* 조리 과정 */}
          <h2 className="text-2xl font-semibold text-gray-700 mt-10 mb-4">
            조리 과정
          </h2>
          <div className="space-y-4">
            {recipe.orders.map((order, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 bg-gray-100 p-4 rounded-lg shadow-md"
              >
                <div className="flex-shrink-0">
                  <span className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full font-bold">
                    {index + 1}
                  </span>
                </div>

                <div className="flex-grow">
                  {editing ? (
                    <input
                      value={order}
                      onChange={(e) => handleInputChange(e, "orders", index)}
                      className="w-full p-2 border rounded"
                    />
                  ) : (
                    <p className="text-lg font-medium text-gray-800">{order}</p>
                  )}
                </div>
                {editing && (
                  <>
                    <svg
                      onClick={() => handleRemoveField("orders", index)}
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
                  </>
                )}

                {!editing && (
                  <div className="flex-shrink-0">
                    <RecipeTimer />
                  </div>
                )}
              </div>
            ))}
            {editing && (
              <button
                onClick={() => handleAddField("orders")}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                조리 과정 추가
              </button>
            )}
          </div>

          {/* 태그 */}
          <div className="flex flex-wrap gap-1 my-5">
            {editing
              ? recipe.tags.map((tag, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      tag.color ? tag.color : "bg-black"
                    } text-white px-2 py-1 rounded-lg items-center gap-1`}
                  >
                    <input
                      value={tag.value}
                      onChange={(e) => handleInputChange(e, "tags", index)}
                      className="text-gray-900 px-2 py-1 rounded border w-24"
                    />

                    <svg
                      onClick={() => handleRemoveField("tags", index)}
                      className="w-5 h-5 cursor-pointer text-white"
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
                ))
              : recipe.tags.map((tag, index) => (
                  <span
                    key={index}
                    className={`${tag.color} text-white text-sm font-medium px-2 py-1 rounded-full`}
                  >
                    #{tag.value}
                  </span>
                ))}
            {editing && (
              <button
                onClick={() => handleAddField("tags")}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
              >
                태그 추가
              </button>
            )}
          </div>

          {/* 재료 목록 */}
          <h2 className="text-2xl font-semibold text-gray-700 mt-10 mb-4">
            재료 목록
          </h2>
          <ul className="space-y-2">
            {recipe.ingredients.map((ingredient, index) => (
              <li
                key={index}
                className="flex items-center bg-gray-50 p-3 rounded-lg shadow-sm border border-gray-200"
              >
                <svg
                  className="w-6 h-6 text-green-500 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20 6L9 17l-5-5"
                  />
                </svg>
                {editing ? (
                  <div className="flex w-full items-center">
                    <input
                      type="text"
                      value={ingredient}
                      onChange={(e) =>
                        handleInputChange(e, "ingredients", index)
                      }
                      className="w-full p-2 border rounded"
                    />
                    <svg
                      onClick={() => handleRemoveField("ingredients", index)}
                      className="w-5 h-5 mx-3 cursor-pointer text-red-500"
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
                ) : (
                  <span className="text-lg text-gray-800">{ingredient}</span>
                )}
              </li>
            ))}
            {editing && (
              <button
                onClick={() => handleAddField("ingredients")}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                재료 추가
              </button>
            )}
          </ul>

          {/* 버전 목록 */}

          {recipe.versions.length > 1 && (
            <>
              <h2 className="text-2xl font-semibold text-gray-700 mt-10 mb-4">
                버전 목록
              </h2>
              <ul>
                {recipe.versions.map((version, index) => {
                  return (
                    <li key={index} className="flex gap-4 items-center my-3">
                      {index === 0 ? (
                        <button
                          onClick={() => handleRestoreVersion(index)}
                          className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition duration-300"
                        >
                          <span className="font-bold">원본 복원</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => handleRestoreVersion(index)}
                          className="bg-purple-500 text-white px-3 py-1 rounded-lg hover:bg-purple-600 transition duration-300"
                        >
                          <span className="font-bold">버전 {index} 복원</span>
                        </button>
                      )}
                      <span>수정일: ({getDateString(version.updatedAt)})</span>
                    </li>
                  );
                })}
              </ul>
            </>
          )}

          {/* 목록으로 이동 버튼 */}
          <div className="flex gap-3 my-5">
            {editing ? (
              <button
                onClick={handleSaveRecipe}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
              >
                저장
              </button>
            ) : (
              <button
                onClick={() => setEditing(true)}
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
