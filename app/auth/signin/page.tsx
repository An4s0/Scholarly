import { Metadata } from "next";
import SignInPage from "./signin";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your account",
};

export default function Page() {
  return <SignInPage />;
}