"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Home,
  PlusCircle,
  LogOut,
  LayoutDashboard,
  List,
  Menu,
  Upload,
  UploadIcon,
} from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { signOut, useSession } from "next-auth/react"
import { usePathname } from "next/navigation"
import clsx from "clsx"

export default function Sidebar() {
  const { data: session, status } = useSession()
  const pathname = usePathname()


  const links = [
    { href: "/", label: "Home", icon: Home },
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/create-blog", label: "Create Blog", icon: PlusCircle },
    { href: "/dashboard/upload-project", label: "Upload Project", icon: UploadIcon },
    { href: "/dashboard/all-blog", label: "All Blog", icon: List },
    { href: "/dashboard/all-project", label: "All Project", icon: List },
  ]

  const SidebarContent = (
    <div className="flex    h-full flex-col bg-[#1a0029]/40 text-white">
      {/* Top Brand Section */}
      <div className="p-6 text-center border-b border-purple-700">
        <h1 className="text-2xl font-bold text-purple-400">Safin&apos;s Admin</h1>
        <p className="text-xs text-gray-400 mt-1">Portfolio Control Panel</p>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-2 p-4">
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={clsx(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
              pathname === href
                ? "bg-purple-600/30 text-white"
                : "text-gray-100 hover:bg-purple-700 hover:text-white"
            )}
          >
            <Icon className="h-5 w-5" />
            {label}
          </Link>
        ))}
      </nav>

      {/* User / Logout Section */}
      {status === "authenticated" && (
        <div className="p-4 border-t border-purple-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-8 w-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-semibold">
              {session.user?.name?.[0]?.toUpperCase() || "A"}
            </div>
            <div>
              <p className="text-sm font-medium">{session.user?.name}</p>
              <p className="text-xs text-gray-400">{session.user?.email}</p>
            </div>
          </div>

          <Button
            variant="destructive"
            className="w-full justify-start gap-2 bg-purple-600 hover:bg-purple-700 border-none"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      )}
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex h-screen max-w-80 flex-col border-r bg-[#1a0029]/40 shadow-lg">
        {SidebarContent}
      </aside>

      {/* Mobile Header with Drawer */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-[#1a0029]/60 backdrop-blur-sm border-b border-purple-800 z-50 flex items-center justify-between px-4 py-3">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-purple-700/30"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="p-0 w-72 bg-[#1a0029] border-r border-purple-800"
          >
            {SidebarContent}
          </SheetContent>
        </Sheet>

        <h1 className="text-lg font-semibold text-purple-400">Safin&apos;s Admin</h1>
      </div>

      {/* Page Spacer for Mobile Header */}
      <div className="md:hidden h-14" />
    </>
  )
}
