

import Image from "next/image";
import { IProject } from "@/types/project";

const MyProjects = async () => {



    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/project`, {
        next: { revalidate: 60 }
    });
    const data = await res.json();
    const projects = data?.data || [];

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
                    {projects.slice(0, 3).map((project: IProject) => (
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
                                                key={`${idx}`}
                                            // className={`text-[14px] ${tag.color}`}
                                            >
                                                #{tag}
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
