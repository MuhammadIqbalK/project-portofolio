import AboutSection from '@/Components/AboutSection';
import BackToTop from '@/Components/BackToTop';
import CertificationSection from '@/Components/CertificationSection';
import ContactSection from '@/Components/ContactSection';
import EducationSection from '@/Components/EducationSection';
import ExperienceSection from '@/Components/ExperienceSection';
import HeroSection from '@/Components/HeroSection';
import Navbar from '@/Components/Navbar';
import ProjectsSection from '@/Components/ProjectsSection';
import SkillsSection from '@/Components/SkillsSection';
import { useGSAP } from '@gsap/react';
import { Head } from '@inertiajs/react';
import 'animate.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef, useState } from 'react';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function Portfolio({ tags = [], projects = [] }) {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const parallaxRef = useRef(null);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    // GSAP Animations
    useGSAP(() => {
        // Parallax effect for hero background
        gsap.to(parallaxRef.current, {
            yPercent: -50,
            ease: 'none',
            scrollTrigger: {
                trigger: document.querySelector('main'),
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
            },
        });
    }, []);

    return (
        <div
            className={`scrollbar-thin scrollbar-thumb-rounded-full min-h-screen font-sans ${
                isDarkMode
                    ? 'scrollbar-thumb-primary-dark scrollbar-track-gray-800 bg-bg-dark text-text-dark'
                    : 'scrollbar-thumb-primary-light scrollbar-track-gray-200 bg-bg-light text-text-light'
            }`}
            style={{
                scrollbarWidth: 'thin',
                scrollbarColor: isDarkMode
                    ? '#f8703a #1c1c1c'
                    : '#c53d07 #e3e3e3',
            }}
        >
            <Head title="Portfolio" />

            {/* Global Background */}
            <div
                ref={parallaxRef}
                className="fixed inset-0 -z-10 opacity-10"
                style={{
                    background: `linear-gradient(135deg, 
  /* Primary color first */
  ${isDarkMode ? '#f8703a' : '#c53d07'} 0%, 
  /* Secondary color in middle */
  ${isDarkMode ? '#393579' : '#8b86ca'} 50%, 
  /* Accent color at end */
  ${isDarkMode ? '#5a51b8' : '#5047ae'} 100%
)`,
                }}
            />

            {/* Custom Scrollbar Styles */}
            <style
                dangerouslySetInnerHTML={{
                    __html: `
                    /* Webkit Scrollbar Styles */
                    ::-webkit-scrollbar {
                        width: 8px;
                    }
                    
                    ::-webkit-scrollbar-track {
                        background: ${isDarkMode ? '#1c1c1c' : '#e3e3e3'};
                        border-radius: 10px;
                    }
                    
                    ::-webkit-scrollbar-thumb {
                        background: ${isDarkMode ? '#f8703a' : '#c53d07'};
                        border-radius: 10px;
                        transition: all 0.3s ease;
                    }
                    
                    ::-webkit-scrollbar-thumb:hover {
                        background: ${isDarkMode ? '#e55a2b' : '#b03a06'};
                        transform: scale(1.1);
                    }
                    
                    /* Firefox Scrollbar */
                    * {
                        scrollbar-width: thin;
                        scrollbar-color: ${isDarkMode ? '#f8703a #1c1c1c' : '#c53d07 #e3e3e3'};
                    }
                `,
                }}
            />

            {/* Floating Navbar */}
            <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

            {/* Main Content */}
            <main className="pt-18">
                <HeroSection isDarkMode={isDarkMode} />
                <AboutSection isDarkMode={isDarkMode} />
                <SkillsSection isDarkMode={isDarkMode} tags={tags} />
                <ProjectsSection isDarkMode={isDarkMode} projects={projects} />
                <ExperienceSection isDarkMode={isDarkMode} />
                <EducationSection isDarkMode={isDarkMode} />
                <CertificationSection isDarkMode={isDarkMode} />
                <ContactSection isDarkMode={isDarkMode} />
            </main>

            {/* Back to Top Button */}
            <BackToTop isDarkMode={isDarkMode} />
        </div>
    );
}
