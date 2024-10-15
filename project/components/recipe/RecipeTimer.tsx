import React, { useState, useEffect, useRef } from "react";

export default function RecipeTimer() {
  const [seconds, setSeconds] = useState(0); // 현재 남은 시간
  const [isActive, setIsActive] = useState(false); // 타이머 작동 여부
  const [inputValue, setInputValue] = useState(""); // 입력 필드 값
  const inputRef = useRef(null); // input 요소 참조

  // 타이머 기능: isActive 상태가 true일 때만 타이머 작동
  useEffect(() => {
    let interval = null;
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (seconds === 0 && isActive) {
      clearInterval(interval);
      setIsActive(false);
      alert("완료되었습니다!");
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const handleStartStop = () => {
    if (!isActive) {
      // 타이머가 정지 상태일 때만 시간 설정을 확인
      if (seconds === 0) {
        if (!inputValue || isNaN(inputValue) || Number(inputValue) <= 0) {
          alert("시간을 설정해 주세요!");
          inputRef.current.focus(); // input 필드에 포커스
          return;
        }
        setSeconds(Number(inputValue)); // 처음 타이머 시작 시 입력된 값을 설정
      }
    }
    setIsActive(!isActive); // 타이머 시작/정지 토글
  };

  const handleReset = () => {
    setSeconds(0);
    setIsActive(false);
    setInputValue("");
  };

  return (
    <div className="gap-3 p-3 flex items-center justify-center bg-gray-100 rounded-lg shadow-md">
      {/* 타이머 시간 표시 */}
      <div>
        {`${Math.floor(seconds / 60)
          .toString()
          .padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`}
      </div>

      {/* 시간 입력 필드 */}
      <input
        type="text"
        placeholder="시간(초)"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={isActive || seconds > 0} // 타이머가 작동 중이거나 멈춘 상태일 때 비활성화
        ref={inputRef} // input 필드를 참조로 설정
      />

      {/* 타이머 컨트롤 버튼 */}
      <div className="flex gap-1">
        <button
          onClick={handleStartStop}
          className={`px-2 py-1 font-semibold rounded-lg transition ${
            isActive
              ? "bg-red-500 hover:bg-red-600"
              : "bg-green-500 hover:bg-green-600"
          } text-white`}
        >
          {isActive ? "Stop" : "Start"}
        </button>
        <button
          onClick={handleReset}
          className="px-2 py-1 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
