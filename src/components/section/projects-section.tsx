import { ProjectEntry } from "@/components/project-entry";
import { DATA } from "@/data/resume";

export default function ProjectsSection() {
    return (
        <section id="projects">
            <div className="flex min-h-0 flex-col gap-y-8">
                {/* the pill is the section heading */}
                <div className="flex items-center w-full">
                    <div className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent" />
                    <h2 className="border bg-primary z-10 rounded-xl px-4 py-1 text-background text-sm font-medium">
                        Projects
                    </h2>
                    <div className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent" />
                </div>
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
