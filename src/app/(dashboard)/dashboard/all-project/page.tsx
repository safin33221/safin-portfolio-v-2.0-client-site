import Image from "next/image";

export default async function DashboardProjects() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/project`, {
        cache: "no-store",
    });
    const data = await res.json();
    const projects = data?.data || [];

    return (
        <div className="px-4 md:px-12 lg:px-20 py-16 bg-gradient-to-b from-[#0a0a0a] to-[#111111] min-h-screen text-white">
            <div className="flex items-center justify-between mb-12">
                <h2 className="text-4xl font-extrabold bg-gradient-to-r from-purple-400 via-blue-500 to-cyan-400 text-transparent bg-clip-text">
                    Manage Projects
                </h2>
                <p className="text-gray-400 text-sm">
                    Total Projects: <span className="text-purple-400 font-semibold">{projects.length}</span>
                </p>
            </div>

            <div className="grid md:grid-cols-1 gap-10">
                {projects.map((project: any) => (
                    <div
                        key={project.id}
                        className="group relative flex flex-col md:flex-row rounded-2xl overflow-hidden border border-gray-800 shadow-lg hover:shadow-purple-500/30 transition-all duration-500 bg-[#121212]/90 backdrop-blur-md hover:-translate-y-1"
                    >
                        {/* Project Image */}
                        <div className="md:w-1/3 overflow-hidden relative">
                            <Image
                                src={project.image}
                                alt={project.name}
                                width={600}
                                height={400}
                                className="w-full h-64 object-cover transform group-hover:scale-110 transition duration-700 ease-in-out"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                        </div>

                        {/* Project Info */}
                        <div className="md:w-2/3 p-6 md:p-8 flex flex-col justify-between">
                            <div>
                                <h3 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                                    {project.name}
                                </h3>
                                <p className="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-3">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {project.tags?.map((tag: string, idx: number) => (
                                        <span
                                            key={idx}
                                            className="text-sm px-3 py-1 bg-purple-600/20 border border-purple-500/30 text-purple-300 rounded-full hover:bg-purple-600/30 transition"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-3 mt-6">
                                <a
                                    href={project.live_page_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-sm font-semibold transition duration-300"
                                >
                                    🔗 Live Demo
                                </a>
                                <a
                                    href={project.source_code_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-sm font-semibold transition duration-300"
                                >
                                    💻 Source Code
                                </a>
                                <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-sm font-semibold transition duration-300">
                                    ✏️ Update
                                </button>
                                <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-sm font-semibold transition duration-300">
                                    🗑 Delete
                                </button>
                            </div>
                        </div>

                        {/* Glow Overlay */}
                        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-purple-600/10 via-pink-500/5 to-blue-500/10 opacity-0 group-hover:opacity-100 transition duration-700" />
                    </div>
                ))}
            </div>
        </div>
    );
}
