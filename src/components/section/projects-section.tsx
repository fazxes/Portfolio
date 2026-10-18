import { ProjectEntry } from "@/components/project-entry";
import { DATA } from "@/data/resume";

export default function ProjectsSection() {
    return (
        <section id="projects">
            <div className="flex min-h-0 flex-col gap-y-6">
                {/* same heading style as About and Journey */}
                <h2 className="text-xl font-semibold">Projects</h2>
                {/* the whole section fades in from page.tsx; entries don't animate one by one */}
                <div className="grid w-full gap-8">
                    {DATA.projects.map((project) => (
                        <ProjectEntry
                            key={project.title}
                            href={project.href}
                            title={project.title}
                            description={project.description}
                            dates={project.dates}
                            art={project.art}
                            links={project.links}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
