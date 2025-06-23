"use client";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function SignInPage() {
  const handleMicrosoftSignIn = async () => {
    try {
      await signIn("azure-ad", { callbackUrl: "/" });
    } catch (error) {
      console.error("Microsoft sign-in failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex flex-col justify-center py-8 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-white">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <div className="flex items-center mb-8">
              <div className="h-12 w-12 bg-primary rounded-xl flex items-center justify-center shadow-lg">
                <Image
                  src="/logo.white.svg"
                  alt="Scholarly Logo"
                  width={32}
                  height={32}
                  className="h-8 w-8"
                />
              </div>
              <Link href="/" className="ml-4">
                <span className="text-2xl font-bold text-primary">
                  Scholarly
                </span>
                <div className="text-xs text-zinc-500 -mt-1 font-medium">
                  Research Analytics
                </div>
              </Link>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
                Sign in to your account
              </h1>
              <p className="text-base text-zinc-600">
                Sign in with your Microsoft account to access your analytics
                dashboard
              </p>
            </div>
          </div>

          <div className="mt-10 space-y-6">
            <button
              onClick={handleMicrosoftSignIn}
              className="group relative w-full flex justify-center items-center py-4 px-6 border-2 border-zinc-200 rounded-xl bg-white text-base font-semibold text-zinc-700 hover:bg-zinc-50 hover:border-primary/50 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                enableBackground="new 0 0 2499.6 2500"
                viewBox="0 0 2499.6 2500"
                className="w-6 h-6 mr-3"
              >
                <path
                  d="m1187.9 1187.9h-1187.9v-1187.9h1187.9z"
                  fill="#f1511b"
                />
                <path
                  d="m2499.6 1187.9h-1188v-1187.9h1187.9v1187.9z"
                  fill="#80cc28"
                />
                <path d="m1187.9 2500h-1187.9v-1187.9h1187.9z" fill="#00adef" />
                <path
                  d="m2499.6 2500h-1188v-1187.9h1187.9v1187.9z"
                  fill="#fbbc09"
                />
              </svg>
              Continue with Microsoft
              <svg
                className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-primary mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-sm font-medium text-zinc-600">
                Secure authentication powered by Microsoft Azure AD
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex relative w-0 flex-1 bg-gradient-to-br from-primary via-primary to-primary/80 justify-center text-white overflow-hidden">
        <Image
          src="/signin-illustration.svg"
          alt="Sign In Illustration"
          width={600}
          height={600}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
