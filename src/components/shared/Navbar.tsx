"use client"

import {
  BookOpenIcon,
  InfoIcon,
  LifeBuoyIcon,
  LogInIcon,
  LogOutIcon,
  UserIcon,
  PlusCircleIcon,
  FolderOpenIcon,
} from "lucide-react"
import Logo from "@/components/logo"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
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

// Core navigation
const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/#projects", label: "Projects" },
  { href: "/blogs", label: "Blogs" },
  {
    label: "About",
    submenu: true,
    items: [
      { href: "/about", label: "About Me", icon: "InfoIcon" },
      { href: "/tutorials", label: "Tutorials", icon: "BookOpenIcon" },
      { href: "/support", label: "Support", icon: "LifeBuoyIcon" },
    ],
  },
]

// Demo auth state
const isAuthenticated = true
const user = { name: "Safin", email: "safin@example.com" }
export default function Navbar() {
  const session = useSession()
  console.log(session);
  return (
    <header className="border-b px-4 md:px-6 sticky top-0 bg backdrop-blur z-50">
      <div className="flex h-16 items-center justify-between gap-4">
        {/* Left */}
        <div className="flex items-center gap-6">
          <Link href="/" className="text-primary hover:text-primary/90">
            <Logo />
          </Link>

          {/* Navigation Menu */}
          <NavigationMenu className="max-md:hidden">
            <NavigationMenuList className="gap-2">
              {navigationLinks.map((link, index) => (
                <NavigationMenuItem key={index}>
                  {link.submenu ? (
                    <>
                      <NavigationMenuTrigger className="text-xl hover:bg-primary/30 hover:border hover:text-primary-foreground bg-transparent px-2 py-1.5 font-medium">
                        {link.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="z-50 p-1">
                        <ul className={cn("min-w-48")}>
                          {link.items.map((item, idx) => (
                            <li key={idx}>
                              <NavigationMenuLink asChild>
                                <Link
                                  href={item.href}
                                  className="py-1.5 flex items-center gap-2 hover:bg-primary/20 rounded-md px-2"
                                >
                                  {item.icon === "InfoIcon" && <InfoIcon size={16} />}
                                  {item.icon === "BookOpenIcon" && <BookOpenIcon size={16} />}
                                  {item.icon === "LifeBuoyIcon" && <LifeBuoyIcon size={16} />}
                                  {item.label}
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <NavigationMenuLink asChild>
                      <Link
                        href={link.href as string}
                        className="text-xl hover:border hover:bg-primary/20 hover:text-primary-foreground py-1.5 font-medium px-2 rounded-md"
                      >
                        {link.label}
                      </Link>
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          {session?.status !== "authenticated" ? (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link href="/login" className="flex items-center gap-1 text-sm">
                  <LogInIcon size={14} /> Login
                </Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/signup" className="text-sm">
                  Get Started
                </Link>
              </Button>
            </>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <UserIcon size={16} />
                  <span>{session?.data?.user?.email}</span>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="flex items-center gap-2">
                    <FolderOpenIcon size={16} /> Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/projects/new" className="flex items-center gap-2">
                    <PlusCircleIcon size={16} /> New Project
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/blogs/new" className="flex items-center gap-2">
                    <PlusCircleIcon size={16} /> New Blog
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <span
                    onClick={() => signOut()}
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
