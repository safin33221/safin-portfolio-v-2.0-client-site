"use client";
import Image from "next/image";
import { toast } from "sonner";
import { UpdateProjectDialog } from "./UpdateProjectDialog";
import { IProject } from "@/types/project";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteProject, updateProject } from "@/app/actions/project";

export default function DashboardProjectCard({ project }: { project: IProject }) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setDeleting(true)
      const res = await deleteProject(Number(project.id))
      if (!res.success) return toast.error("Failed to delete project");
      setDeleting(false)
      toast.success("Project deleted successfully");
    } catch {
      setDeleting(false)
      toast.error("Failed to delete project");
    } finally {
      setDeleting(false)

    }
  };

  const changeDisplay = async () => {
    try {
      await updateProject(
        { display: !project.display },
        Number(project.id)
      )
      toast.success(" update project display ")
    } catch (err) {
      toast.error("Failed to update project display")
      console.log(err);
    }
  }


  return (
    <div className="w-full ">
      <div
        key={project.id}
        className="group relative flex flex-col md:flex-row rounded-2xl overflow-hidden border border-gray-800 
                   shadow-lg hover:shadow-purple-500/30 transition-all duration-500 
                   bg-[#121212]/90 backdrop-blur-md hover:-translate-y-1 p-4 md:p-6 lg:p-8"
      >
        {/* Project Image */}
        <div className="md:w-1/3 overflow-hidden relative rounded-xl h-80">
          <Image
            src={project.image}
            alt={project.name}
            width={600}
            height={400}
            className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700 ease-in-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        </div>

        {/* Project Info */}
        <div className="md:w-2/3 p-4 md:p-6 flex flex-col justify-between">
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
          <div className="flex justify-between items-end mt-6">
            <div className="flex flex-col gap-3">
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
            </div>

            <div className="flex flex-col gap-3">
              <UpdateProjectDialog project={project} />

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button
                    disabled={deleting}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-sm font-semibold transition duration-300"
                  >
                    <Trash2 size={16} />
                    {deleting ? "Deleting..." : "Delete"}
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-zinc-950 border border-zinc-800 xl:max-w-xl">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription className="text-lg text-red-400">
                      <span className="text-2xl font-bold text-purple-400 py-4">
                        Project Name: {project.name}
                      </span>
                      <br />
                      Note: This action cannot be undone. This will permanently delete your project.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      Confirm Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <Button onClick={changeDisplay}>
                {
                  project.display ? "Public" : "Privet"
                }
              </Button>
            </div>
          </div>
        </div>

        {/* Glow Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-purple-600/10 via-pink-500/5 to-blue-500/10 opacity-0 group-hover:opacity-100 transition duration-700" />
      </div>
    </div>
  );
}
