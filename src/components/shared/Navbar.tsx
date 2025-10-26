"use client"

import {
  LogOutIcon, PlusCircleIcon,
  FolderOpenIcon
} from "lucide-react"
import Logo from "@/components/logo"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu, NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from "@/components/ui/navigation-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { signOut, useSession } from "next-auth/react"
import { LoginDialog } from "../modules/auth/LoginDialog"

// Core navigation
const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About Me" },
  { href: "/#projects", label: "Projects" },
  { href: "/blogs", label: "Blogs" },
  // {
  //   label: "About",
  //   submenu: true,
  //   items: [
  //     { href: "/about", label: "About Me", icon: "InfoIcon" },
  //     { href: "/tutorials", label: "Tutorials", icon: "BookOpenIcon" },
  //     { href: "/support", label: "Support", icon: "LifeBuoyIcon" },
  //   ],
  // },
]

// Demo auth state

export default function Navbar() {
  const session = useSession()
  console.log(session);
  return (
    <header className="border-b px-4 md:px-6 py-3 sticky top-0 bg backdrop-blur z-50">
      <div className="flex h-16 items-center justify-between gap-2">
        {/* Left */}
        <Link href="/" className="text-primary flex  items-center gap-4 hover:text-primary/90">
          <Logo />
          <span className="text-2xl font-bold">SaFin</span>
        </Link>
        <div className="flex items-center gap-6">

          {/* Navigation Menu */}
          <NavigationMenu className="max-md:hidden  ">
            <NavigationMenuList className="gap-4">
              {navigationLinks.map((link, index) => (
                <NavigationMenuItem key={index}>
                  {
                    <NavigationMenuLink asChild>
                      <Link
                        href={link.href as string}
                        className="text-xl  hover:bg-primary/50 hover:text-primary-foreground py-1.5 font-medium px-2  rounded-md"
                      >
                        {link.label}
                      </Link>
                    </NavigationMenuLink>
                  }
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2 border-2 border-purple-400 md:hidden"
          >
            <Link href={`/blogs`}>
              Blogs
            </Link>
          </Button>
          {session?.status !== "authenticated" ? (
            <>


              <LoginDialog />


            </>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 border-2 border-purple-400"
                >
                  Dashboard
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>{session?.data?.user?.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="flex items-center gap-2">
                    <FolderOpenIcon size={16} /> Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/create-blog" className="flex items-center gap-2">
                    <PlusCircleIcon size={16} /> New Project
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/create-blog" className="flex items-center gap-2">
                    <PlusCircleIcon size={16} /> New Blog
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <span
                    onClick={() => signOut({ redirect: false })}
                    className="flex items-center gap-2 text-red-600"
                  >
                    <LogOutIcon size={16} /> Logout
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  )
}
