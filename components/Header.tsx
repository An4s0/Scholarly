"use client";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { LogOut, LogIn, LayoutDashboard } from "lucide-react";

export default function Header() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  return (
    <header className="w-full bg-white backdrop-blur-md border-b border-zinc-200 px-6 flex items-center justify-between sticky top-0 z-50 py-3">
      <div className="flex items-center space-x-3">
        <div className="w-11 h-11 bg-gradient-to-br rounded-lg flex items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-200">
          <Image
            src="/logo.svg"
            alt="Scholarly Logo"
            width={40}
            height={40}
            className="w-9 h-9"
          />
        </div>
        <Link href="/">
          <span className="text-2xl font-bold text-primary">Scholarly</span>
          <div className="text-xs text-zinc-500 -mt-1">Research Analytics</div>
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        {status === "authenticated" ? (
          <Link
            href={pathname === "/dashboard" ? "/auth/signout" : "/dashboard"}
            className="flex items-center space-x-2 px-4 py-2 text-zinc-800 rounded-lg shadow-sm border border-zinc-200 hover:border-primary/50 hover:bg-black/5 transition-all duration-200"
          >
            {pathname === "/dashboard" ? <LogOut /> : <LayoutDashboard />}
            <span className="text-sm font-semibold">
              {pathname === "/dashboard" ? "Sign Out" : "Dashboard"}
            </span>
          </Link>
        ) : (
          <Link
            href="/auth/signin"
            className="flex items-center space-x-2 px-4 py-2 text-zinc-800 rounded-lg shadow-sm  border border-zinc-200 hover:border-primary/50 hover:bg-black/5 transition-all duration-200 cursor-pointer"
          >
            <LogIn />
            <span className="text-sm font-semibold">
              Sign in
            </span>
          </Link>
        )}
      </div>
    </header>
  );
}
