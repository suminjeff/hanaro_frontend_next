import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

export default function RecipeDetail({ recipeId }) {
  const router = useRouter();
  const { data: session } = useSession();
  const username = session.user.name;

  // 로컬 스토리지에서 사용자 레시피를 불러오고 상태로 관리
  const [userRecipes, setUserRecipes] = useState(() => {
    return JSON.parse(localStorage.getItem(username) || "[]");
  });

  // 현재 레시피 상태 관리
  const [recipe, setRecipe] = useState(() => {
    return userRecipes.find(({ id }) => id.toString() === recipeId);
  });

  // 타이머 상태 관리 (각 단계별로 남은 시간과 실행 여부)
  const [timers, setTimers] = useState(
    Array(recipe.orders.length).fill({ isRunning: false, time: 0 })
  );

  useEffect(() => {
    const intervalIds = timers.map((timer, index) => {
      if (timer.isRunning && timer.time > 0) {
        return setInterval(() => {
          setTimers((prevTimers) =>
            prevTimers.map((t, i) => {
              if (i === index) {
                if (t.time === 1) {
                  alert(`Step ${index + 1} 완료되었습니다!`);
                }
                return { ...t, time: t.time - 1 };
              }
              return t;
            })
          );
        }, 1000);
      }
      return null;
    });

    // 컴포넌트가 언마운트될 때 모든 타이머 클리어
    return () => {
      intervalIds.forEach((id) => id && clearInterval(id));
    };
  }, [timers]);

  const handleStartTimer = (index) => {
    setTimers((prevTimers) =>
      prevTimers.map((timer, i) =>
        i === index ? { ...timer, isRunning: true } : timer
      )
    );
  };

  const handleStopTimer = (index) => {
    setTimers((prevTimers) =>
      prevTimers.map((timer, i) =>
        i === index ? { ...timer, isRunning: false } : timer
      )
    );
  };

  const handleSetTime = (index, timeInSeconds) => {
    setTimers((prevTimers) =>
      prevTimers.map((timer, i) =>
        i === index ? { ...timer, time: timeInSeconds } : timer
      )
    );
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      {/* 레시피 제목 */}
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{recipe.title}</h1>

      {/* 조리 과정 */}
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">조리 과정</h2>
      <div className="space-y-4 mb-6">
        {recipe.orders.map((order, index) => {
          return (
            <div key={index}>
              <p className="text-lg">
                Step {index + 1}: {order}
              </p>
              <div className="flex items-center space-x-2 mt-2">
                <span className="text-lg font-mono">
                  {formatTime(timers[index].time)}
                </span>
                {!timers[index].isRunning ? (
                  <>
                    <input
                      type="number"
                      min="0"
                      placeholder="시간(초)"
                      onChange={(e) =>
                        handleSetTime(index, parseInt(e.target.value, 10))
                      }
                      className="border rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={() => handleStartTimer(index)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                      타이머 시작
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleStopTimer(index)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                  >
                    타이머 정지
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

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
        <button className="bg-yellow-400 text-white px-4 py-2 rounded-lg hover:bg-yellow-500 transition duration-300">
          수정
        </button>
        <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300">
          삭제
        </button>
        <Link href={"/recipe"}>
          <button className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-900 transition duration-300">
            목록으로
          </button>
        </Link>
      </div>
    </div>
  );
}
