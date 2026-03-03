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
import SmoothCursor from '@/Components/SmoothCursor';
import StarryBackground from '@/Components/StarryBackground';
import GridBackground from '@/Components/GridBackground';
import { useGSAP } from '@gsap/react';
import { Head } from '@inertiajs/react';
import 'animate.css';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function Portfolio({ tags = [], projects = [] }) {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('theme');
            if (stored) return stored === 'dark';
        }
        return true;
    });
    const parallaxRef = useRef(null);
    const containerRef = useRef(null);
    const slideshowContainerRef = useRef(null);
    const currentSectionRef = useRef(0);
    const [isSlideshowAnimating, setIsSlideshowAnimating] = useState(false);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    const slideshowSectionCount = 2; // Only Hero and About

    // Handle wheel event for slideshow (Hero <-> About) - Horizontal slide
    useEffect(() => {
        const slideshowContainer = slideshowContainerRef.current;
        if (!slideshowContainer) return;

        const sections = Array.from(slideshowContainer.querySelectorAll('.slide-section'));
        if (sections.length < 2) return;

        let isScrolling = false;
        let scrollTimeout = null;

        // Initialize sections - Hero visible, About hidden on the right
        gsap.set(sections[0], { x: '0%', opacity: 1, zIndex: 10 });
        gsap.set(sections[1], { x: '100%', opacity: 1, zIndex: 10 });

        const animateToSection = (targetIndex) => {
            setIsSlideshowAnimating(true);

            sections.forEach((section, index) => {
                // All sections visible, just slide horizontally
                gsap.to(section, {
                    x: (index - targetIndex) * 100 + '%',
                    opacity: 1,
                    duration: 1.2,
                    ease: 'power3.inOut',
                });
            });

            currentSectionRef.current = targetIndex;

            // Reset animation state after animation completes
            setTimeout(() => {
                setIsSlideshowAnimating(false);
            }, 1200);
        };

        const handleWheel = (e) => {
            if (isScrolling) return;

            const direction = e.deltaY > 0 ? 1 : -1;
            const newSection = Math.max(0, Math.min(slideshowSectionCount - 1, currentSectionRef.current + direction));

            // Only prevent default and animate if we're staying within slideshow bounds
            if (newSection !== currentSectionRef.current) {
                e.preventDefault();
                e.stopPropagation();
                isScrolling = true;
                animateToSection(newSection);

                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(() => {
                    isScrolling = false;
                }, 1200);
            }
            // If we're at the last slide and scrolling down, or first slide and scrolling up,
            // let the scroll event propagate to the main container
        };

        // Touch handling for mobile swipe gestures
        let touchStartY = 0;
        let touchEndY = 0;

        const handleTouchStart = (e) => {
            touchStartY = e.changedTouches[0].screenY;
        };

        const handleTouchMove = (e) => {
            if (isSlideshowAnimating) {
                e.preventDefault();
                e.stopPropagation();
                return;
            }
            touchEndY = e.changedTouches[0].screenY;
        };

        const handleTouchEnd = (e) => {
            if (isScrolling || isSlideshowAnimating) return;

            const deltaY = touchStartY - touchEndY;
            const direction = deltaY > 0 ? 1 : -1; // swipe up = next, swipe down = prev
            const newSection = Math.max(0, Math.min(slideshowSectionCount - 1, currentSectionRef.current + direction));

            if (newSection !== currentSectionRef.current && Math.abs(deltaY) > 5) {
                isScrolling = true;
                animateToSection(newSection);

                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(() => {
                    isScrolling = false;
                }, 1200);
            }
        };

        // Prevent main container scroll when touching slideshow area
        const handleContainerTouchMove = (e) => {
            if (isSlideshowAnimating || isScrolling) {
                e.preventDefault();
                e.stopPropagation();
            }
        };

        // Also prevent container scroll during slideshow animation
        const handleContainerWheel = (e) => {
            if (isSlideshowAnimating) {
                e.preventDefault();
                e.stopPropagation();
            }
        };

        // Handle keyboard navigation for slideshow
        const handleKeyDown = (e) => {
            if (isScrolling) return;

            let direction = 0;
            if (e.key === 'ArrowRight' || e.key === 'PageDown') {
                direction = 1;
            } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
                direction = -1;
            } else if (e.key === 'Home') {
                direction = -currentSectionRef.current;
            } else if (e.key === 'End') {
                direction = slideshowSectionCount - 1 - currentSectionRef.current;
            }

            if (direction !== 0) {
                const newSection = Math.max(0, Math.min(slideshowSectionCount - 1, currentSectionRef.current + direction));

                if (newSection !== currentSectionRef.current) {
                    isScrolling = true;
                    animateToSection(newSection);

                    clearTimeout(scrollTimeout);
                    scrollTimeout = setTimeout(() => {
                        isScrolling = false;
                    }, 1200);
                }
            }
        };

        // Also support up/down arrows for consistency
        const handleKeyDownVertical = (e) => {
            if (isScrolling) return;

            if (e.key === 'ArrowDown') {
                if (currentSectionRef.current < slideshowSectionCount - 1) {
                    e.preventDefault();
                    isScrolling = true;
                    animateToSection(currentSectionRef.current + 1);
                    clearTimeout(scrollTimeout);
                    scrollTimeout = setTimeout(() => {
                        isScrolling = false;
                    }, 1200);
                }
            } else if (e.key === 'ArrowUp') {
                if (currentSectionRef.current > 0) {
                    e.preventDefault();
                    isScrolling = true;
                    animateToSection(currentSectionRef.current - 1);
                    clearTimeout(scrollTimeout);
                    scrollTimeout = setTimeout(() => {
                        isScrolling = false;
                    }, 1200);
                }
            }
        };

        slideshowContainer.addEventListener('wheel', handleWheel, { passive: false });
        slideshowContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
        slideshowContainer.addEventListener('touchmove', handleTouchMove, { passive: false });
        slideshowContainer.addEventListener('touchend', handleTouchEnd, { passive: true });
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keydown', handleKeyDownVertical);

        // Prevent container scroll during animation and slideshow area touches
        const container = containerRef.current;
        if (container) {
            container.addEventListener('wheel', handleContainerWheel, { passive: false });
            container.addEventListener('touchmove', handleContainerTouchMove, { passive: false });
        }

        return () => {
            slideshowContainer.removeEventListener('wheel', handleWheel);
            slideshowContainer.removeEventListener('touchstart', handleTouchStart);
            slideshowContainer.removeEventListener('touchmove', handleTouchMove);
            slideshowContainer.removeEventListener('touchend', handleTouchEnd);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keydown', handleKeyDownVertical);
            if (container) {
                container.removeEventListener('wheel', handleContainerWheel);
                container.removeEventListener('touchmove', handleContainerTouchMove);
            }
            clearTimeout(scrollTimeout);
        };
    }, [slideshowSectionCount]);

    // GSAP Animations
    useGSAP(() => {
        const bgElement = parallaxRef.current;
        const container = containerRef.current;
        if (!bgElement || !container) return;

        // Parallax effect - only for the main container scroll (not slideshow)
        gsap.to(bgElement, {
            backgroundPositionY: '50%',
            ease: 'none',
            scrollTrigger: {
                scroller: container,
                start: 'top top',
                end: 'bottom bottom',
                scrub: true,
            },
        });

        // Animate regular sections (Skills onwards) - with delay to avoid slideshow conflicts
        setTimeout(() => {
            const regularSections = container.querySelectorAll('.regular-sections section');
            regularSections.forEach((section) => {
                gsap.fromTo(
                    section,
                    {
                        opacity: 0,
                        y: 100,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: 'power2.out',
                        scrollTrigger: {
                            scroller: container,
                            trigger: section,
                            start: 'top 80%',
                            end: 'top 30%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );
            });
            ScrollTrigger.refresh();
        }, 100);
    }, []);

    useEffect(() => {
        if (isDarkMode) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
        window.dispatchEvent(new Event('storage'));
    }, [isDarkMode]);

    useEffect(() => {
        const syncTheme = () => {
            const stored = localStorage.getItem('theme');
            setIsDarkMode(stored === 'dark');
        };
        window.addEventListener('storage', syncTheme);
        return () => window.removeEventListener('storage', syncTheme);
    }, []);

    return (
        <div
            ref={containerRef}
            className={`scrollbar-thin scrollbar-thumb-rounded-full h-screen font-sans relative overflow-y-auto overflow-x-hidden ${
                isDarkMode
                    ? 'scrollbar-thumb-primary-dark scrollbar-track-gray-900 text-text-dark'
                    : 'scrollbar-thumb-primary-light scrollbar-track-gray-200 text-text-light'
            }`}
            style={{
                scrollbarWidth: 'thin',
                scrollbarColor: isDarkMode
                    ? '#f8703a #090A0F'
                    : '#c53d07 #e3e3e3',
            }}
        >
            <Head title="Portfolio" />

            {/* Global Background - Grid for light mode, Stars for dark mode */}
            {isDarkMode ? (
                <>
                    {/* Radial gradient background for dark mode */}
                    <div
                        className="fixed inset-0 -z-20"
                        style={{
                            background: 'radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%)',
                        }}
                    />
                    {/* Animated Stars */}
                    <StarryBackground />
                    {/* Optional: Subtle parallax overlay */}
                    <div
                        ref={parallaxRef}
                        className="fixed inset-0 -z-10 opacity-5"
                        style={{
                            background: 'linear-gradient(135deg, #f8703a 0%, #393579 50%, #5a51b8 100%)',
                            backgroundSize: '100% 200%',
                            backgroundPosition: 'center 0%',
                        }}
                    />
                </>
            ) : (
                <>
                    {/* Animated Grid Background for light mode */}
                    <GridBackground />
                    {/* Subtle gradient overlay */}
                    <div
                        ref={parallaxRef}
                        className="fixed inset-0 -z-10"
                        style={{
                            background: 'linear-gradient(135deg, rgba(197, 61, 7, 0.05) 0%, rgba(139, 134, 202, 0.05) 50%, rgba(80, 71, 174, 0.05) 100%)',
                            backgroundSize: '100% 200%',
                            backgroundPosition: 'center 0%',
                        }}
                    />
                </>
            )}

            {/* Custom Scrollbar Styles */}
            <style
                dangerouslySetInnerHTML={{
                    __html: `
                    /* Prevent double scrollbar - lock html/body height */
                    html, body {
                        height: 100%;
                        overflow: hidden;
                        margin: 0;
                        padding: 0;
                    }

                    /* Webkit Scrollbar Styles */
                    ::-webkit-scrollbar {
                        width: 8px;
                    }

                    ::-webkit-scrollbar-track {
                        background: ${isDarkMode ? '#090A0F' : '#e3e3e3'};
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
                        scrollbar-color: ${isDarkMode ? '#f8703a #090A0F' : '#c53d07 #e3e3e3'};
                    }
                `,
                }}
            />

            {/* Floating Navbar */}
            <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

            {/* Main Content */}
            <main className="relative">
                {/* Slideshow Container - Only Hero and About */}
                <div ref={slideshowContainerRef} className="relative h-screen w-full overflow-hidden">
                    {/* Hero Section */}
                    <section
                        data-slide="0"
                        className="slide-section absolute inset-0 flex h-full w-full items-center justify-center"
                    >
                        <div className="w-full">
                            <HeroSection isDarkMode={isDarkMode} />
                        </div>
                    </section>

                    {/* About Section */}
                    <section
                        data-slide="1"
                        className="slide-section absolute inset-0 flex h-full w-full items-center justify-center"
                    >
                        <div className="w-full">
                            <AboutSection isDarkMode={isDarkMode} />
                        </div>
                    </section>
                </div>

                {/* Regular Sections - Normal Scroll */}
                <div className="regular-sections space-y-24 py-24">
                    {/* Skills Section */}
                    <section>
                        <SkillsSection isDarkMode={isDarkMode} tags={tags} />
                    </section>

                    {/* Projects Section */}
                    <section>
                        <ProjectsSection isDarkMode={isDarkMode} projects={projects} />
                    </section>

                    {/* Experience Section */}
                    <section>
                        <ExperienceSection isDarkMode={isDarkMode} />
                    </section>

                    {/* Education Section */}
                    <section>
                        <EducationSection isDarkMode={isDarkMode} />
                    </section>

                    {/* Certification Section */}
                    <section>
                        <CertificationSection isDarkMode={isDarkMode} />
                    </section>

                    {/* Contact Section */}
                    <section>
                        <ContactSection isDarkMode={isDarkMode} />
                    </section>
                </div>
            </main>

            {/* Back to Top Button */}
            <BackToTop isDarkMode={isDarkMode} containerRef={containerRef} isSlideshowAnimating={isSlideshowAnimating} />

            {/* Custom Cursor */}
            <SmoothCursor isDarkMode={isDarkMode} />
        </div>
    );
}
