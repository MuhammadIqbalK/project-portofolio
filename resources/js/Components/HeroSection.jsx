import { gsap } from 'gsap';
import { useRef } from 'react';

export default function HeroSection({ isDarkMode }) {
    const heroRef = useRef(null);

    // GSAP Animations
    useRef(() => {
        // Hero section parallax and animations
        gsap.fromTo(
            heroRef.current.querySelector('h1'),
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.2, delay: 0.3, ease: 'power3.out' },
        );

        gsap.fromTo(
            heroRef.current.querySelector('p'),
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, delay: 0.6, ease: 'power3.out' },
        );

        gsap.fromTo(
            heroRef.current.querySelector('button'),
            { scale: 0, opacity: 0 },
            {
                scale: 1,
                opacity: 1,
                duration: 0.8,
                delay: 0.9,
                ease: 'back.out(1.7)',
            },
        );
    }, []);

    return (
        <section
            ref={heroRef}
            className="flex min-h-screen items-center justify-center px-2 sm:px-4 lg:px-8"
        >
            <div className="text-center">
                <p
                    className={`animate__animated animate__fadeInUp mb-4 font-heading text-lg sm:mb-6 sm:text-xl lg:mb-8 lg:text-2xl ${
                        isDarkMode ? 'text-text-dark' : 'text-text-light'
                    }`}
                >
                    Muhammad Iqbal's Web Portofolio
                </p>
                <h1
                    className={`animate__animated animate__fadeInUp mb-2 font-heading text-3xl font-bold sm:mb-4 sm:text-4xl md:text-5xl lg:mb-6 lg:text-6xl ${
                        isDarkMode ? 'text-text-dark' : 'text-text-light'
                    }`}
                >
                    Fullstack Web & Software
                </h1>
                <h1
                    className={`animate__animated animate__fadeInUp mb-6 font-heading text-3xl font-bold sm:mb-8 sm:text-4xl md:text-5xl lg:mb-10 lg:text-6xl ${
                        isDarkMode ? 'text-text-dark' : 'text-text-light'
                    }`}
                >
                    Developer
                </h1>
                <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
                    <a
                        href="/download"
                        className={`animate__animated animate__pulse animate__infinite inline-flex items-center justify-center gap-2 rounded-full px-6 py-2 text-sm font-medium shadow-xl transition-all duration-300 hover:scale-105 sm:px-8 sm:py-3 sm:text-base ${
                            isDarkMode
                                ? 'bg-primary-dark text-text-dark hover:bg-accent-dark'
                                : 'bg-primary-light text-text-dark hover:bg-accent-light'
                        }`}
                    >
                        <svg
                            className="h-5 w-5"
                            fill="none"
                            stroke={isDarkMode ? '#f1f0f9' : '#f1f0f9'}
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 16v-8m0 8l-4-4m4 4l4-4M4 20h16"
                            />
                        </svg>
                        View Resume
                    </a>

                    <a
                        href="#project"
                        className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-2 text-sm font-medium shadow-xl transition-all duration-500 hover:scale-105 sm:px-8 sm:py-3 sm:text-base ${
                            isDarkMode
                                ? 'bg-secondary-dark text-text-dark hover:bg-accent-dark'
                                : 'bg-secondary-light text-text-dark hover:bg-accent-light'
                        }`}
                    >
                        <svg
                            className="h-5 w-5"
                            fill="none"
                            stroke={isDarkMode ? '#f1f0f9' : '#f1f0f9'}
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                        Explore Projects
                    </a>
                </div>
            </div>
        </section>
    );
}
