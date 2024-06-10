"use client";
import type { Claims } from "@auth0/nextjs-auth0";
import { useEffect, useState } from "react";

export function Avatar({ user }: { user: Claims }) {
  const [userInfo, setUserInfo] = useState<Claims>();
  useEffect(() => {
    if (user) {
      localStorage.setItem("userImage", user.picture);
    }
    setUserInfo(user);
  }, [user]);

  return (
    <div className="absolute top-6 right-6 flex gap-2 justify-center items-center">
      {userInfo ? (
        <img
          className="rounded-full w-10"
          src={userInfo.picture || ""}
          alt={userInfo.name || ""}
        />
      ) : (
        <img src="" alt="" />
      )}
    </div>
  );
}
