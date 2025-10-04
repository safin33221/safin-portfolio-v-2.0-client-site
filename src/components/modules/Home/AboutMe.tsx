"use client"

import Image from "next/image"
import myImg from "../../../../public/asset/aboutMeImg.jpg"
import { motion } from "framer-motion"
export default function AboutMe() {
    return (
        <section id="about" className="w-full  text-white max-md:px-3 ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                {/* Left: Image */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex justify-center"
                >
                    <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden shadow-lg shadow-purple-500/30 border-2 border-purple-500/40">
                        <Image src={myImg} alt="Safin" fill className="object-cover" />
                    </div>
                </motion.div>

                {/* Right: Content */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="bg-gradient-to-r from-purple-400 to-purple-600 text-transparent bg-clip-text text-4xl">About Me</h2>

                    {/* Personal Info */}
                    <div className="mb-6">
                        <h3 className="text-2xl font-semibold mb-2">Personal Information</h3>
                        <p className="text-lg leading-relaxed text-gray-300">
                            Hi, I’m <span className="font-bold text-white">Safin</span>. Outside of coding, I enjoy spending
                            time with friends & family, exploring new experiences, and finding balance
                            between personal growth and relaxation. I believe personal life gives me
                            strength and inspiration for everything I do.
                        </p>
                    </div>

                    {/* Work Experience */}
                    <div className="mb-6">
                        <h3 className="text-2xl font-semibold mb-4">Work Experience</h3>

                        <div className="relative  pl-10 space-y-6">
                            {/* Job 1 */}
                            <div className="relative">
                                <div className="absolute -left-8 top-1 w-6 h-6 rounded-full bg-purple-500 border-2 border-purple-700"></div>
                                <h4 className="text-lg font-bold text-white">
                                    Full Stack Developer – GreatBro IT
                                </h4>
                                <span className="text-sm text-gray-400">July 2025 – Present</span>
                                <p className="text-gray-300 mt-1">
                                    Working on scalable full-stack applications, handling both frontend & backend with modern technologies.
                                </p>
                            </div>

                     

                            {/* Job 4 */}
                            <div className="relative">
                                <div className="absolute -left-8 top-1 w-6 h-6 rounded-full bg-purple-500 border-2 border-purple-700"></div>
                                <h4 className="text-lg font-bold text-white">Client Work</h4>
                                <span className="text-sm text-gray-400">2024 – Present</span>
                                <p className="text-gray-300 mt-1">
                                    Worked with both international & local clients, delivering high-quality applications & solutions.
                                </p>
                            </div>
                        </div>
                    </div>



                </motion.div>
            </div>
        </section>
    )
}
