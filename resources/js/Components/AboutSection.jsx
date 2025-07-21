import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function AboutSection({ isDarkMode }) {
    const aboutRef = useRef(null);

    // GSAP Animations
    useRef(() => {
        // About section animation
        gsap.fromTo(
            aboutRef.current,
            { opacity: 0 },
            {
                opacity: 1,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: aboutRef.current,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse',
                },
            },
        );

        gsap.fromTo(
            aboutRef.current.querySelector('h2'),
            { x: -100, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: aboutRef.current,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse',
                },
            },
        );

        gsap.fromTo(
            aboutRef.current.querySelectorAll('p'),
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: aboutRef.current,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse',
                },
            },
        );
    }, []);

    return (
        <section
            ref={aboutRef}
            id="about"
            className="px-4 py-10 sm:px-6 sm:py-20"
        >
            <div>
                <div className="mx-auto max-w-4xl">
                    <h2
                        className={`animate__animated animate__fadeInLeft mb-8 text-center font-heading text-2xl font-bold sm:mb-12 sm:text-3xl lg:text-4xl ${
                            isDarkMode ? 'text-text-dark' : 'text-text-light'
                        }`}
                    >
                        About Me
                    </h2>
                    <div
                        className={`animate__animated animate__fadeInUp text-base leading-relaxed sm:text-lg ${
                            isDarkMode ? 'text-text-dark' : 'text-text-light'
                        }`}
                    >
                        <p className="mb-6">
                            I’m a dedicated methodical software developer and
                            system analyst with strong expertise in PHP,
                            JavaScript, Ruby on Rails, PostgreSQL, MySQL,
                            Jenkins, and Git. Expertise in UI/UX design, I bring
                            a user-centered approach to building scalable and
                            efficient systems. I excel both independently and in
                            teams, and I’m always eager to learn, solve complex
                            problems, and deliver impactful digital solutions.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
