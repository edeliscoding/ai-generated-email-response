"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Mail, Menu } from "lucide-react";

const menuItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/history", label: "History" },
  { href: "/settings", label: "Settings" },
];

export function Navbar() {
  const { isSignedIn, user } = useUser();
  const pathname = usePathname();

  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <div className="flex items-center space-x-4">
          <Mail className="h-6 w-6" />
          <span className="text-xl font-semibold">Edel Email AI Response</span>
        </div>

        {/* <div className="ml-auto flex items-center space-x-4">
          {isSignedIn && (
            <>
              <div className="hidden md:flex space-x-4">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      pathname === item.href
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="md:hidden" size="icon">
                    <span className="sr-only">Open menu</span>
                    <Menu className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {menuItems.map((item) => (
                    <DropdownMenuItem key={item.href} asChild>
                      <Link href={item.href}>{item.label}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <p className="text-sm hidden md:block">
                Welcome, {user?.username || user?.firstName || "User"}
              </p>
              <SignOutButton>
                <Button variant="ghost" size="sm">
                  Sign out
                </Button>
              </SignOutButton>
            </>
          )}
          {!isSignedIn && (
            <SignInButton mode="modal">
              <Button variant="ghost" size="sm">
                Sign in
              </Button>
            </SignInButton>
          )}
        </div> */}
      </div>
    </nav>
  );
}
