"use client";
import { useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import { signOut } from "next-auth/react";

export default function SignOutPage() {
  useEffect(() => {
    const signOutUser = async () => {
      try {
        await signOut({ redirect: false });
        window.location.href = "/";
      } catch (error) {
        console.error("Sign out failed:", error);
      }
    };

    signOutUser();
  }, []);
  return (
    <main>
      <Header />
      <div className="min-h-[calc(100vh-70px)] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Signing Out...</h1>
          <p className="text-zinc-600">
            You are being signed out. Please wait...
          </p>
          <p className="text-zinc-600">
            If you are not redirected automatically,{" "}
            <Link href="/" className="text-blue-500 hover:underline">
              click here
            </Link>{" "}
            to return to the homepage.
          </p>
        </div>
      </div>
    </main>
  );
}
