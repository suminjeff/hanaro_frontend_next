"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const router = useRouter();
  const { data: socialSession } = useSession(); //세션 정보를 가져옴
  useEffect(() => {
    if (socialSession) {
      router.push("/recipe");
    } else {
      router.push("/login");
    }
  });

  return <main></main>;
}
