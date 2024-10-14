"use client";

import LoginBox from "@/components/auth/LoginBox";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function LoginPage() {
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
    <>
      <LoginBox />
    </>
  );
}
