"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function LogoutPage() {
  const router = useRouter();
  useEffect(() => {
    router.push("/");
  });

  return <div className="h-max"></div>;
}
