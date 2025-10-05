"use client"
import Image, { StaticImageData } from "next/image"

// Imports
import html from '../../../../public/asset/tech/html.png'
import css from '../../../../public/asset/tech/css.png'
import javascript from '../../../../public/asset/tech/javascript.png'
import reactjs from '../../../../public/asset/tech/reactjs.png'
import redux from '../../../../public/asset/tech/redux.png'
import nextjs from '../../../../public/asset/tech/nextjs.png'
import tailwind from '../../../../public/asset/tech/tailwind.png'
import typescript from '../../../../public/asset/tech/typescript.png'

import nodejs from '../../../../public/asset/tech/nodejs.png'
import ExpressJs from '../../../../public/asset/tech/expressJSs.png'
import prisma from '../../../../public/asset/tech/prisma.png'
import mongodb from '../../../../public/asset/tech/mongodb.png'
import postgres from '../../../../public/asset/tech/postgres.png'
import firebase from '../../../../public/asset/tech/firebase.webp'

import git from '../../../../public/asset/tech/git.png'
import figma from '../../../../public/asset/tech/figma.png'
import { Code2, Server, Wrench } from "lucide-react"

const MyTechSkill = () => {
    // Categorized skills
    const frontend = [
        { name: "HTML", icon: html },
        { name: "CSS", icon: css },
        { name: "Tailwind CSS", icon: tailwind },
        { name: "JavaScript", icon: javascript },
        { name: "TypeScript", icon: typescript },
        { name: "React.js", icon: reactjs },
        { name: "Next.js", icon: nextjs },
        { name: "Redux", icon: redux },
    ]

    const backend = [
        { name: "Node.js", icon: nodejs },
        { name: "Express.js", icon: ExpressJs },
        { name: "Prisma", icon: prisma },
        { name: "MongoDB", icon: mongodb },
        { name: "PostgreSQL", icon: postgres },
        { name: "Firebase", icon: firebase },
    ]

    const tools = [
        { name: "Git", icon: git },
        { name: "Figma", icon: figma },
    ]

    const renderSkills = (skills: { name: string; icon: StaticImageData }[]) =>
        skills.map((skill, idx) => (
            <div
                key={idx}
                className="flex flex-col min-w-28 items-center justify-center p-4 bg-gray-900/50 rounded-xl border border-gray-700 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/20 transition "
            >
                <Image src={skill.icon} width={80} height={60} alt={skill.name} className="w-12 h-12 object-contain" />
                <p className="text-sm mt-2 text-gray-300">{skill.name}</p>
            </div>
        ))

    return (
        <section id="skills" className="w-full py-10 max-md:bg-gradient-to-b from-black via-gray-900 to-black text-white">
            <div className="max-w-7xl mx-auto px-3">
                {/* Section Title */}
                <h2 className="text-5xl font-extrabold text-center mb-16">
                    💡
                    <span className="bg-gradient-to-r from-purple-300 to-purple-600 text-transparent bg-clip-text">
                        My Expertise
                    </span>
                </h2>

                {/* Frontend */}
                <div className="mb-16">
                    <div className="flex items-center justify-center gap-3 mb-8">
                        <Code2 className="w-8 h-8 text-yellow-400" />
                        <h3 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 via-green-400 to-blue-400 text-transparent bg-clip-text">
                            Frontend Development
                        </h3>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-4 w-full">
                        {renderSkills(frontend)}
                    </div>
                </div>

                {/* Backend */}
                <div className="mb-16">
                    <div className="flex items-center justify-center gap-3 mb-8">
                        <Server className="w-8 h-8 text-red-400" />
                        <h3 className="text-3xl font-bold bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 text-transparent bg-clip-text">
                            Backend Development
                        </h3>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-4 w-full">
                        {renderSkills(backend)}
                    </div>
                </div>

                {/* Tools */}
                <div>
                    <div className="flex items-center justify-center gap-3 mb-8">
                        <Wrench className="w-8 h-8 text-cyan-400" />
                        <h3 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 text-transparent bg-clip-text">
                            Other Tools
                        </h3>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-4 w-full">
                        {renderSkills(tools)}
                    </div>
                </div>
            </div>
        </section>

    )
}

export default MyTechSkill
