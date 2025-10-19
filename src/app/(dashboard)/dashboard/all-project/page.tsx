import { getProject } from "@/app/actions/project";
import DashboardProjectCard from "@/components/modules/projects/DashboardProjectCard";
import { IProject } from "@/types/project";

export default async function DashboardProjects() {

    const data = await getProject()
    const projects = data?.data || [];


    return (
        <div className="px-4 md:px-12 lg:px-20 py-16 min-h-screen text-white ">
            <div className="flex items-center justify-between mb-12">
                <h2 className="text-4xl font-extrabold bg-gradient-to-r from-purple-400 via-blue-500 to-cyan-400 text-transparent bg-clip-text">
                    Manage Projects
                </h2>
                <p className="text-gray-400 text-sm">
                    Total Projects: <span className="text-purple-400 font-semibold">{projects.length}</span>
                </p>
            </div>

            <div className="grid md:grid-cols-1 gap-10">
                {projects.map((project: IProject) => (
                    <DashboardProjectCard key={project.id} project={project} />
                ))}
            </div>
        </div>
    );
}
