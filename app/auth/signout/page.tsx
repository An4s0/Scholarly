import { Metadata } from "next";
import SignOutPage from "./signout";

export const metadata: Metadata = {
  title: "Sign Out",
  description: "Sign out of your account",
};

export default function Page() {
  return <SignOutPage />;
}