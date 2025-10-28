 Portfolio (Next.js + Prisma + Express.js)

**Live Site:** [https://safayet-hossan.vercel.app](https://safayet-hossan.vercel.app)  
**Backend API:** https://safin-portfolio-20-client-side.vercel.app

**Admin Login:**  
- **No Need Email**
- **Password:** `YourStrongPassword`

---

## 📖 Project Overview
A modern personal portfolio website built with **Next.js 15 (TypeScript)** and **Express.js**.  
It includes **authentication**, a secure **dashboard**, and dynamic management for **blogs and projects**.  
Uses **Prisma ORM** for database access and **JWT** for secure authentication.

---

## 🧱 Tech Stack
| Layer | Technology |
|-------|-------------|
| Frontend | Next.js 15 (TypeScript), Tailwind CSS 4, Framer Motion, Radix UI, Styled Components |
| Backend | Node.js, Express.js |
| ORM | Prisma |
| Database | PostgreSQL *(or MongoDB alternative)* |
| Authentication | JWT + bcrypt + NextAuth |
| Notifications | react-hot-toast / sonner |
| Deployment | Vercel  |

---

## 📦 Dependencies

### Main
| Package | Purpose |
|----------|----------|
| **@emailjs/browser**, **emailjs** | Contact form and email sending |
| **@hookform/resolvers**, **react-hook-form**, **zod** | Form validation and schema enforcement |
| **@radix-ui/react-\*** | Accessible, headless UI primitives (dialogs, dropdowns, switches) |
| **class-variance-authority**, **clsx**, **tailwind-merge** | Conditional and composable Tailwind CSS classes |
| **framer-motion** | Animations and transitions |
| **lucide-react**, **react-icons** | Icon components |
| **next-auth** | Authentication for Next.js routes |
| **next-themes** | Theme toggling (light/dark mode) |
| **react-quill**, **quill** | Rich text editor for blog/project content |
| **styled-components** | Component-level styling |
| **sweetalert2** | Alert and confirmation dialogs |
| **sonner** | Toast notifications |

### Dev
| Package | Purpose |
|----------|----------|
| **@tailwindcss/postcss**, **tailwindcss** | Tailwind CSS integration |
| **typescript**, **@types/react**, **@types/node** | TypeScript typing support |
| **eslint**, **eslint-config-next** | Linting and Next.js best practices |
| **tw-animate-css** | Animation utilities for Tailwind |

---

## 🚀 Features

### Public
- About Me section (SSG)
- Project showcase with ISR
- Blog listing and single-blog pages (ISR with revalidate)
- Responsive, accessible design
- Contact form with EmailJS integration

### Private (Admin)
- JWT-secured login  
- Dashboard for blog and project CRUD operations  
- Form validation with Zod + React Hook Form  
- Real-time feedback via `sonner` / `sweetalert2`  
- Integrated React Quill rich text editor

---

## ⚙️ Installation & Setup

### 1. Clone repositories
```bash
git clone https://github.com/safin33221/safin-portfolio-v-2.0-client-site
git clone https://github.com/safin33221/safin-portfolio-v-2.0-server-site
