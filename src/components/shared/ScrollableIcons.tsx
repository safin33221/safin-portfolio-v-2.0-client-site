"use client"

import { useState, useEffect } from "react"
import { Home, User, Briefcase, Layers, Phone } from "lucide-react"
import Link from "next/link"

const icons = [
  { id: "home", icon: <Home className="size-3" />, label: "Home" },
  { id: "about", icon: <User className="size-3" />, label: "About" },
  { id: "skills", icon: <Layers className="size-3" />, label: "Skills" },
  { id: "projects", icon: <Briefcase className="size-3" />, label: "Projects" },
  { id: "contact", icon: <Phone className="size-3" />, label: "Contact" },
]

export default function ScrollableIcons() {
  const [active, setActive] = useState("home")

  useEffect(() => {
    const sections = icons.map((i) => document.getElementById(i.id))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        })
      },
      {
        threshold: 0.3,
      }
    )

    sections.forEach((sec) => sec && observer.observe(sec))
    return () => sections.forEach((sec) => sec && observer.unobserve(sec))
  }, [])

  return (
    <div
      className="fixed right-3 top-1/2 -translate-y-1/2 flex flex-col gap-3 
      p-2 rounded-2xl backdrop-blur-lg bg-white/10 shadow-lg
      border border-white/30 z-50 md:hidden transition-all duration-300"
    >
      {icons.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={`flex items-center justify-center p-2 rounded-full transition-all duration-200
            ${active === item.id
              ? "bg-purple-600 text-white shadow-md scale-110"
              : "bg-white/50 text-gray-700 hover:bg-purple-200 hover:scale-105"}`}
        >
          {item.icon}
        </a>
      ))}
    </div>
  )
}
