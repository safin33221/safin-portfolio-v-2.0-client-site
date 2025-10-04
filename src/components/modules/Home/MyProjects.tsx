
import Image from "next/image"
import React from "react"

import globalThought from "../../../../public/asset/project/globalThought.png"
import tastyride from "../../../../public/asset/project/tastyride.png"
import health from "../../../../public/asset/project/health.png"
import sportstore from "../../../../public/asset/project/sportstore.png"
import restaurant from "../../../../public/asset/project/restaurant.png"

const MyProjects = () => {
    const projects = [
        {
            id: 5,
            name: "Global Thought – AI-Powered Blogging & Content Intelligence",
            description:
                "A cutting-edge blogging platform that empowers writers to create high-quality, SEO-optimized content using AI assistance, real-time insights, and a modern editor tailored for thoughtful publishing and global impact.",
            image: globalThought,
            source_code_link:
                "https://github.com/safin33221/Global_Thought-Ai-Prowerd-BlogPost_Using-NextJs",
            live_page_link: "https://global-thought.vercel.app/",
        },
        {
            id: 4,
            name: "TastyRide - Smart Food Delivery Platform",
            description:
                "A smart, feature-rich food delivery web application offering real-time order tracking, multi-language support, dynamic promotions, and subscription-based restaurant profiles to ensure an engaging user experience.",
            image: tastyride,
            source_code_link: "https://github.com/safin33221/TastyRide",
            live_page_link: "https://tastyride-cd1a3.web.app/",
        },
        {
            id: 1,
            name: "Health Rex Store",
            description:
                "A full-stack medicine selling e-commerce web application providing product browsing, cart management, checkout, and secure payment integration.",
            image: health,
            source_code_link:
                "https://github.com/safin33221/Health-Rex-Store-Client",
            live_page_link: "https://healthrexstore.web.app",
        },
        {
            id: 2,
            name: "Sports Equipment Store",
            description:
                "An e-commerce platform designed for sports enthusiasts to browse, purchase, and review sports equipment with a seamless shopping experience and secure checkout.",
            image: sportstore,
            source_code_link:
                "https://github.com/safin33221/Sports-Equipment-Store-Client-Side",
            live_page_link: "https://sports-equipment-store-7f46d.web.app",
        },
        {
            id: 3,
            name: "Restaurant Management System",
            description:
                "A complete web-based restaurant management system that streamlines order management, table reservations, and menu customization for a seamless dining experience.",
            image: restaurant,
            source_code_link:
                "https://github.com/safin33221/Restaurant-Mangement-client-side",
            live_page_link: "https://restaurant-management-caeb2.web.app",
        },
    ]

    return (
        <section id="projects" className="w-full  px-3 md:px-16 lg:px-24 ">
            <div className=" mx-auto px-4 md:px-8">

                {/* Heading */}
                <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-14">
                    🚀<span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
                         Projects Showcase
                    </span>
                </h2>

                {/* Projects Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {projects.slice(0, 3).map((project) => (
                        <div
                            key={project.id}
                            className="group relative flex flex-col rounded-2xl overflow-hidden bg-white/5 backdrop-blur-lg border border-gray-700 shadow-xl hover:shadow-purple-500/30 transition duration-500"
                        >
                            {/* Project Image */}
                            <div className="overflow-hidden">
                                <Image
                                    src={project.image}
                                    alt={project.name}
                                    width={500}
                                    height={400}
                                    className="w-full h-60 object-cover transform group-hover:scale-110 transition duration-500 ease-in-out"
                                />
                            </div>

                            {/* Content */}
                            <div className="p-6 flex-1 flex flex-col">
                                <div>
                                    <h3 className="text-2xl font-bold group-hover:text-purple-400 transition">
                                        {project.name}
                                    </h3>
                                    <p className="text-gray-400 text-sm mt-3 leading-relaxed">
                                        {project.description}
                                    </p>
                                </div>

                                {/* Links */}
                                <div className="flex gap-5  pt-5 mt-auto">
                                    <a
                                        href={project.live_page_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block px-4 py-2 rounded-lg text-sm font-semibold bg-purple-600 hover:bg-purple-700 transition focus:outline-none focus:ring-2 focus:ring-purple-400"
                                        tabIndex={0}
                                    >
                                        🔗 Live Demo
                                    </a>

                                    <a
                                        href={project.source_code_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block px-4 py-2 rounded-lg text-sm font-semibold bg-gray-800 hover:bg-gray-700 transition focus:outline-none focus:ring-2 focus:ring-gray-400"
                                        tabIndex={0}
                                    >
                                        💻 Source Code
                                    </a>
                                </div>
                            </div>

                            {/* Glow Effect */}
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition duration-700"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default MyProjects
