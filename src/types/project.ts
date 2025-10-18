export interface IProject {
    id?: string; // optional for new projects before saved
    name: string;
    description: string;
    category?: string;
    image: string; // URL
    challenges_faced: string[];
    potential_improvements: string[];
    tags: string[]; // e.g. ["React", "Node.js", "MongoDB"]
    live_page_link?: string;
    source_code_link: string;
    createdAt?: string;
    updatedAt?: string;
}
