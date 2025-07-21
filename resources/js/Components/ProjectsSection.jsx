import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function ProjectsSection({ isDarkMode, projects = [] }) {
    const projectsRef = useRef(null);

    // GSAP Animations
    useRef(() => {
        // Projects section animation
        gsap.fromTo(
            projectsRef.current,
            { opacity: 0 },
            {
                opacity: 1,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: projectsRef.current,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse',
                },
            },
        );

        gsap.fromTo(
            projectsRef.current.querySelectorAll('.grid > div'),
            { y: 100, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: projectsRef.current,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse',
                },
            },
        );
    }, []);

    // Helper to get shadow color from first tag or fallback
    function getShadowColor(project) {
        if (project.tags && project.tags.length > 0 && project.tags[0].colour) {
            return project.tags[0].colour + '99';
        }
        return isDarkMode ? '#39357999' : '#8b86ca99';
    }

    return (
        <section
            ref={projectsRef}
            id="project"
            className="px-4 py-16 sm:px-6 sm:py-20"
        >
            <div>
                <div className="mx-auto max-w-6xl">
                    <h2
                        className={`animate__animated animate__fadeInUp mb-8 text-center text-2xl font-bold sm:mb-12 sm:text-3xl lg:text-4xl ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}
                    >
                        Projects
                    </h2>
                    <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {projects.map((project, index) => (
                            <div
                                key={project.id}
                                className={`overflow-hidden rounded-lg transition-all duration-300 hover:scale-105 ${
                                    isDarkMode ? 'bg-gray-800' : 'bg-white'
                                }`}
                                style={{
                                    animationDelay: `${index * 0.2}s`,
                                    boxShadow: `0 8px 40px 0 ${getShadowColor(project)}, 0 2px 16px 0 ${getShadowColor(project)}`,
                                    filter: 'none',
                                }}
                            >
                                {project.images && project.images.length > 0 ? (
                                    <img
                                        src={
                                            project.images[0].url.startsWith(
                                                'http',
                                            )
                                                ? project.images[0].url
                                                : `/storage/${project.images[0].url}`
                                        }
                                        alt={project.title}
                                        className="h-48 w-full object-cover transition-all duration-300 hover:scale-110"
                                    />
                                ) : (
                                    <div
                                        className={`h-48 w-full transition-all duration-300 hover:scale-110 ${
                                            isDarkMode
                                                ? 'bg-gray-700'
                                                : 'bg-gray-200'
                                        }`}
                                    ></div>
                                )}
                                <div className="p-4 sm:p-6">
                                    <h3
                                        className={`mb-2 text-lg font-bold sm:text-xl ${
                                            isDarkMode
                                                ? 'text-white'
                                                : 'text-gray-900'
                                        }`}
                                    >
                                        {project.title}
                                    </h3>
                                    <p
                                        className={`mb-4 text-sm sm:text-base ${
                                            isDarkMode
                                                ? 'text-gray-300'
                                                : 'text-gray-600'
                                        }`}
                                    >
                                        {project.short_description}
                                    </p>
                                    {/* Render tags if available */}
                                    <div className="flex flex-wrap gap-2">
                                        {(project.tags || []).map((tag) => (
                                            <span
                                                key={tag.id}
                                                className="rounded-full px-3 py-1 text-xs font-medium transition-all duration-300 hover:scale-110"
                                                style={{
                                                    backgroundColor:
                                                        tag.colour ||
                                                        (isDarkMode
                                                            ? '#393579'
                                                            : '#8b86ca'),
                                                    color: '#fff',
                                                }}
                                                title={tag.type}
                                            >
                                                {tag.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
