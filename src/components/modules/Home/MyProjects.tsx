
import Image from "next/image"

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
            tags: [
                {
                    name: "next.js",
                    color: "blue-text-gradient",
                },
                {
                    name: "typescript",
                    color: "green-text-gradient",
                },
                {
                    name: "nextAuth",
                    color: "orange-text-gradient",
                },
                {
                    name: "mongodb",
                    color: "purple-text-gradient",
                },
                {
                    name: "shadcn/ui",
                    color: "pink-text-gradient",
                },
                {
                    name: "Gemini ai",
                    color: "red-text-gradient",
                }
            ],
            challenges_faced: [
                "Building a custom blog editor with AI suggestions and rich text support (Tiptap)",
                "Integrating SEO analyzer with keyword density and readability scoring",
                "Designing scalable PostgreSQL schemas for content, tags, and user preferences",
                "Creating a seamless dark/light theme toggle with consistent typography",
                "Handling authentication, rate limiting, and secure content previewing"
            ],
            potential_improvements: [
                "Adding real-time collaborative editing using WebSockets",
                "Integrating multilingual content generation and translation",
                "Building a marketplace for user-contributed blog templates",
                "Creating a smart tag recommendation engine using embeddings",
                "Launching a community insights dashboard powered by AI analytics"
            ],
            image: globalThought, // Replace with your imported image variable
            source_code_link: "https://github.com/safin33221/Global_Thought-Ai-Prowerd-BlogPost_Using-NextJs",
            live_page_link: "https://global-thought.vercel.app/"
        },
        {
            id: 4,
            name: "TastyRide - Smart Food Delivery Platform",
            description:
                "A smart, feature-rich food delivery web application offering real-time order tracking, multi-language support, dynamic promotions, and subscription-based restaurant profiles to ensure an engaging user experience.",
            tags: [
                {
                    name: "react",
                    color: "blue-text-gradient",
                },
                {
                    name: "node.js",
                    color: "green-text-gradient",
                },
                {
                    name: "mongodb",
                    color: "pink-text-gradient",
                },
                {
                    name: "tailwind",
                    color: "orange-text-gradient",
                },
                {
                    name: "firebase",
                    color: "red-text-gradient",
                },
                {
                    name: "expressJs",
                    color: "purple-text-gradient",
                }
            ],
            challenges_faced: [
                "Implementing real-time order tracking through multiple order stages",
                "Managing dynamic discounts and advertisement banners",
                "Creating a scalable multi-language translation system",
                "Handling complex user roles and permissions",
                "Integrating responsive UI for mobile-first design"
            ],
            potential_improvements: [
                "Integrating AI to suggest meals based on user behavior",
                "Adding delivery partner and logistics management module",
                "Enhancing analytics dashboard for restaurants",
                "Implementing offline mode with local storage caching",
                "Integrating voice assistant support for ordering"
            ],
            image: tastyride,
            source_code_link: "https://github.com/safin33221/TastyRide",
            live_page_link: "https://tastyride-cd1a3.web.app/"
        },
        {
            id: 1,
            name: "Health Rex Store",
            description:
                "A full-stack Medicing selling e-commerce web application (Health Rex Store) that provides a seamless shopping experience, including product browsing, cart management, checkout, and secure payment integration.",
            tags: [
                {
                    name: "react",
                    color: "blue-text-gradient",
                },
                {
                    name: "mongodb",
                    color: "pink-text-gradient",
                },
                {
                    name: "node.js",
                    color: "green-text-gradient",
                },

                {
                    name: "tailwind",
                    color: "orange-text-gradient",
                },
                {
                    name: "expressJs",
                    color: "purple-text-gradient",
                },
                {
                    name: "firebase",
                    color: "red-text-gradient",
                },
            ],
            challenges_faced: [
                "Implementing a secure payment gateway integration.",
                "Ensuring smooth user authentication and role-based access control.",
                "Managing real-time inventory updates efficiently."
            ],
            potential_improvements: [
                "Implementing AI-based product recommendations.",
                "Adding multi-vendor support for pharmacy owners.",
                "Optimizing performance for better scalability."
            ],
            image: health,
            source_code_link: "https://github.com/safin33221/Health-Rex-Store-Client",
            live_page_link: "https://healthrexstore.web.app",
        },
        {
            id: 2,
            name: "Sports Equipment Store",
            description:
                "An e-commerce platform designed for sports enthusiasts to browse, purchase, and review sports equipment. Features include a seamless shopping experience, secure checkout, and user authentication.",
            tags: [
                {
                    name: "react",
                    color: "blue-text-gradient",
                },

                ,
                {
                    name: "node.js",
                    color: "green-text-gradient",
                },
                {
                    name: "tailwind",
                    color: "orange-text-gradient",
                },
                {
                    name: "expressJs",
                    color: "purple-text-gradient",
                },

                {
                    name: "mongodb",
                    color: "pink-text-gradient",
                },
                , {
                    name: "firebase",
                    color: "red-text-gradient",
                }
            ],
            challenges_faced: [
                "Managing complex state for cart functionality", "implementing secure authentication", "optimizing database queries for better performance", "ensuring a smooth user experience across different devices", "and optimizing API response times for faster interactions."],

            potential_improvements: [
                "Enhancing the UI for a more intuitive experience, adding AI-powered product recommendations", "integrating  payment gateways for smoother transactions", "implementing real-time order tracking, introducing a loyalty program for frequent customers", "and improving accessibility for users with disabilities."
            ],

            image: sportstore,
            source_code_link: "https://github.com/safin33221/Sports-Equipment-Store-Client-Side",
            live_page_link: "https://sports-equipment-store-7f46d.web.app"
        },



        {
            id: 3,
            name: "Restaurant Management System",
            description:
                "A complete web-based restaurant management system that streamlines order management, table reservations, and menu customization, ensuring a seamless dining experience.",
            tags: [
                {
                    name: "react",
                    color: "blue-text-gradient",
                },
                {
                    name: "node.js",
                    color: "green-text-gradient",
                },
                {
                    name: "mongodb",
                    color: "pink-text-gradient",
                },
                {
                    name: "tailwind",
                    color: "orange-text-gradient",
                },
                {
                    name: "firebase",
                    color: "red-text-gradient",
                },
                {
                    name: "expressJs",
                    color: "purple-text-gradient",
                }
            ],
            challenges_faced: [
                "Handling real-time order updates",
                "Ensuring secure user authentication",
                "Optimizing database queries for fast performance",
                "Integrating third-party payment systems",
                "Managing role-based access for different user types"
            ],

            potential_improvements: [
                "Enhancing the UI/UX for a more intuitive experience",
                "Adding AI-powered menu recommendations",
                "Implementing a customer feedback system",
                "Introducing an inventory management feature",
                "Optimizing server performance for handling high traffic"
            ],
            image: restaurant,
            source_code_link: "https://github.com/safin33221/Restaurant-Mangement-client-side",
            live_page_link: "https://restaurant-management-caeb2.web.app",
        }
    ];

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
                            className="group relative flex flex-col rounded-2xl overflow-hidden bg-card backdrop-blur-lg border border-gray-700 shadow-xl hover:shadow-purple-500/30 transition duration-500 cursor-move"
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
                                <div className='mt-4 flex flex-wrap gap-2'>
                                    {project.tags.map((tag, idx) =>
                                        tag ? (
                                            <p
                                                key={`${project.name}-${tag.name}-${idx}`}
                                                className={`text-[14px] ${tag.color}`}
                                            >
                                                #{tag.name}
                                            </p>
                                        ) : null
                                    )}
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
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-400/5  opacity-0 group-hover:opacity-100 transition duration-700"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default MyProjects
