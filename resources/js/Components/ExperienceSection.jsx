import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function ExperienceSection({ isDarkMode }) {
    const experienceRef = useRef(null);

    const experiences = [
        {
            title: 'IT Operational',
            company: 'PT Nusantara Unggul Sarana Adicipta',
            period: '2025 - Present',
            description: 'Develop module for HRMS',
        },
        {
            title: 'Fullstack Programmer and General Admin',
            company: 'Infomedia Solusi Humanika',
            period: '2024 - 2024',
            description:
                'Built responsive user interfaces and improved user experience',
        },
        {
            title: 'Freelance Customer Service and Frontend Developer',
            company: 'CV Natanetwork Solusindo',
            period: '2023 - 2023',
            description: 'improving the frontend of the product sales website.',
        },
        {
            title: 'Internship Backend Engineer',
            company: 'PT. Qatros Teknologi Nusantara',
            period: '2023 - 2023',
            description:
                'backend engineer who is in charge of creating backend processes and database design in an application',
        },
        {
            title: 'Mobile Application Development',
            company: 'Infinite Learning',
            period: '2022 - 2023',
            description:
                'while participating in this program I was given learning about mobile programming from business design to application deployment',
        },
        {
            title: 'Web Developer',
            company: 'Tvri Jawa timur',
            period: '2022 - 2022',
            description: 'Create web project about item management',
        },
    ];

    // GSAP Animations
    useRef(() => {
        // Experience section animation
        gsap.fromTo(
            experienceRef.current,
            { opacity: 0 },
            {
                opacity: 1,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: experienceRef.current,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse',
                },
            },
        );

        gsap.fromTo(
            experienceRef.current.querySelectorAll('.space-y-8 > div'),
            { x: -100, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.3,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: experienceRef.current,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse',
                },
            },
        );
    }, []);

    return (
        <section
            ref={experienceRef}
            id="experience"
            className="px-4 py-16 sm:px-6 sm:py-20"
        >
            <div>
                <div className="mx-auto max-w-4xl">
                    <h2
                        className={`animate__animated animate__fadeInUp mb-8 text-center text-2xl font-bold sm:mb-12 sm:text-3xl lg:text-4xl ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}
                    >
                        Experience
                    </h2>
                    <div className="space-y-8">
                        {experiences.map((exp, index) => (
                            <div
                                key={index}
                                className={`rounded-lg p-6 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                                    isDarkMode ? 'bg-gray-700' : 'bg-white'
                                }`}
                                style={{
                                    animationDelay: `${index * 0.2}s`,
                                }}
                            >
                                <h3
                                    className={`mb-2 text-xl font-bold ${
                                        isDarkMode
                                            ? 'text-white'
                                            : 'text-gray-900'
                                    }`}
                                >
                                    {exp.title}
                                </h3>
                                <p
                                    className={`mb-1 text-lg ${
                                        isDarkMode
                                            ? 'text-blue-400'
                                            : 'text-blue-600'
                                    }`}
                                >
                                    {exp.company}
                                </p>
                                <p
                                    className={`mb-3 text-sm ${
                                        isDarkMode
                                            ? 'text-gray-400'
                                            : 'text-gray-500'
                                    }`}
                                >
                                    {exp.period}
                                </p>
                                <p
                                    className={`${
                                        isDarkMode
                                            ? 'text-gray-300'
                                            : 'text-gray-600'
                                    }`}
                                >
                                    {exp.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
