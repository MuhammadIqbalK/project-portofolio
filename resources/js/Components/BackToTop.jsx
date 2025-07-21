import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useEffect, useState } from 'react';

// Register ScrollToPlugin
gsap.registerPlugin(ScrollToPlugin);

export default function BackToTop({ isDarkMode }) {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when scrolling down
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    // Smooth scroll to top
    const scrollToTop = () => {
        gsap.to(window, {
            duration: 1.5,
            scrollTo: { y: 0 },
            ease: 'power3.out',
        });
    };

    return (
        <>
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className={`fixed bottom-8 right-8 z-50 rounded-full border-2 p-3 shadow-lg ${
                        isDarkMode
                            ? 'border-accent-dark'
                            : 'border-accent-light'
                    } transition-all duration-300 hover:scale-110 hover:shadow-xl ${
                        isDarkMode
                            ? 'bg-primary-dark text-text-dark hover:bg-accent-dark'
                            : 'bg-primary-light text-text-dark hover:bg-accent-light'
                    } animate__animated animate__fadeInUp`}
                    aria-label="Back to top"
                >
                    <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 10l7-7m0 0l7 7m-7-7v18"
                        />
                    </svg>
                </button>
            )}
        </>
    );
}
