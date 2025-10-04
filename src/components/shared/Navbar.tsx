"use client"

import { BookOpenIcon, InfoIcon, LifeBuoyIcon, LogInIcon, LogOutIcon, UserIcon, PlusCircleIcon, FolderOpenIcon } from "lucide-react"
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
import { ModeToggle } from "./MoodToggle"

// Core navigation
const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/blogs", label: "Blogs" },
  {
    label: "About",
    submenu: true,
    type: "icon",
    items: [
      { href: "/about", label: "About Me", icon: "InfoIcon" },
      { href: "/tutorials", label: "Tutorials", icon: "BookOpenIcon" },
      { href: "/support", label: "Support", icon: "LifeBuoyIcon" },
    ],
  },
]

// Fake auth state for demo. Replace with real auth logic.
const isAuthenticated = true
const user = { name: "Safin", email: "safin@example.com" }

export default function Navbar() {
  return (
    <header className="border-b px-4 md:px-6 sticky top-0 bg backdrop-blur z-50">
      <div className="flex h-16 items-center justify-between gap-4">
        {/* Left */}
        <div className="flex items-center gap-6">
          <Link href="/" className="text-primary hover:text-primary/90">
            <Logo />
          </Link>
          <NavigationMenu viewport={false} className="max-md:hidden">
            <NavigationMenuList className="gap-2">
              {navigationLinks.map((link, index) => (
                <NavigationMenuItem key={index}>
                  {link.submenu ? (
                    <>
                      <NavigationMenuTrigger className="text-muted-foreground hover:text-primary bg-transparent px-2 py-1.5 font-medium">
                        {link.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="z-50 p-1">
                        <ul className={cn("min-w-48")}>
                          {link.items.map((item, idx) => (
                            <li key={idx}>
                              <NavigationMenuLink
                                href={item.href}
                                className="py-1.5 flex items-center gap-2"
                              >
                                {item.icon === "InfoIcon" && <InfoIcon size={16} />}
                                {item.icon === "BookOpenIcon" && <BookOpenIcon size={16} />}
                                {item.icon === "LifeBuoyIcon" && <LifeBuoyIcon size={16} />}
                                {item.label}
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <NavigationMenuLink
                      href={link.href}
                      className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                    >
                      {link.label}
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          <ModeToggle />
          {!isAuthenticated ? (
            <>
              <Button asChild variant="ghost" size="sm">
                <a href="/login" className="flex items-center gap-1 text-sm">
                  <LogInIcon size={14} /> Login
                </a>
              </Button>
              <Button asChild size="sm">
                <a href="/signup" className="text-sm">Get Started</a>
              </Button>
            </>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <UserIcon size={16} />
                  <span>{user.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <a href="/dashboard" className="flex items-center gap-2">
                    <FolderOpenIcon size={16} /> Dashboard
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/projects/new" className="flex items-center gap-2">
                    <PlusCircleIcon size={16} /> New Project
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/blogs/new" className="flex items-center gap-2">
                    <PlusCircleIcon size={16} /> New Blog
                  </a>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600" asChild>
                  <a href="/logout" className="flex items-center gap-2">
                    <LogOutIcon size={16} /> Logout
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  )
}
