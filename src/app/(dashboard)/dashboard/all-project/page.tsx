import DashboardProjectCard from "@/components/modules/projects/DashboardProjectCard";

export default async function DashboardProjects() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/project`, {
        cache: "no-store",
    });
    const data = await res.json();
    const projects = data?.data || [];

    return (
        <div className="px-4 md:px-12 lg:px-20 py-16 min-h-screen text-white">
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
                    <DashboardProjectCard key={project.id} project={project} />
                ))}
            </div>
        </div>
    );
}
